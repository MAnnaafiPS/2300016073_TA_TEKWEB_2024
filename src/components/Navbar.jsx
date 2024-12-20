import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={styles.navItem}>Home</Link>
        </li>
        <li>
          <Link to="/members" className={styles.navItem}>Anggota</Link>
        </li>
        <li>
          <Link to="/schedule" className={styles.navItem}>Jadwal</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
