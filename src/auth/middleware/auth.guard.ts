import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/common/services/prisma.service";
import { ErrorHelper } from "src/common/utils/error-helper";
import { LoginPayload } from "../dtos/auth.dto";
import { AuthService } from "../services/auth.service";
import { JwtService } from "../services/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(

        private readonly jwt: JwtService,
        private readonly prisma: PrismaService
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            let payload = (await this.jwt.decode(request.headers.authorization.replace("Bearer ", ""))) as LoginPayload
            let user = await this.prisma.user.findUnique({
                where: {
                    id: payload.userId,
                }
            })
            if (user != null){
                request.user = payload;
            }
                return true
        } catch (e) {
          console.log("invalid token")
        }
        ErrorHelper.unauthorized();
    }    
}

