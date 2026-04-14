import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getResend, FROM_EMAIL, REPLY_TO, buildConfirmationEmail } from "@/lib/resend";

const bodySchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  // 1. Parse + validate request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Please provide a valid email address." },
      { status: 422 }
    );
  }

  const { email } = parsed.data;
  const supabase = getSupabaseAdmin();

  // 2. Check if email already exists
  const { data: existing, error: lookupError } = await supabase
    .from("waitlist")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (lookupError) {
    console.error("[waitlist] Supabase lookup error:", lookupError);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  if (existing) {
    return NextResponse.json(
      { success: false, message: "You're already on the list!" },
      { status: 200 }
    );
  }

  // 3. Insert new email
  const { error: insertError } = await supabase.from("waitlist").insert({
    email,
    source: "landing_page",
  });

  if (insertError) {
    console.error("[waitlist] Supabase insert error:", insertError);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // 4. Send confirmation email via Resend
  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      reply_to: REPLY_TO,
      to: email,
      subject: "You're on the Built Clean waitlist",
      html: buildConfirmationEmail(email),
    });
  } catch (emailError) {
    // Log but don't fail — the user is already in the DB
    console.error("[waitlist] Resend email error:", emailError);
  }

  // 5. Success
  return NextResponse.json(
    { success: true, message: "You're on the list!" },
    { status: 201 }
  );
}
