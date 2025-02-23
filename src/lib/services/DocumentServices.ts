import { Query } from "appwrite";
import { databases } from "../../../appwrite";
import { COLLECTION_IDS, databaseId } from "../../../appwrite.config";

class Documents {
  private collectionId: string;

  constructor(userPrefs: { role: string; otherPref?: string }) {
    this.collectionId = this.getCollectionId(userPrefs);
  }

  // Function to map user preferences to a collection
  private getCollectionId(userPrefs: { role: string }) {
    switch (userPrefs.role) {
      case "Provider":
        return COLLECTION_IDS.PROVIDERS;
      case "Customer":
        return COLLECTION_IDS.CUSTOMERS;
      default:
        throw new Error(`Unknown role: ${userPrefs.role}`);
    }
  }

  // Get all documents with optional limit, offset, and userId filtering
  async getAllDocuments(limit: number = 25, offset: number = 0, userId?: string) {
    try {
      const queries: string[] = [Query.limit(limit), Query.offset(offset)];

      if (userId) {
        queries.push(Query.equal("userId", userId));
      }

      const response = await databases.listDocuments(databaseId as string, this.collectionId, { queries });
      return response.documents;
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }
  }

  // Get documents with a custom query
  async getDocumentsWithQuery(queries: string[]) {
    try {
      const response = await databases.listDocuments(databaseId as string,this.collectionId, { queries });
      return response.documents;
    } catch (error) {
      console.error("Error fetching documents with query:", error);
      throw error;
    }
  }

  // Get user by ID from the Users collection
  async getUserById(userId: string) {
    try {
      const response = await databases.getDocument(databaseId as string , this.collectionId, userId);
      return response;
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error;
    }
  }
}

export default Documents;
