import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {
  @ApiProperty({ description: 'User name', nullable: false })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @IsNotEmpty()
  password: string;


  constructor(email: string, username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
