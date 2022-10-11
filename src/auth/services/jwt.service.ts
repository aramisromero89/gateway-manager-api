import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken'
import { LoginPayload } from "../dtos/auth.dto";

@Injectable()
export class JwtService {
    sign(payload: LoginPayload) {
        return jwt.sign(payload, process.env.JWT_SECRET)
    }

    decode(token) {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}