import React from "react";

const About = () => {
  return (
    <div className="px-4 py-8 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Tentang Aplikasi</h1>
      <p className="text-lg leading-relaxed text-justify mb-4">
        <span className="font-semibold text-indigo-600">AJPA</span> adalah aplikasi yang dirancang untuk membantu
        pengelolaan jadwal piket asrama secara efisien dan otomatis. Dengan aplikasi ini, Anda dapat dengan mudah
        menambahkan anggota, mengatur jadwal piket bulanan, dan memodifikasi jadwal sesuai kebutuhan.
      </p>
      <p className="text-lg leading-relaxed text-justify mb-4">
        Aplikasi ini dibangun dengan menggunakan teknologi modern seperti <span className="font-semibold">React</span> untuk frontend
        dan <span className="font-semibold">JSON Server</span> untuk manajemen data sederhana di backend. Hal ini memungkinkan pengelolaan data yang
        dinamis dan responsif tanpa memerlukan sistem backend yang kompleks.
      </p>
      <h2 className="text-2xl font-semibold text-indigo-700 mt-8 mb-4">Fitur Utama</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Mengelola data anggota asrama (CRUD).</li>
        <li>Mengenerate jadwal piket bulanan dengan jumlah hari yang fleksibel.</li>
        <li>Mengedit jadwal piket untuk setiap hari secara spesifik.</li>
        <li>Responsif dan mudah digunakan, baik di desktop maupun perangkat mobile.</li>
      </ul>
      <h2 className="text-2xl font-semibold text-indigo-700 mt-8 mb-4">Tujuan</h2>
      <p className="text-lg leading-relaxed text-justify">
        Tujuan utama aplikasi ini adalah untuk mempermudah pengelolaan jadwal piket asrama dengan cara digitalisasi,
        sehingga lebih praktis dibandingkan metode manual. Dengan fitur yang lengkap dan antarmuka yang intuitif,
        aplikasi ini cocok digunakan oleh pengelola asrama untuk meningkatkan efisiensi dan produktivitas.
      </p>
      <h2 className="text-2xl font-semibold text-indigo-700 mt-8 mb-4">Teknologi yang Digunakan</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>React untuk frontend.</li>
        <li>Tailwind CSS untuk styling responsif dan modern.</li>
        <li>JSON Server untuk backend sederhana.</li>
        <li>Node.js untuk menjalankan server JSON lokal.</li>
      </ul>
      <h2 className="text-2xl font-semibold text-indigo-700 mt-8 mb-4">Tim Pengembang</h2>
      <p className="text-lg leading-relaxed text-justify">
        Aplikasi ini dikembangkan sebagai solusi untuk kebutuhan pengelolaan jadwal asrama. Kami percaya bahwa
        digitalisasi adalah langkah maju untuk meningkatkan efisiensi pengelolaan di berbagai bidang, termasuk
        pengelolaan asrama.
      </p>
    </div>
  );
};

export default About;
