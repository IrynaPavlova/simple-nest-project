import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.todoRepository.findOne(id);
  }

  async create(todo: Todo): Promise<Todo> {
    delete todo.id;
    return await this.todoRepository.save(todo);
  }

  async update(todo: Todo): Promise<Todo> {
    return await this.todoRepository.save(todo);
  }

  async remove(id: string): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
