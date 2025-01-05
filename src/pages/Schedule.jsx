import React, { useState, useEffect } from "react";

// Fungsi untuk mengambil anggota dari JSON Server
const fetchMembers = async () => {
  const response = await fetch("http://localhost:5000/members");
  if (!response.ok) {
    throw new Error("Gagal mengambil data anggota");
  }
  return await response.json();
};

// Fungsi untuk mengambil jadwal dari JSON Server
const fetchSchedule = async () => {
  const response = await fetch("http://localhost:5000/schedule");
  if (!response.ok) {
    throw new Error("Gagal mengambil data jadwal");
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

// Data jumlah hari dalam setiap bulan
const months = [
  { name: "Januari", days: 31 },
  { name: "Februari", days: 28 },
  { name: "Maret", days: 31 },
  { name: "April", days: 30 },
  { name: "Mei", days: 31 },
  { name: "Juni", days: 30 },
  { name: "Juli", days: 31 },
  { name: "Agustus", days: 31 },
  { name: "September", days: 30 },
  { name: "Oktober", days: 31 },
  { name: "November", days: 30 },
  { name: "Desember", days: 31 },
];

const Schedule = () => {
  const [schedule, setSchedule] = useState([]); // State untuk jadwal
  const [members, setMembers] = useState([]); // State untuk anggota
  const [loading, setLoading] = useState(true); // State untuk menandai loading data
  const [selectedMonth, setSelectedMonth] = useState(months[0]); // Bulan yang dipilih
  const [editMode, setEditMode] = useState(null); // Mode edit untuk hari tertentu
  const [editedFloors, setEditedFloors] = useState([]); // Data yang sedang diedit untuk lantai
  const [editedWcs, setEditedWcs] = useState([]); // Data yang sedang diedit untuk WC

  // Load anggota dan jadwal dari JSON Server saat komponen pertama kali dimuat
  useEffect(() => {
    const loadData = async () => {
      try {
        const membersData = await fetchMembers();
        setMembers(membersData);

        const scheduleData = await fetchSchedule();
        setSchedule(scheduleData);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false); // Data selesai dimuat
      }
    };
    loadData();
  }, []);

  // Fungsi untuk menyimpan jadwal ke JSON Server
  const saveScheduleToServer = async (updatedDay) => {
    await fetch(`http://localhost:5000/schedule/${updatedDay.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDay),
    });

    const updatedSchedule = await fetchSchedule();
    setSchedule(updatedSchedule);
    setEditMode(null); // Keluar dari mode edit
  };

  // Fungsi untuk generate jadwal berdasarkan bulan yang dipilih
  const generateSchedule = async () => {
    if (members.length === 0) {
      alert("Tidak ada anggota untuk dijadwalkan.");
      return;
    }

    const totalDays = selectedMonth.days; // Ambil jumlah hari dari bulan yang dipilih
    const floors = ["1A", "1B", "2", "3"];
    const wcs = ["1A", "1B", "2A", "2B", "3A", "3B"];

    let newSchedule = [];
    let wcIndexStart = 0; // Mulai index untuk WC

    for (let day = 1; day <= totalDays; day++) {
      const validMembers = members.filter((member) => member.name);

      const dailyFloor = floors.map((floor, i) => ({
        floor,
        member: validMembers[(day + i - 1) % validMembers.length]?.name || "N/A",
      }));

      const localWcIndexStart = wcIndexStart;

      const dailyWc = wcs.map((wc, i) => ({
        wc,
        member: validMembers[(localWcIndexStart + i) % validMembers.length]?.name || "N/A",
      }));

      wcIndexStart += wcs.length;

      newSchedule.push({
        day,
        month: selectedMonth.name,
        floors: dailyFloor,
        wc: dailyWc,
      });
    }

    for (const day of newSchedule) {
      await fetch("http://localhost:5000/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(day),
      });
    }

    const updatedSchedule = await fetchSchedule();
    setSchedule(updatedSchedule);
    alert(`Jadwal untuk bulan ${selectedMonth.name} berhasil di-generate.`);
  };

  const clearSchedule = async () => {
    const allSchedules = await fetchSchedule();
    for (const schedule of allSchedules) {
      await fetch(`http://localhost:5000/schedule/${schedule.id}`, {
        method: "DELETE",
      });
    }
    setSchedule([]);
    alert("Semua jadwal berhasil dihapus.");
  };

  // Fungsi untuk masuk ke mode edit
  const handleEdit = (day) => {
    setEditMode(day.id); // Masuk ke mode edit untuk hari tertentu
    setEditedFloors(day.floors);
    setEditedWcs(day.wc);
  };

  // Fungsi untuk menyimpan perubahan
  const handleSave = async (day) => {
    const updatedDay = {
      ...day,
      floors: editedFloors,
      wc: editedWcs,
    };
    await saveScheduleToServer(updatedDay);
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Jadwal Piket Bulanan</h2>

      <div className="mb-4">
        <label htmlFor="monthSelect" className="block text-gray-700 mb-2">
          Pilih Bulan:
        </label>
        <select
          id="monthSelect"
          value={selectedMonth.name}
          onChange={(e) =>
            setSelectedMonth(months.find((month) => month.name === e.target.value))
          }
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {months.map((month) => (
            <option key={month.name} value={month.name}>
              {month.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 flex gap-4 justify-center">
        <button
          onClick={generateSchedule}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Generate Jadwal
        </button>
        <button
          onClick={clearSchedule}
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Hapus Semua Jadwal
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Memuat data...</p>
      ) : schedule.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedule.map((day) => (
            <div key={day.id} className="p-4 bg-white border rounded shadow hover:shadow-lg">
              <h3 className="font-bold text-lg text-gray-700 mb-3">
                {day.month} - Hari {day.day}
              </h3>
              {editMode === day.id ? (
                <div>
                  <div>
                    <h4 className="font-bold">Lantai:</h4>
                    {editedFloors.map((floor, index) => (
                      <div key={index} className="mb-2">
                        <span>{floor.floor}:</span>
                        <input
                          type="text"
                          value={floor.member}
                          onChange={(e) => {
                            const updatedFloors = [...editedFloors];
                            updatedFloors[index].member = e.target.value;
                            setEditedFloors(updatedFloors);
                          }}
                          className="ml-2 border rounded px-2 py-1"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-bold">WC:</h4>
                    {editedWcs.map((wc, index) => (
                      <div key={index} className="mb-2">
                        <span>{wc.wc}:</span>
                        <input
                          type="text"
                          value={wc.member}
                          onChange={(e) => {
                            const updatedWcs = [...editedWcs];
                            updatedWcs[index].member = e.target.value;
                            setEditedWcs(updatedWcs);
                          }}
                          className="ml-2 border rounded px-2 py-1"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleSave(day)}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Simpan
                  </button>
                </div>
              ) : (
                <div>
                  <div>
                    <h4 className="font-bold">Lantai:</h4>
                    <ul>
                      {day.floors.map((floor, index) => (
                        <li key={index}>
                          {floor.floor}: {floor.member}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold">WC:</h4>
                    <ul>
                      {day.wc.map((wc, index) => (
                        <li key={index}>
                          WC {wc.wc}: {wc.member}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => handleEdit(day)}
                    className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">Tidak ada data jadwal</p>
      )}
    </div>
  );
};

export default Schedule;
