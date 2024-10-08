import { Navigate } from "react-router-dom";
import { useAuth } from '../hooks/UseAuth';

//implementing Role-Based Access Control(RBAC) in react

const PrivateRoute = ({ children, role }) => {
    const { authTokens, user } = useAuth();

    if (!authTokens) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;