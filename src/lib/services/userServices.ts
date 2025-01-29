import { storage, databases, Permission, Role, ID } from "../../../appwrite";
import { toast } from "react-toastify";

interface IUserInfo {
  userId: string;
  fileUrl: string;
}

// Function to get env variables safely
const getEnv = (key: string): string => process.env[key] || '';

// Function to check if the user exists
const checkIfUserExists = async (userId: string) => {
  try {
    await databases.getDocument(
      getEnv('APPWRITE_DATABASE_ID'),
      getEnv('APPWRITE_COLLECTION_ID'),
      userId
    );
    return true; // Document exists
  } catch (error) {
    return false; // Document doesn't exist
  }
};

// Function to create a new user document in the database
const createUserDocument = async (userId: string, fileUrl: string) => {
  try {
    const response = await databases.createDocument(
      getEnv('APPWRITE_DATABASE_ID'),
      getEnv('APPWRITE_COLLECTION_ID'),
      ID.unique(),
      { profilePicture: fileUrl, userId },
      [Permission.read(Role.any())]
    );
    console.log('User document created:', response);
    return response;
  } catch (error) {
    console.error('Failed to create user document:', error);
    toast.warn("Failed to create user document.");
  }
};

// Function to update or create the user profile
export const updateUserProfile = async ({ userId, fileUrl }: IUserInfo) => {
  try {
    const userExists = await checkIfUserExists(userId);
    if (!userExists) {
      toast.warn("User document not found! Creating a new one...");
      return await createUserDocument(userId, fileUrl);
    }

    const response = await databases.updateDocument(
      getEnv('APPWRITE_DATABASE_ID'),
      getEnv('APPWRITE_COLLECTION_ID'),
      userId,
      { profilePicture: fileUrl }
    );

    console.log('User profile updated:', response);
    return response;
  } catch (error) {
    console.error('Failed to update user profile:', error);
    toast.warn("Failed to update profile picture.");
  }
};

// Function to handle image upload
export const handleImageUpload = async (files: File[], userId: string) => {
  if (files.length > 0) {
    const file = files[0];

    try {
      const uploadedFile = await storage.createFile(
        getEnv('APPWRITE_BUCKET_ID'),
        ID.unique(),
        file
      );

      const fileUrl = `${getEnv('APPWRITE_ENDPOINT')}/storage/buckets/${getEnv('APPWRITE_BUCKET_ID')}/files/${uploadedFile.$id}/view`;

      await updateUserProfile({ userId, fileUrl });

      toast.info("Avatar uploaded successfully!");
    } catch (error) {
      toast.warn("Avatar uploading failed");
      console.error("Error during avatar upload:", error);
    }
  }
};
