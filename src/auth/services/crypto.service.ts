import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class CryptoService {

    compareData(data: string, hashed: string): Promise<boolean> {
        return compare(data, hashed);
    }

    hashData(data: string): Promise<string> {
        return hash(data, 10);
    }
}