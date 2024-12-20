import React, { useState, useEffect } from 'react';
import styles from '../styles/Members.module.css';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");

  useEffect(() => {
    const savedMembers = JSON.parse(localStorage.getItem("members")) || [];
    setMembers(savedMembers);
  }, []);

  const addMember = () => {
    if (newMember.trim()) {
      const updatedMembers = [...members, newMember.trim()];
      setMembers(updatedMembers);
      localStorage.setItem("members", JSON.stringify(updatedMembers));
      setNewMember("");
    }
  };

  const removeMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
    localStorage.setItem("members", JSON.stringify(updatedMembers));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Kelola Anggota Asrama</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="Nama anggota baru"
          className={styles.input}
        />
        <button onClick={addMember} className={styles.addButton}>Tambah</button>
      </div>
      <ul className={styles.memberList}>
        {members.map((member, index) => (
          <li key={index} className={styles.memberItem}>
            <span>{member}</span>
            <button
              onClick={() => removeMember(index)}
              className={styles.removeButton}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Members;