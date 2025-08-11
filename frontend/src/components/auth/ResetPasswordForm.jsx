import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";

const ResetPasswordForm = ({ token }) => {
  const { resetPassword, isLoading, error, setError, setSuccess } = useAuth();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await resetPassword(token, values.newPassword);
      setSuccess(
        "Password reset successfully. You can now login with your new password."
      );
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <Formik
      initialValues={{ newPassword: "", confirmPassword: "" }}
      validationSchema={Yup.object({
        newPassword: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
          .required("Please confirm your password"),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <Field
              name="newPassword"
              type="password"
              className="input-field"
              placeholder="Enter your new password"
            />
            <ErrorMessage
              name="newPassword"
              component="div"
              className="mt-2 text-sm text-red-600"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <Field
              name="confirmPassword"
              type="password"
              className="input-field"
              placeholder="Confirm your new password"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="mt-2 text-sm text-red-600"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg flex items-start">
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="btn-primary"
          >
            {isLoading || isSubmitting ? (
              <>Resetting Password...</>
            ) : (
              "Reset Password"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
