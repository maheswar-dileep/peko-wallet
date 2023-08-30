import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import SignIn from './pages/signin';
import Home from './pages/home';
import SignUp from './pages/signup';
import Transactions from './pages/transactions';

const App = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
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
      element: <Transactions />,
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
