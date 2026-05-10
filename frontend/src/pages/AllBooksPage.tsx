import { useState, useEffect } from "react";
import { getBooks, deleteBook } from "../services/api";
import type { Book } from "../types/book";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import BookGrid from "../components/BookGrid";
import BookFormModal from "../components/BookFormModal";
import toast from "react-hot-toast";

export default function AllBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Modal State
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [bookToEditId, setBookToEditId] = useState<number | null>(null);

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

  const handleAddClick = () => {
    setBookToEditId(null);
    setFormModalOpen(true);
  };

  const handleEditClick = (id: number) => {
    setBookToEditId(id);
    setFormModalOpen(true);
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

  return (
    <div className="p-6 animate-fadeIn max-w-[1400px] mx-auto">
      {/* Books Grid Section */}
      <BookGrid
        books={books}
        filteredBooks={filteredBooks}
        loading={loading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onAddClick={handleAddClick}
      />

      {/* Form Modal */}
      <BookFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSuccess={fetchBooks}
        bookId={bookToEditId}
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
