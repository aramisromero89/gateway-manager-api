import { BadRequestException, ConflictException, ForbiddenException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { AppValidationError } from "../dtos/error.dto";

export class ErrorHelper {
    static forbidden(){
        throw new ForbiddenException()
    }

    static unauthorized(description?: string){
        throw new UnauthorizedException(description)
    }

    static badrequest(errors:AppValidationError[]){
        throw new BadRequestException(errors)
    }

    static conflict(description: string, object?: any){
        throw new ConflictException(object,description)
    }

    static error(description: string, object?: any){
        throw new InternalServerErrorException(object,description)
    }
}