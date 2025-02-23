"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import bookingServices from "@/lib/services/bookingServices";
import { IBooking } from "@/interfaces";
import { toast } from "react-toastify";
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";

// Service interface (replace with actual service type if available)


interface BookingContextProps {
 bookings:IBooking[]
}
const BookingContext = createContext<BookingContextProps | undefined>(undefined);

export const useBooking = (): BookingContextProps => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export const BookingProvider: React.FC = ({ children }) => {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [bookings, setBookings] = useState<IBooking[]>([]); // State now typed as IBooking[]
  const { user } = useAuth();
  const router = useRouter();

  // Create a new booking
  const createBooking = useCallback(async (service) => {
    try {
      if (!service || !service.name) {
        toast.error("Service data is missing or invalid.");
        return;
      }

      if (!user) {
        toast.error("User not authenticated.");
        return;
      }

      const bookingData: IBooking = {
        name: service.name,
        category: service.category?.name || "N/A",
        tags: service.tags || [],
        subCategoryId: service.subCategories || "", // Adjust as necessary based on structure
        location: service.location || "TBD",
        description: service.description,
        price: service.price,
        availability: service.availability || "Available",
        images: service.images || [],
        serviceId: service.$id || "",
        userId: user.id,
        status: "Pending",
        isRemoteService: service.isRemoteService || false,
        isActive: true,
        duration: service.duration || 60, // Default duration
      };

      const response = await bookingServices.createBooking(bookingData);

      if (response) {
        toast.success("Booking confirmed successfully!");
        getBookings(); // Fetch bookings after creating one
        router.push("/bookings");
        setIsConfirmed(true);
      } else {
        toast.error("Failed to create booking.");
      }
    } catch (error) {
      console.error("Error confirming booking:", error.response);
      toast.error("An error occurred while booking. Please try again.");
    }
  }, [user, router]);

  // Fetch user bookings
  const getBookings = useCallback(async () => {
    if (!user) {
      toast.error("User not authenticated.");
      return;
    }

    try {
      const response = await bookingServices.getBookings();
      if (response) {
        setBookings(response);
        console.log("Bookings", response)
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings.");
    }
  }, [user]);

  // Fetch bookings on component mount or when user changes
  useEffect(() => {
    if (user) {
      getBookings();
    }
  }, [user, getBookings]);

  return (
    <BookingContext.Provider value={{ createBooking, getBookings, isConfirmed, setIsConfirmed, bookings }}>
      {children}
    </BookingContext.Provider>
  );
};
