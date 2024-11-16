// import prisma from "@/app/lib/db";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     // Parse the JSON data from the request body once
//     const { educationField } = await req.json();
    
//     // Assuming educationField is an array of educational entries
//     if (!Array.isArray(educationField) || educationField.length === 0) {
//       return NextResponse.json({ success: false, error: "No education data provided" }, { status: 400 });
//     }

//     // Process each education record in the array
//     const educationRecords = educationField.map(entry => ({
//       facultyId: entry.facultyId ?? 1456, // default if facultyId is not provided
//       classProgram: entry.class ?? 'N/A',
//       usnSsn: entry.usn ?? 'N/A',
//       schoolCollege: entry.institution ?? 'N/A',
//       specialization: entry.specialization ?? 'N/A',
//       mediumOfInstruction: entry.mediumOfInstruction ?? 'N/A',
//       directCorr: entry.directCorr ?? 'N/A',
//       passClass: entry.passClass ?? 'N/A',
//     }));

//     // Create multiple educational records in FacultyEducation table
//     const newEducationData = await prisma.facultyEducation.createMany({
//       data: educationRecords,
//       skipDuplicates: true, // To avoid inserting duplicates if needed
//     });

//     // Return a success response with the new records
//     return NextResponse.json({ success: true, data: newEducationData });
//   } catch (error) {
//     console.error("Error creating faculty education data:", error);
//     return NextResponse.json({ success: false, error: "Failed to create faculty education data" }, { status: 500 });
//   }
// }
// export async function GET() {
//   try {
//     // Fetch all faculty education records
//     const allFacultyEducation = await prisma.facultyEducation.findFirst({
//       where: {
//         facultyId: 1455,
//       },
//     });

//     // Return a success response with the fetched records
//     return NextResponse.json({ success: true, data: allFacultyEducation });
//   } catch (error) {
//     console.error("Error fetching faculty education data:", error);
//     return NextResponse.json({ success: false, error: "Failed to fetch faculty education data" }, { status: 500 });
//   }
// }
