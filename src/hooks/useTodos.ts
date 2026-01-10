import { useState, useEffect } from 'react';
import type { Todo } from '../types';

const STORAGE_KEY = 'todo-list-v1';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse todos', e);
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'isCompleted'>) => {
        const newTodo: Todo = {
            ...todo,
            id: crypto.randomUUID(),
            isCompleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setTodos((prev) => [newTodo, ...prev]);
    };

    const updateTodo = (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
                    : todo
            )
        );
    };

    const toggleComplete = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) => {
                if (todo.id === id) {
                    const isCompleted = !todo.isCompleted;
                    return {
                        ...todo,
                        isCompleted,
                        completedAt: isCompleted ? new Date().toISOString() : undefined,
                        updatedAt: new Date().toISOString(),
                    };
                }
                return todo;
            })
        );
    };

    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    return {
        todos,
        addTodo,
        updateTodo,
        toggleComplete,
        deleteTodo,
    };
}
