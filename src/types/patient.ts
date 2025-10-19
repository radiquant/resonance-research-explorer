export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  createdAt: string;
}

export interface HarmonizationSession {
  id: string;
  patientId: string;
  word: string;
  potency: number;
  potencyType: 'D' | 'C' | 'LM' | 'M' | 'F1' | 'F2' | 'F3';
  wordRate: number;
  clientRate: number;
  duration: number;
  durationUnit: 'seconds' | 'minutes' | 'hours';
  completedAt?: string;
  status: 'active' | 'paused' | 'completed' | 'stopped';
  testedPotency?: number; // Automatisch getestete Potenz nach Harmonisierung
}

export interface ActiveHarmonization extends HarmonizationSession {
  elapsedTime: number;
  progress: number;
}
