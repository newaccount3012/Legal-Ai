import React, { useState } from "react";
import HeaderDB from "./HeaderDB";
import avat from "../assets/Avatar.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { FlipWords } from '../Components/Background/flipwords';
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const timetable = [
  {
    day: "MON",
    slots: ["PRP Lab C-1", "B", "21CSC206T", "21CSC205L", "L", "21MAB301T", "MMI", "21CSE251T / 21CSE224T"],
  },
  {
    day: "TUE",
    slots: ["21CSC204J", "R", "21CSC205P", "21PDH209T", "U", "21CSC204J", "21CSC206T", "21CSE251T / 21CSE224T"],
  },
  {
    day: "WED",
    slots: ["21MAB301T", "E", "PRP", "21CSC205P Lab", "N", "21CSC204J", "21PDH209T", "21CSE251T / 21CSE224T"],
  },
  {
    day: "THU",
    slots: ["21CSC206T", "A", "21CSC205P", "PRP Lab C-1", "C", "21CSC206T", "21MAB301T", "21CSE251T / 21CSE224T"],
  },
  {
    day: "FRI",
    slots: ["21CSC204J Lab 4", "K", "21CSC206T", "21MAB301T", "H", "21LEM202T", "21CSC204J", "21CSE251T / 21CSE224T"],
  },
];

export const EventSRM = () => {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const { theme } = useTheme();
  const [color, setColor] = useState("#000000");
  const words = ['healthcare', 'lifestyle']

  return (
    <div className="bg-[#ffffff] h-screen w-screen">
      {/* Header */}
      <HeaderDB />

      {/* Timetable Section */}
      <div className="flex flex-col  items-center ml-[20%] p-8">
        <h1 className="bg-gradient-to-r from-[#192336f9] via-[#3f4f7a] to-[#30CFD0] font-semibold font-Lato text-6xl mb-16 inline-block text-transparent text-center bg-clip-text">Academia, Your Gateway To<br/>Campus</h1>
        <FlipWords className="text-3xl text-gray-950" words={words}/>
        <div className="flex flex-row rounded-lg shadow-[rgba(0,_0,_0,_0.3)_0px_30px_90px] max-5xl max-h-[750px] overflow-x-auto">

          {/* Timetable */}
          <div className="flex flex-1">
            {timetable.map((day, index) => (
              <div key={index} className="border-r border-gray-400 min-w-[200px]">
                <div className="text-sm font-bold text-center p-5 bg-gray-200">{day.day}</div>
                {day.slots.map((slot, idx) => (
                  <Link key={idx} to={`/timetable/${slot}`}>
                    <div
                      className={`p-4 border-b border-gray-300 ${
                        idx % 2 === 0 ? "bg-blue-100" : "bg-green-100"
                      }`}
                    >
                      <p className="text-xs text-center">{slot}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
