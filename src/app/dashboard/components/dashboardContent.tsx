// DashboardContent.tsx

import React from "react";
import Image from "next/image";

interface DashboardContentProps {
  uid: string;
  onPageChange: (page: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  uid,
  onPageChange,
}) => {
  return (
    <div className="bg-green-100 min-h-screen flex flex-col items-center justify-center">
      <div className="mb-8">
        <Image src="/atxlogoNOBG.png" alt="Logo" width={300} height={400} />
      </div>

      <div className="grid grid-cols-4 gap-8">
        <button
          className="bg-white text-gray-800 font-bold py-1 px-2 rounded-lg border-2 border-blue-500 text-xs"
          onClick={() => onPageChange("meter")}
        >
          METER
        </button>
        <button
          className="bg-white text-gray-800 font-bold py-1 px-2 rounded-lg border-2 border-blue-500 text-xs"
          onClick={() => onPageChange("transfer")}
        >
          TRANSFER
        </button>
        <button
          className="bg-white text-gray-800 font-bold py-1 px-2 rounded-lg border-2 border-blue-500 text-xs"
          onClick={() => onPageChange("peakuse")}
        >
          PEAK USE
        </button>
        <button className="bg-white text-gray-800 font-bold py-1 px-2 rounded-lg border-2 border-blue-500 text-xs">
          CLOUD
        </button>
      </div>
    </div>
  );
};

export default DashboardContent;
