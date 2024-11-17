import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

// Helper function to validate and format dates
function validateAndFormatDate(dateString: string): Date | null {
  try {
    const date = new Date(dateString);
    // Check if date is valid and within reasonable range (e.g., between 1900 and 2100)
    if (isNaN(date.getTime()) || date.getFullYear() < 1900 || date.getFullYear() > 2100) {
      return null;
    }
    return date;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      facultyResearchSchema,
      nationalJournalDetailsSchema,
      internationalJournalDetailsSchema,
      nationalConferenceDetailsSchema,
      internationalConferenceDetailsSchema,
      researchGrantsSchema,
      consultancySchema,
      patentsSchema,
      researchScholarDetailsSchema,
      publicationsSchema
    } = body;

    // Start a transaction to ensure all operations succeed or none do
    const result = await prisma.$transaction(async (tx) => {
      // Create or update the FacultyResearchDetails record
      const facultyResearch = await tx.facultyResearchDetails.create({
        data: {
          facultyId: facultyResearchSchema.vtuFacultyId ?? '4237',
          orcidId: facultyResearchSchema.orcId,
          scopusId: facultyResearchSchema.scopusId,
          publonsId: facultyResearchSchema.publonsAndWebOfScienceId
        }
      });

      // Handle Publications
      if (publicationsSchema?.length > 0) {
        await tx.publication.createMany({
          data: publicationsSchema.map((pub: any) => ({
            publicationType: pub.typeOfPublication,
            name: pub.nameOfJournal,
            volume: pub.volumeAndPage,
            doi: pub.doi,
            impactFactor: pub.impactFactor ? parseFloat(pub.impactFactor) : null,
            facultyId: facultyResearch.facultyId
          }))
        });
      }

      // Handle Conferences and Journals
      const conferenceJournalData = [
        ...(nationalJournalDetailsSchema?.map((item : any) => ({...item, type: 'National Journal'})) ?? []),
        ...(internationalJournalDetailsSchema?.map((item : any) => ({...item, type: 'International Journal'})) ?? []),
        ...(nationalConferenceDetailsSchema?.map((item : any)=> ({...item, type: 'National Conference'})) ?? []),
        ...(internationalConferenceDetailsSchema?.map((item : any) => ({...item, type: 'International Conference'})) ?? [])
      ].filter(item => item).map((item: any) => ({
        facultyId: facultyResearch.facultyId,
        role: item.type,
        title: item.titleOfResearchPaper,
        journalName: item.nameOfJournal,
        volume: item.volume,
        issueNo: item.issueNo,
        yearOfPublication: item.yearOfPublication ? parseInt(item.yearOfPublication) : 0,
        pageNo: item.pageNoFrom ? (parseInt(item.pageNoTo) - parseInt(item.pageNoFrom)).toString() : '0',
        author1: item.author01,
        author2: item.author02,
        author3: item.author03,
        author4: item.author04,
        publishedUnder: item.publishedUnder,
        impactFactor: item.impactFactor ? parseFloat(item.impactFactor) : null,
        fromDate: item.fromDate ? new Date(item.fromDate).toISOString() : new Date().toISOString(),
        toDate: item.toDate ? new Date(item.toDate).toISOString() : new Date().toISOString()
      }));

      if (conferenceJournalData.length > 0) {
        await tx.conferenceAndJournal.createMany({
          data: conferenceJournalData
        });
      }

      // Handle Research Grants
      if (researchGrantsSchema?.length > 0) {
        await tx.researchGrant.createMany({
          data: researchGrantsSchema.map((grant: any) => {
            const sanctionedDate = validateAndFormatDate(grant.sanctionedDate);
            return {
              id: grant.id,
              titleofProject: grant.titleOfProject,
              name: grant.titleOfProject,
              sanctionedDate: sanctionedDate || new Date(), // Fallback to current date if invalid
              projectPeriod: grant.timePeriodOfProject || 0,
              amountSanctioned: parseFloat(grant.sanctionedAmount) || 0,
              fundedBy: grant.fundedBy,
              principalInvestigator: grant.principalInvestigatorDesignation,
              coPrincipalInvestigator: grant.coPrincipalInvestigatorDesignation,
              phdAwarded: grant.anyPhdAwarded === 'Yes',
              status: grant.status,
              facultyId: facultyResearch.facultyId
            };
          })
        });
      }

      // Handle Consultancy
      if (consultancySchema?.length > 0) {
        await tx.consultancy.createMany({
          data: consultancySchema.map((consultancy: any) => {
            const sanctionedDate = validateAndFormatDate(consultancy.sanctionedDate);
            return {
              sanctionedDate: sanctionedDate || new Date(), // Fallback to current date if invalid
              projectPeriod: parseInt(consultancy.timePeriodOfProject) || 0,
              amount : parseFloat(consultancy.sanctionedAmount) || 0,
              principalInvestigator: consultancy.principalInvestigatorDesignation,
              coPrincipalInvestigator: consultancy.coPrincipalInvestigatorDesignation,
              status: consultancy.status,
              facultyId: facultyResearch.facultyId
            };
          })
        });
      }

      // Handle Patents
      if (patentsSchema?.length > 0) {
        await tx.patent.createMany({
          data: patentsSchema.map((patent: any) => ({
            patentTitle: patent.titleOfResearchPatent,
            areaOfResearch: patent.areaOfResearch,
            patentPeriod: patent.patentPeriod || 0,
            grantedYear: parseInt(patent.patentGrantedYear) || new Date().getFullYear(),
            author1: patent.author1,
            author2: patent.author2,
            author3: patent.author3,
            author4: patent.author4,
            facultyId: facultyResearch.facultyId
          }))
        });
      }

      // Handle Research Scholars
      if (researchScholarDetailsSchema?.length > 0) {
        await tx.researchScholar.createMany({
          data: researchScholarDetailsSchema.map((scholar: any) => {
            const dateOfRegistration = validateAndFormatDate(scholar.dateOfRegistration);
            return {
              NameOfResearchScholar: scholar.nameOfResearchScholar,
              UinvertySeatNo: scholar.universitySeatNumber,
              AreaOfResearch: scholar.areaOfResearch,
              DateOfResearch: dateOfRegistration || new Date(), // Fallback to current date if invalid
              UniversityRegestration: scholar.universityOfRegistration,
              DesginationOfSupervisor: scholar.designationOfResearcher,
              NameOfInstitute: scholar.nameOfInstitute,
              ProgessOfResearch: scholar.progressOfResearchWork,
              facultyId: facultyResearch.facultyId
            };
          })
        });
      }
    });

    return NextResponse.json(
      { message: 'Data submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing research details:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process research details',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Extract `facultyId` from query parameters
    const url = new URL(req.url);
    const facultyId = url.searchParams.get("facultyId");

    if (!facultyId) {
      return NextResponse.json(
        { success: false, error: "Faculty ID is required" },
        { status: 400 }
      );
    }

    // Fetch faculty research details and related entities
    const researchDetails = await prisma.facultyResearchDetails.findFirst({
      where: { facultyId },
    });

    if (!researchDetails) {
      return NextResponse.json(
        { success: false, error: "Research details not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: researchDetails });
  } catch (error) {
    console.error("Error fetching research details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch research details" },
      { status: 500 }
    );
  }
}
