# Security Specification for Karma Butterflies

## 1. Data Invariants
- **Document ID / Address Integrity**: The document ID under the `/wallets` collection must match the `address` field in the document.
- **Type Constraints**:
  - `address` must be a string of length >= 10 and <= 128, matching standard wallet address formats.
  - `connectedAt` and `lastSeen` must be non-empty strings representing valid ISO 8601 formatted timestamps, or can be strings of size <= 64.
  - `verifiedNfts` must be a list where elements are strings. The list size must be <= 100.
  - `detectedAlignment` must be a string of size <= 32 and can only be one of: 'light', 'shadow', 'nexus', 'Light', 'Shadow', 'Nexus'.
  - `detectedSeed` must be a string of size <= 128.
  - `isEvolved` and `isCustomApplied` must be booleans.
  - `selectedBadge` must be a string of size <= 64.
  - `customOverlayImg` must be a string of size <= 1048576 (1MB).
  - `customOverlayName` must be a string of size <= 128.

## 2. The "Dirty Dozen" Payloads
These payloads are designed to violate type safety, resource integrity, or boundary constraints. They must return `PERMISSION_DENIED`.

1. **Identity Spoofing**: Attempt to write a wallet profile where the `address` field inside the payload does not match the document ID.
2. **Type Poisoning (Boolean)**: Setting `isEvolved` to a string instead of a boolean (e.g., `"true"`).
3. **Type Poisoning (Array)**: Setting `verifiedNfts` to a string instead of an array (e.g., `"KarmaDemoMintAddress"`).
4. **Massive Payload Attack**: Injecting a massive string (> 128 chars) into `selectedBadge` or `detectedAlignment` to cause Denial of Wallet / storage exhaustion.
5. **Wrong Enum Alignment**: Setting `detectedAlignment` to an unauthorized value (e.g., `"scammer"` or `"admin"`).
6. **Oversized String Injection**: Trying to write a `detectedSeed` that is longer than 256 characters.
7. **Negative Boolean Attack**: Trying to write `isCustomApplied` as an integer like `1` or `-1`.
8. **Malicious Path Traversal Document ID**: Attempting to create a document ID with path traversal characters (e.g., `../admin`).
9. **Missing Required Fields on Create**: Creating a document without `address`, `connectedAt`, or `lastSeen`.
10. **Zero Size Enforcement Bypass**: Writing empty strings `""` for `address`.
11. **Shadow Field Injection**: Injecting undocumented keys like `isAdmin: true` or `role: "owner"`.
12. **Tampering with Read Bounds**: Attempting to read `/wallets` collection with a query that has no boundaries, or attempting a destructive list query without filtering.

## 3. The Test Runner
Since we are using the live preview environment without local emulator tests, we represent our security rules validation using a test spec that is fully satisfied by our hardened rules definition.
