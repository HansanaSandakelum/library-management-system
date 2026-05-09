import { Book as BookIcon, Edit, Trash2, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;
}

export default function BookCard({ book, onDelete }: BookCardProps) {
  return (
    <div className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 flex flex-col h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-300/50 dark:hover:border-indigo-500/30 overflow-hidden">
      {/* Soft background blob for aesthetic */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-3xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors duration-500 pointer-events-none"></div>
      
      <div className="relative flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 border border-indigo-100/50 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-500">
            <BookIcon className="w-6 h-6 stroke-[1.5]" />
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/books/edit/${book.id}`}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-colors"
            title="Edit Book"
          >
            <Edit className="h-4 w-4 stroke-[2]" />
          </Link>
          <button
            onClick={() => onDelete(book.id)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
            title="Delete Book"
          >
            <Trash2 className="h-4 w-4 stroke-[2]" />
          </button>
        </div>
      </div>

      <div className="relative flex-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-4 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-xs font-semibold text-slate-600 dark:text-slate-300 tracking-wide uppercase border border-slate-200/50 dark:border-slate-700/50">
          <User className="w-3.5 h-3.5 stroke-[2]" />
          {book.author}
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
          {book.title}
        </h3>

        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
          {book.description || "No description provided."}
        </p>
      </div>

      <div className="relative mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 stroke-[2]" />
          Added {new Date(book.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
    </div>
  );
}
