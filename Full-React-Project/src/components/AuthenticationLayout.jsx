import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthenticationLayout({
  children,
  authentication = true,
}) {
  const authStatus = useSelector(
    (state) => state.auth.status
  );

  if (authentication && !authStatus) {
    return <Navigate to="/login" replace />;
  }

  if (!authentication && authStatus) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AuthenticationLayout;