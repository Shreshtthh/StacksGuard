;; Token Reputation Registry 
;; Stores security scores and audit data for tokens on Stacks

;; Data structures
(define-map token-scores principal uint)
(define-map flagged-tokens principal bool)
(define-map audit-history principal 
  (list 10 {
    auditor: principal,
    score: uint,
    threat-level: (string-ascii 20),
    timestamp: uint,
    notes: (string-ascii 256)
  }))
(define-map approved-auditors principal bool)

;; Admin principal
(define-data-var contract-owner principal tx-sender)

;; Constants
(define-constant ERR-NOT-AUTHORIZED (err u401))
(define-constant ERR-NOT-AUDITOR (err u402))
(define-constant ERR-INVALID-SCORE (err u403))
(define-constant ERR-TOKEN-FLAGGED (err u404))

;; Admin functions
(define-public (add-auditor (auditor principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-AUTHORIZED)
    (ok (map-set approved-auditors auditor true))
  ))

(define-public (remove-auditor (auditor principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-AUTHORIZED)
    (ok (map-delete approved-auditors auditor))
  ))

;; Core functions
(define-public (submit-audit-report 
  (token-contract principal)
  (security-score uint)
  (threat-level (string-ascii 20))
  (notes (string-ascii 256)))
  (let (
    (is-auditor (default-to false (map-get? approved-auditors tx-sender)))
    (current-history (default-to (list) (map-get? audit-history token-contract)))
  )
    (asserts! is-auditor ERR-NOT-AUDITOR)
    (asserts! (<= security-score u100) ERR-INVALID-SCORE)
    
    ;; Update score
    (map-set token-scores token-contract security-score)
    
    ;; Add to audit history
    (map-set audit-history token-contract 
      (unwrap-panic (as-max-len? 
        (append current-history {
          auditor: tx-sender,
          score: security-score,
          threat-level: threat-level,
          timestamp: block-height,
          notes: notes
        })
        u10)))
    
    ;; Auto-flag if high risk
    (if (>= security-score u70)
      (map-set flagged-tokens token-contract true)
      (map-set flagged-tokens token-contract false))
    
    (ok true)
  ))

(define-public (flag-malicious-token (token-contract principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-AUTHORIZED)
    (map-set flagged-tokens token-contract true)
    (map-set token-scores token-contract u100)
    (ok true)
  ))

;; Read-only functions
(define-read-only (get-token-score (token-contract principal))
  (ok (default-to u0 (map-get? token-scores token-contract)))
)

(define-read-only (is-token-flagged (token-contract principal))
  (ok (default-to false (map-get? flagged-tokens token-contract)))
)

(define-read-only (get-audit-history (token-contract principal))
  (ok (default-to (list) (map-get? audit-history token-contract)))
)

(define-read-only (is-approved-auditor (auditor principal))
  (ok (default-to false (map-get? approved-auditors auditor)))
)

;; Initialize contract owner as auditor
(map-set approved-auditors tx-sender true)
