;; Protected Vault Demo
;; Demonstrates how protocols can integrate StacksGuard

;; Import trait (simplified for demo)
(define-map vault-balances principal uint)
(define-data-var total-deposits uint u0)

;; Constants
(define-constant ERR-TOKEN-FLAGGED (err u403))
(define-constant ERR-INSUFFICIENT-BALANCE (err u404))
(define-constant ERR-TRANSFER-FAILED (err u405))

;; Deposit function with StacksGuard integration
(define-public (deposit-stx (amount uint))
  (let (
    (sender-balance (default-to u0 (map-get? vault-balances tx-sender)))
  )
    ;; Accept STX deposit
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    
    ;; Update balance
    (map-set vault-balances tx-sender (+ sender-balance amount))
    (var-set total-deposits (+ (var-get total-deposits) amount))
    
    (ok amount)
  ))

;; Deposit with token validation (for SIP-010 tokens)
(define-public (deposit-token-protected 
  (token-contract principal)
  (amount uint))
  (let (
    (is-flagged (unwrap! (contract-call? .token-reputation-registry is-token-flagged token-contract) ERR-TRANSFER-FAILED))
    (token-score (unwrap! (contract-call? .token-reputation-registry get-token-score token-contract) ERR-TRANSFER-FAILED))
    (sender-balance (default-to u0 (map-get? vault-balances tx-sender)))
  )
    ;; StacksGuard security check
    (asserts! (not is-flagged) ERR-TOKEN-FLAGGED)
    (asserts! (< token-score u70) ERR-TOKEN-FLAGGED)
    
    ;; If checks pass, accept deposit
    (map-set vault-balances tx-sender (+ sender-balance amount))
    
    (ok amount)
  ))

;; Withdraw function
(define-public (withdraw (amount uint))
  (let (
    (sender-balance (default-to u0 (map-get? vault-balances tx-sender)))
  )
    (asserts! (>= sender-balance amount) ERR-INSUFFICIENT-BALANCE)
    
    ;; Transfer STX back
    (try! (as-contract (stx-transfer? amount tx-sender tx-sender)))
    
    ;; Update balance
    (map-set vault-balances tx-sender (- sender-balance amount))
    (var-set total-deposits (- (var-get total-deposits) amount))
    
    (ok amount)
  ))

;; Read-only functions
(define-read-only (get-balance (user principal))
  (ok (default-to u0 (map-get? vault-balances user)))
)

(define-read-only (get-total-deposits)
  (ok (var-get total-deposits))
)
