import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { UserProvider } from './context/UserContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';

function App() {
  return (

    <>
      <Router>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<PrivateRoute element={() => (localStorage.getItem('role') === "Admin" ? <Home /> : <Dashboard />)} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
