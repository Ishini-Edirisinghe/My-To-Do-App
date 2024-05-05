import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask, Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = 'https://60a21a08745cd70017576014.mockapi.io/api/v1/';
  
  constructor(private http: HttpClient) { }

  getAllTaskList(): Observable<ITask>{
    return this.http.get<ITask>(this.apiUrl + 'todo');
  }

  addNewTask(obj: Task): Observable<ITask>{
    return this.http.post<ITask>(this.apiUrl + 'todo', obj);
  }

  updateTask(obj: Task): Observable<ITask>{
    return this.http.put<ITask>(`${this.apiUrl}todo/${obj.id}`, obj);
  }
  

  // deleteTask(id: number): Observable<ITask>{
  //   return this.http.delete<ITask>(this.apiUrl + 'todo', id);
  // }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}todo/${taskId}`);
  }
  
}
