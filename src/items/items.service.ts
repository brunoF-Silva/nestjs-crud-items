import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  // async create(createItemDto: CreateItemDto) {
  //   // 1. Added 'await'
  //   // 2. Renamed variable for clarity
  //   const itemCreated = await this.prisma.item.create({
  //     data: {
  //       ...createItemDto,
  //       user: { connect: { id: createItemDto.userId } },
  //     },
  //   });
  //   return itemCreated;
  // }

  async create(createItemDto: CreateItemDto) {
    const { userId, ...itemData } = createItemDto;

    const itemCreated = await this.prisma.item.create({
      data: {
        ...itemData,
        user: { connect: { id: userId } },
      },
    });

    return itemCreated;
  }


  // async findAll() {
  //   // 3. Changed 'user' to 'item'
  //   return await this.prisma.item.findMany();
  // }

  // async findOne(id: number) {
  //   // 4. Changed 'user' to 'item'
  //   return await this.prisma.item.findUnique({ where: { id } });
  // }
  
  async findOne(id: number) {
    // MODIFIED THIS METHOD
    return await this.prisma.item.findUnique({
      where: { id },
      include: {
        user: true, // This tells Prisma to fetch the related User
      },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    // 5. Changed 'user' to 'item'
    return await this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  async remove(id: number) {
    // 6. Changed 'user' to 'item'
    return await this.prisma.item.delete({ where: { id } });
  }

  async findAll(page: number) {
    const limit = 6; // Your requirement
    const skip = (page - 1) * limit;

    // We run two queries in a transaction
    // 1. Get the 6 items for the current page
    // 2. Get the TOTAL count of all items
    const [items, total] = await this.prisma.$transaction([
      this.prisma.item.findMany({
        skip: skip,
        take: limit,
        orderBy: {
          id: 'desc', // Optional: Show newest items first
        },
      }),
      this.prisma.item.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    // Return a structured object
    return {
      data: items,
      totalItems: total,
      totalPages: totalPages,
      currentPage: page,
    };
  }

}