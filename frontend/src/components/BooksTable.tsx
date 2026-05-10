import { Search, Loader2, BookOpen, Edit, Trash2 } from "lucide-react";
import type { Book } from "../types/book";

interface BooksTableProps {
  books: Book[];
  filteredBooks: Book[];
  loading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
  onAddClick?: () => void;
}

export default function BooksTable({
  books,
  filteredBooks,
  loading,
  searchQuery,
  onSearchChange,
  onEditClick,
  onDeleteClick,
  onAddClick,
}: BooksTableProps) {
  return (
    <div className="card rounded-2xl border-[#edeef1] dark:border-[#1c1f2e] overflow-hidden">
      {/* Table Header / Search */}
      <div className="p-5 border-b border-[#edeef1] dark:border-[#1c1f2e] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#12141c]">
        <div>
          <h2 className="text-[16px] font-bold text-[#1a1d26] dark:text-[#e2e4e9] tracking-tight">
            Recent Books
          </h2>
          <p className="text-[13px] text-[#8b8fa3] dark:text-[#5a5d6e] mt-0.5">
            A list of all books in your library
          </p>
        </div>
        <div className="relative w-full sm:w-[280px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#a0a3b1]" />
          </div>
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-base pl-9 bg-[#f8f9fb] dark:bg-[#0c0e14] border-transparent focus:bg-white"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-[#edeef1] dark:border-[#1c1f2e]">
              <th className="table-head text-left py-3 px-5">Title</th>
              <th className="table-head text-left py-3 px-4">Author</th>
              <th className="table-head text-left py-3 px-4 ">
                Description
              </th>
              <th className="table-head text-left py-3 px-4">Date Added</th>
              <th className="table-head text-right py-3 px-5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f4f5f7] dark:divide-[#1c1f2e]">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-[#8b8fa3]">
                    <Loader2 className="w-6 h-6 animate-spin text-[#6c5ce7] mb-3" />
                    <p className="text-[13px]">Loading books...</p>
                  </div>
                </td>
              </tr>
            ) : filteredBooks.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center max-w-[280px] mx-auto text-[#8b8fa3]">
                    <div className="w-12 h-12 rounded-2xl bg-[#f8f9fb] dark:bg-[#1c1f2e] flex items-center justify-center mb-3">
                      <BookOpen className="w-6 h-6 text-[#a0a3b1]" />
                    </div>
                    <p className="text-[14px] font-medium text-[#1a1d26] dark:text-[#e2e4e9] mb-1">
                      No books found
                    </p>
                    <p className="text-[13px] text-center mb-4 leading-relaxed">
                      {searchQuery
                        ? `No results for "${searchQuery}". Try a different term.`
                        : "Your library is empty. Add a new book to get started."}
                    </p>
                    {!searchQuery && onAddClick && (
                      <button onClick={onAddClick} className="btn-outline text-[12px] h-8 px-4">
                        Add your first book
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
                <tr key={book.id} className="table-row group">
                  <td className="table-cell pl-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#ede9fe] dark:bg-[#1e1a3e] flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-[#6c5ce7]" />
                      </div>
                      <span className="font-medium text-[#1a1d26] dark:text-[#e2e4e9]">
                        {book.title}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="badge-gray">{book.author}</span>
                  </td>
                  <td className="table-cell text-[#6b7084] dark:text-[#8b8fa3] max-w-[200px] truncate">
                    {book.description}
                  </td>
                  <td className="table-cell whitespace-nowrap">
                    {new Date(book.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="table-cell pr-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEditClick(book.id)}
                        className="p-1.5 text-[#a0a3b1] hover:text-[#6c5ce7] hover:bg-[#ede9fe] dark:hover:bg-[#1e1a3e] rounded-lg transition-colors"
                        title="Edit book"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteClick(book.id)}
                        className="p-1.5 text-[#a0a3b1] hover:text-[#e74c3c] hover:bg-[#fef2f2] dark:hover:bg-[#e74c3c]/10 rounded-lg transition-colors"
                        title="Delete book"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
