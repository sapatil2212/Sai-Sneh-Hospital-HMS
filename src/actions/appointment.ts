"use server";

import { createAppointment, getDoctors } from "../lib/db";
import { sendWhatsAppNotification } from "../services/whatsapp";

export interface AppointmentInput {
  patientName: string;
  patientMobile: string;
  patientEmail: string;
  departmentId: string;
  doctorId: string;
  date: string; // ISO String
  timeSlot: string;
  symptoms: string;
}

export async function bookAppointmentAction(data: AppointmentInput) {
  try {
    // 1. Basic validation
    if (!data.patientName || !data.patientMobile || !data.patientEmail || !data.doctorId || !data.date || !data.timeSlot) {
      return { success: false, error: "Please fill out all required fields." };
    }

    const parsedDate = new Date(data.date);
    if (isNaN(parsedDate.getTime())) {
      return { success: false, error: "Invalid date selected." };
    }

    // 2. Fetch doctor name for notification details
    const doctorsList = await getDoctors();
    const targetDoctor = doctorsList.find(d => d.id === data.doctorId);
    const doctorName = targetDoctor ? targetDoctor.name : "Specialist Doctor";

    // 3. Create appointment in database (or mock)
    const newAppointment = await createAppointment({
      patientName: data.patientName,
      patientMobile: data.patientMobile,
      patientEmail: data.patientEmail,
      departmentId: data.departmentId,
      doctorId: data.doctorId,
      date: parsedDate,
      timeSlot: data.timeSlot,
      symptoms: data.symptoms,
      notes: ""
    });

    // 4. Trigger WhatsApp simulated alert
    const formattedDate = parsedDate.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    
    await sendWhatsAppNotification(
      data.patientMobile,
      data.patientName,
      "confirmation",
      {
        doctorName,
        date: formattedDate,
        timeSlot: data.timeSlot
      }
    );

    // 5. Mock email log
    console.log(`[EMAIL SEND SIMULATION] Sending confirmation to ${data.patientEmail} for appointment on ${formattedDate}`);

    return { 
      success: true, 
      appointmentId: newAppointment.id,
      patientName: data.patientName,
      doctorName,
      date: formattedDate,
      timeSlot: data.timeSlot
    };
  } catch (error: any) {
    console.error("Failed to book appointment:", error);
    return { success: false, error: error.message || "An error occurred while booking. Please try again." };
  }
}
