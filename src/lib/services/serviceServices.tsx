import { account, databases } from "../../../appwrite";

import { Query } from "appwrite";
import { COLLECTION_IDS } from "../../../appwrite.config";

const ITEMS_PER_PAGE = 20


const databaseId = process.env.APPWRITE_DATABASE_ID as string


export const  getServices  = async ( page: number = 1) =>    {
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
    
          // Calculate and set total pages
          const totalPages = Math.ceil(services.total / ITEMS_PER_PAGE);
    
          // Enhance services with category information
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
          console.log(error);
          throw error;
        }
      }