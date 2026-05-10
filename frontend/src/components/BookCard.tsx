import { Edit, Trash2, User, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;
}

export default function BookCard({ book, onDelete }: BookCardProps) {
  return (
    <div className="group dash-card rounded-xl p-5 flex flex-col h-full hover:border-[#c7d2fe] dark:hover:border-[#312e81] hover:shadow-sm transition-all duration-200">
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        {/* Author badge */}
        <span className="badge-gray text-[11px] max-w-[160px] truncate">
          <User className="w-3 h-3 shrink-0" />
          <span className="truncate">{book.author}</span>
        </span>

        {/* Actions — always visible on mobile, hover on desktop */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link
            to={`/books/edit/${book.id}`}
            className="p-1.5 rounded-md text-[#9ca3af] hover:text-[#4f46e5] hover:bg-[#eef2ff] dark:hover:bg-[#1e1b4b] dark:hover:text-[#818cf8] transition-colors"
            title="Edit book"
          >
            <Edit className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => onDelete(book.id)}
            className="p-1.5 rounded-md text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#fef2f2] dark:hover:bg-[#2d0a0a] dark:hover:text-[#f87171] transition-colors"
            title="Delete book"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Title & description */}
      <div className="flex-1 min-h-0">
        <h3 className="text-sm font-semibold text-[#111827] dark:text-[#f1f5f9] leading-snug mb-2 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] leading-relaxed line-clamp-3">
          {book.description || 'No description provided.'}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-[#f3f4f6] dark:border-[#1e2535] text-[11px] text-[#9ca3af] dark:text-[#4b5563]">
        <Calendar className="w-3 h-3 shrink-0" />
        {new Date(book.createdAt).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>
    </div>
  );
}
