import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs/operators";

export interface ITodo{
  id?: number,
  title: string,
  complited: boolean
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public todos:ITodo[]=[]

  todoTitle=""

  public loadText=false


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchTodos()
  }

  public addTodo():any {
    if (!this.todoTitle.trim()){
      return this;
    }
    const newTodo:ITodo={
      title: this.todoTitle,
      complited: false
    }
    this.http.post<ITodo>('https://jsonplaceholder.typicode.com/todos',newTodo)
      .subscribe(todo=>{
        this.todos.push(todo)
        this.todoTitle=''
      })
  }

  public fetchTodos() {
    this.loadText=false
    this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
      .pipe(delay(3000))
      .subscribe(todos=>{
        this.todos=todos
        this.loadText=true
      })
  }

  removeTodo(id: number | undefined) {
    this.http.delete<ITodo>(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(()=>{
        this.todos=this.todos.filter(todo=>todo.id!==id)
      })
  }
}
