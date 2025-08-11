import { Link } from "react-router-dom";
import AuthFormContainer from "../../components/auth/AuthFormContainer";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <AuthFormContainer title="Login">
      <LoginForm />
      <div className="mt-6 space-y-4">
        <div className="text-center">
          <Link
            to="/register"
            className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
          >
            Don't have an account? Create one
          </Link>
        </div>
        <div className="text-center">
          <Link
            to="/forgot-password"
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </AuthFormContainer>
  );
};

export default LoginPage;
