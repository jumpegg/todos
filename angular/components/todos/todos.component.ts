import {Component} from '@angular/core';
import {TodoCrudService} from '../../services/TodosCrud.service';
import {Todo} from '../../vo/todo';

@Component({
    selector: 'todos',
    templateUrl: 'client/components/todos/todos.component.html',
    providers:[TodoCrudService]
})

export class TodosComponent{

    todoList:Todo[];

    constructor(private todosService:TodoCrudService){}

    ngOnInit(){
        this.todosService.getTodoList().subscribe(
            data => this.todoList = data,
            error=> alert(error),
            ()=>console.log(this.todoList)
        );
    }
}
