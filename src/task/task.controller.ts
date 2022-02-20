import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import { Task } from './model/task.model';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiResponse({ status: 201, type: Task, description: 'Creates a new Task' })
  @UseGuards(JwtAuthGuard)
  @Post('create-task')
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.taskService.create(createTaskDto);
    return { task };
  }

  @ApiResponse({
    status: 200,
    type: Task,
    isArray: true,
    description: 'Returns a list of all tasks',
  })
  @UseGuards(JwtAuthGuard)
  @Get('list-tasks')
  async findAll() {
    const tasks = await this.taskService.findAll();
    return { tasks };
  }
}
