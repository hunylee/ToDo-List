import { TodoItem } from './TodoItem';
import type { Todo } from '../types';

interface TodoListProps {
    todos: Todo[];
    onUpdate: (id: string, data: Partial<Todo>) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string) => void;
}

export function TodoList({ todos, onUpdate, onDelete, onToggleComplete }: TodoListProps) {
    if (todos.length === 0) {
        return (
            <div className="text-center py-12 px-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">등록된 할 일이 없습니다</h3>
                <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">
                    새로운 할 일을 추가하여<br />하루를 계획해보세요!
                </p>
            </div>
        );
    }

    // Sort: Incomplete first (by due date), then Completed (by completed date desc)
    const sortedTodos = [...todos].sort((a, b) => {
        if (a.isCompleted === b.isCompleted) {
            if (a.isCompleted) {
                // Both completed: newest completed first
                return new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime();
            }
            // Both incomplete: nearest due date first
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        // Incomplete before Completed
        return a.isCompleted ? 1 : -1;
    });

    return (
        <div className="space-y-4">
            {sortedTodos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onToggleComplete={onToggleComplete}
                />
            ))}
        </div>
    );
}
