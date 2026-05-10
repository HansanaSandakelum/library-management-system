import { useState, useEffect } from 'react';
import { useNavigate, useLocation,} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, Library, Loader2, Lock, User, AlertCircle, Sparkles } from 'lucide-react';
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

  // Redirect if already logged in
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
        toast.success(`Welcome back, ${data.username}! 👋`);
        navigate(from, { replace: true });
      } catch (err: unknown) {
        const axiosErr = err as { response?: { status?: number; data?: { message?: string } } };
        if (axiosErr.response?.status === 401) {
          setServerError('Invalid username or password. Please try again.');
        } else {
          setServerError('Unable to connect to server. Please try again later.');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#080c16] overflow-hidden">
     
      <div className="hidden lg:flex lg:w-[55%] relative flex-col items-center justify-center p-16 overflow-hidden">
       
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-violet-900" />
        {/* Mesh overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glowing orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-lg">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl">
              <Library className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-black mb-6 leading-tight tracking-tight">
            Your Digital
            <br />
            <span className="text-yellow-300">Library</span> Hub
          </h1>
          <p className="text-indigo-100 text-lg leading-relaxed mb-10">
            Discover, manage, and explore thousands of books with our intelligent library management system.
          </p>
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl">
              <Library className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="font-black text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Library Management
            </span>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-200/60 dark:shadow-black/40 border border-slate-100 dark:border-slate-800 p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                  Welcome Back
                </span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                Sign in to your
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  account
                </span>
              </h2>
              <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm">
                Enter your credentials to access the library system.
              </p>
            </div>

            {/* Error Banner */}
            {serverError && (
              <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl text-red-700 dark:text-red-400 text-sm">
                <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                <p>{serverError}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User
                      className={`h-5 w-5 transition-colors ${
                        formik.touched.username && formik.errors.username
                          ? 'text-red-400'
                          : formik.values.username
                          ? 'text-indigo-500'
                          : 'text-slate-400'
                      }`}
                    />
                  </div>
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Enter your username"
                    {...formik.getFieldProps('username')}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border text-sm font-medium outline-none transition-all
                      bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400
                      ${
                        formik.touched.username && formik.errors.username
                          ? 'border-red-400 dark:border-red-500 ring-2 ring-red-100 dark:ring-red-900/30'
                          : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40'
                      }`}
                  />
                </div>
                {formik.touched.username && formik.errors.username && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {formik.errors.username}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock
                      className={`h-5 w-5 transition-colors ${
                        formik.touched.password && formik.errors.password
                          ? 'text-red-400'
                          : formik.values.password
                          ? 'text-indigo-500'
                          : 'text-slate-400'
                      }`}
                    />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    {...formik.getFieldProps('password')}
                    className={`w-full pl-12 pr-12 py-3.5 rounded-xl border text-sm font-medium outline-none transition-all
                      bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400
                      ${
                        formik.touched.password && formik.errors.password
                          ? 'border-red-400 dark:border-red-500 ring-2 ring-red-100 dark:ring-red-900/30'
                          : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                id="login-submit"
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl
                  bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
                  text-white font-bold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50
                  transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0
                  disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2 "
              >
                {formik.isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    {/* <Lock className="h-5 w-5" /> */}
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>
          </div>

         
        </div>
      </div>
    </div>
  );
}
