// src/pages/service/[id].tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getServiceById } from "../../../../lib/services/serviceServices";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { toast } from "react-toastify";
import { useBooking } from "@/context/BookingContext"; // Importing context
import { useAuth } from "@/context/UserContext";
import { IBooking } from "@/interfaces"; // Assuming IBooking is defined in interfaces

interface Service {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: { name: string };
  tags: string[];
  images: string[];
  subCategories: string[];
  availability: string;
  isRemoteService: boolean;
  duration: number;
  location: string;
}

function ServicePage() {
  const { user } = useAuth();
  const { $id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { createBooking, getBookings, isConfirmed, setIsConfirmed } = useBooking(); // Destructure context

  const router = useRouter(); // For navigation

  const handleConfirm = () => {
    if (service) {
      createBooking(service); // Use the context's createBooking function
    }
  };

  const handleCancel = () => {
    setIsConfirmed(false);
    router.push("/services");
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await getServiceById($id as string);
        setService(data);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [$id]);

  useEffect(() => {
    if (isConfirmed) {
      getBookings(); // Fetch bookings after confirming
    }
  }, [isConfirmed, getBookings]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!service) return <p className="text-center text-red-500">Service not found</p>;

  return (
    <main className="p-5 md:p-10 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative h-64">
          <Image 
            src={service?.images[0]} 
            alt={service.name} 
            className="object-cover w-full h-full" 
            width={1000} 
            height={400} 
          />
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-gray-800">{service.name}</h1>
          <p className="text-gray-600 mt-2">{service.description}</p>

          {/* Price Section */}
          <p className="text-xl font-semibold text-gray-700 mt-4">
            Price: <span className="text-green-500">{service.price}</span>
          </p>

          {/* Category Section */}
          <p className="mt-2 text-gray-600">
            <strong>Category:</strong> {service.category?.name || "N/A"}
          </p>

          {/* Tags Section */}
          <div className="mt-4">
            <strong>Tags:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {service.tags.map((tag: string, index: number) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-200 text-sm rounded-lg text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Provider Section */}
          <p className="mt-4 text-gray-600">
            <strong>Provider:</strong> {service.providerId?.name || "N/A"}
          </p>

          {/* Location Section */}
          <p className="mt-2 text-gray-600"><strong>Location:</strong> TBD</p>

          {/* Book Button */}
          <div className="mt-6 text-center">
            <Button onClick={() => setIsConfirmed(true)} variant={"primary"} type="button">
              Book This Service
            </Button>

            <ConfirmModal
              onConfirm={handleConfirm}
              isOpen={isConfirmed}
              message="Do you want to book this service?"
              onCancel={handleCancel}
              title="Book a service"
              key={service._id}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ServicePage;
