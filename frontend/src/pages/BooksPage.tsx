import { useState, useEffect } from "react";
import { getBooks, deleteBook } from "../services/api";
import type { Book } from "../types/book";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import StatCards from "../components/StatCards";
import BooksTable from "../components/BooksTable";
import { Plus, Download } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function BooksPage() {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    const book = books.find((b) => b.id === id);
    if (book) {
      setBookToDelete(book);
      setDeleteModalOpen(true);
    }
  };

  const executeDelete = async () => {
    if (!bookToDelete) return;
    setIsDeleting(true);
    try {
      await deleteBook(bookToDelete.id);
      setBooks(books.filter((b) => b.id !== bookToDelete.id));
      toast.success("Book deleted");
      setDeleteModalOpen(false);
      setBookToDelete(null);
    } catch (error) {
      console.error("Failed to delete book:", error);
      toast.error("Failed to delete book");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const uniqueAuthors = new Set(books.map((b) => b.author)).size;
  const latestBookDate =
    books.length > 0
      ? new Date(books[books.length - 1]?.createdAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })
      : null;

  return (
    <div className="p-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#1a1d26] dark:text-[#e2e4e9] tracking-tight">
            Dashboard
          </h1>
          <p className="text-[13px] text-[#8b8fa3] dark:text-[#5a5d6e] mt-0.5">
            Welcome back, {user?.username}. Here's what's happening today.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="btn-outline text-[12px]">
            <Download className="w-4 h-4" />
            Export
          </button>
          <Link to="/books/new" className="btn-primary text-[12px]">
            <Plus className="w-4 h-4" />
            Add Book
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      {!loading && (
        <StatCards
          totalBooks={books.length}
          uniqueAuthors={uniqueAuthors}
          searchResultCount={filteredBooks.length}
          searchQuery={searchQuery}
          latestBookDate={latestBookDate}
        />
      )}

      {/* Books Table Section */}
      <BooksTable
        books={books}
        filteredBooks={filteredBooks}
        loading={loading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onDeleteClick={handleDeleteClick}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={executeDelete}
        title="Delete Book"
        message={`Remove "${bookToDelete?.title}" from your library? This cannot be undone.`}
        isDeleting={isDeleting}
      />
    </div>
  );
}
