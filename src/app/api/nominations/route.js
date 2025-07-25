import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Nomination from "@/lib/models/Nomination";

// POST: Create a new nomination
export async function POST(request) {
  await dbConnect();

  try {
    const data = await request.json();
    const newNomination = await Nomination.create(data);
    return NextResponse.json({ success: true, data: newNomination });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, error: "Failed to create nomination" }, { status: 500 });
  }
}

// GET: Fetch all nominations
export async function GET() {
  await dbConnect();

  try {
    const nominations = await Nomination.find().lean();
    return NextResponse.json({ success: true, nominations });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch nominations" }, { status: 500 });
  }
}
