import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './Service/master.service';
import { ITask, Task } from './model/task';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,DatePipe,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{

  taskObj: Task = new Task();
  taskList: ITask[] = [];

  //masterService = inject(MasterService)
  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    
    this.loadAllTask();
  }

  loadAllTask(): void {
    this.masterService.getAllTaskList().subscribe(
      (res: any) => {
        console.log(res); // Log the response data
        if (Array.isArray(res)) {
          this.taskList = res;
          console.log("Come to this");
        } else {
          console.error('Invalid response format');
        }
      },
      (error) => {
        console.error('Error fetching task list:', error);
      }
    );
  
  }

  updateTask(): void{
    if (!this.taskObj.id) {
      alert("Please select a task to update");
      return;
    }

    this.masterService.updateTask(this.taskObj).subscribe(
      (res: any) => {
        alert("Task Updated Succuessfully");
        this.loadAllTask();
        this.taskObj = new Task();
      },
      error => {
        alert("API Call Alert");
      }
    );
  }

  onDelete(taskId: number): void{
    const isConfirm = confirm("Are you sure want to Delete");
    if(isConfirm){
      this.masterService.deleteTask(taskId).subscribe(
        (res: any) => {
          alert("Task Deleted Succuessfully");
          this.loadAllTask();
        },
        error => {
          alert("API Call Alert");
        }
      );
    }
    
  }

  addTask(){
    if (!this.taskObj.title || !this.taskObj.description) {
      alert("Please enter task name and description");
      return;
    };

    this.masterService.addNewTask(this.taskObj).subscribe(
      (res: any) => {
        alert("Task Created Succuessfully");
        this.loadAllTask();
        this.taskObj = new Task();
      },
      error => {
        alert("API Call Alert");
      }
    );
  }

  onEdit(task:Task){
    this.taskObj = task;
  }
}

