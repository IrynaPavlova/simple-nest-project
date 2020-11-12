import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodoService } from '../services/todo.service';

@Controller('api/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getAllTodo(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  getTodoById(@Param('id') id: string): Promise<Todo> {
    const todo = this.todoService.findOne(id);
    if (todo === undefined) {
      throw new HttpException(
        `Todo with id: ${id} not exists`,
        HttpStatus.NOT_FOUND,
      );
    }
    return todo;
  }

  @Post()
  createTodo(@Body() newTodo: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = newTodo.title;
    if (newTodo.isCompleted !== undefined) {
      todo.isCompleted = newTodo.isCompleted;
    }
    return this.todoService.create(todo);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() { title, isCompleted = false }: UpdateTodoDto,
  ): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException(`Todo with id: ${id} not exists`);
    }
    todo.title = title;
    todo.isCompleted = isCompleted;
    return this.todoService.update(todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoService.remove(id);
  }
}
