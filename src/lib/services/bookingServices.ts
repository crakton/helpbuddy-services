import { IBooking } from "@/interfaces";
import { databases, ID } from "../../../appwrite";
import authService from "./authServices";
import { COLLECTION_IDS, databaseId } from "../../../appwrite.config";

// Function to get user data
const getUserData = async () => {
  try {
    const userData = await authService.getUser();
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null; // Handle errors properly
  }
};

class BookingServices {
  
  createBooking = async (data: IBooking) => {
    try {
      console.log("Generating unique booking ID...");
      const newBookingId = ID.unique(); // Generate the unique ID manually
      console.log("New booking ID:", newBookingId);
  
      console.log("Fetching user data...");
      const user = await getUserData();
  
      if (!user) {
        console.error("User not found. Cannot create booking.");
        return;
      }
  
      console.log("Creating booking for user ID:", user.$id);
      const response = await databases.createDocument(
        databaseId as string, 
        COLLECTION_IDS.BOOKINGS, 
        newBookingId, // Ensure this is used
        data
      );
  
      console.log("Booking created:", response);
      return response;
    } catch (error: any) {
      console.error("Error creating booking:", error?.response || error);
  
      // Check if the error contains details about the existing document
      if (error.response && error.response.message) {
        console.error("Conflict Error Details:", error.response);
        
        // Try fetching existing documents to log conflicting ID
        const existingBookings = await databases.listDocuments(
          databaseId as string,
          COLLECTION_IDS.BOOKINGS
        );
  
        console.log("Existing bookings:", existingBookings.documents);
      }
      
      return null;
    }
  };
  getBookings = async () => {
    try {
      console.log("Fetching user data...");
      const user = await getUserData();
  
      if (!user) {
        console.error("User not found. Cannot fetch booking.");
        return null;
      }
  
      console.log("Fetching booking for user ID:", user.$id);
  
      // List all documents in the bookings collection
      const response = await databases.listDocuments(
        databaseId as string, // Database ID
        COLLECTION_IDS.BOOKINGS, // Collection ID
      );
  
      // Filter the documents based on the userId
      const booking = response.documents.filter(doc => doc.userId === user.$id);
        return booking;
      
    } catch (error) {
      console.error("Error fetching booking:", error);
      return null;
    }
  };
}

const bookingServices = new BookingServices();
export default bookingServices;
