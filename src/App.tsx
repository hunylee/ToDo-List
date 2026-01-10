import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete } = useTodos();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white font-sans text-gray-900">
      {/* Navbar / Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              나의 할 일
            </h1>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
              <span className="text-gray-900">{todos.filter(t => !t.isCompleted).length}</span> 진행 중
              <span className="w-1 h-1 rounded-full bg-gray-400" />
              <span className="text-gray-900">{todos.filter(t => t.isCompleted).length}</span> 완료
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 transition-all shadow-md active:scale-95"
          >
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm hidden sm:inline">새 할 일 추가</span>
            <span className="font-semibold text-sm sm:hidden">추가</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Mobile Stats (Only visible on small small screens) */}
        <div className="sm:hidden mb-6 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-600">
          <span className="text-gray-900">{todos.filter(t => !t.isCompleted).length}</span> 진행 중
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          <span className="text-gray-900">{todos.filter(t => t.isCompleted).length}</span> 완료
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sidebar / Form Area (Desktop: Sticky Sidebar, Mobile: Modal-like expansion) */}
          <div className={`lg:col-span-5 xl:col-span-4 transition-all duration-300 ${!showAddForm ? 'hidden lg:block' : 'block'}`}>
            <div className="lg:sticky lg:top-24">
              <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-gray-200/50">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">새로운 할 일</h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                  >
                    <span className="text-sm font-medium">닫기</span>
                  </button>
                </div>
                <TodoForm
                  onSubmit={(data) => {
                    addTodo(data);
                    setShowAddForm(false);
                  }}
                  onCancel={() => setShowAddForm(false)}
                />
              </section>
            </div>
          </div>

          {/* Todo List Area */}
          <div className={`${showAddForm ? 'hidden lg:block' : 'block'} lg:col-span-7 xl:col-span-8`}>
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">할 일 목록</h2>
              </div>
              <TodoList
                todos={todos}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
                onToggleComplete={toggleComplete}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
