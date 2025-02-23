"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { account } from "../../../../appwrite";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const VerifyMe = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (!userId || !secret) {
      setVerifying(false);
      return;
    }

    account.updateVerification(userId, secret)
      .then(() => {
        setSuccess(true);
        toast.success("Email verified successfully!");
        setTimeout(() => router.push("/authentication"), 3000);
      })
      .catch(() => {
        setSuccess(false);
        toast.error("Verification failed. Invalid or expired link.");
      })
      .finally(() => setVerifying(false));
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        {verifying ? (
          <p className="text-gray-700">Verifying your email...</p>
        ) : success ? (
          <p className="text-green-600">Email verified! Redirecting...</p>
        ) : (
          <p className="text-red-600">Verification failed. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default VerifyMe;
