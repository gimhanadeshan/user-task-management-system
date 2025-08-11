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
    // Handle specific error messages
    if (error.response?.data) {
      throw new Error(error.response.data);
    }
    throw new Error("Registration failed");
  }
};

export const login = async (credentials) => {
  const response = await api.post("/login", {
    username: credentials.username,
    password: credentials.password,
  });
  return response.data; // { token, user }
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
