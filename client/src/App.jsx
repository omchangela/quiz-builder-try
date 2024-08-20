import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TakeQuiz from './pages/TakeQuiz';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/quiz/:id" element={<TakeQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
