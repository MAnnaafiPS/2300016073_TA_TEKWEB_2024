import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" className={styles.navLogo}>
            PiketAsrama
          </Link>
        </div>
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={styles.navItem}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/members" className={styles.navItem}>
              Anggota
            </Link>
          </li>
          <li>
            <Link to="/schedule" className={styles.navItem}>
              Jadwal
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
