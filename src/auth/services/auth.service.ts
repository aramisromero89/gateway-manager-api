import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/services/prisma.service";
import { ErrorHelper } from "src/common/utils/error-helper";
import { LoginDto, LoginPayload, RegisterDto, TokenDto, UsernameDto } from "../dtos/auth.dto";
import { CryptoService } from "./crypto.service";
import { JwtService } from "./jwt.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly crypto: CryptoService,
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService
    ) { }

    async login(data: LoginDto): Promise<TokenDto> {
        let user = await this.prisma.user.findFirst({
            where: {
                username: data.username
            }
        })
        if (!user)
            ErrorHelper.unauthorized()
        if (!await this.crypto.compareData(data.password, user.password))
            ErrorHelper.unauthorized()

        const payload: LoginPayload = { userId: user.id }

        return { token: this.jwt.sign(payload) }
    }

    async register(data: RegisterDto): Promise<TokenDto> {
        let exist = await this.prisma.user.count({
            where: {
                username: data.username
            }
        })
        if (exist > 0)
            ErrorHelper.conflict("USERNAME_EXIST");
        let pwd = await this.crypto.hashData(data.password)
        await this.prisma.user.create({
            data: {
                username: data.username,
                password: pwd
            }
        })
        return this.login({
            username: data.username,
            password: data.password
        })
    }

    async userDetail(id: number): Promise<UsernameDto> {
        let user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return {
            username: user.username
        }
    }

    async changePassword(userId: number, password: string): Promise<UsernameDto> {
        let pwd = await this.crypto.hashData(password)
        let user = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                password: pwd
            }
        })
        return {
            username:user.username
        };
    }

}