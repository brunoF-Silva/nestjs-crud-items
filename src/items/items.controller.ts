import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiBody({
    type: CreateItemDto,
    description: 'Object to create a new item'
  })
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll(@Query('page') page: string) {
      // 2. Parse the page query (default to 1 if not provided)
      const pageNum = parseInt(page, 10) || 1;
      return this.itemsService.findAll(pageNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
