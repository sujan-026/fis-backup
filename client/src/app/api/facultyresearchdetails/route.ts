import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || !body.researchData) {
      return NextResponse.json(
        { success: false, error: "Missing researchData in request body" },
        { status: 400 }
      );
    }

    const { researchData } = body;

    const newResearchData = {
      id: researchData.id ?? "A1456",
      awardReceived: researchData.awardReceived ?? "True",
      facultyId: researchData.facultyId ?? "1456",
    };
    // Save to the database using Prisma
    const savedResearchData = await prisma.award.create({
      data: newResearchData,
    });

    return NextResponse.json({ success: true, data: savedResearchData });
  } catch (error) {
    console.error("Error creating research data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create research data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allFaculty = await prisma.award.findFirst({
      where: {
        facultyId: "1456",
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
