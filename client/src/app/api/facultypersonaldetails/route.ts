import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";
import { useEffect } from "react";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if(body){
      console.log({body})
    }else{
      console.log("Error");
    }

    const { personalData } = body;

    const newFacultyData = {
      // Personal details
      facultyId: personalData.facultyId ?? "1458",
      qualification: personalData.qualification ?? "PDF",
      photo: personalData.photo ?? null,
      title: personalData.title ?? "Dr",
      firstName: personalData.firstName ?? "John",
      middleName: personalData.middleName ?? "A",
      lastName: personalData.lastName ?? "Doe",
      emailId: personalData.emailId ?? "johndoe@example.com",
      contactNo: personalData.contactNo ?? "1234567890",
      alternateContactNo: personalData.alternateContactNo ?? "0987654321",
      emergencyContactNo: personalData.emergencyContactNo ?? "1122334455",
      adharNo: personalData.aadhar ?? "123456789012",
      panNo: personalData.pan ?? "ABCDE1234F",
      dob: personalData.dob
        ? new Date(personalData.dob)
        : new Date("1980-01-01"),
      gender: personalData.gender ?? "Male",
      nationality: personalData.nationality ?? "Indian",
      firstAddressLine1: personalData.firstAddressLine1 ?? "123 Main St",
      firstAddressLine2: personalData.firstAddressLine2 ?? "Apt 4B",
      firstAddressLine3: personalData.firstAddressLine3 ?? "Springfield",
      correspondenceAddressLine1:
        personalData.correspondenceAddressLine1 ?? "456 Elm St",
      correspondenceAddressLine2:
        personalData.correspondenceAddressLine2 ?? "Suite 5A",
      correspondenceAddressLine3:
        personalData.correspondenceAddressLine3 ?? "Shelbyville",
      religion: personalData.religion ?? "Hindu",
      caste: personalData.caste ?? "General",
      category: personalData.category ?? "General",
      motherTongue: personalData.motherTongue ?? "Kannada",
      speciallyChallenged: personalData.speciallyChanged ?? false,
      remarks: personalData.speciallyChangedRemarks ?? "",
      languages: {
        toSpeak: personalData.languagesToSpeak ?? ["English", "Kannada"],
        toRead: personalData.languagesToRead ?? ["English", "Kannada"],
        toWrite: personalData.languagesToWrite ?? ["English", "Kannada"],
      },
      
      // Financial Details
      bankName: personalData.bankName ?? "State Bank of India",
      accountNo: personalData.accountNo ?? "123456789012",
      accountName: personalData.accountName ?? "John Doe",
      accountType: personalData.accountType ?? "Savings",
      branch: personalData.branch ?? "Main Branch",
      ifsc: personalData.ifsc ?? "SBIN0001234",
      pfNumber: personalData.pfNumber ?? "PF123456",
      uanNumber: personalData.uanNumber ?? "UAN123456",
      pensionNumber: personalData.pensionNumber ?? "PEN123456",

      // Academic Details
      aicteFacultyId: personalData.aicteFacultyId ?? "AICTE123456",
      employeeId: personalData.employeeId ?? "EMP123",
      department: personalData.department ?? "Computer Science",
      level: personalData.level ?? "Professor",
      designation: personalData.designation ?? "Head of Department",
      EventAttended: {
        create: {
          id: "eventAttendedId", // Add id field here
          eventType: personalData.eventAttendedType ?? "Conference",
          title:
            personalData.eventAttendedTitle ?? "International Conference on AI",
          fromDate: personalData.eventAttendedFromDate
            ? new Date(personalData.eventAttendedFromDate)
            : new Date("2022-01-01"),
          toDate: personalData.eventAttendedToDate
            ? new Date(personalData.eventAttendedToDate)
            : new Date("2022-01-05"),
          organizer: personalData.eventAttendedOrganizer ?? "Tech University",
          venue: personalData.eventAttendedVenue ?? "Tech University Campus",
          sponsor: personalData.eventAttendedSponsor ?? "TechCorp",
          targetAudience:
            personalData.eventAttendedTargetAudience ?? "Researchers",
        },
      },
      Extracurricular: {
        create: {
          id: "extracurricularId", // Add id field here
          eventType: personalData.extracurricularEventType ?? "Workshop",
          eventTitle:
            personalData.extracurricularEventTitle ?? "Robotics Workshop",
          fromDate: personalData.extracurricularFromDate
            ? new Date(personalData.extracurricularFromDate)
            : new Date("2022-02-01"),
          toDate: personalData.extracurricularToDate
            ? new Date(personalData.extracurricularToDate)
            : new Date("2022-02-03"),
          organizer: personalData.extracurricularOrganizer ?? "Robotics Club",
          level: personalData.extracurricularLevel ?? "National",
          achievement: personalData.extracurricularAchievement ?? "First Place",
        },
      },
      InvitedTalk: {
        create: {
          id: "invitedTalkId", // Add id field here
          eventType: personalData.invitedTalkEventType ?? "Seminar",
          title:
            personalData.invitedTalkTitle ??
            "Guest Lecture on Machine Learning",
          fromDate: personalData.invitedTalkFromDate
            ? new Date(personalData.invitedTalkFromDate)
            : new Date("2022-03-01"),
          toDate: personalData.invitedTalkToDate
            ? new Date(personalData.invitedTalkToDate)
            : new Date("2022-03-01"),
          organizer: personalData.invitedTalkOrganizer ?? "Tech Institute",
          venue: personalData.invitedTalkVenue ?? "Tech Institute Auditorium",
          targetAudience:
            personalData.invitedTalkTargetAudience ?? "Students and Faculty",
        },
      },
      OutreachActivity: {
        create: {
          id: "outreachActivityId", // Add id field here
          activity:
            personalData.outreachActivity ?? "Community Coding Workshop",
          role: personalData.outreachRole ?? "Organizer",
          fromDate: personalData.outreachFromDate
            ? new Date(personalData.outreachFromDate)
            : new Date("2021-01-01"),
          toDate: personalData.outreachToDate
            ? new Date(personalData.outreachToDate)
            : new Date("2021-01-02"),
          place: personalData.outreachPlace ?? "Local Community Center",
        },
      },
      PreviousTeachingExperience: {
        create: {
          id: "previousTeachingExperienceId", // Add id field here
          instituteName:
            personalData.previousTeachingInstituteName ?? "XYZ University",
          fromDate: personalData.previousTeachingFromDate
            ? new Date(personalData.previousTeachingFromDate)
            : new Date("2010-01-01"),
          toDate: personalData.previousTeachingToDate
            ? new Date(personalData.previousTeachingToDate)
            : new Date("2020-01-01"),
        },
      },
      Publication: {
        create: {
          id: "publicationId", // Add id field here
          publicationType: personalData.publicationType ?? "Journal",
          name: personalData.publicationName ?? "Research on Neural Networks",
          volume: personalData.publicationVolume ?? "Vol 1",
          pageNumber: personalData.publicationPageNumber ?? "123-130",
          doi: personalData.publicationDoi ?? "10.1234/example.doi",
          impactFactor: personalData.publicationImpactFactor ?? 2.5,
        },
      },
      Recognition: {
        create: {
          id: "recognitionId", // Add id field here
          recognitionReceived:
            personalData.recognitionReceived ?? "Best Professor Award",
        },
      },
      ResearchExperience: {
        create: {
          id: "researchExperienceId", // Add id field here
          organization: personalData.researchOrganization ?? "AI Research Lab",
          designation: personalData.researchDesignation ?? "Lead Researcher",
          fromDate: personalData.researchFromDate
            ? new Date(personalData.researchFromDate)
            : new Date("2015-01-01"),
          toDate: personalData.researchToDate
            ? new Date(personalData.researchToDate)
            : new Date("2020-01-01"),
        },
      },
      Responsibility: {
        create: {
          id: "responsibilityId", // Add id field here
          additionalResponsibility:
            personalData.additionalResponsibility ?? "Department Coordinator",
          fromDate: personalData.responsibilityFromDate
            ? new Date(personalData.responsibilityFromDate)
            : new Date("2020-01-01"),
          toDate: personalData.responsibilityToDate
            ? new Date(personalData.responsibilityToDate)
            : new Date("2025-01-01"),
        },
      },

      Conference: {
        create :{
          id: personalData.conferences?.id ?? "conferenceId123",
          conferenceType: personalData.conferences?.conferenceType ?? "International",
          facultyResearchId: personalData.conferences?.facultyResearchId ?? "research123",
          facultyId: personalData.conferences?.facultyId ?? "1457",
          title: personalData.conferences?.title ?? "Advancements in AI",
          journalName: personalData.conferences?.journalName ?? "AI Conference Proceedings",
          issueNo: personalData.conferences?.issueNo ?? "Issue 45",
          volume: personalData.conferences?.volume ?? "Vol 10",
          yearOfPublication: personalData.conferences?.yearOfPublication ?? 2023,
          pageNo: personalData.conferences?.pageNo ?? "123-145",
          author1: personalData.conferences?.author1 ?? "Dr. John Doe",
          author2: personalData.conferences?.author2 ?? "Prof. Jane Smith",
          author3: personalData.conferences?.author3 ?? "Dr. Alice Brown",
          author4: personalData.conferences?.author4 ?? "Prof. Mark Wilson",
          publishedUnder: personalData.conferences?.publishedUnder ?? "University Press",
          sponsor: personalData.conferences?.sponsor ?? "Tech Corp",
          venue: personalData.conferences?.venue ?? "New York, USA",
          fromDate: personalData.conferences?.fromDate ? new Date(personalData.conferences.fromDate) : new Date("2023-08-01"),
          toDate: personalData.conferences?.toDate ? new Date(personalData.conferences.toDate) : new Date("2023-08-05"),
        }
      },

      journal: {
        create :{
          id: personalData.journal?.id ?? "journalId123",
        journalType: personalData.journal?.journalType ?? "Peer-Reviewed",
        facultyResearchId: personalData.journal?.facultyResearchId ?? "research123",
        facultyId: personalData.journal?.facultyId ?? "1457",
        title: personalData.journal?.title ?? "Innovative AI Applications",
        journalName: personalData.journal?.journalName ?? "Journal of Artificial Intelligence",
        issueNo: personalData.journal?.issueNo ?? "Issue 78",
        volume: personalData.journal?.volume ?? "Vol 15",
        yearOfPublication: personalData.journal?.yearOfPublication ?? 2023,
        pageNo: personalData.journal?.pageNo ?? "567-590",
        author1: personalData.journal?.author1 ?? "Dr. John Doe",
        author2: personalData.journal?.author2 ?? "Prof. Jane Smith",
        author3: personalData.journal?.author3 ?? "Dr. Alice Brown",
        author4: personalData.journal?.author4 ?? "Prof. Mark Wilson",
        publishedUnder: personalData.journal?.publishedUnder ?? "University Press",
        impactFactor: personalData.journal?.impactFactor ?? 4.2,
        quartile: personalData.journal?.quartile ?? "Q1",
        }
      },
      // Dependant
      motherName: personalData.motherName ?? "Jane Doe",
      fatherName: personalData.fatherName ?? "Richard Doe",
      spouseName: personalData.spouseName ?? "Mary Doe",
      // children: personalData.children && personalData.children.length > 0 ? personalData.children : [],
      children: personalData.children ?? [
        { relation: "son", name: "son1" },
        { relation: "daughter", name: "daughter1" },
      ],

      // Education
      classProgram: personalData.class ?? "B.Tech",
      usnSsn: personalData.usn ?? "USN123456",
      schoolCollege: personalData.institution ?? "ABC University",
      specialization: personalData.specialization ?? "Computer Science",
      mediumOfInstruction: personalData.mediumOfInstruction ?? "English",
      directCorr: personalData.directCorr ?? "Yes",
      passClass: personalData.passClass ?? "First Class",

      // Dr AIT Experience
      dateOfJoining: personalData.dateOfJoining
        ? new Date(personalData.dateOfJoining)
        : new Date("2025-01-01"),
      experience: personalData.experience ?? "15 years",
      designationOnJoining:
        personalData.designationOnJoining ?? "Assistant Professor",

      // Award
      awardReceived: personalData.awardReceived ?? "Best Research Paper Award",

      // Industry Experience
      organization: personalData.organization ?? "TechCorp Inc.",
      IndustryExperiencedesignation:
        personalData.IndustryExperiencedesignation ?? "Senior Developer",
      fromDate: personalData.fromDate
        ? new Date(personalData.fromDate)
        : new Date("2025-01-01"),
      toDate: personalData.toDate
        ? new Date(personalData.toDate)
        : new Date("2025-01-01"),

      // Specialization
      subjectsTaught:
        personalData.subjectsTaught ?? "Data Structures, Algorithms",
      program: personalData.program ?? "B.Tech",
      numberOfTimes: personalData.numberOfTimes ?? "5 times",
    };

    // console.log(`Faculty Data creation: ${newFacultyData}`);
    const newFaculty = await prisma.facultyPersonalDetails.create({
      data: newFacultyData,
    });

    return NextResponse.json({ success: true, data: newFaculty });
  } catch (error) {
    console.error("Error creating faculty:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create faculty" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allFaculty = await prisma.facultyPersonalDetails.findFirst({
      where: {
        facultyId: "4235",
      },
    });
    console.log(allFaculty);

    return NextResponse.json({ success: true, data: allFaculty });
  } catch (error) {
    console.error("Error fetching faculty:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch faculty" },
      { status: 500 }
    );
  }
}
