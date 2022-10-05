import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  private users = [
    {
      email: '5@mail.ru',
      username: '1',
      password: '1213',
    },
    {
      email: '6@mail.ru',
      username: '1',
      password: '1213',
    },
  ];


  create(dto: CreateUserDto) {
    const user = new CreateUserDto(dto.email, dto.username, dto.password)
    const alreadyRegisteredUser = this.users.find(u => u.email === user.email)
    if (alreadyRegisteredUser) {
      throw new BadRequestException({success: false})
    }
    this.users.push({
      email: dto.email,
      username: dto.username,
      password: dto.password
    })
    return { success: true }
  }

  getAll() {
    return this.users
  }

  findOne(username) {
    return this.users.find(u => u.username === username)
  }
}
