// meter.tsx

import React from "react";
import Image from "next/image";

interface MeterProps {
  onPageChange: (page: string) => void;
}

const Meter: React.FC<MeterProps> = ({ onPageChange }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-0">
      <div className="bg-blue-500 w-full flex items-center justify-center py-2">
        <h1 className="text-xl font-bold text-white">METER</h1>
      </div>
      <div className="mb-8">
        <Image src="/meterImg.png" alt="Logo" width={300} height={200} />
      </div>

      <div className="grid grid-cols-3 gap-8">
        <button
          className="bg-white text-gray-800 font-bold py-1 px-2 rounded-lg border-2 border-blue-500 text-xs"
          onClick={() => onPageChange("dashboard")}
        >
          HOMEPAGE
        </button>
        <button
          className="bg-white text-gray-800 font-bold py-1 px-2 rounded-lg border-2 border-blue-500 text-xs"
          onClick={() => onPageChange("incoming")}
        >
          INCOMING
        </button>
        <button
          className="bg-white text-gray-800 font-bold py-1 px-2 rounded-lg border-2 border-blue-500 text-xs"
          onClick={() => onPageChange("outgoing")}
        >
          OUTGOING
        </button>
      </div>
    </div>
  );
};

export default Meter;
