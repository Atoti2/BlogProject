import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import NotFound from "./pages/NotFound"
import AddEditPost from "./pages/AddEditPost"
import Posts from './pages/Posts'
import Auth from "./pages/Auth"
import PasswordReset from "./pages/PasswordReset"
import Profile from "./pages/Profile"
import Admin from "./pages/Admin"
function App() {

  const router = createBrowserRouter(
    [
      {
        element: <NavBar/>,
        children: [
          {
            path: "/",
            element: <Home/>
          },
          {
            path : "*",
            element: <NotFound/>
          },
          {
            path: "/posts",
            element: <Posts/>
          },
          {
            path: "/update/:id",
            element: <AddEditPost/>
          },
          {
            path: "/register",
            element: <Auth/>
          },
          {
            path: "/login",
            element: <Auth/>
          },
          {
            path: "/pwreset",
            element: <PasswordReset/>
          },
          {
            path: "/profile",
            element: <Profile/>
          },
          {
            path: "/admin",
            element: <Admin/>
          }
        ]
      }
    ],
    {
      future: {
        v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      }
    }
  )

  return (
    <RouterProvider router={router} future={{v7_startTransition: true}}></RouterProvider>
  )
}

export default App
