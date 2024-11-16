"use client"; // Mark this file as a client component

import { useState, useEffect } from "react";

export default function PersonalDetails() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await fetch("/api/faculty/adminDetails");
        if (!response.ok) {
          throw new Error("Failed to fetch admin details.");
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    }

    fetchDetails();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Faculty Personal Details</h1>
      <ul className="space-y-4">
        {details.map((detail) => (
          <li key={detail.facultyId} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{detail.username}</h2>
            {/* Add more fields as required */}
            <p className="text-gray-700">Faculty ID: {detail.facultyId}</p>
            <p className="text-gray-700">Role: {detail.role}</p>
            <p className="text-gray-700">Password: {detail.password}</p>
          </li>
        ))}
      </ul>
      <h1 className="text-2xl font-bold mt-8 mb-4">Faculty Registration</h1>
      <FacultyForm />
    </div>
  );
}

function FacultyForm() {
  const [formData, setFormData] = useState({
    facultyId: "",
    role: "",
    username: "",
    password: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/faculty/adminDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          facultyId: parseInt(formData.facultyId, 10),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit faculty details.");
      }

      const data = await response.json();
      alert(data.message);
      setFormData({
        facultyId: "",
        role: "",
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("Error submitting faculty details:", error);
      alert("Failed to submit faculty details.");
    }
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Personal Details Section */}
      <div>
        <label className="block text-gray-700">Faculty ID:</label>
        <input
          type="text"
          name="facultyId"
          title="Faculty ID"
          placeholder="Enter Faculty ID"
          className="w-full p-2 border rounded"
          value={formData.facultyId}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-gray-700">Role:</label>
        <input
          type="text"
          name="role"
          title="Role"
          placeholder="Role"
          className="w-full p-2 border rounded"
          value={formData.role}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-gray-700">Username:</label>
        <input
          type="text"
          name="username"
          title="Username"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-gray-700">Password:</label>
        <input
          type="password"
          name="password"
          title="Password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}
