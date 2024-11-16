"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, Building2, Calendar, Award, BookOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FacultyData {
  photo: string;
  firstName: string;
  lastName: string;
  facultyId: string;
  spouseName: string;
  emailId?: string;
  contactNo?: string;
  qualification?: string;
  department?: string;
  joiningDate?: string;
  alternateContactNo?: string;
  emergencyContactNo?: string;
  religion?: string;
  nationality?: string;
  motherTongue?: string;
  // Add other fields as needed
}

interface FacultyResponse {
  data: FacultyData;
}

export default function FacultyProfile() {
  const [facultyDetails, setFacultyDetails] = useState<FacultyResponse | null>(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFacultyDetails() {
      try {
        const token = localStorage.getItem("token");
        const facultyId = token ? JSON.parse(token).facultyId : null;

        if (!facultyId) {
          notFound();
          return;
        }

        const response = await fetch('/api/facultypersonaldetails');
        if (!response.ok) {
          notFound();
          return;
        }

        const data = await response.json();
        setFacultyDetails(data);
      } catch (error) {
        console.error("Error fetching faculty details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFacultyDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!facultyDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <CardTitle className="text-red-500">Faculty not found</CardTitle>
        </Card>
      </div>
    );
  }

  const { data } = facultyDetails;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <Image
                  src={data.photo || "/placeholder-avatar.jpg"}
                  alt={${data.firstName} ${data.lastName}}
                  width={160}
                  height={160}
                  className="rounded-full border-4 border-white shadow-lg object-cover transform transition-transform hover:scale-105"
                />
                <Badge className="absolute -bottom-2 right-0 bg-green-500">
                  Active
                </Badge>
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-6 h-6" />
                  <h1 className="text-3xl font-bold">
                    {data.firstName} {data.lastName}
                  </h1>
                </div>
                <p className="text-xl opacity-90">{data.spouseName}</p>
                <p className="text-lg opacity-80">{data.department || 'Department'}</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  {data.emailId && (
                    <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                      <Mail className="w-4 h-4" />
                      <span>{data.emailId}</span>
                    </div>
                  )}
                  {data.qualification && (
                    <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                      <BookOpen className="w-4 h-4" />
                      <span>{data.qualification}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white p-4 rounded-lg shadow-md flex overflow-x-auto">
          {[
            { id: 'personal', icon: User, label: 'Personal' },
            { id: 'contact', icon: Phone, label: 'Contact' },
            { id: 'academic', icon: BookOpen, label: 'Academic' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="grid gap-6">
          {/* Personal Information */}
          <div className={`transition-all duration-300 ${activeTab === 'personal' ? 'block' : 'hidden'}`}>
            <Card className="transform hover:shadow-lg transition-all">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <InfoField 
                    icon={Building2}
                    label="Faculty ID" 
                    value={data.facultyId}
                  />
                  <InfoField 
                    icon={Calendar}
                    label="Joining Date" 
                    value={data.joiningDate || 'Not specified'}
                  />
                  <InfoField 
                    label="Nationality" 
                    value={data.nationality || 'Not specified'}
                  />
                  <InfoField 
                    label="Religion" 
                    value={data.religion || 'Not specified'}
                  />
                  <InfoField 
                    label="Mother Tongue" 
                    value={data.motherTongue || 'Not specified'}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className={`transition-all duration-300 ${activeTab === 'contact' ? 'block' : 'hidden'}`}>
            <Card className="transform hover:shadow-lg transition-all">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                <CardTitle className="flex items-center gap-2 text-indigo-800">
                  <Phone className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
                    <InfoField 
                      icon={Phone}
                      label="Primary Contact" 
                      value={data.contactNo || 'Not specified'}
                      highlight
                    />
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100">
                    <InfoField 
                      icon={Phone}
                      label="Alternative Contact" 
                      value={data.alternateContactNo || 'Not specified'}
                    />
                  </div>
                  <div className="md:col-span-2 p-4 rounded-lg bg-gradient-to-r from-red-50 to-red-100">
                    <InfoField 
                      icon={Phone}
                      label="Emergency Contact" 
                      value={data.emergencyContactNo || 'Not specified'}
                      highlight
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Academic Information */}
          <div className={`transition-all duration-300 ${activeTab === 'academic' ? 'block' : 'hidden'}`}>
            <Card className="transform hover:shadow-lg transition-all">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <BookOpen className="w-5 h-5" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <InfoField 
                    icon={Award}
                    label="Qualification" 
                    value={data.qualification || 'Not specified'}
                  />
                  <InfoField 
                    icon={Clock}
                    label="Experience" 
                    value="Coming soon..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for displaying field information
const InfoField = ({ 
  icon: Icon, 
  label, 
  value, 
  highlight 
}: { 
  icon?: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className={`p-3 rounded-lg transition-all hover:shadow-md ${
    highlight ? 'bg-white/50' : ''
  }`}>
    <div className="flex items-center gap-2 mb-1">
      {Icon && <Icon className="w-4 h-4 text-gray-500" />}
      <p className="text-sm text-gray-500">{label}</p>
    </div>
    <p className="font-medium text-gray-900 text-lg">{value}</p>
  </div>
);