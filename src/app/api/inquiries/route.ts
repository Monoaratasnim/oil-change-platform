import { NextResponse } from "next/server";
import { createInquiry } from "@/db/queries";
import { jsonError, parseJson } from "@/lib/http";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const MAX_ADDRESS_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s()+.-]+$/;

type InquiryData = {
  name: string;
  email: string;
  phone: string;
  businessAddress: string;
  message: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateInquiry(
  input: unknown,
): { data: InquiryData } | { errors: Record<string, string> } {
  if (!isRecord(input)) {
    return { errors: { body: "Request body must be a JSON object." } };
  }

  const errors: Record<string, string> = {};

  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (name.length === 0) {
    errors.name = "Name is required.";
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.name = `Name must be at most ${MAX_NAME_LENGTH} characters.`;
  }

  const email =
    typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  if (email.length === 0) {
    errors.email = "Email is required.";
  } else if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  if (phone.length === 0) {
    errors.phone = "Phone number is required.";
  } else if (phone.length > MAX_PHONE_LENGTH || !PHONE_PATTERN.test(phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  const businessAddress =
    typeof input.businessAddress === "string"
      ? input.businessAddress.trim()
      : "";
  if (businessAddress.length === 0) {
    errors.businessAddress = "Business address is required.";
  } else if (businessAddress.length > MAX_ADDRESS_LENGTH) {
    errors.businessAddress = `Business address must be at most ${MAX_ADDRESS_LENGTH} characters.`;
  }

  const message =
    typeof input.message === "string" ? input.message.trim() : "";
  if (message.length === 0) {
    errors.message = "Message is required.";
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be at most ${MAX_MESSAGE_LENGTH} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    data: {
      name,
      email,
      phone,
      businessAddress,
      message,
    },
  };
}

export async function POST(request: Request) {
  const body = await parseJson(request);
  if (body === undefined) {
    return jsonError(400, "Request body must be valid JSON.");
  }

  const result = validateInquiry(body);
  if ("errors" in result) {
    return NextResponse.json(
      { error: "Invalid inquiry request.", fields: result.errors },
      { status: 400 },
    );
  }

  try {
    const inquiry = await createInquiry(result.data);
    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error("Failed to persist inquiry:", error);
    return jsonError(
      500,
      "We could not save your inquiry. Please try again later.",
    );
  }
}