import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TaskList } from "../../components/task-list/task-list";
import { TaskService } from '../../services/task';
import { IPaginatedTasks, ITask } from '../../../models/task.model';
import { Searchbar } from "../../components/searchbar/searchbar";
import { SearchFilters } from "../../components/search-filters/search-filters";
import { Sidebar } from "../../components/sidebar/sidebar";
import { TaskUtils } from '../../utils/task.utils';

@Component({
  selector: 'app-tasks',
  imports: [MatSidenavModule, TaskList, Searchbar, SearchFilters, Sidebar],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
})
export class Tasks implements OnInit {
  taskService = inject(TaskService);
  tasks = signal<ITask[] | undefined>(undefined);
  taskFilter = signal<string>('all');
  taskSort = signal<string>('default');
  searchTerm = signal<string>('');
  private currentPage = signal<IPaginatedTasks | undefined>(undefined);
  nextPage = computed(() => {
    return this.currentPage()?.nextPage;
  });


  constructor() { }

  ngOnInit(): void {
    this.tasks.set(this.getTasks());
  }

  private getTasks(): ITask[] {
    const page = this.taskService.tasksWithPagination();
    if (page.items.length > 0) {
      this.currentPage.set(page);
      return page.items;
    }
    return []
  }

  private checkAndForceSetPage(items: ITask[]) {
    if (items.length === 0) {
      this.currentPage.set(undefined);
    } else if (items.length <= 6) {
      const paginatedTasks: IPaginatedTasks = {
        totalPages: 1,
        items,
        prevPage: null,
        nextPage: null,
        page: 1,
      }
      this.currentPage.set(
        paginatedTasks
      )
    }
  }

  getMoreTasks() {
    if (this.nextPage() !== null && this.nextPage() !== undefined) {
      const isFilterApplied = this.taskFilter() !== 'all';
      const isSortApplied = this.taskSort() !== 'default';
      const isSearchApplied = this.searchTerm() !== '';

      const tasks = this.taskService.tasksWithPagination(this.nextPage() as number);
      if (tasks.items.length > 0) {
        this.currentPage.set(tasks);
        let updatedTasks = [...(this.tasks() || []), ...tasks.items];

        if (isSearchApplied) {
          updatedTasks = TaskUtils.queryTasksBySearchTerm(this.getTasks(), this.searchTerm());
        }

        if (isFilterApplied) {
          updatedTasks = TaskUtils.filterTasks(this.taskFilter(), updatedTasks);
        }

        if (isSortApplied) {
          const taskSort = this.taskSort() as 'status' | 'title' | 'default';
          updatedTasks = TaskUtils.sortTasks(taskSort, updatedTasks);
        }


      
        this.tasks.set(updatedTasks);
      }
    }
  }


  handleSearch(searchTerm: string): void {
    if (searchTerm) {
      const isFilterApplied = this.taskFilter() !== 'all';
      const isSortApplied = this.taskSort() !== 'default';
      const filteredTasks = this.getTasks().filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const taskSort = this.taskSort() as 'status' | 'title' | 'default';
      let finalTasksAfterModification: ITask[] = [];
      if (isFilterApplied) {
        const filteredByStatus = TaskUtils.filterTasks(this.taskFilter(), filteredTasks);
        finalTasksAfterModification = isSortApplied ? TaskUtils.sortTasks(taskSort, filteredByStatus) : filteredByStatus;
      } else if (isSortApplied) {
        finalTasksAfterModification = TaskUtils.sortTasks(taskSort, filteredTasks);
      } else {
        finalTasksAfterModification = filteredTasks;
      }
      this.tasks.set(finalTasksAfterModification)
      this.searchTerm.set(searchTerm);
      this.checkAndForceSetPage(finalTasksAfterModification);

    } else {
      this.tasks.set(this.getTasks());
    }


  }

  handleFilterChange(filter: Event): void {
    const filterValue = (filter.target as HTMLSelectElement).value;
    const isSearchApplied = this.searchTerm() !== '';
    const isSortApplied = this.taskSort() !== 'default';

    const tasks = this.getTasks();
    const tasksAfterSearch = isSearchApplied ? TaskUtils.queryTasksBySearchTerm(this.getTasks(), this.searchTerm()) : tasks;
    const filteredTasks = filterValue === 'all' ? tasksAfterSearch : TaskUtils.filterTasks(filterValue, tasksAfterSearch)
    let finalTasksAfterModification = filteredTasks;
    if (isSortApplied) {
      finalTasksAfterModification = TaskUtils.sortTasks(this.taskSort() as 'status' | 'title' | 'default', this.tasks() || []);
    }
    this.tasks.set(finalTasksAfterModification);
    this.taskFilter.set(filterValue);
    this.checkAndForceSetPage(finalTasksAfterModification);
  }

  handleSortChange(sort: Event): void {
    const sortValue = (sort.target as HTMLSelectElement).value as 'title' | 'status' | 'default';
    const isSearchApplied = this.searchTerm() !== '';
    const isFilterApplied = this.taskFilter() !== 'all';

    const tasks = this.getTasks();
    const tasksAfterFilter = isFilterApplied ? TaskUtils.filterTasks(this.taskFilter(), tasks) : tasks;
    const tasksAfterSearch = isSearchApplied ? TaskUtils.queryTasksBySearchTerm(this.getTasks(), this.searchTerm()) : tasksAfterFilter;
    const finalTasksAfterModification = sortValue === 'default' ? tasksAfterSearch : TaskUtils.sortTasks(sortValue, tasksAfterSearch);

    this.tasks.set(finalTasksAfterModification);
    this.checkAndForceSetPage(finalTasksAfterModification);
    this.taskSort.set(sortValue);
  }
}
