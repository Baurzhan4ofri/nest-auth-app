import { Body, Controller, Get, HttpCode, Request ,HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import {CreateUserDto} from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { LocalAuthGuard } from "../auth/local-auth-guard";
import { AuthService } from "../auth/auth.service";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";

interface IResponse {
  success: boolean
}


@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
    ) {
  }


  @Post('register')
  @HttpCode(200)
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  register(
    @Body() dto: CreateUserDto
  ): IResponse  {
    return this.userService.create(dto)
  }

  @Get('all')
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  getAll(): CreateUserDto[] {
    return this.userService.getAll()
  }


  @Post('auth')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  auth(@Request() req): any {
    return this.authService.login(req.user);
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  getProfile(@Request() req) {
    return req.user;
  }

}
