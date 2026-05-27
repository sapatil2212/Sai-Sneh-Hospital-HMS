"use server";

import { createContactQuery } from "../lib/db";

export interface ContactInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function submitContactQueryAction(data: ContactInput) {
  try {
    if (!data.name || !data.email || !data.phone || !data.subject || !data.message) {
      return { success: false, error: "All fields are required." };
    }

    const newQuery = await createContactQuery({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message
    });

    console.log(`[CONTACT QUERY SIMULATION] Received query from ${data.name}: "${data.subject}"`);

    return { success: true, queryId: newQuery?.id };
  } catch (error: any) {
    console.error("Failed to submit contact query:", error);
    return { success: false, error: error.message || "An error occurred. Please try again." };
  }
}
