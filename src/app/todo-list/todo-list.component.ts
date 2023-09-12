import { Component } from '@angular/core';

enum TaskColumn {
  Todo = 'todo',
  InProgress = 'inProgress',
  Done = 'done',
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  tasks: {
    [key in TaskColumn]: string[];
  } = {
    [TaskColumn.Todo]: ['Uppgift 1', 'Uppgift 2', 'Uppgift 3'],
    [TaskColumn.InProgress]: ['Uppgift 4', 'Uppgift 5'],
    [TaskColumn.Done]: ['Uppgift 6']
  };
  

  newTask: string = '';
TaskColumn: TaskColumn | undefined;

  onDragStart(event: any, task: string) {
    event.dataTransfer.setData('text/plain', task);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop(event: any, column: string) {
    if (column === TaskColumn.Todo || column === TaskColumn.InProgress || column === TaskColumn.Done) {
      const task = event.dataTransfer.getData('text/plain');
      this.tasks[column].push(task);

      const originalColumn = Object.values(TaskColumn).find(col => this.tasks[col].includes(task));
      if (originalColumn) {
        const index = this.tasks[originalColumn].indexOf(task);
        if (index !== -1) {
          this.tasks[originalColumn].splice(index, 1);
        }
      }
    }
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks[TaskColumn.Todo].push(this.newTask);
      this.newTask = '';
    }
  }

  removeTask(column: TaskColumn, task: string) {
    const index = this.tasks[column].indexOf(task);
    if (index !== -1) {
      this.tasks[column].splice(index, 1);
    }
  }

  getTaskColumn(column: TaskColumn): string {
    return column;
  }
}
