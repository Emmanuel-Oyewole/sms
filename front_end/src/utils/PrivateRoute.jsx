import { Navigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';



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