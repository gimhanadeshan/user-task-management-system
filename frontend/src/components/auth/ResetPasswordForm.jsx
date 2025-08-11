import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toast";

const ResetPasswordForm = ({ token }) => {
  const { resetPassword, isLoading, error, setError } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log("Submitting:", {
        token: token,
        newPassword: values.newPassword,
      });

      const response = await resetPassword(token, values.newPassword);

      console.log("Success response:", response);
      navigate("/login");
      showToast("Password reset successfully!", "success");
      resetForm();
    } catch (err) {
      console.error("Detailed error:", {
        message: err.message,
        response: err.response?.data,
        stack: err.stack,
      });

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to reset password. Please try again."
      );
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
      {({ isSubmitting, isValid }) => (
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

          <button
            type="submit"
            disabled={isLoading || isSubmitting || !isValid}
            className="btn-primary disabled:opacity-50"
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
