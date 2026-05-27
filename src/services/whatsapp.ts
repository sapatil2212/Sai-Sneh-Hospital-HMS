// Simulated WhatsApp Automation Notification Logger
export interface WhatsAppNotification {
  id: string;
  phone: string;
  patientName: string;
  messageType: "confirmation" | "reminder" | "followup" | "report_ready";
  content: string;
  status: "SENT" | "DELIVERED" | "FAILED";
  timestamp: Date;
}

const globalForWhatsApp = global as unknown as {
  notificationLogs: WhatsAppNotification[];
};

if (!globalForWhatsApp.notificationLogs) {
  globalForWhatsApp.notificationLogs = [
    {
      id: "wa-1",
      phone: "9876543210",
      patientName: "Swapnil Shinde",
      messageType: "confirmation",
      content: "Hello Swapnil Shinde, your appointment at Sai Sneh Hospital under Gynecology & Obstetrics is CONFIRMED for 2026-05-29 at 10:00 AM. Location: Pune-Satara Rd, Katraj.",
      status: "DELIVERED",
      timestamp: new Date(Date.now() - 3600000)
    }
  ];
}

export function getWhatsAppLogs(): WhatsAppNotification[] {
  return globalForWhatsApp.notificationLogs;
}

export async function sendWhatsAppNotification(
  phone: string,
  patientName: string,
  messageType: "confirmation" | "reminder" | "followup" | "report_ready",
  details: { doctorName?: string; date?: string; timeSlot?: string; reportName?: string }
): Promise<boolean> {
  let content = "";
  
  switch (messageType) {
    case "confirmation":
      content = `Hello ${patientName},\n\nYour appointment at *Sai Sneh Hospital* with *${details.doctorName || "our specialist"}* is CONFIRMED.\n\n📅 Date: ${details.date}\n⏰ Time: ${details.timeSlot}\n\n📍 Address: Pune-Satara Rd, opp. PMT Bus Depot, Katraj.\n📞 Helpline: 088881 50101.\n\nThank you for trusting Sai Sneh Hospital!`;
      break;
    case "reminder":
      content = `Friendly Reminder: Hello ${patientName}, you have an upcoming appointment at *Sai Sneh Hospital* tomorrow at ${details.timeSlot} with *${details.doctorName}*. Please arrive 10 minutes early.`;
      break;
    case "followup":
      content = `Hello ${patientName}, we hope you are recovering well. Dr. ${details.doctorName} has suggested a follow-up consultation in 2 weeks. Book online anytime at ${process.env.NEXT_PUBLIC_SITE_URL || "saisnehhospital.com"}.`;
      break;
    case "report_ready":
      content = `Hello ${patientName}, your medical report *"${details.reportName}"* is now ready. You can log into your patient portal to download it, or pick it up at the reception.`;
      break;
  }

  const logEntry: WhatsAppNotification = {
    id: `wa-${Date.now()}`,
    phone,
    patientName,
    messageType,
    content,
    status: "SENT",
    timestamp: new Date()
  };

  // Prepend to logs
  globalForWhatsApp.notificationLogs.unshift(logEntry);

  // Print formatted output to console
  console.log("\n==============================================");
  console.log(`[WHATSAPP SIMULATION] Message to +91 ${phone}`);
  console.log(`Type: ${messageType.toUpperCase()}`);
  console.log("----------------------------------------------");
  console.log(content);
  console.log("==============================================\n");

  // Simulate delivery network latency
  setTimeout(() => {
    logEntry.status = "DELIVERED";
  }, 1000);

  return true;
}
