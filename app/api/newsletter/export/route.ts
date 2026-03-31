import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.EXPORT_SECRET) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "asc" },
  });

  const rows = subscribers.map((s) => ({
    "First Name": s.firstName,
    "Last Name": s.lastName,
    Email: s.email,
    "Date Signed Up": new Date(s.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Subscribers");

  // Auto-fit column widths
  const colWidths = [
    { wch: 15 }, // First Name
    { wch: 15 }, // Last Name
    { wch: 30 }, // Email
    { wch: 20 }, // Date Signed Up
  ];
  worksheet["!cols"] = colWidths;

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="patriot-housing-newsletter-${new Date().toISOString().split("T")[0]}.xlsx"`,
    },
  });
}
