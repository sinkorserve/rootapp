import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    console.log("Listing root collections...");

    const collections = await db.listCollections();
    const collectionNames = collections.map((col) => col.id);

    console.log("Found collections:", collectionNames);

    // If companies exists, fetch docs
    if (collectionNames.includes("companies")) {
      const snapshot = await db.collection("companies").get();

      if (snapshot.empty) {
        return NextResponse.json({
          success: false,
          error: "Companies collection is empty",
        });
      }

      const companies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NextResponse.json({ success: true, data: companies });
    }

    return NextResponse.json({
      success: false,
      error: "No 'companies' collection found",
      collections: collectionNames,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error fetching companies:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
