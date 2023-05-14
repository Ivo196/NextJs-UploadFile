import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    //nombre de la ruta
    const filePath = path.join(process.cwd(), "public", file.name);
    //Write file
    writeFile(filePath, buffer);
    console.log("File uploaded to", filePath);

    return new Response(
      JSON.stringify({
        message: "Uploaded File",
      })
    );
  } catch (error) {
    return NextResponse.json(
      JSON.stringify({
        message: "No File",
      }),
      {
        status: 400,
      }
    );
  }
}
