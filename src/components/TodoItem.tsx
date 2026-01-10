import { useState } from 'react';
import { format } from 'date-fns'; // We installed date-fns
import { Check, Trash2, Edit2, Calendar, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Todo } from '../types';
import { TodoForm } from './TodoForm';

interface TodoItemProps {
    todo: Todo;
    onUpdate: (id: string, data: Partial<Todo>) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string) => void;
}

export function TodoItem({ todo, onUpdate, onDelete, onToggleComplete }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return (
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-sm mb-4">
                <TodoForm
                    initialData={todo}
                    onSubmit={(data) => {
                        onUpdate(todo.id, data);
                        setIsEditing(false);
                    }}
                    onCancel={() => setIsEditing(false)}
                />
            </div>
        );
    }

    const isOverdue = !todo.isCompleted && new Date(todo.dueDate) < new Date() && new Date(todo.dueDate).toDateString() !== new Date().toDateString();

    return (
        <div className={cn(
            "group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-gray-200",
            todo.isCompleted && "bg-gray-50 border-gray-100 opacity-75"
        )}>
            <div className="flex items-start gap-4">
                <button
                    onClick={() => onToggleComplete(todo.id)}
                    className={cn(
                        "mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                        todo.isCompleted
                            ? "bg-black border-black text-white"
                            : "border-gray-300 hover:border-black"
                    )}
                >
                    {todo.isCompleted && <Check className="w-3.5 h-3.5" />}
                </button>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className={cn(
                            "text-lg font-semibold text-gray-900 truncate transition-all",
                            todo.isCompleted && "text-gray-500 line-through decoration-gray-400"
                        )}>
                            {todo.title}
                        </h3>
                        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
                                title="Edit"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onDelete(todo.id)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <p className={cn(
                        "mt-1 text-gray-600 text-sm whitespace-pre-wrap leading-relaxed",
                        todo.isCompleted && "text-gray-400"
                    )}>
                        {todo.content}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
                        <div className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200",
                            isOverdue && "text-red-600 bg-red-50 border-red-100"
                        )}>
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{format(new Date(todo.dueDate), 'yyyy년 M월 d일')}</span>
                        </div>

                        {todo.isCompleted && todo.completedAt && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-100 text-green-700">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>완료: {format(new Date(todo.completedAt), 'M월 d일 a h:mm')}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
