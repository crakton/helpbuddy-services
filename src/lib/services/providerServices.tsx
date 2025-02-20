import { account } from "../../../appwrite";



export const getProvider  = async ()=> {
    try {
      const providerInfo = await account.get();
      console.log("📌 Fetching user profile:", providerInfo.$id);

      const provider = { ...providerInfo};
      localStorage.setItem('user', JSON.stringify(provider));

      console.log("✅ User details:", provider);
      return provider;
    } catch (error: any) {
      console.error("❌ Failed to fetch user:", error);
      return null;
    }
  }