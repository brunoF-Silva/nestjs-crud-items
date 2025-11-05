import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { hash } from "bcryptjs";



@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const encryptedPassword = await hash(createUserDto.password, 10);

    const userCreated = this.prisma.user.create({
      data: {...createUserDto, password: encryptedPassword},
    });

    return userCreated;
  }

  // findAll() {
  //   return this.prisma.user.findMany();
  // }

// UPDATE THIS METHOD
  async findAll(page: number) {
    const limit = 6; // Set to 6 items per page
    const skip = (page - 1) * limit;

    // We run two queries: one for the page data, one for the total count
    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: skip,
        take: limit,
        orderBy: {
          id: 'desc', // Optional: show newest users first
        },
      }),
      this.prisma.user.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    // Return the paginated structure
    return {
      data: users,
      totalItems: total,
      totalPages: totalPages,
      currentPage: page,
    };
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log("updateUserDto: ", updateUserDto);
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return  this.prisma.user.delete({ where: { id } });
  }
}
