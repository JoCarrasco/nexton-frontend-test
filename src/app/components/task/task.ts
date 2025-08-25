import { Component, input } from '@angular/core';
import { ITask } from '../../../models/task.model';
import { TaskMetadata } from "../task-metadata/task-metadata";
import { TruncatePipe } from "../../pipes/truncate-pipe";
import { StatusToStatusIdentifierPipe } from "../../pipes/status-to-status-identifier-pipe";

@Component({
  selector: 'app-task',
  imports: [TaskMetadata, TruncatePipe, StatusToStatusIdentifierPipe],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task{
  task = input<ITask | undefined>(undefined);
}
