"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { providers } from "@/constants/data";

interface Location {
  lat: number;
  lng: number;
}

interface Provider {
  $id: string;
  name: string;
  serviceCategory: string;
  location: string;
  imageUrl: string;
  rating: number;
  contact: string;
}

const NearMe: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [nearbyProviders, setNearbyProviders] = useState<Provider[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        console.log("Current Location:", { lat: latitude, lng: longitude });
      },
      (error) => console.error("Error fetching location:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (!mapRef.current || !userLocation) return;

    const map = L.map(mapRef.current).setView([userLocation.lat, userLocation.lng], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker([userLocation.lat, userLocation.lng])
      .addTo(map)
      .bindPopup("Your Location")
      .openPopup();

    const degToRad = (deg: number) => (deg * Math.PI) / 180;
    const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371;
      const dLat = degToRad(lat2 - lat1);
      const dLon = degToRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) *
          Math.cos(degToRad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(userLocation.lat + "," + userLocation.lng)}`)
      .then((res) => res.json())
      .then((locationData) => {
        if (locationData.length === 0) return;
        const city = locationData[0].display_name;
        const filteredProviders = providers.filter((provider: Provider) => provider.location.includes(city));
        setNearbyProviders(filteredProviders);

        filteredProviders.forEach((provider: Provider) => {
          fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(provider.location)}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.length > 0) {
                const providerCoords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
                const distance = haversineDistance(userLocation.lat, userLocation.lng, providerCoords.lat, providerCoords.lng);
                if (distance <= 1000) {
                  L.marker([providerCoords.lat, providerCoords.lng])
                    .addTo(map)
                    .bindPopup(`${provider.name} - ${provider.serviceCategory} (${distance.toFixed(2)} km away)`);
                }
              }
            });
        });
      });

    return () => map.remove();
  }, [userLocation]);

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: "400px", borderRadius: "10px", zIndex: 5 }} />
      <h2>Nearby Providers</h2>
      <ul>
        {nearbyProviders.map((provider) => (
          <li key={provider.$id}>
            <img src={provider.imageUrl} alt={provider.name} width={50} />
            <p>{provider.name} - {provider.serviceCategory}</p>
            <p>Rating: {provider.rating}</p>
            <p>Contact: {provider.contact}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearMe;
