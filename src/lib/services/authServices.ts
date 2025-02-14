import { toast } from "react-toastify";
import { account, databases, ID } from "../../../appwrite";
import { LoginParams, RegisterParams } from "@/types/indext";
import { OAuthProvider, Query } from "appwrite";

const getEnv = (key: string): string => {
  const value = process.env[key] || process.env[`NEXT_PUBLIC${key}`];

  if (!value) {
    console.warn(`⚠️ Missing environment variable: ${key}`);
    console.log(
      "Available environment variables:",
      "All here ",
      JSON.stringify(process.env, null, 2)
    );
    return "";
  }

  return value.trim();
};

class AuthService {
  async verifyEmail(userId: string) {
    try {
      const token = await account.createVerification(userId);
      toast.success("Email verified successfully");
      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //  User REgistration
  async register({
    firstName,
    lastName,
    email,
    phone,
    countryOfResidence,
    password,
    role,
  }: RegisterParams): Promise<void> {

    try {
      // ✅ Create user account in Appwrite
      const user = await account.create(
        ID.unique(),
        email,
        password,
        `${firstName} ${lastName}`
      );
      console.log("✅ User registered successfully:", user);

      // ✅ Log in user automatically
      await this.verifyEmail(user.$id)
      await this.login({ email, password });

      // ✅ Update user preferences
      await this.updatePreferences({ countryOfResidence, role });

      // ✅ Store user in Appwrite database
      const databaseId = getEnv("APPWRITE_DATABASE_ID");
      const collectionId = getEnv("APPWRITE_COLLECTION_ID");

      console.log(databaseId, collectionId);

      if (!databaseId || !collectionId) {
        throw new Error(
          "Database or Collection ID is missing in environment variables."
        );
      }

      await databases.createDocument(databaseId, collectionId, user.$id, {
        userId: user.$id,
        firstName,
        lastName,
        email,
        phone,
        countryOfResidence,
        role,
      });

      console.log("✅ User document created successfully.");
    } catch (error: any) {
      console.error("❌ Registration failed:", error);
      toast.error("Registration failed. Please try again.");
      throw new Error(error.message);
    }
  }

  // Email password Registration
  async login({ email, password }: LoginParams): Promise<void> {
    try {

      console.log(email, password)
      const session = await account.createEmailPasswordSession(email, password);
      console.log("✅ Login successful:", session);
    } catch (error: any) {
      console.error("❌ Login failed:", error);
      toast.error(error);
      throw new Error(error.message);
    }
  }

  // USer Google Login
  async loginWithGoogle(): Promise<void> {
    try {
      const successRedirect =
        getEnv("NEXT_PUBLIC_GOOGLE_SUCCESS_REDIRECT") ||
        "http://localhost:3000/";
      const failureRedirect =
        getEnv("NEXT_PUBLIC_GOOGLE_FAILURE_REDIRECT") ||
        "http://localhost:3000/authentication";

      account.createOAuth2Session(
        OAuthProvider.Google,
        successRedirect,
        failureRedirect
      );
    } catch (error: any) {
      console.error("❌ Google login failed:", error);
      toast.error(error);
    }
  }

  // Updating user Preferences
  async updatePreferences({
    countryOfResidence,
    role,
  }: {
    countryOfResidence: string;
    role: string;
  }): Promise<void> {
    try {
      await account.updatePrefs({ countryOfResidence, role });
      console.log("✅ User preferences updated successfully.");
    } catch (error: any) {
      console.error("❌ Failed to update preferences:", error);
      toast.error("Failed to update user preferences.");
    }
  }

  // Fetching user Datas

  async getUser() {
    try {
      const profileInfo = await account.get();
      console.log("📌 Fetching user profile:", profileInfo.$id);

      const userDocument = await this.getUserDocument(profileInfo.$id);
      const user = { ...profileInfo, ...userDocument };

      console.log("✅ User details:", user);
      return user;
    } catch (error: any) {
      console.error("❌ Failed to fetch user:", error);
      return null;
    }
  }

  //  Creating user Documents
  private async getUserDocument(userId: string) {
    try {
      const databaseId = getEnv("APPWRITE_DATABASE_ID");
      const collectionId = getEnv("APPWRITE_COLLECTION_ID");

      if (!databaseId || !collectionId) {
        throw new Error(
          "Database or Collection ID is missing in environment variables."
        );
      }

      // Fetch user document directly using userId
      const response = await databases.getDocument(
        databaseId,
        collectionId,
        userId
      );
      return response;
    } catch (error) {
      console.error("❌ Failed to fetch user document:", error);
      return null;
    }
  }

  //  Logout user sessions
  async logout(): Promise<void> {
    try {
      await account.deleteSession("current");
      console.log("✅ Logout successful");
    } catch (error: any) {
      console.error("❌ Logout failed:", error);
      toast.error("Logout failed. Try again.");
    }
  }
}

const authService = new AuthService();
export default authService;
