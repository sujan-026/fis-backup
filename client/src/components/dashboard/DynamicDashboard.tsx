"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DynamicDashboard = () => {
  const router = useRouter();
  const [teacherName, setTeacherName] = useState("");
  const [facultyDetails, setFacultyDetails] = useState(null);
  const [hodDetails, setHodDetails] = useState(null);
  const [principalDetails, setprincipalDetails] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [facultyId, setFacultyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setFacultyId(JSON.parse(user).facultyId);
      setTeacherName(JSON.parse(user).username);
      setRole(JSON.parse(user).role);
    } else {
      throw new Error("Teacher name not found in local storage");
    }
  }, []);

  useEffect(() => {
    async function fetchHODDetails() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/faculty/hodprincipalDetails?facultyId=${facultyId}`
        );
        const result = await response.json();

        if (response.ok) {
          setHodDetails(result.data);
        } else {
          setError(result.error || "Failed to fetch data");
        }
      } catch (err) {
        console.error("Error fetching faculty details:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (facultyId) {
      fetchHODDetails();
    }
  }, [facultyId]);

  useEffect(() => {
    async function fetchBranch() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/faculty/principalDetails`
        );
        const result = await response.json();
        console.log(result.data)
        if (response.ok) {
          setprincipalDetails(result.data);
        } else {
          setError(result.error || "Failed to fetch faculty details");
        }
      } catch (err) {
        console.error("Error fetching faculty details:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (principalDetails) {
      fetchBranch();
    }
  }, [principalDetails]);

  useEffect(() => {
    async function fetchFacultyInSameDepartment() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/faculty/facultyDetails?department=${hodDetails?.department}`
        );
        const result = await response.json();
        if (response.ok) {
          setFacultyDetails(result.data);
        } else {
          setError(result.error || "Failed to fetch faculty details");
        }
      } catch (err) {
        console.error("Error fetching faculty details:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (hodDetails) {
      fetchFacultyInSameDepartment();
    }
  }, [hodDetails]);

  useEffect(() => {
    async function fetchBranches() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/faculty/facultyDetails?department=${hodDetails?.department}`
        );
        const result = await response.json();
        if (response.ok) {
          setFacultyDetails(result.data);
        } else {
          setError(result.error || "Failed to fetch faculty details");
        }
      } catch (err) {
        console.error("Error fetching faculty details:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (hodDetails) {
      fetchBranches();
    }
  }, [hodDetails]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-800">
            {(() => {
              const currentHour = currentDate.getHours();
              if (currentHour < 12) return `Good Morning, ${teacherName}`;
              if (currentHour < 18) return `Good Afternoon, ${teacherName}`;
              return `Good Evening, ${teacherName}`;
            })()}
          </h2>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-600">{formattedDate}</div>
          <div className="text-gray-600">{formattedTime}</div>
        </div>

        {/* Conditional Rendering Based on Role */}
        {role === "hod" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyDetails && facultyDetails.length > 0 ? (
              facultyDetails.map((faculty: any) => (
                <div
                  key={faculty.facultyId}
                  className="border rounded-lg shadow-md bg-white p-4 hover:shadow-lg cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/faculty/facultypersonaldetails?facultyId=${faculty.facultyId}`
                    )
                  }
                >
                  <h3 className="text-lg font-bold mb-2">
                    {faculty.firstName} {faculty.middleName} {faculty.lastName}
                  </h3>
                  <p>
                    <strong>Faculty Id:</strong> {faculty.facultyId}
                  </p>
                  <p>
                    <strong>Qualification:</strong> {faculty.qualification}
                  </p>
                  <p>
                    <strong>Department:</strong> {faculty.department}
                  </p>
                  <p>
                    <strong>Designation:</strong> {faculty.designation}
                  </p>
                </div>
              ))
            ) : (
              <p>No faculty details available.</p>
            )}
          </div>
        ) : (
          <div>Hello Principal</div>
        )}
      </div>
    </div>
  );
};

export default DynamicDashboard;
