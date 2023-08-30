import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import SignUpValidation from '../helpers/validations/signup';
import authApi from '../utils/axios/axiosInstance';

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: SignUpValidation,
    onSubmit: async (values) => {
      try {
        const res = await authApi.post('auth/signup', values);
        if (res.data.success) {
          navigate('/signin');
          toast.success('User created successfully');
        }
      } catch (error) {
        // Handle any error, maybe display an error toast
        toast.error('An error occurred while signing up.');
      }
    },
  });

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">Sign up to create account</h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?
            <Link
              to="/signin"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form onSubmit={formik.handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <div className="flex flex-row items-center justify-between">
                  <label htmlFor="name" className="text-base font-medium text-gray-900">
                    User Name
                  </label>
                  <p className="text-base font-medium text-red-500">{formik.errors.username}</p>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="User Name"
                    id="name"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-row items-center justify-between">
                  <label htmlFor="email" className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <p className="text-base font-medium text-red-500">{formik.errors.email}</p>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex flex-row items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <p className="text-base font-medium text-red-500">{formik.errors.password}</p>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
