import React from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Selamat Datang di Aplikasi Jadwal Piket Asrama</h1>
      <p className={styles.description}>Kelola jadwal piket asrama Anda dengan mudah dan otomatis!</p>
      <div className={styles.buttonGroup}>
        <a href="/members" className={`${styles.button} ${styles.buttonBlue}`}>
          Kelola Anggota
        </a>
        <a href="/schedule" className={`${styles.button} ${styles.buttonGreen}`}>
          Lihat Jadwal
        </a>
      </div>
    </div>
  );
};

export default Home;