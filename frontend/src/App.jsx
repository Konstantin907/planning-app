import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { LoginPage } from './pages/LoginPage'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <BrowserRouter>
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
