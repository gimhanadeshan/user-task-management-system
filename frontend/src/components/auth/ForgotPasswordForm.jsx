import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";

const ForgotPasswordForm = () => {
  const { forgotPassword, isLoading, error } = useAuth();

  const handleSubmit = async (values) => {
    const success = await forgotPassword(values.email);
    if (success) {
      alert("Password reset link sent!");
    }
  };
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Please enter a valid email address")
          .required("Email is required"),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <Field
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="input-field"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="mt-2 text-sm text-red-600"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="btn-primary"
          >
            {isLoading || isSubmitting
              ? "Sending Reset Link..."
              : "Send Reset Link"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
