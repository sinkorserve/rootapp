import { NextResponse } from "next/server";
import { admin } from "@/lib/firebaseAdmin";

const db = admin.firestore();

export async function GET() {
  try {
    const snapshot = await db.collection("companies").get();

    if (snapshot.empty) {
      return NextResponse.json({ success: false, error: "No documents found in companies collection" });
    }

    const companies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ success: true, data: companies });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
