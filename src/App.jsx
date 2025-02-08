import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        <Route path='/login' element={<Login />} />

        {/* Ruta principal */}
        <Route path='/' element={<LandingPage />} />

        {/* Rutas protegidas para admin y user */}
        <Route
          path='/admin'
          element={
            <PrivateRoute
              element={<AdminPanel />}
              requiredRoles={['admin', 'user']}
            />
          }
        >
        </Route>

        {/* Ruta para account */}
        <Route
          path='/landing'
          element={
            <PrivateRoute
              element={<LandingPage />}
              requiredRoles={['account']}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;