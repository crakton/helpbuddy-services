import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxWrapper from "@/lib/providers/redux_wrapper";
import { AuthProvider } from "@/context/UserContext"
import ServiceProvider from "@/context/ServiceContext";
import { BookingProvider } from "@/context/BookingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Afruna :: Services",
  description:
    "Get into the epicenter of the happenings from varieties of services that we offer.",
};
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <BookingProvider>


        <ServiceProvider>

        <ReduxWrapper>{children}</ReduxWrapper>
        </ServiceProvider >
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
