import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './pages/Home/App.js';
import SignUp from './pages/SignUp/index.js';
import SignIn from './pages/SignIn/index.js';
// import AdminProfessores from './pages/AdminProfs/AdminProfessores.js'; 
import CriarCurso from './pages/Home/CriarEditarCurso.js';
// import { getToken } from './services/auth.js';

const router = createBrowserRouter([
  {
    path: "/Home",
    element: <App />,
  },
  {
    path: "/CriarNovoCurso",
    element: <CriarCurso />,
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

// const router2 = createBrowserRouter([
//   {
//     path: "/Home",
//     element: <App />,
//   },
//   {
//     path: "/CriarNovoCurso",
//     element: <CriarCurso />,
//   },
// ]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
);

