"use client";

import { useEffect, useState } from "react";

type Contact = {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  message?: string;
};

const API_URL =
  "https://contact-management-z1h4.vercel.app/api/contacts";
const emailRegex = /^\S+@\S+\.\S+$/;

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const isValid =
    form.name.trim() &&
    form.phone.trim() &&
    (!form.email || emailRegex.test(form.email));

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
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

    setSubmitting(true);

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ name: "", email: "", phone: "", message: "" });
    await fetchContacts();
    setSubmitting(false);
  };

  const deleteContact = async (id: string) => {
    setDeletingId(id);
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await fetchContacts();
    setDeletingId(null);
  };

  return (
    <main className="container">
      <header className="header">
        <h1>Contact Manager</h1>
        <p className="subtitle">
          MERN contact management app
        </p>
      </header>

      {/* FORM */}
      <section className="card">
        <h3>Add Contact</h3>

        <form onSubmit={handleSubmit} className="form">
          <div className="grid">
            <input
              name="name"
              placeholder="Name *"
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone *"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {form.email && !emailRegex.test(form.email) && (
            <p className="error">Invalid email format</p>
          )}

          <textarea
            name="message"
            placeholder="Message (optional)"
            value={form.message}
            onChange={handleChange}
          />

          <button disabled={!isValid || submitting}>
            {submitting ? "Saving..." : "Save Contact"}
          </button>
        </form>
      </section>

      {/* LIST */}
      <section className="card">
        <h3>Saved Contacts</h3>

        {loading && (
          <p className="loading">
            Loading contacts (Render may take ~30s)...
          </p>
        )}

        {!loading && !contacts.length && (
          <p className="empty">No contacts yet</p>
        )}

        {!loading && contacts.length > 0 && (
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
                      disabled={deletingId === c._id}
                      onClick={() => deleteContact(c._id)}
                    >
                      {deletingId === c._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
