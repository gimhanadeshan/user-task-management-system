const AuthFormContainer = ({ title, children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo/Name Section */}
        <div className="flex items-center justify-center mb-6 space-x-2">
          <svg
            className="w-8 h-8 text-indigo-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-2xl font-bold text-gray-800">To-Do</span>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            {title}
          </h2>
          {children}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          © {currentYear} To-Do. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AuthFormContainer;
