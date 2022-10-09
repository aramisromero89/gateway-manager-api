import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class IdNumberInputDto {
    @IsNotEmpty()
    @IsNumber()
    id: number
}


export class IdStringInputDto {
    @IsNotEmpty()
    @IsString()
    id: string
}