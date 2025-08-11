import { Link } from "react-router-dom";
import AuthFormContainer from "../../components/auth/AuthFormContainer";
import RegisterForm from "../../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthFormContainer title="Create Account">
      <RegisterForm />
      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </AuthFormContainer>
  );
};

export default RegisterPage;
