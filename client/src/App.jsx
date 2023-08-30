import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import SignIn from './pages/signin';
import Home from './pages/home';
import SignUp from './pages/signup';
import Transactions from './pages/transactions';
import NewTransaction from './pages/newTransaction';
import AddAmount from './pages/addAmount';
import ProtectedRoute from './helpers/proctected-routes/protected-routes';

const App = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: '/signin',
      element: <SignIn />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/transactions',
      element: (
        <ProtectedRoute>
          <Transactions />
        </ProtectedRoute>
      ),
    },
    {
      path: '/new-transaction',
      element: (
        <ProtectedRoute>
          <NewTransaction />
        </ProtectedRoute>
      ),
    },
    {
      path: '/add-amount',
      element: (
        <ProtectedRoute>
          <AddAmount />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
