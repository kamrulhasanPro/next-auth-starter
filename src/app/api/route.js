const { NextResponse } = require("next/server");

export function GET() {
  return NextResponse.json({
    message: "Server is running in next server",
    status: 200,
  });
}
