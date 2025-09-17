import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "companies"));
    const data = snapshot.docs.map(doc => doc.data());
    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
