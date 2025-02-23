import { databases } from "../../../appwrite";
import { Query } from "appwrite";
import { COLLECTION_IDS } from "../../../appwrite.config";

const ITEMS_PER_PAGE = 20;
const databaseId = process.env.APPWRITE_DATABASE_ID as string;

/**
 * Fetch services with pagination
 */
export const getServices = async (page: number = 1) => {
  try {
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const services = await databases.listDocuments(
      databaseId,
      COLLECTION_IDS.SERVICES,
      [
        Query.limit(ITEMS_PER_PAGE),
        Query.offset(offset),
        Query.orderDesc("$createdAt"),
      ]
    );

    const totalPages = Math.ceil(services.total / ITEMS_PER_PAGE);

    const enhancedServices = await Promise.all(
      services.documents.map(async (service) => {
        const category = await databases.getDocument(
          databaseId,
          COLLECTION_IDS.CATEGORIES,
          service.categoryId
        );

        return {
          ...service,
          category,
          totalPages,
        };
      })
    );

    return enhancedServices;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

/**
 * Fetch a single service by ID
 */
export const getServiceById = async (serviceId: string) => {
  try {
    const service = await databases.getDocument(
      databaseId,
      COLLECTION_IDS.SERVICES,
      serviceId
    );

    let category = null;
    if (service.categoryId) {
      category = await databases.getDocument(
        databaseId,
        COLLECTION_IDS.CATEGORIES,
        service.categoryId
      );
    }

    return { ...service, category };
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    throw error;
  }
};
