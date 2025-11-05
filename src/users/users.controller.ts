import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiBody} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({
    type: CreateUserDto,
    description: 'Object to create a new user',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

// 2. UPDATE THIS METHOD
  @Get()
  findAll(@Query('page') page: string) {
    const pageNum = parseInt(page, 10) || 1;
    return this.usersService.findAll(pageNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
