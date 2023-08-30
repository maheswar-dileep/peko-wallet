import { useEffect, useState } from 'react';
import authApi from '../utils/axios/axiosInstance';
import { Link } from 'react-router-dom';

const Transactions = () => {
  const [transactions, setTransactions] = useState();
  useEffect(() => {
    const getTransactions = async () => {
      const res = await authApi.get(`/payment/get-transactions/${localStorage.getItem('userId')}`);
      console.log(res);
      setTransactions(res.data.transactions);
    };
    getTransactions();
  }, []);
  return (
    <div>
      <>
        <section className="mx-auto w-5/6 max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Transactions</h2>
              <p className="mt-1 text-sm text-gray-700">This is a list of all Transactions.</p>
            </div>
            <div>
              <Link
                to="/new-transaction"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                New Transaction
              </Link>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="divide-x divide-gray-200">
                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                          <span>sl.no</span>
                        </th>
                        <th scope="col" className="px-12 py-3.5 text-left text-sm font-normal text-gray-500">
                          Sender Id
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                          Transaction Type
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                          Transaction Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {transactions &&
                        transactions.map((data, index) => (
                          <tr key={data.name} className="divide-x divide-gray-200">
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm text-gray-900">{index + 1}</div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{data.senderUniqueId}</div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              {data.transactionType == 'Send' ? (
                                <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                  {data.transactionType}
                                </span>
                              ) : (
                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                  {data.transactionType}
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                              {data.transactionDate}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default Transactions;
