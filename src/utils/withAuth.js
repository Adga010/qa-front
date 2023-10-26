import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/authUtils";

function withAuth(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated()) {
        navigate("/");
      }
    }, [navigate]);

    if (!isAuthenticated()) {
      return null;
    }

    return <Component {...props} />;
  };
}

export default withAuth;
