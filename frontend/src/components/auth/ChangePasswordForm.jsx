import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";

const ChangePasswordForm = () => {
  const { changePassword, isLoading, error } = useAuth();

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 text-sm">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Change Password
      </h3>

      <Formik
        initialValues={{ currentPassword: "", newPassword: "" }}
        validationSchema={Yup.object({
          currentPassword: Yup.string().required(
            "Current password is required"
          ),
          newPassword: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("New password is required"),
        })}
        onSubmit={async (values, { resetForm }) => {
          try {
            await changePassword(values.currentPassword, values.newPassword);
            alert("Password changed successfully");
            resetForm();
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <Form className="space-y-6">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Current Password
            </label>
            <Field
              name="currentPassword"
              type="password"
              className="input-field"
            />
            <ErrorMessage
              name="currentPassword"
              component="div"
              className="mt-2 text-sm text-red-600"
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <Field name="newPassword" type="password" className="input-field" />
            <ErrorMessage
              name="newPassword"
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
            {isLoading ? "Changing Password..." : "Change Password"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
