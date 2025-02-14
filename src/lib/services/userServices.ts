import { storage, databases, Permission, Role, ID } from "../../../appwrite";
import { toast } from "react-toastify";

interface IUserInfo {
  userId: string;
  fileUrl: string;
}

// Function to get env variables safely
const getEnv = (key: string): string => process.env[`NEXT_PUBLIC_${key}`] || '';

// Function to check if the user exists
const checkIfUserExists = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      getEnv('APPWRITE_DATABASE_ID'),
      getEnv('APPWRITE_COLLECTION_ID'),
      [`equal("userId", "${userId}")`] // Query userId field
    );

    return response.total > 0;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
};

// Function to create a new user document in the database
const createUserDocument = async (userId: string, fileUrl: string) => {
  try {
    const response = await databases.createDocument(
      getEnv('APPWRITE_DATABASE_ID'),
      getEnv('APPWRITE_COLLECTION_ID'),
      userId, // Use userId as document ID
      { profilePicture: fileUrl, userId },
      [Permission.read(Role.any())]
    );
    console.log('User document created:', response);
    return response;
  } catch (error) {
    console.error('Failed to create user document:', error);
    await toast.warn("Failed to create user document.");
  }
};

// Function to update or create the user profile
export const updateUserProfile = async ({ userId, fileUrl }: IUserInfo) => {
  try {
    const userExists = await checkIfUserExists(userId);
    if (!userExists) {
      await toast.warn("User document not found! Creating a new one...");
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
    await toast.warn("Failed to update profile picture.");
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
        file,
        [Permission.read(Role.any())] // Set public read permissions
      );

      const fileUrl = `${getEnv('APPWRITE_ENDPOINT')}/storage/buckets/${getEnv('APPWRITE_BUCKET_ID')}/files/${uploadedFile.$id}/view`;

      await updateUserProfile({ userId, fileUrl });

      await toast.info("Avatar uploaded successfully!");
    } catch (error) {
      await toast.warn("Avatar uploading failed");
      console.error("Error during avatar upload:", error);
    }
  }
};
