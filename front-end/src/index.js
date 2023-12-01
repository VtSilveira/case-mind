import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home.js';
import SignUp from './pages/SignUp/index.js';
import SignIn from './pages/SignIn/index.js';
import CursoForms from './pages/Home/CursoForms.js';

const ProtectedRoute = ({
  token,
  children
}) => {
  if (!token) return <SignIn />
  return children;
}

const router = createBrowserRouter([
  {
    path: "/Home",
    element: <Home /> ,
  },
  {
    path: "/CriarNovoCurso",
    element: <CursoForms />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <SignIn />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
);

