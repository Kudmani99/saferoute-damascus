export type StudentRegistration = {
  id: string;
  studentName: string;
  grade: string;
  schoolId: string;
  parentPhone: string;
  neighborhood: string;
  homeAddress: string;
  pickupTime: string;
  emergencyContact: string;
  preference: "Morning only" | "Afternoon only" | "Round trip";
  assignedRouteId: string;
  createdAt: string;
};

export const registrationsKey = "saferoute-damascus-registrations";
