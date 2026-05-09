import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { createBook, getBook, updateBook } from '../services/api';
import type { CreateBookDto, UpdateBookDto } from '../types/book';
import { ArrowLeft, Save, Loader2, BookType, User, AlignLeft } from 'lucide-react';

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
    initialValues: {
      title: '',
      author: '',
      description: '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (isEditMode && id) {
          await updateBook(parseInt(id), values as UpdateBookDto);
          toast.success('Book updated successfully!');
        } else {
          await createBook(values);
          toast.success('Book created successfully!');
        }
        navigate('/');
      } catch (err: any) {
        const errorMsg = err.response?.data?.errors?.join(', ') || 'An error occurred while saving.';
        toast.error(errorMsg);
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isEditMode && id) {
      fetchBook(parseInt(id));
    }
  }, [id, isEditMode]);

  const fetchBook = async (bookId: number) => {
    try {
      const book = await getBook(bookId);
      formik.setValues({
        title: book.title,
        author: book.author,
        description: book.description,
      });
    } catch (err) {
      toast.error('Failed to load book details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Loading book details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 mb-8 transition-colors group"
      >
        <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </div>
        Back to Library
      </Link>

      <div className="bg-white dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800/60 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-indigo-500/5">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {isEditMode ? 'Edit Book Details' : 'Add New Book'}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {isEditMode
              ? 'Update the information for this book in your library.'
              : 'Fill in the details below to add a new book to your collection.'}
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Book Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <BookType className={`h-5 w-5 ${formik.touched.title && formik.errors.title ? 'text-red-400' : ''}`} />
              </div>
              <input
                type="text"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border rounded-xl focus:ring-2 outline-none transition-all sm:text-sm ${
                  formik.touched.title && formik.errors.title 
                    ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500' 
                    : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                placeholder="e.g. The Great Gatsby"
              />
            </div>
            {formik.touched.title && formik.errors.title ? (
              <p className="text-sm text-red-500 mt-1">{formik.errors.title}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="author" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Author
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className={`h-5 w-5 ${formik.touched.author && formik.errors.author ? 'text-red-400' : ''}`} />
              </div>
              <input
                type="text"
                id="author"
                name="author"
                value={formik.values.author}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border rounded-xl focus:ring-2 outline-none transition-all sm:text-sm ${
                  formik.touched.author && formik.errors.author 
                    ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500' 
                    : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                placeholder="e.g. F. Scott Fitzgerald"
              />
            </div>
            {formik.touched.author && formik.errors.author ? (
              <p className="text-sm text-red-500 mt-1">{formik.errors.author}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Description
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400">
                <AlignLeft className={`h-5 w-5 ${formik.touched.description && formik.errors.description ? 'text-red-400' : ''}`} />
              </div>
              <textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={5}
                className={`block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border rounded-xl focus:ring-2 outline-none transition-all sm:text-sm resize-none ${
                  formik.touched.description && formik.errors.description 
                    ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500' 
                    : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                placeholder="Brief summary of the book..."
              />
            </div>
            {formik.touched.description && formik.errors.description ? (
              <p className="text-sm text-red-500 mt-1">{formik.errors.description}</p>
            ) : null}
          </div>

          <div className="pt-4 flex items-center justify-end gap-4">
            <Link
              to="/"
              className="px-6 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              {formik.isSubmitting ? 'Saving...' : 'Save Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
