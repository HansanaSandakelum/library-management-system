import { Search, Loader2, BookMarked, BookOpen, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Book } from '../types/book';

interface BooksTableProps {
  books: Book[];
  filteredBooks: Book[];
  loading: boolean;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onDeleteClick: (id: number) => void;
}

export default function BooksTable({
  books,
  filteredBooks,
  loading,
  searchQuery,
  onSearchChange,
  onDeleteClick,
}: BooksTableProps) {
  return (
    <div className="card rounded-2xl overflow-hidden">
      {/* Table header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 border-b border-[#edeef1] dark:border-[#1c1f2e] gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-[#1a1d26] dark:text-[#e2e4e9]">
            Recent Books
          </h2>
          <p className="text-[12px] text-[#8b8fa3] dark:text-[#5a5d6e] mt-0.5">
            A list of all books in your library
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a3b1]" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-4 py-2 w-full sm:w-64 text-[12px] bg-[#f4f5f7] dark:bg-[#0c0e14] border border-transparent dark:border-[#1c1f2e] rounded-lg
              text-[#1a1d26] dark:text-[#e2e4e9] placeholder:text-[#a0a3b1] dark:placeholder:text-[#5a5d6e]
              outline-none focus:border-[#6c5ce7] dark:focus:border-[#6c5ce7] focus:ring-1 focus:ring-[#6c5ce7]/15 focus:bg-white
              transition-all duration-150"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-52 gap-3">
          <Loader2 className="w-7 h-7 animate-spin text-[#6c5ce7]" />
          <span className="text-[13px] text-[#8b8fa3]">Loading library…</span>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#f4f5f7] dark:bg-[#1c1f2e] mb-4">
            <BookMarked className="w-6 h-6 text-[#a0a3b1] dark:text-[#5a5d6e]" />
          </div>
          <h3 className="text-[14px] font-semibold text-[#1a1d26] dark:text-[#e2e4e9] mb-1">
            {searchQuery ? 'No results found' : 'No books yet'}
          </h3>
          <p className="text-[12px] text-[#8b8fa3] dark:text-[#5a5d6e] max-w-xs mb-5">
            {searchQuery
              ? `No books match "${searchQuery}".`
              : 'Your library is empty. Add your first book.'}
          </p>
          {!searchQuery && (
            <Link to="/books/new" className="btn-primary text-[12px]">
              Add Your First Book
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#edeef1] dark:border-[#1c1f2e]">
                <th className="table-head text-left py-3 px-5">Title</th>
                <th className="table-head text-left py-3 px-4">Author</th>
                <th className="table-head text-left py-3 px-4 hidden lg:table-cell">
                  Description
                </th>
                <th className="table-head text-left py-3 px-4">Date Added</th>
                <th className="table-head text-right py-3 px-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id} className="table-row group">
                  <td className="table-cell px-5 font-semibold text-[#1a1d26] dark:text-[#e2e4e9]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#ede9fe] dark:bg-[#6c5ce7]/20 shrink-0">
                        <BookOpen className="w-4 h-4 text-[#6c5ce7] dark:text-[#a29bfe]" />
                      </div>
                      <span className="line-clamp-1">{book.title}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="badge-gray">{book.author}</span>
                  </td>
                  <td className="table-cell hidden lg:table-cell max-w-xs">
                    <span className="line-clamp-1 text-[12px]">
                      {book.description || '—'}
                    </span>
                  </td>
                  <td className="table-cell text-[12px]">
                    {new Date(book.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="table-cell px-5">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <Link
                        to={`/books/edit/${book.id}`}
                        className="p-1.5 rounded-lg text-[#a0a3b1] hover:text-[#6c5ce7] hover:bg-[#ede9fe] dark:hover:text-[#a29bfe] dark:hover:bg-[#6c5ce7]/20 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => onDeleteClick(book.id)}
                        className="p-1.5 rounded-lg text-[#a0a3b1] hover:text-[#e74c3c] hover:bg-[#fef2f2] dark:hover:text-[#ff6b6b] dark:hover:bg-[#e74c3c]/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Table footer */}
      {filteredBooks.length > 0 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-[#edeef1] dark:border-[#1c1f2e]">
          <span className="text-[12px] text-[#8b8fa3] dark:text-[#5a5d6e]">
            Showing {filteredBooks.length} of {books.length} entries
          </span>
        </div>
      )}
    </div>
  );
}
