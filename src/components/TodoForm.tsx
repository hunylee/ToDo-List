import { useState } from 'react';
import { Calendar, Save } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Todo } from '../types';

interface TodoFormProps {
    onSubmit: (data: { title: string; content: string; dueDate: string }) => void;
    initialData?: Todo;
    onCancel?: () => void;
    className?: string;
}

export function TodoForm({ onSubmit, initialData, onCancel, className }: TodoFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [dueDate, setDueDate] = useState(
        initialData?.dueDate ? initialData.dueDate.split('T')[0] : ''
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !dueDate) return;

        // Append default time if only date is selected, or keep it simple
        const dueDateTime = new Date(dueDate).toISOString();

        onSubmit({
            title,
            content,
            dueDate: dueDateTime,
        });

        if (!initialData) {
            setTitle('');
            setContent('');
            setDueDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
            <div className="space-y-3">
                <label htmlFor="title" className="sr-only">Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Name"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all font-medium text-lg"
                    required
                />

                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <input
                            id="dueDate"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all text-sm min-h-[42px]"
                            required
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    {/* If we had time input, it would go here. For now just date. */}
                </div>

                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="상세 내용을 입력하세요 (선택)"
                    rows={3}
                    className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-gray-200 text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all resize-none text-base leading-relaxed"
                />
            </div>

            <div className="flex justify-end gap-3 pt-3">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors text-sm font-bold"
                    >
                        취소
                    </button>
                )}
                <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-bold shadow-lg shadow-gray-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
                >
                    <Save className="w-4 h-4" />
                    {initialData ? '수정 완료' : '할 일 저장'}
                </button>
            </div>
        </form>
    );
}
