import { ITask } from "../../models/task.model";
import { StatusToStatusIdentifierPipe } from "../pipes/status-to-status-identifier-pipe";

export class TaskUtils {
    static filterTasks(filter: string, tasks: ITask[]): ITask[] {
        if (filter === 'all') {
            return tasks;
        }

        const taskWithDefinedStatus = tasks.filter(task => task.status !== undefined);
        const statusIdentifierPipe = new StatusToStatusIdentifierPipe();
        return taskWithDefinedStatus.filter(task => statusIdentifierPipe.transform(task.status) === filter);
    }

    static queryTasksBySearchTerm(tasks: ITask[], searchTerm: string): ITask[] {
        return tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (task.status && task.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (task.priority && task.priority.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (task.uid && task.uid.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }

    static sortTasks(sortType: 'title' | 'status' | 'default', tasks: ITask[]): ITask[] {
        if (sortType === 'title') {
            return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortType === 'status') {
            const taskWithDefinedStatus = tasks.filter(task => task.status !== undefined);
            if (taskWithDefinedStatus.length === 0) {
                return tasks; // If no tasks have a defined status, return the original list
            }
            const statusIdentifierPipe = new StatusToStatusIdentifierPipe();
            return [...tasks].sort((a, b) => {
                const statusA = statusIdentifierPipe.transform(a.status);
                const statusB = statusIdentifierPipe.transform(b.status);
                const orderOfStatus = ['backlog', 'pending', 'in-progress', 'in-review', 'done'];
                return orderOfStatus.indexOf(statusA) - orderOfStatus.indexOf(statusB);
            }
            )
        }

        return tasks;
    }
}