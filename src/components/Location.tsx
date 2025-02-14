"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface ProviderLocationProps {
  address: string;
}

const Location: React.FC<ProviderLocationProps> = ({ address }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (!address) return;

    // Geocode address using OpenStreetMap's Nominatim API
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await response.json();

        if (data.length > 0) {
          setCoordinates({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
        } else {
          console.error("No results found for address:", address);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchCoordinates();
  }, [address]);

  useEffect(() => {
    // Get user's current location using the browser's Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userCoords);

          if (coordinates) {
            const dist = calculateDistance(
              userCoords.lat,
              userCoords.lng,
              coordinates.lat,
              coordinates.lng
            );
            setDistance(dist);
          }
        },
        (error) => console.error("Error getting user location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [coordinates]);

  useEffect(() => {
    if (!mapContainerRef.current || (!coordinates && !userLocation)) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(
        coordinates || userLocation || { lat: 0, lng: 0 },
        14
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);
    }

    if (coordinates) {
      L.marker([coordinates.lat, coordinates.lng])
        .addTo(mapRef.current)
        .bindPopup(`📍 ${address}`)
        .openPopup();
    }

    if (userLocation) {
      L.marker([userLocation.lat, userLocation.lng], {
        icon: L.icon({
          iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg",
          iconSize: [20, 20],
        }),
      })
        .addTo(mapRef.current)
        .bindPopup("📍 current Location")
        .openPopup();
    }
  }, [coordinates, userLocation]);

  // Function to focus on provider's location
  const focusOnProviderLocation = () => {
    if (mapRef.current && coordinates) {
      mapRef.current.setView([coordinates.lat, coordinates.lng], 16);
    }
  };

  // Function to focus on user's location
  const focusOnMyLocation = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], 16);
    }
  };

  // Function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // Distance in km
  };

  return (
    <div>
      {coordinates || userLocation ? (
        <div>
          <div ref={mapContainerRef} style={{ width: "100%", height: "300px", borderRadius: "10px", zIndex:5 }} />
          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button
              onClick={focusOnProviderLocation}
              style={{
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                background: "#007bff",
                color: "white",
                cursor: "pointer",
              }}
            >
              📍 Focus on Provider
            </button>
            <button
              onClick={focusOnMyLocation}
              style={{
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                background: "#28a745",
                color: "white",
                cursor: "pointer",
              }}
            >
              🏠 My Location
            </button>
          </div>
          {distance && (
            <p style={{ marginTop: "10px", fontSize: "16px", fontWeight: "bold" }}>
              🛣️ Distance: {distance} km
            </p>
          )}
        </div>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default Location;
