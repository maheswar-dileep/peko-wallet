import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import TransferSchema from '../helpers/validations/transfer.jsx';
import authApi from '../utils/axios/axiosInstance.jsx';

const NewTransaction = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      uniqueId: '',
      amount: '',
      password: '',
      id: localStorage.getItem('userId'),
    },
    validationSchema: TransferSchema,
    onSubmit: async(values) => {
      const res = await authApi.put('/payment/transfer-amount', values);
      console.log(res);
      if (res.data.success) {
        toast.success('amount transfered successfully');
        navigate('/');
      }
    },
  });
  return (
    <>
      <div className="mx-auto w-full max-w-7xl py-2">
        <div className="mx-auto my-4 max-w-2xl md:my-6">
          <div className="overflow-hidden rounded-xl bg-white p-4 shadow">
            <p className="text-sm font-bold text-gray-900">Info</p>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-6 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
                <div className="w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="firstName"
                  >
                    Reciever&apos;s Unique ID
                  </label>
                  <span className="text-red-500">{formik.errors.uniqueId}</span>
                  <input
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter the Unique ID"
                    id="firstName"
                    name="uniqueId"
                    value={formik.values.uniqueId}
                    onChange={formik.handleChange}
                  ></input>
                </div>

                <div className="w-full">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="lastName"
                  >
                    Amount
                  </label>
                  <span className="text-red-500">{formik.errors.amount}</span>
                  <input
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter Enter the amount "
                    id="lastName"
                    name="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                  ></input>
                </div>
                <div className="col-span-2 grid">
                  <div className="w-full">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="email"
                    >
                      Password
                    </label>
                    <span className="text-red-500">{formik.errors.password}</span>
                    <input
                      className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Enter your password"
                      id="email"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                </div>

                <div className="col-span-2 grid">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Transfer amount
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTransaction;
