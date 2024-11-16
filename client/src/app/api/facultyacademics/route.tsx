// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// // POST: Create a new Faculty Academic Detail
// export async function POST(req: {
//   json: () =>
//     | PromiseLike<{
//         employeeId: string;
//         qualification: string;
//         aicteFacultyId: string;
//         department: string;
//         level: string;
//         designation: string;
//         previousExperience: object;
//         drAitExperience: object;
//         industryExperience: object;
//         researchExperience: object;
//         specializations: object;
//         eventsAttended: object;
//         invitedTalks: object;
//         publications: object;
//         responsibilities: object;
//         extracurricularActivities: object;
//         outreachActivities: object;
//         recognitions: object;
//         awards: object;
//       }>
//     | {
//         employeeId: any;
//         qualification: any;
//         aicteFacultyId: any;
//         department: any;
//         level: any;
//         designation: any;
//         previousExperience: any;
//         drAitExperience: any;
//         industryExperience: any;
//         researchExperience: any;
//         specializations: any;
//         eventsAttended: any;
//         invitedTalks: any;
//         publications: any;
//         responsibilities: any;
//         extracurriculars: any;
//         outreachActivities: any;
//         recognitions: any;
//         awards: any;
//       };
// }) {
//   const {
//     employeeId,
//     qualification,
//     aicteFacultyId,
//     department,
//     level,
//     designation,
//     previousExperience,
//     drAitExperience,
//     industryExperience,
//     researchExperience,
//     specializations,
//     eventsAttended,
//     invitedTalks,
//     publications,
//     responsibilities,
//     extracurriculars,
//     outreachActivities,
//     recognitions,
//     awards,
//   } = await req.json();

//   try {
//     const newResearchDetail = await prisma.facultyAcademicDetails.create({
//       data: {
//         employeeId: employeeId,
//         aicteFacultyId: aicteFacultyId,
//         qualification: qualification,
//         department: department,
//         level: level,
//         designation: designation,
//         previousExperience: {
//           create: previousExperience,
//         },
//         drAitExperience: {
//           create: drAitExperience,
//         },
//         industryExperience: {
//           create: industryExperience,
//         },
//         researchExperience: {
//           create: researchExperience,
//         },
//         specializations: {
//           create: specializations,
//         },
//         eventsAttended: {
//           create: eventsAttended,
//         },
//         invitedTalks: {
//           create: invitedTalks,
//         },
//         publications: {
//           create: publications,
//         },
//         responsibilities: {
//           create: responsibilities,
//         },
//         extracurriculars: {
//           create: extracurriculars,
//         },
//         outreachActivities: {
//           create: outreachActivities,
//         },
//         recognitions: {
//           create: recognitions,
//         },
//         awards: {
//           create: awards,
//         },
//       },
//     });

//     return NextResponse.json(newResearchDetail, { status: 201 });
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: "Unable to retrieve Faculty Academic Details" }),
//       { status: 500 }
//     );
//   }
// }
