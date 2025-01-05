import React from "react";

const Home = () => {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Selamat Datang di Aplikasi Jadwal Piket Asrama
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Kelola jadwal piket asrama Anda dengan mudah dan otomatis!
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="/members"
          className="px-6 py-3 rounded-lg shadow bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Kelola Anggota
        </a>
        <a
          href="/schedule"
          className="px-6 py-3 rounded-lg shadow bg-green-500 text-white hover:bg-green-600 transition"
        >
          Lihat Jadwal
        </a>
      </div>
    </div>
  );
};

export default Home;
