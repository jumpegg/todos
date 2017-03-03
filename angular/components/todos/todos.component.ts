import {Component, OnInit} from '@angular/core';
import {TodoCrudService} from '../../services/TodosCrud.service';
import {Todo} from '../../vo/todo';

@Component({
    selector: 'todos',
    templateUrl: 'client/components/todos/todos.component.html',
    // template:`<ul><li *ngFor="let todo of todoList">{{todo.title}}</li></ul>`,
    providers:[TodoCrudService]
})
export class TodosComponent implements OnInit{

    todoList:Todo[];

    constructor(private todosService:TodoCrudService){}

    ngOnInit(){
        this.todosService.getTodoList().subscribe(
            data => this.todoList = data,
            error=> alert(error)
        );
    }
}
