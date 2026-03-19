import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const Protected = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl font-bold">Loading...</div>
    );
  }

  if (!user) {
    return (
      <Navigate to="/login" replace />
    );
  }

  return children;
};

export default Protected;
