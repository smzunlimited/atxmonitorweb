"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import firebaseAuth from "@/app/firebase/firebaseAuth";
import firestore from "@/app/firebase/firebaseFirestoreQueries";
import withAuth from "../firebase/withAuth";

interface Device {
  company: string;
  device: string;
}

const dummyEnergyMeters = [
  "Smart Meter Model A",
  "Advanced Power Meter B",
  "Residential Energy Monitor C",
  "Industrial Power Meter D",
  "Solar Energy Meter E",
];

const dummyPowerQualityDevices = [
  "Power Quality Analyzer X",
  "Voltage Fluctuation Monitor Y",
  "Harmonic Distortion Detector Z",
  "Power Factor Corrector W",
];

const SelectDevicePage: React.FC = () => {
  const router = useRouter();
  const [addingEnergyMeter, setAddingEnergyMeter] = useState<boolean>(false);
  const [addingPowerQuality, setAddingPowerQuality] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [companySuggestions, setCompanySuggestions] = useState<string[]>([]);
  const [energyMeters, setEnergyMeters] = useState<Device[]>([]);
  const [powerQualityDevices, setPowerQualityDevices] = useState<Device[]>([]);

  const energyMeterRef = useRef<HTMLDivElement>(null);
  const powerQualityRef = useRef<HTMLDivElement>(null);

  const handleDeviceClick = (device: Device) => {
    router.push("/dashboard");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        energyMeterRef.current &&
        !energyMeterRef.current.contains(event.target as Node)
      ) {
        setAddingEnergyMeter(false);
      }
      if (
        powerQualityRef.current &&
        !powerQualityRef.current.contains(event.target as Node)
      ) {
        setAddingPowerQuality(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCompanyName(value);
    // TODO: Implement company name suggestions
    // This is a placeholder for the actual implementation
    if (value.length > 0) {
      setCompanySuggestions(["Company A", "Company B", "Company C"]);
    } else {
      setCompanySuggestions([]);
    }
  };

  const handleDeviceSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(e.target.value);
  };

  const handleAddDevice = (type: "energyMeter" | "powerQuality") => {
    const newDevice: Device = { company: companyName, device: selectedDevice };
    if (type === "energyMeter") {
      setEnergyMeters([...energyMeters, newDevice]);
      setAddingEnergyMeter(false);
    } else {
      setPowerQualityDevices([...powerQualityDevices, newDevice]);
      setAddingPowerQuality(false);
    }
    setCompanyName("");
    setSelectedDevice("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white flex items-center justify-start w-full py-3 px-6 shadow-md">
        <span className="text-2xl font-semibold text-[#083b56]">ATXpert</span>
      </div>
      <div className="flex-grow flex flex-col p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-600">Energy Meter</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => setAddingEnergyMeter(true)}
            >
              Add Energy Meter
            </button>
          </div>
          {addingEnergyMeter && (
            <div
              ref={energyMeterRef}
              className="mb-4 p-6 bg-white rounded-lg shadow-lg"
            >
              <input
                type="text"
                placeholder="Enter your company name"
                value={companyName}
                onChange={handleCompanyNameChange}
                className="w-full p-2 mb-2 border rounded"
              />
              {companySuggestions.length > 0 ? (
                <ul className="mb-2">
                  {companySuggestions.map((company, index) => (
                    <li
                      key={index}
                      className="cursor-pointer hover:bg-gray-100 p-1"
                      onClick={() => setCompanyName(company)}
                    >
                      {company}
                    </li>
                  ))}
                </ul>
              ) : (
                companyName.length > 0 && (
                  <p className="text-red-500 mb-2">
                    Your company is not registered
                  </p>
                )
              )}
              <select
                value={selectedDevice}
                onChange={handleDeviceSelection}
                disabled={!companyName}
                className="w-full p-2 mb-2 border rounded"
              >
                <option value="">Select Device</option>
                {dummyEnergyMeters.map((device, index) => (
                  <option key={index} value={device}>
                    {device}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleAddDevice("energyMeter")}
                disabled={!companyName || !selectedDevice}
                className={`w-full p-2 text-white rounded ${
                  companyName && selectedDevice
                    ? "bg-blue-500 hover:bg-blue-700"
                    : "bg-gray-400"
                }`}
              >
                Add
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {energyMeters.map((meter, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
                onClick={() => handleDeviceClick(meter)}
              >
                <div className="relative w-full h-40 mb-4">
                  <Image
                    src="/energymeter.jpg"
                    alt="Energy Meter"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <p className="font-semibold text-gray-800">
                  Company: {meter.company}
                </p>
                <p className="text-gray-600">Device: {meter.device}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-green-600">Power Quality</h2>
            <button
              className="bg-green-500 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => setAddingPowerQuality(true)}
            >
              Add Power Quality
            </button>
          </div>
          {addingPowerQuality && (
            <div
              ref={powerQualityRef}
              className="mb-4 p-6 bg-white rounded-lg shadow-lg"
            >
              <input
                type="text"
                placeholder="Enter your company name"
                value={companyName}
                onChange={handleCompanyNameChange}
                className="w-full p-2 mb-2 border rounded"
              />
              {companySuggestions.length > 0 ? (
                <ul className="mb-2">
                  {companySuggestions.map((company, index) => (
                    <li
                      key={index}
                      className="cursor-pointer hover:bg-gray-100 p-1"
                      onClick={() => setCompanyName(company)}
                    >
                      {company}
                    </li>
                  ))}
                </ul>
              ) : (
                companyName.length > 0 && (
                  <p className="text-red-500 mb-2">
                    Your company is not registered
                  </p>
                )
              )}
              <select
                value={selectedDevice}
                onChange={handleDeviceSelection}
                disabled={!companyName}
                className="w-full p-2 mb-2 border rounded"
              >
                <option value="">Select Device</option>
                {dummyPowerQualityDevices.map((device, index) => (
                  <option key={index} value={device}>
                    {device}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleAddDevice("powerQuality")}
                disabled={!companyName || !selectedDevice}
                className={`w-full p-2 text-white rounded ${
                  companyName && selectedDevice
                    ? "bg-green-500 hover:bg-green-700"
                    : "bg-gray-400"
                }`}
              >
                Add
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {powerQualityDevices.map((device, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <div className="relative w-full h-40 mb-4">
                  <Image
                    src="/powerquality.jpg"
                    alt="Power Quality Device"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <p className="font-semibold text-gray-800">
                  Company: {device.company}
                </p>
                <p className="text-gray-600">Device: {device.device}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(SelectDevicePage);
