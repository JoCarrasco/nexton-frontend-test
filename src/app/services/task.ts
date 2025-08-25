import { inject, Injectable } from '@angular/core';
import { Repo } from './repo';
import { IPaginatedTasks, ITask } from '../../models/task.model';
import { PaginationUtils } from '../utils/pagination.utils';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly repo = inject(Repo);

  tasks(): ITask[] {
    return this.repo.getTasks();
  }

  tasksWithPagination(page: number = 1, itemsPerPage: number = 5, tasks?: ITask[]): IPaginatedTasks {
    return PaginationUtils.paginate(tasks === undefined ? this.tasks() : tasks, page, itemsPerPage);
  }
}
