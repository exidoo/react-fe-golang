// import FC from react
import type { FC, FormEvent } from 'react';
import { useState, useContext } from 'react';

//import hook useNavigate from react router
import { useNavigate } from 'react-router';

//import custom  hook useLogin from hooks
import { useLogin } from '../../hooks/auth/useLogin';

//import js-cookie
import Cookies from 'js-cookie';

//import context
import { AuthContext } from '../../context/AuthContext';

//interface for validation errors
interface ValidationErrors {
  [key: string]: string;
}

export const Login: FC = () => {
  //initialize navigate
  const navigate = useNavigate();

  //initialize useLogin
  const { mutate, isPending } = useLogin();

  //destruct auth context "setIsAuthenticated"
  const { setIsAuthenticated } = useContext(AuthContext)!;

  //define state
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  //define state for errors
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [generalError, setGeneralError] = useState<string>('');

  // Handle submit form
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // Call the login mutation
    mutate(
      {
        username,
        password,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
          //set token to cookie
          Cookies.set('token', data.data.token);

          //set user to cookie
          Cookies.set(
            'user',
            JSON.stringify({
              id: data.data.id,
              name: data.data.name,
              username: data.data.username,
              email: data.data.email,
            })
          );

          //set isAuthenticated to true
          setIsAuthenticated(true);

          // Redirect to dashboard page
          navigate('/admin/dashboard');
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          //set errors to state "errors"
          setErrors(error.response.data.errors);

          setGeneralError(error.response.data.message || 'Terjadi kesalahan saat login');
        },
      }
    );
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center w-[100vw]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">Sign in to your account</h1>
        {generalError && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">{generalError}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="yourusername"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            {/* <label htmlFor="remember" className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              <input id="remember" type="checkbox" className="mr-2 w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
              Remember me
            </label> */}
          </div>

          <button type="submit" disabled={isPending} className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50">
            {isPending ? 'Signing in...' : 'Sign in'}
          </button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{' '}
            <a href="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
