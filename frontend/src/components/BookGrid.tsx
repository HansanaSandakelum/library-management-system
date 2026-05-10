import { Search, Loader2, BookOpen, Edit, Trash2, CalendarDays } from "lucide-react";
import type { Book } from "../types/book";

interface BookGridProps {
  books: Book[];
  filteredBooks: Book[];
  loading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
  onAddClick?: () => void;
}

export default function BookGrid({
  books,
  filteredBooks,
  loading,
  searchQuery,
  onSearchChange,
  onEditClick,
  onDeleteClick,
  onAddClick,
}: BookGridProps) {
  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[16px] font-bold text-[#1a1d26] dark:text-[#e2e4e9] tracking-tight">
            Library Collection
          </h2>
          <p className="text-[13px] text-[#8b8fa3] dark:text-[#5a5d6e] mt-0.5">
            Browse and manage all books in your library
          </p>
        </div>
        <div className="relative w-full sm:w-[320px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#a0a3b1]" />
          </div>
          <input
            type="text"
            placeholder="Search titles or authors..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-base pl-9 w-full bg-white dark:bg-[#12141c] shadow-sm border-[#edeef1] dark:border-[#1c1f2e] focus:bg-white"
          />
        </div>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white dark:bg-[#12141c] rounded-2xl border border-[#edeef1] dark:border-[#1c1f2e]">
          <Loader2 className="w-8 h-8 animate-spin text-[#6c5ce7]" />
          <span className="text-[13px] text-[#8b8fa3]">Loading collection...</span>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-[#12141c] rounded-2xl border border-[#edeef1] dark:border-[#1c1f2e]">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#f8f9fb] dark:bg-[#1c1f2e] mb-4">
            <BookOpen className="w-7 h-7 text-[#a0a3b1]" />
          </div>
          <p className="text-[15px] font-medium text-[#1a1d26] dark:text-[#e2e4e9] mb-1">
            No books found
          </p>
          <p className="text-[13px] text-[#8b8fa3] max-w-[280px] mb-5 leading-relaxed">
            {searchQuery
              ? `We couldn't find any books matching "${searchQuery}".`
              : "Your library collection is currently empty. Start by adding a new book."}
          </p>
          {!searchQuery && onAddClick && (
            <button onClick={onAddClick} className="btn-primary text-[13px] px-5 py-2.5">
              Add your first book
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="group flex flex-col bg-white dark:bg-[#12141c] rounded-2xl border border-[#edeef1] dark:border-[#1c1f2e] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:border-[#dfe1e6] dark:hover:border-[#2a2d3e] transition-all duration-300"
            >
              {/* Card Header (Decorative) */}
              <div className="h-16 bg-gradient-to-r from-[#f0edff] to-[#f8f9fb] dark:from-[#1e1a3e] dark:to-[#12141c] flex items-end px-5 relative">
                <div className="absolute -bottom-5 w-12 h-12 rounded-xl bg-white dark:bg-[#1c1f2e] border-2 border-[#edeef1] dark:border-[#12141c] flex items-center justify-center shadow-sm">
                  <BookOpen className="w-5 h-5 text-[#6c5ce7] dark:text-[#a29bfe]" />
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                  <button
                    onClick={() => onEditClick(book.id)}
                    className="p-1.5 bg-white/80 dark:bg-[#12141c]/80 backdrop-blur-sm text-[#6b7084] hover:text-[#6c5ce7] rounded-md shadow-sm transition-colors"
                    title="Edit book"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteClick(book.id)}
                    className="p-1.5 bg-white/80 dark:bg-[#12141c]/80 backdrop-blur-sm text-[#6b7084] hover:text-[#e74c3c] rounded-md shadow-sm transition-colors"
                    title="Delete book"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="pt-8 pb-5 px-5 flex-1 flex flex-col">
                <h3 className="text-[15px] font-bold text-[#1a1d26] dark:text-[#e2e4e9] leading-tight mb-1 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-[13px] font-medium text-[#6c5ce7] dark:text-[#a29bfe] mb-3 line-clamp-1">
                  {book.author}
                </p>
                <p className="text-[13px] text-[#6b7084] dark:text-[#8b8fa3] leading-relaxed line-clamp-3 mb-4 flex-1">
                  {book.description || "No description provided."}
                </p>

                {/* Card Footer */}
                <div className="pt-4 border-t border-[#f4f5f7] dark:border-[#1c1f2e] flex items-center gap-2 mt-auto">
                  <CalendarDays className="w-3.5 h-3.5 text-[#a0a3b1] dark:text-[#5a5d6e]" />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#a0a3b1] dark:text-[#5a5d6e]">
                    Added {new Date(book.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Meta */}
      {filteredBooks.length > 0 && (
        <div className="flex items-center justify-center pt-2">
          <span className="text-[12px] font-medium text-[#8b8fa3] dark:text-[#5a5d6e] bg-white dark:bg-[#1c1f2e] px-4 py-1.5 rounded-full border border-[#edeef1] dark:border-[#2a2d3e]">
            Showing {filteredBooks.length} of {books.length} books
          </span>
        </div>
      )}
    </div>
  );
}
