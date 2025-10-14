import { Protocol, Threat } from '@/types';

export const PROTOCOLS: Protocol[] = [
  {
    name: 'ALEX',
    score: 42,
    audits: 3,
    incidents: 2,
    status: 'HIGH RISK - Known vulnerabilities',
    lastUpdated: 'Oct 2025',
    tvl: '$45M',
    category: 'DEX',
  },
  {
    name: 'Velar',
    score: 78,
    audits: 2,
    incidents: 0,
    status: 'Active monitoring',
    lastUpdated: 'Oct 2025',
    tvl: '$12M',
    category: 'DEX',
  },
  {
    name: 'Arkadiko',
    score: 85,
    audits: 4,
    incidents: 0,
    status: 'LOW RISK - Established protocol',
    lastUpdated: 'Sep 2025',
    tvl: '$8M',
    category: 'Lending',
  },
  {
    name: 'StackSwap',
    score: 72,
    audits: 1,
    incidents: 0,
    status: 'MEDIUM RISK - Limited coverage',
    lastUpdated: 'Aug 2025',
    tvl: '$3M',
    category: 'DEX',
  },
];

export const LIVE_THREATS: Threat[] = [
  {
    id: '1',
    severity: 'critical',
    type: 'as-contract Abuse',
    protocol: 'Unknown Token',
    description: 'Malicious token detected with as-contract pattern',
    timestamp: '2 hours ago',
    status: 'active',
  },
  {
    id: '2',
    severity: 'high',
    type: 'Reentrancy',
    protocol: 'DeFi Protocol X',
    description: 'Potential reentrancy vulnerability in swap function',
    timestamp: '5 hours ago',
    status: 'investigating',
  },
  {
    id: '3',
    severity: 'medium',
    type: 'Access Control',
    protocol: 'Lending Protocol Y',
    description: 'Weak admin controls detected',
    timestamp: '1 day ago',
    status: 'resolved',
  },
];

export const DEMO_MALICIOUS_CONTRACT = `
;; Malicious ALEX-like Token
(define-fungible-token malicious-token)

(define-public (transfer-from (sender principal) (recipient principal) (amount uint))
  (begin
    ;; CRITICAL VULNERABILITY: as-contract abuse
    ;; Allows attacker to impersonate vault and drain funds
    (as-contract 
      (stx-transfer? u1000000 'ST1VAULT... tx-sender))
    (ok true)
  ))

(define-public (mint (amount uint) (recipient principal))
  ;; VULNERABILITY: No access control on mint
  (ft-mint? malicious-token amount recipient)
)
`;

export const DEMO_SAFE_CONTRACT = `
;; Safe Token Implementation
(define-fungible-token safe-token)

(define-constant contract-owner tx-sender)
(define-constant err-not-authorized (err u403))

(define-public (transfer (amount uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) err-not-authorized)
    (ft-transfer? safe-token amount sender recipient)
  ))

(define-public (mint (amount uint) (recipient principal))
  (begin
    ;; SECURE: Access control check
    (asserts! (is-eq tx-sender contract-owner) err-not-authorized)
    (ft-mint? safe-token amount recipient)
  ))
`;
