import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../utils/validators";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const LoginForm = () => {
  const { login, isLoading, error, setError } = useAuth();

  useEffect(() => {
    return () => setError(null);
  }, [setError]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <Field
              name="username"
              type="text"
              className="input-field"
              placeholder="Enter your username"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="mt-2 text-sm text-red-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="input-field"
              placeholder="Enter your password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="mt-2 text-sm text-red-600"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="btn-primary"
          >
            {isSubmitting || isLoading ? "Signing In..." : "Sign In"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
