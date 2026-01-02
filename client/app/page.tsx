"use client";

import { useEffect, useState } from "react";

type Contact = {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  message?: string;
};

const API_URL = "https://contact-management-iehc.onrender.com/api/contacts";
const emailRegex = /^\S+@\S+\.\S+$/;

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [success, setSuccess] = useState(false);

  const isValid =
    form.name.trim() &&
    form.phone.trim() &&
    (!form.email || emailRegex.test(form.email));

  const fetchContacts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ name: "", email: "", phone: "", message: "" });
    setSuccess(true);
    fetchContacts();
    setTimeout(() => setSuccess(false), 2000);
  };

  const deleteContact = async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchContacts();
  };

  return (
    <main className="container">
      <h1>Contact Manager - Made by Ibrahim</h1>

      {/* Contact Form */}
      <form className="card" onSubmit={handleSubmit}>
        <h3>Add Contact</h3>

        <input
          name="name"
          placeholder="Name *"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {form.email && !emailRegex.test(form.email) && (
          <p className="error">Invalid email</p>
        )}

        <input
          name="phone"
          placeholder="Phone *"
          value={form.phone}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Message (optional)"
          value={form.message}
          onChange={handleChange}
        />

        <button disabled={!isValid}>Submit</button>
        {success && <p className="success">Contact saved</p>}
      </form>

      {/* Contact List */}
      <div className="card">
        <h3>Saved Contacts</h3>

        {!contacts.length && <p>No contacts yet.</p>}

        {!!contacts.length && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.email || "-"}</td>
                  <td>{c.phone}</td>
                  <td>
                    <button
                      className="danger"
                      onClick={() => deleteContact(c._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
