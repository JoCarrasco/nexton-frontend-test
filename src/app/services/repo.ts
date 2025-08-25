import { Injectable, Signal } from '@angular/core';
import { REPO_PREDEFINED_DATA_TASKS, REPO_PREDEFINED_DATA_USERS } from '../constants/repo-predefined-data';
import { IUser } from '../../models/user.model';
import { ITask } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class Repo {
  initRepoWithPredefinedData(): void {
    // This method is intended to initialize the repository with predefined data.
    // Currently, it does not perform any operations.
    localStorage.setItem('nexton-data-repo-users', JSON.stringify(REPO_PREDEFINED_DATA_USERS))
    localStorage.setItem('nexton-data-repo-tasks', JSON.stringify(REPO_PREDEFINED_DATA_TASKS)); // Initialize tasks as an empty array
  }

  getUsers(): IUser[] {
    const users = localStorage.getItem('nexton-data-repo-users');
    return users ? JSON.parse(users) : [];
  }

  getTasks(): ITask[] {
    const tasks = localStorage.getItem('nexton-data-repo-tasks');
    return tasks ? JSON.parse(tasks) : [];
  }
}
