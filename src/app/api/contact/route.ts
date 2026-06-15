import { NextResponse } from "next/server";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function POST(request: Request) {
  const accessKey = process.env.FORM_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { success: false, message: "Contact form is not configured." },
      { status: 500 },
    );
  }

  try {
    const payload = await request.formData();
    payload.set("access_key", accessKey);
    payload.set("subject", "New portfolio inquiry from ahmedakram.com");
    payload.set("from_name", "Ahmed Akram Portfolio");

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: payload,
      cache: "no-store",
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Unable to send your message.",
        },
        { status: response.ok ? 400 : response.status },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to send your message right now." },
      { status: 500 },
    );
  }
}
