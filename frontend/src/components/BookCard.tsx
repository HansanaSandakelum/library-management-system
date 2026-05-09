import { Book as BookIcon, Edit, Trash2, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;
}

export default function BookCard({ book, onDelete }: BookCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
          <BookIcon className="h-6 w-6" />
        </div>
        <div className="flex gap-2">
          <Link
            to={`/books/edit/${book.id}`}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
            title="Edit Book"
          >
            <Edit className="h-4 w-4" />
          </Link>
          <button
            onClick={() => onDelete(book.id)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title="Delete Book"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1" title={book.title}>
          {book.title}
        </h3>
        
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3 gap-1.5">
          <User className="h-4 w-4" />
          <span className="font-medium">{book.author}</span>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 leading-relaxed">
          {book.description || "No description provided."}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs text-slate-400 dark:text-slate-500 gap-1.5">
        <Calendar className="h-3.5 w-3.5" />
        <span>Added {new Date(book.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
