import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './tasks.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskNotFoundException } from '@/common/exceptions';
import type { PaginationQuery, PaginatedResponse } from '@/common/interfaces/pagination.interface';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(userId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel({ ...createTaskDto, userId: new Types.ObjectId(userId) });
    return createdTask.save();
  }

  async findAll(userId: string, query: PaginationQuery = {}): Promise<PaginatedResponse<Task>> {
    const {
      page = 1,
      limit = 10,
      sortOrder = 'desc'
    } = query;

    const skip = (page - 1) * limit;
    const sort: any = {};
    sort['createdAt'] = sortOrder === 'asc' ? 1 : -1;

    const [tasks, total] = await Promise.all([
      this.taskModel
        .find({ userId: new Types.ObjectId(userId) })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.taskModel.countDocuments({ userId: new Types.ObjectId(userId) })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async findOne(userId: string, taskId: string): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: taskId, userId: new Types.ObjectId(userId) });
    if (!task) throw new TaskNotFoundException(taskId);
    return task;
  }

  async update(userId: string, taskId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: taskId, userId: new Types.ObjectId(userId) },
      { $set: updateTaskDto },
      { new: true },
    );
    if (!task) throw new TaskNotFoundException(taskId);
    return task;
  }

  async remove(userId: string, taskId: string): Promise<void> {
    const task = await this.taskModel.findOneAndDelete({ _id: taskId, userId: new Types.ObjectId(userId) });
    if (!task) throw new TaskNotFoundException(taskId);
  }
}
