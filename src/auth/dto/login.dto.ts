import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'foo@example.com' })
  readonly email: string

  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  readonly password: string
}
