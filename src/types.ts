export interface Todo {
    id: string;
    title: string;
    content: string;
    isCompleted: boolean;
    dueDate: string; // ISO string
    completedAt?: string; // ISO string
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}
