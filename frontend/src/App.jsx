import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Home } from './pages/Home'
import { LoginPage } from './pages/LoginPage'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#171717',
            color: '#fff',
            border: '1px solid #404040',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
          },
          success: {
            iconTheme: { primary: '#8b5cf6', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard/:id" 
          element={
            <AuthProvider>
              <Dashboard />
            </AuthProvider>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
