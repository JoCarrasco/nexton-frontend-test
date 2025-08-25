import { IPaginatedResourceArray } from "./pagination.model";
import { IUser } from "./user.model";

export type ITask = {
    uid: string;
    title: string;
    description: string;
    status?: string | 'To Do' | 'In Progress' | 'In Review' | 'Done'; // Using a union type for specific statuses
    priority: string | 'Low' | 'Medium' | 'High' | 'Critical'; // Using a union type for specific priorities
    dueDate?: string; // ISO 8601 string
    tags: string[];
    createdAt: string; // ISO 8601 string
    updatedAt: string; // ISO 8601 string
    assignee?: IUser | null; // Nullable to allow for tasks without an assignee
}

export type IPaginatedTasks = IPaginatedResourceArray<ITask>