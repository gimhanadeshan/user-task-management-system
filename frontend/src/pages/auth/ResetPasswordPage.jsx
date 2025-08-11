import AuthFormContainer from "../../components/auth/AuthFormContainer";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import { useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();

  return (
    <AuthFormContainer title="Reset Password">
      <ResetPasswordForm token={searchParams.get("token")} />
    </AuthFormContainer>
  );
};

export default ResetPasswordPage;
