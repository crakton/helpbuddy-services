import { toast } from "react-toastify";
import { account, databases, ID } from "../../../appwrite";
import { LoginParams, RegisterParams } from "@/types/indext";
import { Query } from "appwrite";

// Function to get env variables safely
const getEnv = (key: string): string => process.env[key] || '';
          // console.log(getEnv('APPWRITE_COLLECTION_ID'))
          

class AuthService {
  async register({
    firstName,
    lastName,
    email,
    phoneNumber,
    countryOfResidence,
    password,
    confirmPassword,
    role,
  }: RegisterParams): Promise<void> {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    try {
      const user = await account.create(
        ID.unique(), // Creates a unique user ID
        email,
        password,
        `${firstName} ${lastName}`
      );
      console.log("User registered successfully:", user);

      await this.login({ email, password });
      await this.updatePreferences({ phoneNumber, countryOfResidence, role });
    } catch (error: any) {
      console.error("Registration failed:", error.message);
    }
  }

  async login({ email, password }: LoginParams): Promise<void> {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      console.log("Login successful:", session);
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  }

  async loginWithGoogle(): Promise<void> {
    try {
      await account.createOAuth2Session(
        "google",
        getEnv('NEXT_PUBLIC_GOOGLE_SUCCESS_REDIRECT') || "http://localhost:3000/",
        getEnv('NEXT_PUBLIC_GOOGLE_FAILURE_REDIRECT') || "http://localhost:3000/login"
      );
    } catch (error: any) {
      console.error("Google login failed:", error.message);
    }
  }

  async updatePreferences({
    phoneNumber,
    countryOfResidence,
    role,
  }: {
    phoneNumber: string;
    countryOfResidence: string;
    role: string;
  }): Promise<void> {
    try {
      await account.updatePrefs({ phoneNumber, countryOfResidence, role });
      console.log("User preferences updated successfully.");
      const updatedUser = await this.getUser();
      console.log("Updated user details:", updatedUser);
    } catch (error: any) {
      console.error("Failed to update preferences:", error.message);
    }
  }

  async getUser() {
    const getUserDocument = async (userId: string) => {
      try {
        const response = await databases.listDocuments(
          getEnv('APPWRITE_DATABASE_ID'),
          getEnv('APPWRITE_COLLECTION_ID'),
          [Query.equal("userId", userId)]
        );
        return response.documents.length > 0 ? response.documents[0] : null;
      } catch (error) {
        console.error("Failed to fetch user document:", error);
        return null;
      }
    };

    try {
      const profileInfo = await account.get();
      console.log(profileInfo.$id);
      const userDocument = await getUserDocument(profileInfo.$id);
      const user = { ...profileInfo, ...userDocument };
      console.log("User details:", user);
      return user;
    } catch (error: any) {
      console.error("Failed to fetch user:", error.message);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await account.deleteSession("current");
      console.log("Logout successful");
    } catch (error: any) {
      console.error("Logout failed:", error.message);
    }
  }
}

const authService = new AuthService();
export default authService;