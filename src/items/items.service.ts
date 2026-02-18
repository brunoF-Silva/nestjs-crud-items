import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ItemsService {
  private readonly MAX_ITEMS = 36;
  private readonly ALLOWED_IMAGE_HOSTS: string[] = (
    process.env.ALLOWED_IMAGE_HOSTS || 'images.unsplash.com'
  )
    .split(',')
    .map((host) => host.trim().toLowerCase());

  private readonly FORBIDDEN_IMAGE_HOSTS: string[] = (
    process.env.FORBIDDEN_IMAGE_HOSTS || 'plus.unsplash.com'
  )
    .split(',')
    .map((host) => host.trim().toLowerCase());

  constructor(private prisma: PrismaService) {}

  private isAllowedImageUrl(imageUrl: string): boolean {
    if (!imageUrl) return false;
    if (!imageUrl.startsWith('http')) return true; // Allow relative paths

    try {
      const url = new URL(imageUrl);
      const hostname = url.hostname.toLowerCase();

      // Check if explicitly forbidden
      if (this.FORBIDDEN_IMAGE_HOSTS.some((forbidden) => hostname.includes(forbidden))) {
        throw new BadRequestException([
          `Image host '${hostname}' is explicitly forbidden. Allowed sources URLs begin with '${this.ALLOWED_IMAGE_HOSTS.join(', ')}'.`
        ]);
      }

      // Check if allowed
      return this.ALLOWED_IMAGE_HOSTS.some((allowed) => hostname.includes(allowed));
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      return false;
    }
  }

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
    const itemCount = await this.prisma.item.count();
    
    if (itemCount >= this.MAX_ITEMS) {
      throw new BadRequestException([
        `Maximum limit of ${this.MAX_ITEMS} items reached. Cannot create more items.`
      ]);
    }

    // Validate image URL
    if (createItemDto.image) {
      try {
        if (!this.isAllowedImageUrl(createItemDto.image)) {
          throw new BadRequestException([
            `Image host not allowed. You can only use free pictures from unsplash.com (their URLs begin with '${this.ALLOWED_IMAGE_HOSTS.join(', ')}').`
          ]);
        }
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        throw new BadRequestException([
          `Invalid image URL format.`
        ]);
      }
    }

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
