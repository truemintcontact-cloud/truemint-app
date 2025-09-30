/**
 * Central fee config for True Mint.
 * All values are in basis points (bps): 100 bps = 1.00%
 */
export const TOTAL_FEE_BPS     = 200; // 2.00% total
export const PLATFORM_FEE_BPS  = 100; // 1.00% platform
export const CREATOR_FEE_BPS   = 50;  // 0.50% creator
export const STAKER_FEE_BPS    = 50;  // 0.50% to token stakers
export const STAKER_REWARD_AS  = "SOL" as const; // staker rewards paid in SOL

export function bpsToPct(bps: number) {
  // e.g. 200 -> "2.00%"
  return (bps / 100).toFixed(2) + "%";
}

export const TOTAL_FEE_PCT    = bpsToPct(TOTAL_FEE_BPS);
export const PLATFORM_FEE_PCT = bpsToPct(PLATFORM_FEE_BPS);
export const CREATOR_FEE_PCT  = bpsToPct(CREATOR_FEE_BPS);
export const STAKER_FEE_PCT   = bpsToPct(STAKER_FEE_BPS);
