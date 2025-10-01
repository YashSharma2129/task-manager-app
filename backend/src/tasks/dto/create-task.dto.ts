import { IsNotEmpty, IsOptional, IsEnum, IsDateString, IsString, MaxLength } from 'class-validator';
import { TaskStatus } from '@/common/types';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, { message: 'Title must be less than 100 characters' })
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Description must be less than 500 characters' })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
