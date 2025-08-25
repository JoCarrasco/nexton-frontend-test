import { Component, input } from '@angular/core';
import { ITask } from '../../../models/task.model';
import { Avatar } from '../avatar/avatar';
import { DatePipe } from '@angular/common';

type ITaskMetadata = Pick<ITask, 'assignee' | 'status' | 'dueDate'>;

@Component({
  selector: 'app-task-metadata',
  imports: [Avatar, DatePipe],
  templateUrl: './task-metadata.html',
  styleUrl: './task-metadata.scss'
})
export class TaskMetadata {
  taskMetadata = input<ITaskMetadata | undefined>(undefined);
}
