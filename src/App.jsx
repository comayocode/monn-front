import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes/routes';

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <Router>
      <routes>
        <AppRoutes />
      </routes>
    </Router>
  );
}

export default App;
