import React, { useState, useEffect } from "react";
import styles from "../styles/Members.module.css";

const Members = () => {
  const [members, setMembers] = useState([]); // State untuk daftar anggota
  const [newMember, setNewMember] = useState(""); // State untuk input anggota baru

  // Load members dari members.json dan localStorage
  useEffect(() => {
    const loadMembers = async () => {
      try {
        // Ambil data dari localStorage
        const savedMembers = JSON.parse(localStorage.getItem("members")) || [];

        // Ambil data dari members.json
        const response = await fetch("/data/members.json");
        const jsonMembers = await response.json();

        // Gabungkan data dan hilangkan duplikat
        const mergedMembers = [...savedMembers, ...jsonMembers].filter(
          (member, index, self) =>
            index === self.findIndex((m) => m.id === member.id)
        );

        setMembers(mergedMembers);
        localStorage.setItem("members", JSON.stringify(mergedMembers)); // Simpan data yang digabung ke localStorage
      } catch (error) {
        console.error("Error loading members:", error);
      }
    };

    loadMembers();
  }, []);

  // Fungsi untuk menambahkan anggota baru
  const addMember = () => {
    if (newMember.trim()) {
      const newMemberData = { id: Date.now(), name: newMember.trim() };
      const updatedMembers = [...members, newMemberData];
      setMembers(updatedMembers);
      localStorage.setItem("members", JSON.stringify(updatedMembers));
      setNewMember("");
    }
  };

  // Fungsi untuk menghapus anggota
  const removeMember = (id) => {
    const updatedMembers = members.filter((member) => member.id !== id);
    setMembers(updatedMembers);
    localStorage.setItem("members", JSON.stringify(updatedMembers));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Kelola Anggota</h2>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="Nama anggota baru"
          className={styles.input}
        />
        <button onClick={addMember} className={styles.addButton}>
          Tambah
        </button>
      </div>
      <ul className={styles.memberList}>
        {members.map((member) => (
          <li key={member.id} className={styles.memberItem}>
            <span>{member.name}</span>
            <button
              onClick={() => removeMember(member.id)}
              className={styles.deleteButton}
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
