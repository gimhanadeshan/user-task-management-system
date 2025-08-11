import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchema } from "../../utils/validators";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm = () => {
  const { register, isLoading, error } = useAuth();

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={registerSchema}
      onSubmit={register}
    >
      <Form className="space-y-6">
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
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <Field
            name="email"
            type="email"
            className="input-field"
            placeholder="Enter your email"
          />
          <ErrorMessage
            name="email"
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
            placeholder="Create a password"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="mt-2 text-sm text-red-600"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}

        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
