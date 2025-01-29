"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "@/lib/services/authServices";
import { RegisterParams, LoginParams } from "@/types/indext";

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  countryOfResidence?: string;
  role?: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  register: (data: RegisterParams) => Promise<void>;
  login: (data: LoginParams) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updatePreferences: (data: Partial<User>) => Promise<void>;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch user details from Appwrite account and database
  const fetchUser = async () => {
    setLoading(true);
    try {
      const userData = await authService.getUser(); // Assuming getUser now returns user with preferences
      if (userData) {
        setUser({
          id: userData.$id,
          name: userData.name,
          email: userData.email,
          phoneNumber: userData.prefs.phoneNumber || "",
          countryOfResidence: userData.prefs.countryOfResidence || "",
          role: userData.prefs.role || "",
          profilePicture:userData.profilePicture|| ""
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Register user and update state
  const register = async (data: RegisterParams) => {
    await authService.register(data);
    await fetchUser();
  };

  // Login user and update state
  const login = async (data: LoginParams) => {
    await authService.login(data);
    await fetchUser();
  };

  // Login with Google and update state
  const loginWithGoogle = async () => {
    await authService.loginWithGoogle();
    await fetchUser();
  };

  // Logout user and reset state
  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  // Update user preferences and state
  const updatePreferences = async (data: Partial<User>) => {
    await authService.updatePreferences(data);
    await fetchUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
        updatePreferences,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
