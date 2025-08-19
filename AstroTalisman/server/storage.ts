import { 
  type NatalChart, 
  type InsertNatalChart,
  type Spirit,
  type InsertSpirit,
  type Talisman,
  type InsertTalisman,
  type Election,
  type InsertElection,
  type Transit,
  type InsertTransit
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Natal Charts
  createNatalChart(chart: InsertNatalChart): Promise<NatalChart>;
  getNatalCharts(): Promise<NatalChart[]>;
  getNatalChart(id: string): Promise<NatalChart | undefined>;

  // Spirits
  createSpirit(spirit: InsertSpirit): Promise<Spirit>;
  getSpirits(): Promise<Spirit[]>;
  getSpirit(id: string): Promise<Spirit | undefined>;
  searchSpirits(query: { planet?: string; element?: string; virtue?: string }): Promise<Spirit[]>;

  // Talismans
  createTalisman(talisman: InsertTalisman): Promise<Talisman>;
  getTalismans(): Promise<Talisman[]>;
  getTalisman(id: string): Promise<Talisman | undefined>;

  // Elections
  createElection(election: InsertElection): Promise<Election>;
  getElections(): Promise<Election[]>;
  getElectionsByGoal(goal: string): Promise<Election[]>;

  // Transits
  createTransit(transit: InsertTransit): Promise<Transit>;
  getTransits(): Promise<Transit[]>;
  getActiveTransits(natalChartId: string): Promise<Transit[]>;
  getUpcomingTransits(natalChartId: string): Promise<Transit[]>;
}

export class MemStorage implements IStorage {
  private natalCharts: Map<string, NatalChart> = new Map();
  private spirits: Map<string, Spirit> = new Map();
  private talismans: Map<string, Talisman> = new Map();
  private elections: Map<string, Election> = new Map();
  private transits: Map<string, Transit> = new Map();

  constructor() {
    // Initialize with sample spirit data
    this.initializeSampleSpirits();
  }

  private initializeSampleSpirits() {
    const sampleSpirits = [
      {
        name: "Ogun",
        description: "Warrior deity of iron and protection",
        planet: "Mars",
        element: "Fire",
        zodiacSigns: ["Aries", "Scorpio"],
        virtues: ["Protection", "Courage", "War"],
        colors: ["Red", "Black"],
        numbers: [3, 9],
        shapes: ["Triangle"],
        days: ["Tuesday"],
        materials: ["Iron", "Steel"],
        symbols: { sigil: "ogun.svg", planetary_glyph: "♂" }
      },
      {
        name: "Oshun",
        description: "River goddess of love and abundance",
        planet: "Venus",
        element: "Water",
        zodiacSigns: ["Taurus", "Libra"],
        virtues: ["Love", "Abundance", "Beauty"],
        colors: ["Yellow", "Gold"],
        numbers: [5, 7],
        shapes: ["Circle"],
        days: ["Friday"],
        materials: ["Copper", "Gold"],
        symbols: { sigil: "oshun.svg", planetary_glyph: "♀" }
      },
      {
        name: "Elegua",
        description: "Messenger and guardian of crossroads",
        planet: "Mercury",
        element: "Air",
        zodiacSigns: ["Gemini", "Virgo"],
        virtues: ["Communication", "Travel", "Opportunity"],
        colors: ["Red", "Black"],
        numbers: [3, 21],
        shapes: ["Square"],
        days: ["Wednesday"],
        materials: ["Clay", "Stone"],
        symbols: { sigil: "elegua.svg", planetary_glyph: "☿" }
      },
      {
        name: "Yemoja",
        description: "Ocean mother of nurturing and wisdom",
        planet: "Moon",
        element: "Water",
        zodiacSigns: ["Cancer"],
        virtues: ["Healing", "Wisdom", "Motherhood"],
        colors: ["Blue", "White"],
        numbers: [7, 9],
        shapes: ["Circle"],
        days: ["Monday"],
        materials: ["Silver", "Pearl"],
        symbols: { sigil: "yemoja.svg", planetary_glyph: "☽" }
      },
      {
        name: "Oya",
        description: "Fierce warrior goddess of winds, storms, and transformation. Breaker of chains and liberator from oppression.",
        planet: "Mars",
        element: "Air",
        zodiacSigns: ["Aries", "Scorpio"],
        virtues: ["Liberation", "Protection", "Justice", "Transformation"],
        colors: ["Purple", "Red", "Black"],
        numbers: [9, 7],
        shapes: ["Triangle", "Star"],
        days: ["Tuesday", "Wednesday"],
        materials: ["Iron", "Copper", "Purple cloth"],
        symbols: { sigil: "oya.svg", planetary_glyph: "♂" }
      }
    ];

    sampleSpirits.forEach(spirit => {
      const id = randomUUID();
      this.spirits.set(id, { ...spirit, id });
    });
  }

  async createNatalChart(chart: InsertNatalChart): Promise<NatalChart> {
    const id = randomUUID();
    const newChart: NatalChart = { ...chart, id };
    this.natalCharts.set(id, newChart);
    return newChart;
  }

  async getNatalCharts(): Promise<NatalChart[]> {
    return Array.from(this.natalCharts.values());
  }

  async getNatalChart(id: string): Promise<NatalChart | undefined> {
    return this.natalCharts.get(id);
  }

  async createSpirit(spirit: InsertSpirit): Promise<Spirit> {
    const id = randomUUID();
    const newSpirit: Spirit = { ...spirit, id };
    this.spirits.set(id, newSpirit);
    return newSpirit;
  }

  async getSpirits(): Promise<Spirit[]> {
    return Array.from(this.spirits.values());
  }

  async getSpirit(id: string): Promise<Spirit | undefined> {
    return this.spirits.get(id);
  }

  async searchSpirits(query: { planet?: string; element?: string; virtue?: string }): Promise<Spirit[]> {
    const spirits = Array.from(this.spirits.values());
    return spirits.filter(spirit => {
      if (query.planet && spirit.planet !== query.planet) return false;
      if (query.element && spirit.element !== query.element) return false;
      if (query.virtue && !(spirit.virtues as string[]).includes(query.virtue)) return false;
      return true;
    });
  }

  async createTalisman(talisman: InsertTalisman): Promise<Talisman> {
    const id = randomUUID();
    const newTalisman: Talisman = { ...talisman, id };
    this.talismans.set(id, newTalisman);
    return newTalisman;
  }

  async getTalismans(): Promise<Talisman[]> {
    return Array.from(this.talismans.values());
  }

  async getTalisman(id: string): Promise<Talisman | undefined> {
    return this.talismans.get(id);
  }

  async createElection(election: InsertElection): Promise<Election> {
    const id = randomUUID();
    const newElection: Election = { ...election, id };
    this.elections.set(id, newElection);
    return newElection;
  }

  async getElections(): Promise<Election[]> {
    return Array.from(this.elections.values());
  }

  async getElectionsByGoal(goal: string): Promise<Election[]> {
    const elections = Array.from(this.elections.values());
    return elections.filter(election => election.goal === goal);
  }

  async createTransit(transit: InsertTransit): Promise<Transit> {
    const id = randomUUID();
    const newTransit: Transit = { ...transit, id };
    this.transits.set(id, newTransit);
    return newTransit;
  }

  async getTransits(): Promise<Transit[]> {
    return Array.from(this.transits.values());
  }

  async getActiveTransits(natalChartId: string): Promise<Transit[]> {
    const transits = Array.from(this.transits.values());
    return transits.filter(transit => 
      transit.natalChartId === natalChartId && transit.isActive
    );
  }

  async getUpcomingTransits(natalChartId: string): Promise<Transit[]> {
    const transits = Array.from(this.transits.values());
    return transits.filter(transit => 
      transit.natalChartId === natalChartId && !transit.isActive
    );
  }
}

export const storage = new MemStorage();
