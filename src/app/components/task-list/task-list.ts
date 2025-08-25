import { Component, input } from '@angular/core';
import { ITask } from '../../../models/task.model';
import { Task } from '../../components/task/task';

@Component({
  selector: 'app-task-list',
  imports: [Task],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {
  readonly tasks = input<ITask[] | undefined>(undefined);
}
