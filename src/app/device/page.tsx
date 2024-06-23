// Device Page
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import firebaseAuth from "@/app/firebase/firebaseAuth";
import firestore from "@/app/firebase/firebaseFirestoreQueries";
import withAuth from "../firebase/withAuth";

const SelectDevicePage = () => {
  const router = useRouter();
  const [deviceName, setDeviceName] = useState("");

  const handleDeviceSelection = async () => {
    const user = firebaseAuth.auth.currentUser;
    if (user && user.uid && deviceName) {
      try {
        const deviceDoc = await firestore.getOrCreateDeviceDocument(
          user.uid,
          deviceName
        );
        router.push(`/dashboard?deviceId=${deviceDoc.id}`);
      } catch (error) {
        console.error("Error selecting device:", error);
        // Handle the error, show an error message, etc.
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white flex items-center justify-start w-full py-3">
        <a href="/">
          <span className="sr-only">Home</span>
          <span className="text-2xl font-semibold">
            <span className="ml-24 text-[#083b56]">ATXExpert</span>
          </span>
        </a>
      </div>
      <div className="font-sans min-h-screen flex items-center justify-center">
        <div className="max-w-sm mx-auto px-6">
          <div className="relative flex flex-wrap">
            <div className="w-full relative">
              <div className="bg-white p-6 rounded-md mt-6">
                <div className="mb-3 pb-1 text-center font-base text-gray-700">
                  <div className="mb-5 flex justify-between items-center mt-2">
                    <div className="text-left text-xl font-semibold text-black">
                      Please select a Device name to access your data
                    </div>
                  </div>
                  <input
                    type="text"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    placeholder="Enter device name"
                    className="mt-3 text-lg font-semibold bg-white w-full border border-gray-300 rounded-lg px-4 py-2 block shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleDeviceSelection}
                    className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                  >
                    Select Device
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(SelectDevicePage);
