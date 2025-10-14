export interface Protocol {
  name: string;
  score: number;
  audits: number;
  incidents: number;
  status: string;
  lastUpdated: string;
  tvl?: string;
  category?: string;
}

export interface Threat {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  protocol: string;
  description: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
}

export interface AnalysisResult {
  score: number;
  threats: string[];
  reasoning: string;
  recommendation: 'SAFE' | 'MEDIUM RISK' | 'HIGH RISK';
  vulnerabilities?: {
    type: string;
    severity: string;
    description: string;
  }[];
}

export interface AuditReport {
  auditor: string;
  score: number;
  threatLevel: string;
  timestamp: number;
  notes: string;
}

export interface ContractData {
  address: string;
  score: number;
  isFlagged: boolean;
  auditHistory: AuditReport[];
}
