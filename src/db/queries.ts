import { desc, eq } from "drizzle-orm";
import { db } from "./index";
import {
  inquiries,
  quotations,
  type Inquiry,
  type NewInquiry,
  type NewQuotation,
  type Quotation,
} from "./schema";

export function createQuotation(data: NewQuotation): Promise<Quotation> {
  return db
    .insert(quotations)
    .values(data)
    .returning()
    .then((rows) => rows[0]);
}

export function getQuotationById(id: number): Promise<Quotation | null> {
  return db
    .select()
    .from(quotations)
    .where(eq(quotations.id, id))
    .limit(1)
    .then((rows) => rows[0] ?? null);
}

export function listQuotations(): Promise<Quotation[]> {
  return db.select().from(quotations).orderBy(desc(quotations.createdAt));
}

export function createInquiry(data: NewInquiry): Promise<Inquiry> {
  return db
    .insert(inquiries)
    .values(data)
    .returning()
    .then((rows) => rows[0]);
}

export function getInquiryById(id: number): Promise<Inquiry | null> {
  return db
    .select()
    .from(inquiries)
    .where(eq(inquiries.id, id))
    .limit(1)
    .then((rows) => rows[0] ?? null);
}

export function listInquiries(): Promise<Inquiry[]> {
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}