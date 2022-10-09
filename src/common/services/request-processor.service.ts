import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { AppValidationError } from '../dtos/error.dto';
import { ErrorHelper } from '../utils/error-helper';



export class AppException {
    description: string
    constructor(description: string) {
        this.description = description
    }
}

@Injectable()
export class RequestProcessorService {

    private transformValidationError(e: ValidationError): AppValidationError[] {
        let errors: AppValidationError[] = []
        if (e.constraints) {
            errors = errors.concat(Object.keys(e.constraints).map(key => {
                return {
                    rule: key,
                    property: e.property,
                    description: e.constraints[key],
                    value: JSON.stringify(e.value)
                } as AppValidationError
            }))
        }
        if (e.children.length > 0) {
            for (let i = 0; i < e.children.length; i++) {
                const ve = e.children[i];
                errors = errors.concat(this.transformValidationError(ve))
            }
        }
        return errors
    }

    async processRequest<T>(input: any, inputType: any, job: () => Promise<T>, restrictPeriod = false): Promise<T> {

        let inputErrors = []

        if (inputType != null)
            inputErrors = await validate(plainToInstance(inputType, input), { validationError: { target: false, value: true }, whitelist: true });


        let transformedErrors: AppValidationError[] = []
        if (inputErrors.length > 0) {
            for (let i = 0; i < inputErrors.length; i++) {
                const ie = inputErrors[i];
                transformedErrors = transformedErrors.concat(this.transformValidationError(ie))
            }
            ErrorHelper.badrequest(transformedErrors)
        }
        try {
            let res = await job()
            return res
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code == "P2025")
                    ErrorHelper.conflict("No related entity found")
                else {
                    ErrorHelper.error("PRISMA_ERROR", e.meta)
                }

            }
            throw e
        }



    }
}
