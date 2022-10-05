import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {}

  async validateUser(username: string, pass: string): Promise<Pick<CreateUserDto, "email" | "username">> {
    console.log('validateUser', username);
    const user = await this.userService.findOne(username);
    console.log('validateUser', user);
    if (user && user.password === pass) {
      return user ;
    }
    return null;
  }

  login({ email, username }) {
    const payload = { username, email};
    console.log('login', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
