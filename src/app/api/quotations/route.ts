import { NextResponse } from "next/server";
import { createQuotation } from "@/db/queries";
import { jsonError, parseJson } from "@/lib/http";

const SERVICE_TIERS = ["one-time", "monthly"] as const;
const MAX_OPTIONS = 20;
const MAX_OPTION_LENGTH = 60;
const MAX_ESTIMATED_PRICE = 100000;
const MAX_EQUIPMENT_LENGTH = 100;

type QuotationData = {
  equipmentType: string;
  serviceTier: string;
  selectedOptions: string[];
  estimatedPrice: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateQuotation(
  input: unknown,
): { data: QuotationData } | { errors: Record<string, string> } {
  if (!isRecord(input)) {
    return { errors: { body: "Request body must be a JSON object." } };
  }

  const errors: Record<string, string> = {};

  const equipmentType =
    typeof input.equipmentType === "string"
      ? input.equipmentType.trim()
      : "";
  if (equipmentType.length === 0) {
    errors.equipmentType = "Equipment type is required.";
  } else if (equipmentType.length > MAX_EQUIPMENT_LENGTH) {
    errors.equipmentType = `Equipment type must be at most ${MAX_EQUIPMENT_LENGTH} characters.`;
  }

  const serviceTier = typeof input.serviceTier === "string" ? input.serviceTier.trim() : "";
  if (!SERVICE_TIERS.some((tier) => tier === serviceTier)) {
    errors.serviceTier = "Service tier must be 'one-time' or 'monthly'.";
  }

  const optionIds: string[] = [];
  if (!Array.isArray(input.selectedOptions)) {
    errors.selectedOptions = "Selected options must be an array of strings.";
  } else {
    if (input.selectedOptions.length > MAX_OPTIONS) {
      errors.selectedOptions = `Select at most ${MAX_OPTIONS} maintenance options.`;
    }
    for (const option of input.selectedOptions) {
      if (typeof option !== "string" || option.trim().length === 0) {
        errors.selectedOptions = "Every selected option must be a non-empty string.";
        break;
      }
      const id = option.trim();
      if (id.length > MAX_OPTION_LENGTH) {
        errors.selectedOptions = `Option names must be at most ${MAX_OPTION_LENGTH} characters.`;
        break;
      }
      if (!optionIds.includes(id)) {
        optionIds.push(id);
      }
    }
  }

  const estimatedPrice = input.estimatedPrice;
  if (
    typeof estimatedPrice !== "number" ||
    !Number.isFinite(estimatedPrice) ||
    estimatedPrice <= 0 ||
    estimatedPrice > MAX_ESTIMATED_PRICE
  ) {
    errors.estimatedPrice = `Estimated price must be a number between 0 and ${MAX_ESTIMATED_PRICE}.`;
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const roundedPrice = Math.round((estimatedPrice as number) * 100) / 100;

  return {
    data: {
      equipmentType,
      serviceTier,
      selectedOptions: optionIds,
      estimatedPrice: roundedPrice.toFixed(2),
    },
  };
}

export async function POST(request: Request) {
  const body = await parseJson(request);
  if (body === undefined) {
    return jsonError(400, "Request body must be valid JSON.");
  }

  const result = validateQuotation(body);
  if ("errors" in result) {
    return NextResponse.json(
      { error: "Invalid quotation request.", fields: result.errors },
      { status: 400 },
    );
  }

  try {
    const quotation = await createQuotation(result.data);
    return NextResponse.json(quotation, { status: 201 });
  } catch (error) {
    console.error("Failed to persist quotation:", error);
    return jsonError(
      500,
      "We could not save your quotation. Please try again later.",
    );
  }
}