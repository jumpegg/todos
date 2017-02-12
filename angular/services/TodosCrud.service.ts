import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class TodoCrudService{
    constructor(private http:Http){}
    getTodoList(){
        return this.http.get('/todos')
                    .map(res=>res.json());
    }
}
