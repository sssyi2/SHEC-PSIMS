export interface Patient {
  id: number;
  name: string;
}

export interface MedicalAdvice {
  id: number | string;
  patientId: number | string;
  name: string;
  medication: string;
  notes: string;
  startDate: string;
  endDate: string;
  createTime: string;
  updateTime: string;
}