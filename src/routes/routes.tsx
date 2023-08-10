import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
// import { SignUp } from "../pages/SignUp/SignUp";
import AllBooks from "../pages/AllBooks/AllBooks";
import SignUp from "../pages/SignUp/SignUp";
import { SingleBook } from "../pages/SingleBook/SingleBook";
import AddNew from "../pages/AddNew/AddNew";


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
          {
            index: true,
            element: <Home/>,
          },
        ],
      },
      {
        path: '/all-books',
        element: <AllBooks/>,
      },
      {
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/signup',
        element: <SignUp/>,
      },
      {
        path: '/add-new',
        element: <AddNew/>,
      },
      {
        path: '/book/single/:_id',
        element: <SingleBook/>,
      },
  ]);