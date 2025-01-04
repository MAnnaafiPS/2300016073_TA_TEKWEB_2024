import React, { useState, useEffect } from "react";
import styles from "../styles/Schedule.module.css";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [members, setMembers] = useState([]);

  // Load members dari members.json dan localStorage
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const savedMembers = JSON.parse(localStorage.getItem("members")) || [];

        const response = await fetch("/data/members.json");
        const jsonMembers = await response.json();

        const mergedMembers = [...savedMembers, ...jsonMembers].filter(
          (member, index, self) =>
            index === self.findIndex((m) => m.id === member.id)
        );

        setMembers(mergedMembers);
        localStorage.setItem("members", JSON.stringify(mergedMembers));
      } catch (error) {
        console.error("Error loading members:", error);
      }
    };

    loadMembers();

    const savedSchedule = JSON.parse(localStorage.getItem("schedule")) || [];
    setSchedule(savedSchedule);
  }, []);

  const generateSchedule = () => {
    if (members.length === 0) {
      alert("Tidak ada anggota untuk dijadwalkan.");
      return;
    }
  
    const floors = ["1A", "1B", "2", "3"];
    const wcs = ["1A", "1B", "2A", "2B", "3A", "3B"];
  
    let newSchedule = [];
    let wcIndexStart = 0; // Mulai index untuk WC
  
    for (let day = 1; day <= 30; day++) {
      const validMembers = members.filter((member) => member.name);
  
      const dailyFloor = floors.map((floor, i) => ({
        floor,
        member: validMembers[(day + i) % validMembers.length]?.name || "N/A",
      }));
  
      // Simpan nilai awal untuk WC index
      const localWcIndexStart = wcIndexStart;
  
      const dailyWc = wcs.map((wc, i) => ({
        wc,
        member: validMembers[(localWcIndexStart + i) % validMembers.length]?.name || "N/A",
      }));
  
      wcIndexStart += wcs.length;
  
      newSchedule.push({
        day,
        floors: dailyFloor,
        wc: dailyWc,
      });
    }
  
    setSchedule(newSchedule);
    localStorage.setItem("schedule", JSON.stringify(newSchedule));
    alert("Jadwal berhasil di-generate.");
  };
  

  const clearSchedule = () => {
    setSchedule([]);
    localStorage.removeItem("schedule");
    alert("Jadwal berhasil dihapus.");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Jadwal Piket Bulanan</h2>
      <div className="mb-4 flex gap-4">
        <button
          onClick={generateSchedule}
          className={`${styles.button} ${styles.buttonGenerate}`}
        >
          Generate Jadwal
        </button>
        <button
          onClick={clearSchedule}
          className={`${styles.button} ${styles.buttonClear}`}
        >
          Hapus Jadwal
        </button>
      </div>
      <div className={styles.scheduleGrid}>
        {Array.from({ length: 30 }, (_, i) => {
          const currentDay = i + 1;
          const dayData = schedule.find((entry) => entry.day === currentDay);

          return (
            <div key={currentDay} className={styles.scheduleCard}>
              <h3 className={styles.cardTitle}>Hari {currentDay}</h3>
              {dayData ? (
                <div className={styles.cardContent}>
                  <ul className={styles.floorList}>
                    {dayData.floors.map((floor, index) => (
                      <li key={index}>
                        {floor.floor}: {floor.member}
                      </li>
                    ))}
                  </ul>
                  <ul className={styles.wcList}>
                    {dayData.wc.map((wc, index) => (
                      <li key={index}>
                        WC {wc.wc}: {wc.member}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className={styles.noData}>Tidak ada data</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
