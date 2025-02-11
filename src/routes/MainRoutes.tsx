import { Route, Routes } from 'react-router-dom';
// import Dashboard from '../pages/Dashboard';
// import Profile from '../pages/Profile';
// import Settings from '../pages/Settings';
// import ProtectedRoute from './ProtectedRoute';

const MainRoutes = () => {
  return (
    <Routes>
      {/* <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
};

export default MainRoutes;