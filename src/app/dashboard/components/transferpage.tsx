// meter.tsx

import React, { useState } from "react";

interface TransferProps {
  onPageChange: (page: string) => void;
}

const Transfer: React.FC<TransferProps> = ({ onPageChange }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const minDate = "2023-12-01";
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const maxDate = tomorrow.toISOString().split("T")[0];

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  // Function to generate random number within a range
  const randomNumber = (min: number, max: number) => {
    return (Math.random() * (max - min) + min).toFixed(2);
  };

  // Function to generate CSV content
  const generateCSV = () => {
    const incomingData = {
      voltage: {
        phaseA: randomNumber(220, 240),
        phaseB: randomNumber(220, 240),
        phaseC: randomNumber(220, 240),
      },
      activePower: {
        phaseA: randomNumber(2, 2.5),
        phaseB: randomNumber(2, 2.5),
        phaseC: randomNumber(2, 2.5),
      },
      voltageBetween: {
        phaseAB: randomNumber(380, 400),
        phaseCB: randomNumber(380, 400),
        phaseAC: randomNumber(380, 400),
      },
      totalActivePower: randomNumber(2, 2.5),
      current: {
        phaseA: randomNumber(9.5, 10),
        phaseB: randomNumber(9.5, 10),
        phaseC: randomNumber(9.5, 10),
      },
    };

    const outgoingData = {
      frequency: randomNumber(49.5, 50.5),
      totalActivePower: randomNumber(2, 2.2),
      totalPowerFactor: 1.0,
      totalReactivePower: randomNumber(0.1, 0.125),
      phaseVoltage: randomNumber(220, 240),
      phaseCurrent: randomNumber(9.6, 10),
      activePower: randomNumber(2.1, 2.2),
      reactivePower: randomNumber(0.1, 0.13),
      powerFactor: 1.0,
    };

    let csvContent = `Selected Date: ${selectedDate}\n\n`;
    csvContent += "Incoming Page\n";
    csvContent += `Voltage,Phase A,Phase B,Phase C\n`;
    csvContent += `,${incomingData.voltage.phaseA},${incomingData.voltage.phaseB},${incomingData.voltage.phaseC}\n`;
    csvContent += `Active Power,Phase A,Phase B,Phase C\n`;
    csvContent += `,${incomingData.activePower.phaseA},${incomingData.activePower.phaseB},${incomingData.activePower.phaseC}\n`;
    csvContent += `Voltage Between,Phase A & B,Phase C & B,Phase A & C\n`;
    csvContent += `,${incomingData.voltageBetween.phaseAB},${incomingData.voltageBetween.phaseCB},${incomingData.voltageBetween.phaseAC}\n`;
    csvContent += `,Zero Line Current,Total Active Power,Total Reactive Power\n`;
    csvContent += `,----,${incomingData.totalActivePower},----\n`;
    csvContent += `Current,Phase A,Phase B,Phase C\n`;
    csvContent += `,${incomingData.current.phaseA},${incomingData.current.phaseB},${incomingData.current.phaseC}\n`;
    csvContent += `Reactive Power,Phase A,Phase B,Phase C\n`;
    csvContent += `,----,----,----\n\n`;

    csvContent += "Outgoing\n";
    csvContent += `Frequency,${outgoingData.frequency}\n`;
    csvContent += `Zero Line Current,----\n`;
    csvContent += `Total Active Power,${outgoingData.totalActivePower}\n`;
    csvContent += `Total Power Factor,${outgoingData.totalPowerFactor}\n`;
    csvContent += `Total Reactive Power,${outgoingData.totalReactivePower}\n`;
    csvContent += `Total Apparent Power,----\n`;
    csvContent += `Phase Voltage,${outgoingData.phaseVoltage}\n`;
    csvContent += `Phase Current,${outgoingData.phaseCurrent}\n`;
    csvContent += `Active Power,${outgoingData.activePower}\n`;
    csvContent += `Reactive Power,${outgoingData.reactivePower}\n`;
    csvContent += `Apparent Power,----\n`;
    csvContent += `Power Factor,${outgoingData.powerFactor}\n`;

    return csvContent;
  };

  const handleDownload = () => {
    if (!selectedDate) {
      alert("Please select a date before downloading the data.");
      return;
    }

    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `meter_data_${selectedDate}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-green-100 min-h-screen flex flex-col items-center pt-0">
      <div className="bg-blue-500 w-full flex items-center justify-center py-2">
        <h1 className="text-xl font-bold text-white">TRANSFER</h1>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <div className="mb-4">
          <label
            htmlFor="datePicker"
            className="block text-sm font-medium text-gray-700"
          >
            Select date:
          </label>
          <input
            type="date"
            id="datePicker"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={selectedDate}
            onChange={handleDateChange}
            min={minDate}
            max={maxDate}
          />
        </div>
        <div className="flex gap-8">
          <button
            className="bg-white text-gray-800 font-bold py-1 px-2 rounded-lg border-2 border-blue-500 text-xs mt-8"
            onClick={handleDownload}
          >
            Download Data
          </button>
          <button
            className="bg-white text-gray-800 font-bold py-1 px-2 rounded-lg border-2 border-blue-500 text-xs mt-8"
            onClick={() => onPageChange("dashboard")}
          >
            HOMEPAGE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
