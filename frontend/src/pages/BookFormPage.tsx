import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { createBook, getBook, updateBook } from '../services/api';
import type { CreateBookDto, UpdateBookDto } from '../types/book';
import { ArrowLeft, Save, Loader2, AlertCircle, BookOpen } from 'lucide-react';

const validationSchema = Yup.object({
  title: Yup.string().required('Book title is required').max(200, 'Title is too long'),
  author: Yup.string().required('Author name is required').max(100, 'Author name is too long'),
  description: Yup.string().required('Description is required'),
});

export default function BookFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(isEditMode);

  const formik = useFormik<CreateBookDto>({
    initialValues: { title: '', author: '', description: '' },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (isEditMode && id) {
          await updateBook(parseInt(id), values as UpdateBookDto);
          toast.success('Book updated');
        } else {
          await createBook(values);
          toast.success('Book created');
        }
        navigate('/');
      } catch (err: any) {
        const errorMsg = err.response?.data?.errors?.join(', ') || 'An error occurred while saving.';
        toast.error(errorMsg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isEditMode && id) fetchBook(parseInt(id));
  }, [id, isEditMode]);

  const fetchBook = async (bookId: number) => {
    try {
      const book = await getBook(bookId);
      formik.setValues({ title: book.title, author: book.author, description: book.description });
    } catch {
      toast.error('Failed to load book details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-[#6c5ce7]" />
        <span className="text-[13px] text-[#8b8fa3]">Loading book…</span>
      </div>
    );
  }

  const fields: { id: 'title' | 'author' | 'description'; label: string; placeholder: string; isTextarea?: boolean }[] = [
    { id: 'title', label: 'Book Title', placeholder: 'e.g. The Great Gatsby' },
    { id: 'author', label: 'Author', placeholder: 'e.g. F. Scott Fitzgerald' },
    { id: 'description', label: 'Description', placeholder: 'Brief summary of the book…', isTextarea: true },
  ];

  return (
    <div className="p-6 animate-fadeIn">
      {/* Breadcrumb */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#8b8fa3] hover:text-[#6c5ce7] transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Library
      </Link>

      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#ede9fe] dark:bg-[#1e1a3e]">
          <BookOpen className="w-5 h-5 text-[#6c5ce7]" />
        </div>
        <div>
          <h1 className="text-[22px] font-bold text-[#1a1d26] dark:text-[#e2e4e9] tracking-tight">
            {isEditMode ? 'Edit Book' : 'Add New Book'}
          </h1>
          <p className="text-[13px] text-[#8b8fa3] mt-0.5">
            {isEditMode ? 'Update the details for this book.' : 'Fill in the fields to add a book.'}
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="card rounded-2xl p-6 max-w-2xl">
        <form onSubmit={formik.handleSubmit} className="space-y-5">
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
                    rows={5}
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

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#edeef1] dark:border-[#1c1f2e]">
            <Link to="/" className="btn-ghost text-[12px]">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="btn-primary text-[12px] disabled:opacity-60 disabled:cursor-not-allowed"
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
        </form>
      </div>
    </div>
  );
}
