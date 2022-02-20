import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './model/task.model';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }
}
