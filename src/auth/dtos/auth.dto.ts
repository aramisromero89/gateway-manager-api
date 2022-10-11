import { IsEmail, IsNotEmpty, IsNumber, IsString, Min, minLength, MinLength } from "class-validator";

export class UsernameDto {
    @IsNotEmpty()
    @IsString()
    username: string
}

export class LoginDto extends UsernameDto { 
    @IsNotEmpty()
    @IsString()
    password: string
}

export class TokenDto {
    token: string
}

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string
}

export class RegisterDto extends ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    username: string
}

export class LoginPayload {
    userId: number
}

