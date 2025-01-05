import React, { useState, useEffect } from "react";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");

  // Fetch data anggota dari server
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await fetch("http://localhost:5000/members");
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadMembers();
  }, []);

  // Tambah anggota baru
  const addMember = async () => {
    if (newMember.trim()) {
      const response = await fetch("http://localhost:5000/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newMember }),
      });
      const data = await response.json();
      setMembers([...members, data]);
      setNewMember("");
    }
  };

  // Hapus anggota
  const removeMember = async (id) => {
    await fetch(`http://localhost:5000/members/${id}`, { method: "DELETE" });
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Kelola Anggota</h2>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="Nama anggota baru"
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addMember}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Tambah
        </button>
      </div>
      <ul className="space-y-3">
        {members.map((member) => (
          <li
            key={member.id}
            className="flex justify-between items-center p-2 bg-gray-100 rounded shadow"
          >
            <span>{member.name}</span>
            <button
              onClick={() => removeMember(member.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
