import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, Library, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authApi';
import toast from 'react-hot-toast';

const loginSchema = Yup.object({
  username: Yup.string().trim().required('Username is required'),
  password: Yup.string().min(1, 'Password is required').required('Password is required'),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError('');
      try {
        const data = await loginUser({ username: values.username, password: values.password });
        login({ token: data.token, username: data.username, role: data.role });
        toast.success(`Welcome back, ${data.username}!`);
        navigate(from, { replace: true });
      } catch (err: unknown) {
        const axiosErr = err as { response?: { status?: number; data?: { message?: string } } };
        if (axiosErr.response?.status === 401) {
          setServerError('Invalid username or password.');
        } else {
          setServerError('Unable to connect to server. Try again later.');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb] dark:bg-[#0c0e14] relative p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#6c5ce7]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-[#a29bfe]/10 to-transparent blur-3xl" />
      </div>

      <div className="w-full max-w-[420px] relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#6c5ce7] text-white mb-5 shadow-lg shadow-[#6c5ce7]/20">
            <Library className="w-6 h-6" />
          </div>
          <h1 className="text-[24px] font-bold text-[#1a1d26] dark:text-[#e2e4e9] tracking-tight mb-2">
            LibraryMS
          </h1>
          <p className="text-[14px] text-[#8b8fa3] dark:text-[#5a5d6e]">
            Enter your credentials to access the dashboard
          </p>
        </div>

        {/* Card */}
        <div className="card p-8 shadow-xl shadow-black/5 dark:shadow-none">
          {serverError && (
            <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-[#fef2f2] dark:bg-[#2d0a0a] border border-[#fecaca] dark:border-[#7f1d1d]/50 rounded-xl text-[#e74c3c] dark:text-[#f87171] text-[13px] font-medium">
              <AlertCircle className="w-[18px] h-[18px] shrink-0" />
              {serverError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-[12px] font-semibold text-[#4a4d5e] dark:text-[#a0a3b1] mb-1.5 uppercase tracking-wide"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                {...formik.getFieldProps('username')}
                className={`input-base py-2.5 ${
                  formik.touched.username && formik.errors.username ? 'input-error' : ''
                }`}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="mt-1.5 text-[11px] text-[#e74c3c] font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {formik.errors.username}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-[12px] font-semibold text-[#4a4d5e] dark:text-[#a0a3b1] uppercase tracking-wide"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...formik.getFieldProps('password')}
                  className={`input-base py-2.5 pr-10 ${
                    formik.touched.password && formik.errors.password ? 'input-error' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#a0a3b1] hover:text-[#6b7084] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1.5 text-[11px] text-[#e74c3c] font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {formik.errors.password}
                </p>
              )}
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={formik.isSubmitting}
              className="btn-primary w-full py-3 mt-4 text-[14px] font-semibold flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? (
                <>
                  <Loader2 className="w-[18px] h-[18px] animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[13px] text-[#8b8fa3] mt-8">
          Don't have an account?{' '}
          <a href="#" className="font-semibold text-[#6c5ce7] hover:text-[#5b4dd6] transition-colors">
            Contact admin
          </a>
        </p>
      </div>
    </div>
  );
}
