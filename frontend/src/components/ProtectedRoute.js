import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, ...props }) {
  return props.isLoggedIn ? children : <Navigate to="/sign-in" />
}

export default ProtectedRoute;