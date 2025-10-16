# StacksGuard

> AI-Powered Security Infrastructure for Bitcoin DeFi on Stacks

![StacksGuard Banner](https://img.shields.io/badge/Stacks-Bitcoin%20DeFi-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Status](https://img.shields.io/badge/status-active-success)

## 📖 Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Architecture](#architecture)
- [Technical Stack](#technical-stack)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
- [Frontend Application](#frontend-application)
- [API Reference](#api-reference)
- [Security Considerations](#security-considerations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**StacksGuard** is a comprehensive security platform designed to protect Stacks blockchain protocols from malicious token attacks. It combines AI-powered static analysis with on-chain reputation tracking to create a proactive security layer for Bitcoin DeFi.

### Why StacksGuard Exists

Bitcoin represents $2 trillion in idle capital. The emergence of sBTC (Bitcoin-backed assets on Stacks) promises to unlock this value for productive DeFi use. However, security vulnerabilities threaten to derail this vision. StacksGuard exists to be the missing trust layer that makes Bitcoin DeFi safe.

### The Origin Story

The ALEX Protocol was exploited twice using the exact same attack vector:
- **October 2023**: $4.3M stolen via malicious token with `as-contract` abuse
- **June 2025**: $8.3M stolen using an identical attack pattern

**Total Damage**: $12.6M stolen, ecosystem trust severely damaged

StacksGuard was created to ensure this never happens again.

---

## 🚨 The Problem

### The ALEX Hack: A Case Study

The ALEX exploits exposed critical vulnerabilities in Stacks DeFi security:

1. **No Pre-Deposit Validation**: Protocols blindly trust any token claiming to implement SIP-010
2. **as-contract Abuse**: Malicious tokens use Clarity's `as-contract` feature to impersonate vault contracts
3. **Lack of Security Infrastructure**: No shared security layer exists across protocols
4. **Reactive Security Model**: Protocols only implement security after being exploited

### Attack Flow

```
Attacker Deploys Malicious Token
           ↓
Token Implements Fake SIP-010 Interface
           ↓
Protocol Accepts Token Deposit
           ↓
Malicious transfer-from Function Executes
           ↓
as-contract Impersonates Vault
           ↓
Vault Drained → Funds Bridged to Bitcoin
           ↓
Attack Complete → Funds Unrecoverable
```

### Why Traditional Solutions Fail

- **Manual Audits**: Too slow, expensive, and can't scale to every token
- **Allowlists**: Centralized, excludes new projects, stifles innovation
- **Post-Exploit Response**: By the time a threat is detected, funds are already stolen
- **Fragmented Security**: Each protocol reinvents security instead of sharing intelligence

---

## 💡 The Solution

StacksGuard provides **proactive, AI-powered security** that prevents attacks before they happen.

### Core Components

1. **AI Analysis Engine**: Gemini-powered static analysis detects malicious patterns
2. **On-Chain Reputation Registry**: Decentralized score storage accessible to all protocols
3. **Protocol Integration SDK**: One-line security checks for any Stacks DeFi project
4. **Community Threat Feed**: Shared intelligence network across the ecosystem

### How StacksGuard Prevents the ALEX Hack

```
Token Deployed
      ↓
AI Scans Contract Code
      ↓
Detects as-contract Abuse Pattern
      ↓
Token Flagged in Registry (Score: 95/100)
      ↓
Protocol Queries Registry Before Deposit
      ↓
High-Risk Token → Transaction REJECTED
      ↓
Attack Prevented → $0 Lost ✅
```

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    STACKSGUARD ECOSYSTEM                     │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   Frontend App   │◄────►│   Backend API    │◄────►│  Gemini AI API   │
│   (Next.js)      │      │   (Next.js API)  │      │   (Analysis)     │
└────────┬─────────┘      └────────┬─────────┘      └──────────────────┘
         │                         │
         │                         │
         └─────────┬───────────────┘
                   ↓
         ┌─────────────────┐
         │  Stacks Testnet │
         └─────────────────┘
                   ↓
    ┌──────────────┴──────────────┐
    ↓                             ↓
┌───────────────────────┐  ┌─────────────────────┐
│ Token Reputation      │  │ Protected Vault     │
│ Registry Contract     │  │ Demo Contract       │
│ (Core Security)       │  │ (Integration Demo)  │
└───────────────────────┘  └─────────────────────┘
```

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. TOKEN ANALYSIS FLOW                                      │
└─────────────────────────────────────────────────────────────┘

User Submits Token Code
         ↓
Frontend → API Endpoint (/api/analyze-contract)
         ↓
Gemini AI Processes Code
         ↓
AI Returns: { score, threats, reasoning, recommendation }
         ↓
Frontend Displays Results


┌─────────────────────────────────────────────────────────────┐
│  2. PROTOCOL INTEGRATION FLOW                                │
└─────────────────────────────────────────────────────────────┘

Protocol Receives Deposit Request
         ↓
Call: token-reputation-registry.is-token-flagged
         ↓
Registry Returns: flagged status + risk score
         ↓
If flagged OR score >= 70 → REJECT
If safe → ACCEPT deposit
```

### Security Layers

```
┌────────────────────────────────────────────────────────┐
│                 LAYER 3: UI/UX                          │
│  - Token analyzer interface                             │
│  - Real-time threat feed                                │
│  - Protocol health dashboard                            │
└────────────────────────────────────────────────────────┘
                         ↑
┌────────────────────────────────────────────────────────┐
│              LAYER 2: AI ANALYSIS                       │
│  - Pattern detection (as-contract, reentrancy, etc.)   │
│  - Risk scoring (0-100)                                 │
│  - Threat categorization                                │
└────────────────────────────────────────────────────────┘
                         ↑
┌────────────────────────────────────────────────────────┐
│           LAYER 1: ON-CHAIN REGISTRY                    │
│  - Immutable reputation scores                          │
│  - Audit history tracking                               │
│  - Decentralized access for all protocols               │
└────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technical Stack

### Smart Contracts (Clarity)

- **Language**: Clarity 2.0
- **Blockchain**: Stacks (Bitcoin-secured)
- **Development**: Clarinet SDK
- **Testing**: Vitest + Clarinet

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Wallet Integration**: Stacks Connect

### Backend

- **API**: Next.js API Routes (Serverless)
- **AI**: Google Gemini 1.5 Flash
- **Blockchain RPC**: Stacks.js (@stacks/transactions, @stacks/network)

### Infrastructure

- **Deployment**: Vercel (Frontend + API)
- **Blockchain**: Stacks Testnet (with Mainnet compatibility)
- **Storage**: On-chain (Clarity maps)

---

## 📁 Project Structure

```
stacksguard/
│
├── stacksguard-contracts/          # Smart contracts
│   ├── contracts/
│   │   ├── token-reputation-registry.clar    # Core registry
│   │   └── protected-vault-demo.clar         # Integration example
│   ├── tests/                      # Contract tests
│   ├── settings/                   # Network configs
│   ├── Clarinet.toml              # Clarinet config
│   └── package.json               # Test dependencies
│
├── stacksguard-frontend/           # Web application
│   ├── src/
│   │   ├── app/                   # Next.js pages
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── analyze/          # Token analyzer
│   │   │   ├── demo/             # Live demo
│   │   │   ├── alex-hack/        # Case study
│   │   │   └── api/              # API routes
│   │   ├── components/           # React components
│   │   │   ├── ui/              # shadcn components
│   │   │   ├── hero.tsx
│   │   │   ├── navigation.tsx
│   │   │   ├── protocol-card.tsx
│   │   │   ├── threat-feed.tsx
│   │   │   ├── simulation.tsx
│   │   │   └── ...
│   │   ├── lib/                  # Utilities
│   │   │   ├── constants.ts     # App constants
│   │   │   ├── stacks.ts        # Blockchain interaction
│   │   │   ├── utils.ts         # Helper functions
│   │   │   └── wallet-context.tsx
│   │   └── types/               # TypeScript types
│   ├── public/                   # Static assets
│   ├── next.config.js           # Next.js config
│   ├── tailwind.config.js       # Tailwind config
│   └── package.json             # Dependencies
│
└── README.md                     # This file
```

---

## 🎯 Key Features

### 1. AI-Powered Token Analysis

- **Real-time scanning** of Clarity smart contract code
- **Pattern detection** for known vulnerabilities:
  - `as-contract` abuse
  - Reentrancy attacks
  - Access control issues
  - Unchecked arithmetic
  - Unauthorized mint functions
- **Risk scoring** from 0-100
- **Natural language explanations** of detected threats

### 2. On-Chain Reputation Registry

```clarity
;; Key Functions
(define-public (submit-audit-report 
  (token-contract principal)
  (security-score uint)
  (threat-level (string-ascii 20))
  (notes (string-ascii 256))))

(define-read-only (get-token-score 
  (token-contract principal)))

(define-read-only (is-token-flagged 
  (token-contract principal)))
```

### 3. Protocol Integration (3 Lines of Code)

```clarity
(define-public (deposit-tokens (token <ft-trait>) (amount uint))
  (let ((is-flagged (contract-call? 
                      .token-reputation-registry 
                      is-token-flagged 
                      (contract-of token))))
    ;; StacksGuard Security Check
    (asserts! (not is-flagged) (err u403))
    
    ;; Rest of deposit logic...
    (ft-transfer? token amount tx-sender (as-contract tx-sender))
  ))
```

### 4. Interactive Demos

- **Live simulation** comparing protected vs unprotected vaults
- **Side-by-side attack visualization**
- **Real-time transaction logs**

### 5. Threat Intelligence Feed

- **Real-time threat monitoring**
- **Severity classification** (Critical/High/Medium/Low)
- **Status tracking** (Active/Investigating/Resolved)
- **Community-powered reporting**

### 6. Wallet Integration

- **Stacks Connect** wallet support
- **Testnet and Mainnet** compatibility
- **Transaction signing** for on-chain interactions

---

## 🔄 How It Works

### For Protocol Developers

1. **Deploy StacksGuard Registry** (one-time ecosystem setup)
2. **Add security check** to deposit functions
3. **Query registry** before accepting any token
4. **Reject flagged tokens** automatically

### For Token Creators

1. **Submit token contract** for analysis
2. **Receive AI-powered security report**
3. **Fix vulnerabilities** before deployment
4. **Build trust** with transparent security scores

### For Users

1. **Check token safety** before investing
2. **View protocol health** scores
3. **Monitor threat feed** for ecosystem security
4. **Trust DeFi** knowing protocols are protected

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ and npm/pnpm
- Clarinet CLI
- Google Gemini API key

### Smart Contracts Setup

```bash
cd stacksguard-contracts

# Install dependencies
npm install

# Check contracts
clarinet check

# Run tests
npm test

# Deploy to testnet
clarinet deploy --testnet
```

### Frontend Setup

```bash
cd stacksguard-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your API keys to .env.local
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_REGISTRY_CONTRACT_ADDRESS=ST1...token-reputation-registry

# Run development server
npm run dev

# Open http://localhost:3000
```

### Environment Variables

```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional (defaults to testnet)
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_REGISTRY_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.token-reputation-registry
```

---

## 📖 Usage

### Analyzing a Token

1. Navigate to `/analyze`
2. Paste Clarity contract code
3. Click "Analyze with AI"
4. Review security report:
   - Risk score (0-100)
   - Detected threats
   - AI reasoning
   - Recommendations

### Running the Demo

1. Navigate to `/demo`
2. Click "Run Simulation"
3. Watch both vaults process the same malicious token:
   - **Unprotected vault**: Gets drained
   - **Protected vault**: Rejects the transaction

### Learning About ALEX

1. Navigate to `/alex-hack`
2. Read detailed timeline of both exploits
3. See technical breakdown of attack
4. Understand how StacksGuard prevents it

---

## 📜 Smart Contracts

### Token Reputation Registry

**Primary contract for security scores and flags.**

#### Key Functions

```clarity
;; Submit audit report (auditors only)
(define-public (submit-audit-report 
  (token-contract principal)
  (security-score uint)        ;; 0-100
  (threat-level (string-ascii 20))
  (notes (string-ascii 256))))

;; Flag malicious token (admin only)
(define-public (flag-malicious-token 
  (token-contract principal)))

;; Query token score
(define-read-only (get-token-score 
  (token-contract principal)))

;; Check if flagged
(define-read-only (is-token-flagged 
  (token-contract principal)))

;; Get audit history
(define-read-only (get-audit-history 
  (token-contract principal)))
```

#### Access Control

- **Contract Owner**: Can flag tokens, add/remove auditors
- **Approved Auditors**: Can submit audit reports
- **Public Read**: Anyone can query scores and flags

### Protected Vault Demo

**Example integration showing how to protect deposits.**

```clarity
(define-public (deposit-token-protected 
  (token-contract principal)
  (amount uint))
  (let (
    (is-flagged (unwrap! 
      (contract-call? .token-reputation-registry 
        is-token-flagged token-contract) 
      ERR-TRANSFER-FAILED))
    (token-score (unwrap! 
      (contract-call? .token-reputation-registry 
        get-token-score token-contract) 
      ERR-TRANSFER-FAILED))
  )
    ;; StacksGuard security checks
    (asserts! (not is-flagged) ERR-TOKEN-FLAGGED)
    (asserts! (< token-score u70) ERR-TOKEN-FLAGGED)
    
    ;; Accept deposit if safe
    (map-set vault-balances tx-sender (+ sender-balance amount))
    (ok amount)
  ))
```

---

## 🌐 Frontend Application

### Pages

#### Homepage (`/`)
- Hero section with call-to-action
- Live statistics
- Protocol health dashboard
- Threat feed
- ALEX hack overview

#### Token Analyzer (`/analyze`)
- Code input textarea
- AI analysis button
- Risk gauge visualization
- Threat list
- Recommendations

#### Live Demo (`/demo`)
- Interactive simulation
- Side-by-side comparison
- Real-time activity logs
- Integration code examples

#### ALEX Hack Case Study (`/alex-hack`)
- Attack timeline
- Technical breakdown
- Code comparison
- Prevention strategy

### Components

#### Core UI Components
- `<Hero>` - Landing page hero section
- `<Navigation>` - Top navigation bar with wallet
- `<StatsBanner>` - Animated statistics cards
- `<ProtocolCard>` - Protocol health display
- `<ThreatFeed>` - Live threat monitoring
- `<RiskGauge>` - Circular progress gauge
- `<SimulationVault>` - Interactive attack demo
- `<Timeline>` - Event timeline visualization
- `<CodeBlock>` - Syntax-highlighted code display

#### UI Library (shadcn/ui)
- Button, Card, Badge, Input, Textarea
- Radix UI primitives for accessibility

---

## 🔌 API Reference

### POST `/api/analyze-contract`

Analyzes Clarity smart contract code for security vulnerabilities.

**Request Body:**
```json
{
  "contractCode": "string"
}
```

**Response:**
```json
{
  "score": 95,
  "threats": [
    "as-contract abuse detected in transfer-from function",
    "No access control on mint function",
    "Potential reentrancy in swap function"
  ],
  "reasoning": "Detailed AI analysis explanation...",
  "recommendation": "HIGH RISK"
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

---

## 🔒 Security Considerations

### Smart Contract Security

- **Access Control**: Registry functions protected by owner/auditor checks
- **Input Validation**: All inputs validated before storage
- **Immutable Core Logic**: Once deployed, scoring logic is fixed
- **Audit Trail**: Complete history stored on-chain

### Frontend Security

- **API Key Protection**: Gemini API key stored server-side only
- **Input Sanitization**: All user inputs validated
- **Rate Limiting**: Prevent API abuse
- **Wallet Security**: Non-custodial, user controls keys

### AI Analysis Security

- **Pattern Recognition**: Focuses on known exploit patterns
- **Conservative Scoring**: Errs on side of caution
- **Human Review**: AI assists, humans decide
- **Continuous Learning**: Model updated with new threats

### Known Limitations

1. **AI False Positives**: Some safe code may be flagged
2. **Novel Attacks**: Zero-day exploits may not be detected
3. **Obfuscation**: Highly obfuscated code harder to analyze
4. **Dependency Analysis**: External contract calls not deeply analyzed

---

## 🗺️ Roadmap

### Phase 1: MVP (Current)
- ✅ AI-powered token analysis
- ✅ On-chain reputation registry
- ✅ Basic frontend interface
- ✅ Demo simulation
- ✅ ALEX hack case study

### Phase 2: Ecosystem Integration (Q1 2026)
- [ ] Partner with 3+ major Stacks protocols
- [ ] Deploy to Stacks mainnet
- [ ] Community auditor program
- [ ] Automated contract monitoring
- [ ] Threat alert system

### Phase 3: Advanced Features (Q2 2026)
- [ ] Multi-chain support (other Bitcoin L2s)
- [ ] Machine learning threat detection
- [ ] Automated vulnerability patching suggestions
- [ ] Insurance protocol integration
- [ ] Governance token launch

### Phase 4: Decentralization (Q3-Q4 2026)
- [ ] DAO governance structure
- [ ] Decentralized auditor network
- [ ] Token-based reputation staking
- [ ] Bug bounty program
- [ ] Cross-chain security alliances

---

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

### Development

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Reporting Bugs

Use GitHub Issues and include:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details

---
[Get Started](#installation) • [Documentation](#) • [Community](#community)

</div>
