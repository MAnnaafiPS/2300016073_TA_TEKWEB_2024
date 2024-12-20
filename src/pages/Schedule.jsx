import React, { useState, useEffect } from "react";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const members = JSON.parse(localStorage.getItem("members")) || [];
    const generatedSchedule = generateSchedule(members);
    setSchedule(generatedSchedule);
  }, []);

  const generateSchedule = (members) => {
    if (members.length === 0) return [];

    const floors = ["1A", "1B", "2", "3"];
    const wcs = ["1A", "1B", "2A", "2B", "3A", "3B"];

    let schedule = [];
    let wcIndexStart = 0; // Awal rotasi untuk WC
    let lastAssignedFloorMembers = []; // Untuk melacak petugas lantai sebelumnya

    for (let day = 1; day <= 30; day++) {
      // Piket Lantai
      let dailyFloor = [];
      let assignedMembers = new Set(); // Untuk memastikan petugas lantai unik setiap hari

      for (let i = 0; i < floors.length; i++) {
        let memberIndex = (day + i) % members.length; // Rotasi petugas
        while (
          assignedMembers.has(members[memberIndex]) || // Pastikan petugas tidak sama dalam sehari
          lastAssignedFloorMembers.includes(members[memberIndex]) // Pastikan petugas berbeda dari hari sebelumnya
        ) {
          memberIndex = (memberIndex + 1) % members.length;
        }
        assignedMembers.add(members[memberIndex]);
        dailyFloor.push({ floor: floors[i], member: members[memberIndex] });
      }
      lastAssignedFloorMembers = dailyFloor.map((floor) => floor.member); // Update petugas lantai hari ini

      // Piket WC
      let dailyWc = [];
      let wcAssignedMembers = new Set(); // Untuk memastikan petugas WC unik

      for (let i = 0; i < wcs.length; i++) {
        let memberIndex =
          (wcIndexStart + i) % members.length; // Rotasi petugas untuk WC
        while (wcAssignedMembers.has(members[memberIndex])) {
          memberIndex = (memberIndex + 1) % members.length; // Pastikan petugas tidak sama
        }
        wcAssignedMembers.add(members[memberIndex]);
        dailyWc.push({ wc: wcs[i], member: members[memberIndex] });
      }

      wcIndexStart += wcs.length; // Rotasi awal untuk periode berikutnya

      schedule.push({
        day,
        floors: dailyFloor,
        wc: dailyWc,
      });
    }

    return schedule;
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Jadwal Piket Bulanan
      </h2>
      <div className="grid grid-cols-7 gap-2 text-center text-gray-700 font-bold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-4">
        {Array.from({ length: 30 }, (_, i) => {
          const currentDay = i + 1;
          const dayData = schedule.find((entry) => entry.day === currentDay);

          return (
            <div
              key={currentDay}
              className="h-48 border rounded-lg p-2 bg-white shadow-md text-sm"
            >
              <h3 className="text-gray-800 font-bold mb-2">Hari {currentDay}</h3>
              {dayData ? (
                <div>
                  {/* Jadwal Lantai */}
                  <ul className="text-xs text-gray-600">
                    {dayData.floors.map((floor, index) => (
                      <li key={index}>
                        <span className="font-medium text-gray-700">
                          {floor.floor}:
                        </span>{" "}
                        {floor.member}
                      </li>
                    ))}
                  </ul>
                  {/* Jadwal WC */}
                  <ul className="text-xs text-blue-600 mt-2">
                    {dayData.wc.map((wc, index) => (
                      <li key={index}>
                        <span className="font-medium text-gray-700">
                          WC {wc.wc}:
                        </span>{" "}
                        {wc.member}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-400">Belum ada data</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
