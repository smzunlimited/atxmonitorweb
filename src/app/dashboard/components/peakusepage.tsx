import React, { useEffect, useState } from "react";

interface TableProps {
  title: string;
  name1: string;
  name2: string;
  name3: string;
  value1: string;
  value2: string;
  value3: string;
}

const Table: React.FC<TableProps> = ({
  title,
  name1,
  name2,
  name3,
  value1,
  value2,
  value3,
}) => {
  return (
    <table className="bg-white border border-black text-black table-fixed shadow-lg">
      <thead>
        <tr>
          <th colSpan={2} className="border-b border-black p-1">
            {title}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="border border-black">
          <td className="px-2 border border-black">{name1}</td>
          <td className="px-2 border border-black">{value1}</td>
        </tr>
        <tr className="border border-black">
          <td className="px-2 border border-black">{name2}</td>
          <td className="px-2 border border-black">{value2}</td>
        </tr>
        <tr className="border border-black">
          <td className="px-2 border border-black">{name3}</td>
          <td className="px-2 border border-black">{value3}</td>
        </tr>
      </tbody>
    </table>
  );
};

interface PeakuseProps {
  onPageChange: (page: string) => void;
}

const Peakuse: React.FC<PeakuseProps> = ({ onPageChange }) => {
  const [tableData, setTableData] = useState({
    voltage: { phaseA: 0, phaseB: 0, phaseC: 0 },
    activePower: { phaseA: 0, phaseB: 0, phaseC: 0 },
    voltageBetween: { phaseAB: 0, phaseCB: 0, phaseAC: 0 },
    current: { phaseA: 0, phaseB: 0, phaseC: 0 },
    reactivePower: { phaseA: 0, phaseB: 0, phaseC: 0 },
    zeroLineCurrent: 0,
    totalActivePower: 0,
    totalReactivePower: 0,
  });

  useEffect(() => {
    const generateRandomData = () => {
      const newTableData = {
        voltage: {
          phaseA: 245.94,
          phaseB: 245.94,
          phaseC: 245.94,
        },
        activePower: {
          phaseA: 2.45,
          phaseB: 2.45,
          phaseC: 2.45,
        },
        voltageBetween: {
          phaseAB: 390.96,
          phaseCB: 390.96,
          phaseAC: 390.96,
        },
        current: {
          phaseA: 9.82,
          phaseB: 9.82,
          phaseC: 9.82,
        },
        reactivePower: {
          phaseA: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
          phaseB: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
          phaseC: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
        },
        zeroLineCurrent: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
        totalActivePower: 2.47,
        totalReactivePower:
          Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
      };
      setTableData(newTableData);
    };

    const interval = setInterval(generateRandomData, 1000); // Update every 1 second

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-green-100 min-h-screen flex flex-col items-center pt-0">
      <div className="bg-blue-500 w-full flex items-center justify-center py-2">
        <h1 className="text-xl font-bold text-white">PEAK USE</h1>
      </div>
      <div className="py-3"></div>
      <div className="grid grid-cols-4 gap-6 p-8 bg-white">
        <Table
          title="Voltage"
          name1="Phase A"
          name2="Phase B"
          name3="Phase C"
          value1={tableData.voltage.phaseA.toString()}
          value2={tableData.voltage.phaseB.toString()}
          value3={tableData.voltage.phaseC.toString()}
        />
        <Table
          title="Active Power"
          name1="Phase A"
          name2="Phase B"
          name3="Phase C"
          value1={tableData.activePower.phaseA.toString()}
          value2={tableData.activePower.phaseB.toString()}
          value3={tableData.activePower.phaseC.toString()}
        />
        <Table
          title="Voltage Between"
          name1="Phase A & B"
          name2="Phase C & B"
          name3="Phase A & C"
          value1={tableData.voltageBetween.phaseAB.toString()}
          value2={tableData.voltageBetween.phaseCB.toString()}
          value3={tableData.voltageBetween.phaseAC.toString()}
        />
        <Table
          title=""
          name1="Zero Line Current"
          name2="Total Active Power"
          name3="Total Reactive Power"
          value1="----"
          value2={tableData.totalActivePower.toString()}
          value3="----"
        />
        <Table
          title="Current"
          name1="Phase A"
          name2="Phase B"
          name3="Phase C"
          value1={tableData.current.phaseA.toString()}
          value2={tableData.current.phaseB.toString()}
          value3={tableData.current.phaseC.toString()}
        />
        <Table
          title="Reactive Power"
          name1="Phase A"
          name2="Phase B"
          name3="Phase C"
          value1="----"
          value2="----"
          value3="----"
        />
        <div className="col-span-2 flex justify-center items-center text-x2 text-black">
          Under Development
        </div>
      </div>
      <button
        className="bg-white text-gray-800 font-bold py-1 px-2 rounded-lg border-2 border-blue-500 text-xs mt-8"
        onClick={() => onPageChange("dashboard")}
      >
        HOMEPAGE
      </button>
    </div>
  );
};

export default Peakuse;
