import { toast } from "react-toastify";

export const showToast = (message, type = "default", options = {}) => {
  const defaultOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const toastOptions = { ...defaultOptions, ...options };

  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "warning":
      toast.warning(message, toastOptions);
      break;
    case "info":
      toast.info(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};
