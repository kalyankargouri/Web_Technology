import React, { useEffect, useState } from "react";
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from "./api";

function App() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await getCustomers(search);
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateCustomer(editId, form);
      setEditId(null);
    } else {
      await addCustomer(form);
    }

    setForm({ name: "", email: "", phone: "" });
    fetchData();
  };

  const handleEdit = (c) => {
    setForm(c);
    setEditId(c.id);
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    fetchData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customer Management</h2>

      {/* SEARCH */}
      <input
        placeholder="Search by name/email"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button type="submit">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* LIST */}
      <ul>
        {customers.map((c) => (
          <li key={c.id}>
            {c.name} | {c.email} | {c.phone}

            <button onClick={() => handleEdit(c)}>Edit</button>
            <button onClick={() => handleDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;