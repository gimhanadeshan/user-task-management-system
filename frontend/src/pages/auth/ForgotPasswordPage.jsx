import { Link } from "react-router-dom";
import AuthFormContainer from "../../components/auth/AuthFormContainer";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <AuthFormContainer title="Reset Password">
      <ForgotPasswordForm />
      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
        >
          ← Back to login
        </Link>
      </div>
    </AuthFormContainer>
  );
};

export default ForgotPasswordPage;
