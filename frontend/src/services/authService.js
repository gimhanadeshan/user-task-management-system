import api from "./api";

export const register = async (userData) => {
  try {
    const response = await api.post("/register", {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }

      if (typeof error.response.data === "string") {
        throw new Error(error.response.data);
      }

      throw new Error(JSON.stringify(error.response.data));
    } else if (error.request) {
      throw new Error("No response from server. Please try again.");
    } else {
      throw new Error("Registration failed. Please try again.");
    }
  }
};

export const login = async (credentials) => {
  const response = await api.post("/login", {
    username: credentials.username,
    password: credentials.password,
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post("/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  try {
    console.log("Sending reset request with:", { token, newPassword });
    const response = await api.post(
      "/reset-password",
      {
        token,
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Full error details:", {
      config: error.config,
      response: {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      },
    });
    throw error;
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  const response = await api.put("/change-password", {
    oldPassword: currentPassword,
    newPassword,
  });
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await api.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
