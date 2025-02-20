import { databases } from "../../../appwrite";
import authService from "./authServices";

// Function to get user ID
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
  createBooking = async (data: {}) => {
    try {
      console.log("Fetching user data...");
      const user = await getUserData();

      if (!user) {
        console.error("User not found. Cannot create booking.");
        return;
      }

      console.log("Creating booking for user ID:", user.$id);
      const response = await databases.createDocument(
        "679a0d6e000c64280639", // Database ID
        "67a856b900251ea5d062", // Collection ID
        user.$id, // Use user ID as the document ID
        data // Pass object, not a string
      );

      console.log("Booking created:", response);
      return response;
    } catch (error) {
      console.error("Error creating booking:", error);
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
      const response = await databases.getDocument(
        "679a0d6e000c64280639", // Database ID
        "67a856b900251ea5d062", // Collection ID
        user.$id // User ID as the document ID
      );

      // Parse providerId if stored as JSON
      if (response.providerId) {
        response.providerId = JSON.parse(response.providerId);
      }

      console.log("Booking retrieved:", response);
      return response;
    } catch (error) {
      console.error("Error fetching booking:", error);
      return null;
    }
  };
}

const bookingServices = new BookingServices();
export default bookingServices;
