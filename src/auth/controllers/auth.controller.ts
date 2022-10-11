import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger"
import { RequestProcessorService } from "src/common/services/request-processor.service"
import { ChangePasswordDto, LoginDto, LoginPayload, RegisterDto, TokenDto, UsernameDto } from "../dtos/auth.dto"
import { AuthGuard } from "../middleware/auth.guard"
import { AuthService } from "../services/auth.service"

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly requestProcessor: RequestProcessorService
    ) { }

    @Post("login")
    @ApiCreatedResponse({
        type: TokenDto
    })
    create(@Body() input: LoginDto): Promise<TokenDto> {
        return this.requestProcessor.processRequest(input, LoginDto, () => this.authService.login(input))
    }

    @Post("register")
    @ApiCreatedResponse({
        type: TokenDto,
    })
    edit(@Body() input: RegisterDto): Promise<TokenDto> {
        return this.requestProcessor.processRequest(input, RegisterDto, () => this.authService.register(input))
    }

    @Post("detail")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({
        type: UsernameDto,
    })
    detail(@Req() req: any): Promise<UsernameDto> {
        let payload = req.user as LoginPayload;
        return this.requestProcessor.processRequest(null, null, () => this.authService.userDetail(payload.userId))
    }

    @Post("changePassword")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({
        type: UsernameDto,
    })
    remove(@Req() req: any,@Body() input: ChangePasswordDto): Promise<UsernameDto> {
        let payload = req.user as LoginPayload;
        return this.requestProcessor.processRequest(input, ChangePasswordDto, () => this.authService.changePassword(payload.userId,input.password))
    }    
}