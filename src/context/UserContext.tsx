"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "@/lib/services/authServices";
import { RegisterParams, LoginParams, User } from "@/types/indext";
import Documents from "../lib/services/DocumentServices"; // Import the Documents class

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  documents: Documents | null; // Instance of Documents class
  register: (data: RegisterParams) => Promise<void>;
  login: (data: LoginParams) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setUser:any;

  updatePreferences: (data: Partial<User>) => Promise<void>;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [documents, setDocuments] = useState<Documents | null>(null);

  // Fetch user details and initialize Documents class
  const fetchUser = async () => {
    setLoading(true);
    try {
      const userData = await authService.getUser(); 
      if (userData) {
        const userPreferences = {
          role: userData.prefs.role || "",
        };

        setUser({
          id: userData.$id,
          name: userData.name,
          email: userData.email,
          phoneNumber: userData.prefs.phoneNumber || "",
          country: userData.prefs.country || "",
          role: userPreferences.role,
        });

        // Initialize the Documents class with user preferences
        setDocuments(new Documents(userPreferences));
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const register = async (data: RegisterParams) => {
    await authService.register(data);
    await fetchUser();
  };

  const login = async (data: LoginParams) => {
    await authService.login(data);
    await fetchUser();
  };

  const loginWithGoogle = async () => {
    await authService.loginWithGoogle();
    await fetchUser();
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setDocuments(null);
  };

  const updatePreferences = async (data: Partial<User>) => {
    await authService.updatePreferences(data);
    await fetchUser();
  };

console.log("user Documents are ", documents)

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        documents,
        register,
        login,
        loginWithGoogle,
        logout,
        updatePreferences,
        fetchUser,
        setUser
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
