import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import signInSchema from '../helpers/validations/signin';
import { addAccessTokenToken } from '../utils/redux/appSlice';
import { useDispatch } from 'react-redux';
import authApi from '../utils/axios/axiosInstance';
import toast from 'react-hot-toast';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      console.log('sdrse')
      try {
        const res = await authApi.post('auth/signin', values);
        console.log(res);
        if (res) {
          toast.success('Login successful!');
        }
        const {
          data: { accessToken },
        } = await authApi.get('auth/refresh');
        const data = await authApi.get('auth/refresh');
        console.log(data);
        dispatch(addAccessTokenToken(accessToken));
        navigate('/');
      } catch (error) {
        toast.error('something went wrong');
      }
    },
  });

  return (
    <section>
      <div className="flex items-center justify-center mt-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?
            <Link to="/signup" className="font-semibold text-black transition-all duration-200 hover:underline">
              Create a free account
            </Link>
          </p>
          <form onSubmit={formik.handleSubmit} className="mt-8">
            <div className="space-y-5">
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
                  Get started
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
