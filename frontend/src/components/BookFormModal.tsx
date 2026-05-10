import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { createBook, getBook, updateBook } from '../services/api';
import type { CreateBookDto, UpdateBookDto } from '../types/book';
import { Save, Loader2, AlertCircle, BookOpen, X } from 'lucide-react';

const validationSchema = Yup.object({
  title: Yup.string().required('Book title is required').max(200, 'Title is too long'),
  author: Yup.string().required('Author name is required').max(100, 'Author name is too long'),
  description: Yup.string().required('Description is required'),
});

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  bookId?: number | null;
}

export default function BookFormModal({ isOpen, onClose, onSuccess, bookId }: BookFormModalProps) {
  const isEditMode = !!bookId;
  const [loading, setLoading] = useState(false);

  const formik = useFormik<CreateBookDto>({
    initialValues: { title: '', author: '', description: '' },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (isEditMode && bookId) {
          await updateBook(bookId, values as UpdateBookDto);
          toast.success('Book updated successfully');
        } else {
          await createBook(values);
          toast.success('Book added successfully');
        }
        onSuccess();
        onClose();
        formik.resetForm();
      } catch (err: any) {
        const errorMsg = err.response?.data?.errors?.join(', ') || 'An error occurred while saving.';
        toast.error(errorMsg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && bookId) {
        setLoading(true);
        fetchBook(bookId);
      } else {
        formik.resetForm();
        setLoading(false);
      }
    }
  }, [isOpen, bookId, isEditMode]);

  const fetchBook = async (id: number) => {
    try {
      const book = await getBook(id);
      formik.setValues({ title: book.title, author: book.author, description: book.description });
    } catch {
      toast.error('Failed to load book details.');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const fields: { id: 'title' | 'author' | 'description'; label: string; placeholder: string; isTextarea?: boolean }[] = [
    { id: 'title', label: 'Book Title', placeholder: 'e.g. The Great Gatsby' },
    { id: 'author', label: 'Author', placeholder: 'e.g. F. Scott Fitzgerald' },
    { id: 'description', label: 'Description', placeholder: 'Brief summary of the book…', isTextarea: true },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-[#12141c] rounded-2xl shadow-xl border border-[#edeef1] dark:border-[#1c1f2e] w-full max-w-[500px] overflow-hidden animate-fadeIn flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#edeef1] dark:border-[#1c1f2e] shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#ede9fe] dark:bg-[#1e1a3e] shrink-0">
              <BookOpen className="w-5 h-5 text-[#6c5ce7]" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#1a1d26] dark:text-[#e2e4e9] leading-tight">
                {isEditMode ? 'Edit Book' : 'Add New Book'}
              </h3>
              <p className="text-[12px] text-[#8b8fa3] mt-0.5">
                {isEditMode ? 'Update the details for this book.' : 'Fill in the fields to add a book.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#a0a3b1] hover:text-[#6b7084] hover:bg-[#f4f5f7] dark:hover:text-[#e2e4e9] dark:hover:bg-[#1c1f2e] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-[#6c5ce7]" />
              <span className="text-[13px] text-[#8b8fa3]">Loading details…</span>
            </div>
          ) : (
            <form id="book-form" onSubmit={formik.handleSubmit} className="space-y-5">
              {fields.map(({ id, label, placeholder, isTextarea }) => {
                const touched = formik.touched[id];
                const error = formik.errors[id];
                const hasError = touched && !!error;

                return (
                  <div key={id}>
                    <label
                      htmlFor={id}
                      className="block text-[12px] font-semibold uppercase tracking-wide text-[#4a4d5e] dark:text-[#a0a3b1] mb-1.5"
                    >
                      {label}
                    </label>

                    {isTextarea ? (
                      <textarea
                        id={id}
                        name={id}
                        rows={4}
                        value={formik.values[id]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={placeholder}
                        className={`input-base resize-none ${hasError ? 'input-error' : ''}`}
                      />
                    ) : (
                      <input
                        type="text"
                        id={id}
                        name={id}
                        value={formik.values[id]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={placeholder}
                        className={`input-base ${hasError ? 'input-error' : ''}`}
                      />
                    )}

                    {hasError && (
                      <p className="mt-1.5 flex items-center gap-1 text-[11px] text-[#e74c3c] font-medium">
                        <AlertCircle className="w-3 h-3" />
                        {error}
                      </p>
                    )}
                  </div>
                );
              })}
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-5 bg-white dark:bg-[#12141c] border-t border-[#edeef1] dark:border-[#1c1f2e] shrink-0">
          <button type="button" onClick={onClose} disabled={formik.isSubmitting || loading} className="btn-outline text-[13px] px-5 py-2.5 disabled:opacity-50">
            Cancel
          </button>
          <button
            type="submit"
            form="book-form"
            disabled={formik.isSubmitting || loading}
            className="btn-primary text-[13px] px-5 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEditMode ? 'Update Book' : 'Save Book'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
