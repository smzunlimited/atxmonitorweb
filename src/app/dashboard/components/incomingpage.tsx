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

interface IncomingProps {
  onPageChange: (page: string) => void;
}

const Incoming: React.FC<IncomingProps> = ({ onPageChange }) => {
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
          phaseA: parseFloat((Math.random() * (240 - 220) + 220).toFixed(2)),
          phaseB: parseFloat((Math.random() * (240 - 220) + 220).toFixed(2)),
          phaseC: parseFloat((Math.random() * (240 - 220) + 220).toFixed(2)),
        },
        activePower: {
          phaseA: parseFloat((Math.random() * (2.5 - 2) + 2).toFixed(3)),
          phaseB: parseFloat((Math.random() * (2.5 - 2) + 2).toFixed(3)),
          phaseC: parseFloat((Math.random() * (2.5 - 2) + 2).toFixed(3)),
        },
        voltageBetween: {
          phaseAB: parseFloat((Math.random() * (400 - 380) + 380).toFixed(2)),
          phaseCB: parseFloat((Math.random() * (400 - 380) + 380).toFixed(2)),
          phaseAC: parseFloat((Math.random() * (400 - 380) + 380).toFixed(2)),
        },
        current: {
          phaseA: parseFloat((Math.random() * (10 - 9.5) + 9.5).toFixed(2)),
          phaseB: parseFloat((Math.random() * (10 - 9.5) + 9.5).toFixed(2)),
          phaseC: parseFloat((Math.random() * (10 - 9.5) + 9.5).toFixed(2)),
        },
        reactivePower: {
          phaseA: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
          phaseB: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
          phaseC: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
        },
        zeroLineCurrent: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
        totalActivePower: parseFloat(
          (Math.random() * (2.5 - 2) + 2).toFixed(3)
        ),
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
        <h1 className="text-xl font-bold text-white">INCOMING</h1>
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
      <div className="grid grid-cols-2 gap-8 py-8">
        <button
          className="bg-white text-gray-800 font-bold py-1 px-2 rounded-lg border-2 border-blue-500 text-xs"
          onClick={() => onPageChange("dashboard")}
        >
          HOMEPAGE
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

export default Incoming;
