"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { getServices } from "@/lib/services/serviceServices";
import { Models } from "appwrite";



interface ServiceProps {}

const ServicesContext = createContext<ServiceProps | undefined>(undefined);
 const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const data = await getServices(page);
                setServices(data as {}[]);
                setTotalPages(data.length > 0 ? data[0].totalPages : 1);
                console.log(data);
                console.log(data[0].availability);
            } catch (error) {
                console.log(error);
                setError(error)
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [page]);

    return (
        <ServicesContext.Provider value={{ services, loading, error, page, setPage, totalPages }}>
        {children}
        </ServicesContext.Provider>
    );
};

export const useServices = () => useContext(ServicesContext);
export default ServiceProvider;