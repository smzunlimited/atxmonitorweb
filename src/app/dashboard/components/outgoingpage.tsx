import React, { useEffect, useState } from "react";

interface TableProps {
  variable1: string;
  variable2: string;
  variable3: string;
  variable4: string;
  variable5: string;
  variable6: string;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
  value6: string;
}

const Table: React.FC<TableProps> = ({
  variable1,
  variable2,
  variable3,
  variable4,
  variable5,
  variable6,
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
}) => {
  return (
    <table className="bg-white border border-black text-black w-70 h-40 table-fixed shadow-lg">
      <tbody>
        <tr className="border border-black">
          <td className="p-1 border border-black">{variable1}</td>
          <td className="p-1 border border-black">{value1}</td>
        </tr>
        <tr className="border border-black">
          <td className="p-1 border border-black">{variable2}</td>
          <td className="p-1 border border-black">{value2}</td>
        </tr>
        <tr className="border border-black">
          <td className="p-1 border border-black">{variable3}</td>
          <td className="p-1 border border-black">{value3}</td>
        </tr>
        <tr className="border border-black">
          <td className="p-1 border border-black">{variable4}</td>
          <td className="p-1 border border-black">{value4}</td>
        </tr>
        <tr className="border border-black">
          <td className="p-1 border border-black">{variable5}</td>
          <td className="p-1 border border-black">{value5}</td>
        </tr>
        <tr className="border border-black">
          <td className="p-1 border border-black">{variable6}</td>
          <td className="p-1 border border-black">{value6}</td>
        </tr>
      </tbody>
    </table>
  );
};

interface OutgoingProps {
  onPageChange: (page: string) => void;
}

const Outgoing: React.FC<OutgoingProps> = ({ onPageChange }) => {
  const [selectedPhase, setSelectedPhase] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [tableData, setTableData] = useState({
    frequency: 0,
    zeroLineCurrent: 0,
    totalActivePower: 0,
    totalPowerFactor: 0,
    totalReactivePower: 0,
    totalApparentPower: 0,
    phaseVoltage: 0,
    phaseCurrent: 0,
    activePower: 0,
    reactivePower: 0,
    apparentPower: 0,
    powerFactor: 0,
  });
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (selectedPhase && selectedChannel) {
      const generateRandomData = () => {
        const newTableData = {
          frequency: parseFloat((Math.random() * (51 - 49) + 49).toFixed(3)),
          zeroLineCurrent: parseFloat(
            (Math.random() * (10 - 0) + 0).toFixed(3)
          ),
          totalActivePower: parseFloat(
            (Math.random() * (2.2 - 2) + 2).toFixed(3)
          ),
          totalPowerFactor: 1.0,
          totalReactivePower: parseFloat(
            (Math.random() * (0.125 - 0.1) + 0.1).toFixed(3)
          ),
          totalApparentPower: parseFloat(
            (Math.random() * (1000 - 0) + 0).toFixed(3)
          ),
          phaseVoltage: parseFloat(
            (Math.random() * (240 - 220) + 220).toFixed(3)
          ),
          phaseCurrent: parseFloat(
            (Math.random() * (10 - 9.6) + 9.6).toFixed(3)
          ),
          activePower: parseFloat(
            (Math.random() * (2.2 - 2.1) + 2.1).toFixed(3)
          ),
          reactivePower: parseFloat(
            (Math.random() * (0.13 - 0.1) + 0.1).toFixed(3)
          ),
          apparentPower: parseFloat(
            (Math.random() * (1000 - 0) + 0).toFixed(3)
          ),
          powerFactor: 1.0,
        };
        setTableData(newTableData);
      };

      interval = setInterval(generateRandomData, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [selectedPhase, selectedChannel]);

  const handlePhaseClick = (phase: string) => {
    setSelectedPhase(phase);
  };

  const handleChannelClick = (channel: string) => {
    setSelectedChannel(channel);
  };
  const extractedPhase = selectedPhase.split(" ")[1];

  // Extracting the channel number
  const extractedChannel = selectedChannel.split(" ")[1];

  return (
    <div className="bg-green-100 min-h-screen flex flex-col items-center pt-0">
      <div className="bg-blue-500 w-full flex items-center justify-center py-2">
        <h1 className="text-xl font-bold text-white">OUTGOING</h1>
      </div>
      <div className="bg-white px-8 py-8 mt-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex space-x-4  ">
            <div className="text-black font-bold">
              <p>Selected Channel: {extractedChannel}</p>
            </div>
            <div className="text-black font-bold">
              <p>Selected Phase: {extractedPhase}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-8">
          <div className="grid grid-cols-2 gap-1 mr-8">
            <button
              className="bg-white text-gray-800 font-bold py-1 rounded-lg border-2 border-blue-500 text-xs"
              onClick={() => handleChannelClick("Channel 1")}
            >
              Channel 1
            </button>
            <div></div> {/* Empty cell */}
            <div></div> {/* Empty cell */}
            <button
              className="bg-white text-gray-800 font-bold py-1 rounded-lg border-2 border-blue-500 text-xs"
              onClick={() => handlePhaseClick("Phase A")}
            >
              Phase A
            </button>
            <button
              className="bg-white text-gray-800 font-bold py-1 rounded-lg border-2 border-blue-500 text-xs"
              onClick={() => handleChannelClick("Channel 2")}
            >
              Channel 2
            </button>
            <div></div> {/* Empty cell */}
            <div></div> {/* Empty cell */}
            <button
              className="bg-white text-gray-800 font-bold py-1 rounded-lg border-2 border-blue-500 text-xs"
              onClick={() => handlePhaseClick("Phase B")}
            >
              Phase B
            </button>
            <button
              className="bg-white text-gray-800 font-bold py-1 rounded-lg border-2 border-blue-500 text-xs"
              onClick={() => handleChannelClick("Channel 3")}
            >
              Channel 3
            </button>
            <div></div> {/* Empty cell */}
            <div></div> {/* Empty cell */}
            <button
              className="bg-white text-gray-800 font-bold py-1 rounded-lg border-2 border-blue-500 text-xs"
              onClick={() => handlePhaseClick("Phase C")}
            >
              Phase C
            </button>
            <div></div> {/* Empty cell */}
            <div></div> {/* Empty cell */}
            <button
              className="bg-white text-gray-800 font-bold py-1 rounded-lg border-2 border-blue-500 text-xs"
              onClick={() => handleChannelClick("Channel 4")}
            >
              Channel 4
            </button>
            <div></div> {/* Empty cell */}
          </div>

          <div>
            <Table
              variable1="Frequency"
              variable2="Zero Line Current"
              variable3="Total Active Power"
              variable4="Total Power Factor"
              variable5="Total Reactive Power"
              variable6="Total Apparent Power"
              value1={tableData.frequency.toString()}
              value2="----"
              value3={tableData.totalActivePower.toString()}
              value4={tableData.totalPowerFactor.toString()}
              value5={tableData.totalReactivePower.toString()}
              value6="----"
            />
          </div>
          <div className="flex">
            <Table
              variable1="Phase Voltage"
              variable2="Phase Current"
              variable3="Active Power"
              variable4="Reactive Power"
              variable5="Apparent Power"
              variable6="Power Factor"
              value1={tableData.phaseVoltage.toString()}
              value2={tableData.phaseCurrent.toString()}
              value3={tableData.activePower.toString()}
              value4={tableData.reactivePower.toString()}
              value5="----"
              value6={tableData.powerFactor.toString()}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
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
      </div>
    </div>
  );
};

export default Outgoing;
