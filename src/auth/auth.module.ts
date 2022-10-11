import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { AuthController } from './controllers/auth.controller';
import { AuthGuard } from './middleware/auth.guard';
import { AuthService } from './services/auth.service';
import { CryptoService } from './services/crypto.service';
import { JwtService } from './services/jwt.service';

@Module({
    imports: [CommonModule],
    providers: [CryptoService, AuthService, AuthGuard, JwtService],
    exports: [AuthGuard, AuthService, JwtService],
    controllers: [AuthController]
})
export class AuthModule { }
