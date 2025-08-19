// Simplified ephemeris calculations for demo purposes
// In a real implementation, this would integrate with Swiss Ephemeris or similar

export interface PlanetaryPosition {
  sign: string;
  degree: number;
  longitude: number;
}

export interface HousePosition {
  sign: string;
  cusp: number;
}

export interface AspectData {
  type: string;
  orb: number;
  exact: boolean;
}

export function calculatePlanetaryPositions(
  birthDate: string,
  birthTime: string,
  latitude: number,
  longitude: number
): Record<string, PlanetaryPosition> {
  // Real planetary positions for Prava's birth data (June 11, 1987, 22:46, Decatur GA)
  // These are actual calculated positions from the provided natal chart PDF
  return {
    Sun: { sign: "Gemini", degree: 20.63, longitude: 80.63 },
    Moon: { sign: "Sagittarius", degree: 24.12, longitude: 264.12 },
    Mercury: { sign: "Cancer", degree: 13.75, longitude: 103.75 },
    Venus: { sign: "Gemini", degree: 1.10, longitude: 61.10 },
    Mars: { sign: "Cancer", degree: 14.25, longitude: 104.25 },
    Jupiter: { sign: "Aries", degree: 22.88, longitude: 22.88 },
    Saturn: { sign: "Sagittarius", degree: 17.65, longitude: 257.65 },
    Uranus: { sign: "Sagittarius", degree: 24.90, longitude: 264.90 },
    Neptune: { sign: "Capricorn", degree: 7.07, longitude: 277.07 },
    Pluto: { sign: "Scorpio", degree: 7.50, longitude: 217.50 }
  };
}

export function calculateHouses(
  birthDate: string,
  birthTime: string,
  latitude: number,
  longitude: number
): Record<number, HousePosition> {
  // Real house cusps for Prava's birth data
  return {
    1: { sign: "Capricorn", cusp: 19.83 },
    2: { sign: "Aquarius", cusp: 29.78 },
    3: { sign: "Aries", cusp: 8.58 },
    4: { sign: "Taurus", cusp: 9.52 },
    5: { sign: "Gemini", cusp: 4.15 },
    6: { sign: "Gemini", cusp: 26.25 },
    7: { sign: "Cancer", cusp: 19.83 },
    8: { sign: "Leo", cusp: 29.78 },
    9: { sign: "Libra", cusp: 8.58 },
    10: { sign: "Scorpio", cusp: 9.52 },
    11: { sign: "Sagittarius", cusp: 4.15 },
    12: { sign: "Sagittarius", cusp: 26.25 }
  };
}

export function calculateAspects(
  planets: Record<string, PlanetaryPosition>
): Record<string, AspectData> {
  // Real aspects from Prava's natal chart
  return {
    "Sun-Moon": { type: "Opposition", orb: 3.47, exact: false },
    "Sun-Jupiter": { type: "Sextile", orb: 2.25, exact: false },
    "Sun-Saturn": { type: "Opposition", orb: 2.98, exact: false },
    "Moon-Jupiter": { type: "Trine", orb: 1.22, exact: true },
    "Moon-Uranus": { type: "Conjunction", orb: 0.80, exact: true },
    "Mercury-Mars": { type: "Conjunction", orb: 0.48, exact: true }
  };
}

export function getSignSymbol(sign: string): string {
  const symbols: Record<string, string> = {
    Aries: "♈",
    Taurus: "♉",
    Gemini: "♊",
    Cancer: "♋",
    Leo: "♌",
    Virgo: "♍",
    Libra: "♎",
    Scorpio: "♏",
    Sagittarius: "♐",
    Capricorn: "♑",
    Aquarius: "♒",
    Pisces: "♓"
  };
  return symbols[sign] || sign;
}

export function getPlanetSymbol(planet: string): string {
  const symbols: Record<string, string> = {
    Sun: "☉",
    Moon: "☽",
    Mercury: "☿",
    Venus: "♀",
    Mars: "♂",
    Jupiter: "♃",
    Saturn: "♄",
    Uranus: "♅",
    Neptune: "♆",
    Pluto: "♇"
  };
  return symbols[planet] || planet.charAt(0);
}

export function formatDegree(degree: number): string {
  const deg = Math.floor(degree);
  const min = Math.floor((degree - deg) * 60);
  return `${deg}°${min}'`;
}