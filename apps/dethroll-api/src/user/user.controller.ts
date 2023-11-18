import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/wallet/:address')
  getUserByWallet(@Param('address') address: string) {
    return this.userService.getUserByWallet(address);
  }

  @Get('/snowflake/:id')
  getUserByDiscordId(@Param('id') id: string) {
    return this.userService.getUserByDiscordId(id);
  }
}
