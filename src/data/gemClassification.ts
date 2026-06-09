/**
 * Shared gem classification data.
 *
 * Single source of truth for "more"-multiplier, penetration, clear-speed and
 * bossing support classification. All lookups go through normalizeGemName so
 * callers can pass any of: "Controlled Destruction",
 * "Controlled Destruction Support", "Exceptional Controlled Destruction
 * Support", or "Awakened Controlled Destruction Support".
 *
 * These sets are structural heuristics only — measured DPS deltas via
 * run_experiments are always authoritative.
 */

/**
 * Normalize a gem name for classification lookups: lowercase, strip the
 * "Support" suffix and Exceptional/Awakened/quality-variant prefixes.
 */
export function normalizeGemName(name: string): string {
  return name
    .toLowerCase()
    .replace(/^(exceptional|awakened|anomalous|divergent|phantasmal)\s+/, '')
    .replace(/\s+support$/, '')
    .trim();
}

/**
 * Support gems that provide multiplicative ("more") damage bonuses.
 * The primary way to scale DPS — far stronger per slot than "increased"
 * supports. A strong main 6-link carries 2-3 of these.
 */
const MORE_MULTIPLIER_GEMS = new Set([
  'controlled destruction',
  'elemental focus',
  'multistrike',
  'spell echo',
  'swift affliction',
  'efficacy',
  'minion damage',
  'concentrated effect',
  'brutality',
  'deadly ailments',
  'vile toxins',
  'impale',
  'melee physical damage',
  'added fire damage',
  'close combat',
  'increased critical damage',
  'cruelty',
  'void manipulation',
  'hypothermia',
  'trap and mine damage',
  'multiple totems',
  'intensify',
  'infused channelling',
  'empower',
]);

/**
 * Support gems that reduce enemy resistances or penetrate them.
 * Critical against high-resistance endgame bosses.
 */
const PENETRATION_GEMS = new Set([
  'fire penetration',
  'cold penetration',
  'lightning penetration',
  'elemental penetration',
  'combustion', // reduces enemy fire resist on ignite
]);

/**
 * Support gems primarily useful for clear speed (AoE / projectile spread).
 */
const CLEAR_SPEED_GEMS = new Set([
  'greater multiple projectiles',
  'lesser multiple projectiles',
  'chain',
  'fork',
  'pierce',
  'volley',
  'spell cascade',
]);

/**
 * Support gems primarily useful for single-target / bossing DPS.
 */
const BOSSING_GEMS = new Set([
  'concentrated effect',
  'barrage',
  'empower',
]);

export function isMoreMultiplier(gemName: string): boolean {
  return MORE_MULTIPLIER_GEMS.has(normalizeGemName(gemName));
}

export function isPenetration(gemName: string): boolean {
  return PENETRATION_GEMS.has(normalizeGemName(gemName));
}

export function isClearSpeed(gemName: string): boolean {
  return CLEAR_SPEED_GEMS.has(normalizeGemName(gemName));
}

export function isBossing(gemName: string): boolean {
  return BOSSING_GEMS.has(normalizeGemName(gemName));
}
