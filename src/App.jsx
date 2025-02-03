import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Hero from './components/landing/Hero';
import AboutMe from './components/landing/AboutMe';
import Products from './components/landing/Products';
import Contact from './components/landing/Contact';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        <Route path='/login' element={<Login />} />

        {/* Ruta principal */}
        <Route path='/' element={<LandingPage />} />

        {/* Rutas protegidas para admin */}
        <Route
          path='/admin'
          element={
            <PrivateRoute
              element={<AdminPanel />}
              role='admin'
              requiredRole='admin'
            />
          }
        >
          <Route
            path='hero'
            element={
              <PrivateRoute
                element={<Hero />}
                role='admin'
                requiredRole='admin'
              />
            }
          />
          <Route
            path='about'
            element={
              <PrivateRoute
                element={<AboutMe />}
                role='admin'
                requiredRole='admin'
              />
            }
          />
          <Route
            path='products'
            element={
              <PrivateRoute
                element={<Products />}
                role='admin'
                requiredRole='admin'
              />
            }
          />
          <Route
            path='contact'
            element={
              <PrivateRoute
                element={<Contact />}
                role='admin'
                requiredRole='admin'
              />
            }
          />
        </Route>

        {/* Rutas para usuarios */}
        <Route
          path='/landing'
          element={
            <PrivateRoute
              element={<LandingPage />}
              role='user'
              requiredRole='user'
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
