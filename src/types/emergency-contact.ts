export interface Patient {
  id: number;
  name: string;
}

export interface EmergencyContact {
  id: number;
  patientId: number;
  patientName: string;
  name: string;
  phone: string;
  relationship: string;
}