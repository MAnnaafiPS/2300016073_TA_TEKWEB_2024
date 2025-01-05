import React, { useState, useEffect } from "react";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [nextId, setNextId] = useState(1); // Menyimpan ID increment berikutnya
  const [editingId, setEditingId] = useState(null); // ID anggota yang sedang diedit
  const [editedName, setEditedName] = useState(""); // Nama yang sedang diedit

  // Fetch data anggota dari server
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await fetch("http://localhost:5000/members");
        const data = await response.json();
        setMembers(data);

        // Tentukan ID berikutnya berdasarkan anggota yang ada
        if (data.length > 0) {
          const maxId = Math.max(
            ...data.map((member) => parseInt(member.id.slice(2), 10)) // Ambil bagian angka setelah "76"
          );
          setNextId(maxId + 1); // Increment ID berikutnya
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    loadMembers();
  }, []);

  // Format ID menjadi 5 digit dengan prefix "76"
  const formatId = (id) => {
    const formattedId = `76${id.toString().padStart(3, "0")}`; // Tambahkan prefix "76" + angka 3 digit
    if (!/^\d{5}$/.test(formattedId)) {
      throw new Error("ID harus berupa 5 digit angka dengan prefix '76'!");
    }
    return formattedId;
  };

  // Tambah anggota baru
  const addMember = async () => {
    if (newMember.trim()) {
      try {
        const newId = formatId(nextId); // Format ID baru
        const response = await fetch("http://localhost:5000/members", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: newId, name: newMember }),
        });
        const data = await response.json();
        setMembers([...members, data]);
        setNewMember("");
        setNextId(nextId + 1); // Increment ID berikutnya
      } catch (error) {
        console.error("Error menambahkan anggota:", error.message);
        alert(error.message);
      }
    }
  };

  // Hapus anggota
  const removeMember = async (id) => {
    await fetch(`http://localhost:5000/members/${id}`, { method: "DELETE" });
    setMembers(members.filter((member) => member.id !== id));
  };

  // Simpan perubahan data anggota
  const saveEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/members/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: editedName }),
      });
      const updatedMember = await response.json();

      // Perbarui data di state
      setMembers(
        members.map((member) =>
          member.id === id ? { ...member, name: updatedMember.name } : member
        )
      );

      // Reset editing state
      setEditingId(null);
      setEditedName("");
    } catch (error) {
      console.error("Error menyimpan perubahan:", error.message);
    }
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
            <div className="flex flex-col">
              <span className="font-semibold">ID: {member.id}</span>
              {editingId === member.id ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span>{member.name}</span>
              )}
            </div>
            <div className="flex gap-2">
              {editingId === member.id ? (
                <>
                  <button
                    onClick={() => saveEdit(member.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditedName("");
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Batal
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(member.id);
                      setEditedName(member.name);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeMember(member.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Members;
