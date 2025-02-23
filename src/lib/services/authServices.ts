
import { toast } from "react-toastify";
import { account, databases, ID } from "../../../appwrite";
import { LoginParams, RegisterParams } from "@/types/indext";
import { OAuthProvider } from "appwrite";
import { COLLECTION_IDS, databaseId } from "../../../appwrite.config";



class AuthService {


  async verifyEmail() {
    try {
      const response = await account.createVerification("http://localhost:3000/verify_me");
      toast.success("Verification email sent.");
      return response;
    } catch (error) {
      console.error("❌ Failed to send verification email:", error);
      toast.error("Failed to send verification email.");
      throw error;
    }
  }

  //  User Registration
  async register({
    fullName,
    address,
    email,
    phone,
    country,
    password,
    role,
  }: RegisterParams): Promise<void> {
    const collectionId =
        role === "Provider" ? COLLECTION_IDS.PROVIDERS : COLLECTION_IDS.CUSTOMERS;
    try {
    

      // ✅ Create user account in Appwrite
      const user = await account.create(
        ID.unique(),
        email,
        password,
        `${fullName}`,



      );
      console.log("✅ User registered successfully:");


      // ✅ Ensure login before updating preferences
      await this.login({ email, password });

      // ✅ Update user preferences
      await this.updatePreferences({ country, role, address });

      // ✅ Send verification email
      await this.verifyEmail();

      // ✅ Store user data in Firestore
      
      await databases.createDocument(databaseId as string, collectionId, user.$id, {
        userId: user.$id,
        fullName,
        address,
        email,
        phone,
        country,
        role,
      });

      console.log("✅ User document created successfully.");
    } catch (error: any) {
      console.error("❌ Registration failed:", error);
      toast.error("Registration failed. Please try again.");
      throw new Error(error.message);
    }
  }

  // Email/password Login
  async login({ email, password }: LoginParams): Promise<User> {
    try {
      console.log(email, password);
      const session = await account.createEmailPasswordSession(email, password);
      console.log("✅ Login successful:", session);
  
      // ✅ Fetch user to ensure session persistence
      const user = await this.getUser();
      return user;
    } catch (error: any) {
      console.error("❌ Login failed:", error);
      toast.error(error.message);
      throw new Error(error.message); // Ensuring consistency in function return
    }
  }
  

  // Google Login
  async loginWithGoogle(): Promise<void> {
    try {
      const successRedirect = "http://localhost:3000";
      const failureRedirect = "http://localhost:3000/authentication";

      account.createOAuth2Session(
        OAuthProvider.Google,
        successRedirect,
        failureRedirect
      );
    } catch (error: any) {
      console.error("❌ Google login failed:", error);
      toast.error(error.message);
    }
  }

  // Updating user Preferences
  async updatePreferences({
    country,
    address,
    role,
  }: {
    country: string;
    role: string;
    address: string;
  }): Promise<void> {
    try {
      await account.updatePrefs({ country, role, address });
      console.log("✅ User preferences updated successfully.");
    } catch (error: any) {
      console.error("❌ Failed to update preferences:", error);
      toast.error("Failed to update user preferences.");
    }
  }

  // Fetching user data
  async getUser() {
    try {
      const profileInfo = await account.get();
      console.log("📌 Fetching user profile:", profileInfo.$id);

      const userDocument = await this.getUserDocument(profileInfo.$id);
      const user = { ...profileInfo, ...userDocument };
      localStorage.setItem("user", JSON.stringify(user));

      console.log("✅ User details:", user);
      return user;
    } catch (error: any) {
      console.error("❌ Failed to fetch user:", error);
      return null;
    }
  }

  // Fetch user document (Customers & Providers)
  private async getUserDocument(userId: string) {
    try {
      let response;
      try {
        response = await databases.getDocument(
          databaseId as string,
          COLLECTION_IDS.CUSTOMERS,
          userId
        );
      } catch {
        response = await databases.getDocument(
          databaseId as string,
          COLLECTION_IDS.PROVIDERS,
          userId
        );
      }
      return response;
    } catch (error) {
      console.error("❌ Failed to fetch user document:", error);
      return null;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await account.deleteSession("current");
      console.log("✅ Logout successful");
      localStorage.removeItem("user");
    } catch (error: any) {
      console.error("❌ Logout failed:", error);
      toast.error("Logout failed. Try again.");
    }
  }
}

const authService = new AuthService();
export default authService;
