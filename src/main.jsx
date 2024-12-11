import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { CategProvider } from './context/CategContext.jsx'
import {PostProvider} from './context/PostContext.jsx'

createRoot(document.getElementById('root')).render(
    <CategProvider>
      <PostProvider>
        <UserProvider>
        <App />
        </UserProvider>
      </PostProvider>
    </CategProvider>
)
