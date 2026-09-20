import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const settings = await db.siteSetting.findMany({
      where: {
        key: {
          in: [
            "easypaisa_account_name",
            "easypaisa_account_number",
            "unlimited_plan_amount",
            "payment_instructions",
          ],
        },
      },
    });

    const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

    return NextResponse.json({
      accountName: map["easypaisa_account_name"] || "Basharat Ali",
      accountNumber: map["easypaisa_account_number"] || "03555380636",
      paymentMethod: "EasyPaisa",
      amount: Number(map["unlimited_plan_amount"] || 1000),
      currency: "PKR",
      instructions:
        map["payment_instructions"] ||
        "Transfer PKR 1,000 via EasyPaisa to Basharat Ali (03555380636). Take a screenshot of the transaction receipt and submit it below.",
    });
  } catch {
    // Fallback to default configured values
    return NextResponse.json({
      accountName: "Basharat Ali",
      accountNumber: "03555380636",
      paymentMethod: "EasyPaisa",
      amount: 1000,
      currency: "PKR",
      instructions:
        "Transfer PKR 1,000 via EasyPaisa to Basharat Ali (03555380636). Take a screenshot of the transaction receipt and submit it below.",
    });
  }
}
