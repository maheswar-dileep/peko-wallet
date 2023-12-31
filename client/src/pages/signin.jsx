import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import signInSchema from '../helpers/validations/signin';
import { useState } from 'react';
import { addAccessTokenToken } from '../utils/redux/appSlice';
import { useDispatch } from 'react-redux';
import authApi from '../utils/axios/axiosInstance';
import toast from 'react-hot-toast';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [invalidOTP, setInvalidOTP] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: async () => {
      try {
        const res = await authApi.post('auth/get-otp', { email: formik.values.email });
        console.log(res);
        if (res.data.success) return setModal(true);
        return toast.error('user not found');
      } catch (error) {
        toast.error('something went wrong');
      }
    },
  });

  const handleSubmit = async () => {
    setInvalidOTP(false);

    if (!otp) return;

    const isValidOTP = await authApi.post('auth/validate-otp', { email: formik.values.email, code: otp });

    if (!isValidOTP.data.success) {
      setInvalidOTP(true);
      return toast.error('invalid OTP');
    }

    const res = await authApi.post('auth/signin', formik.values);
    if (res) {
      toast.success('Login successful!');
    }
    const {
      data: { accessToken },
    } = await authApi.get('auth/refresh');
    const user = res.data.user;
    localStorage.setItem('userId', user._id);
    localStorage.setItem('userName', user.username);
    localStorage.setItem('uniqueId', user.uniqueId);
    await authApi.get('auth/refresh');
    dispatch(addAccessTokenToken(accessToken));
    navigate('/');
  };

  return (
    <section>
      <div className={`fixed inset-0 z-50 ${modal ? '' : 'hidden'}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white w-64 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
            <span className="text-lg font-semibold mb-4 text-red-500">{invalidOTP && 'Invalid OTP'}</span>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-black text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

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
