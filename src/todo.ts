import { Controller, Get, Post, Body, Put, Delete, Param } from "@restyjs/core";

import { IsString, IsBoolean, IsNumber } from "class-validator";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export class AddTodoDTO implements Todo {
  id!: number;

  @IsString()
  text!: string;

  @IsBoolean()
  completed!: boolean;
}

export class UpdateTodoDTO implements Todo {
  @IsNumber()
  id!: number;

  @IsString()
  text!: string;

  @IsBoolean()
  completed!: boolean;
}

var todos: Todo[] = [];

@Controller("/todo")
export class TodoController {
  @Get("/")
  todos() {
    return { todos };
  }

  @Post("/")
  add(@Body() todo: AddTodoDTO) {
    todo.id = todos.length;
    todos.push(todo);
    return { todo };
  }

  @Put("/")
  update(@Body() todo: UpdateTodoDTO) {
    todos.splice(todo.id, 1, todo);
    return { todo };
  }

  @Get("/:id")
  get(@Param("id") id: number) {
    if (id > todos.length) throw Error("id not found");
    return { todo: todos[id] };
  }
}
