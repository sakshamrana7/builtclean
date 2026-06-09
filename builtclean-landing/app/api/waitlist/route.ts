import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendConfirmationEmail } from "@/lib/email";

const bodySchema = z.object({
  email: z.string().email().transform((e) => e.trim().toLowerCase()),
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

  // 2. Insert — unique constraint on email is the source of truth.
  // This is atomic: no race condition between a separate lookup + insert.
  const { error: insertError } = await supabase.from("waitlist").insert({
    email,
    source: "landing_page",
  });

  if (insertError) {
    // Postgres unique violation — email already registered
    if (insertError.code === "23505") {
      return NextResponse.json(
        { success: false, message: "You're already on the list!" },
        { status: 200 }
      );
    }
    console.error("[waitlist] Supabase insert error:", insertError);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // 4. Send confirmation email via Gmail
  try {
    await sendConfirmationEmail(email);
  } catch (emailError) {
    // Log but don't fail — the user is already in the DB
    console.error("[waitlist] Email error:", emailError);
  }

  // 5. Success
  return NextResponse.json(
    { success: true, message: "You're on the list!" },
    { status: 201 }
  );
}
