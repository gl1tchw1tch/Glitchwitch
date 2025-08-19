import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertNatalChartSchema, 
  insertSpiritSchema, 
  insertTalismanSchema,
  insertElectionSchema,
  insertTransitSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Natal Charts
  app.get("/api/natal-charts", async (req, res) => {
    try {
      const charts = await storage.getNatalCharts();
      res.json(charts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch natal charts" });
    }
  });

  app.post("/api/natal-charts", async (req, res) => {
    try {
      const validatedData = insertNatalChartSchema.parse(req.body);
      const chart = await storage.createNatalChart(validatedData);
      res.json(chart);
    } catch (error) {
      res.status(400).json({ message: "Invalid natal chart data" });
    }
  });

  app.get("/api/natal-charts/:id", async (req, res) => {
    try {
      const chart = await storage.getNatalChart(req.params.id);
      if (!chart) {
        return res.status(404).json({ message: "Natal chart not found" });
      }
      res.json(chart);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch natal chart" });
    }
  });

  // Spirits
  app.get("/api/spirits", async (req, res) => {
    try {
      const { planet, element, virtue } = req.query;
      let spirits;
      
      if ((planet && planet !== "all") || (element && element !== "all") || (virtue && virtue !== "all")) {
        spirits = await storage.searchSpirits({
          planet: planet === "all" ? undefined : planet as string,
          element: element === "all" ? undefined : element as string, 
          virtue: virtue === "all" ? undefined : virtue as string
        });
      } else {
        spirits = await storage.getSpirits();
      }
      
      res.json(spirits);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch spirits" });
    }
  });

  app.post("/api/spirits", async (req, res) => {
    try {
      const validatedData = insertSpiritSchema.parse(req.body);
      const spirit = await storage.createSpirit(validatedData);
      res.json(spirit);
    } catch (error) {
      res.status(400).json({ message: "Invalid spirit data" });
    }
  });

  app.get("/api/spirits/:id", async (req, res) => {
    try {
      const spirit = await storage.getSpirit(req.params.id);
      if (!spirit) {
        return res.status(404).json({ message: "Spirit not found" });
      }
      res.json(spirit);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch spirit" });
    }
  });

  // Talismans
  app.get("/api/talismans", async (req, res) => {
    try {
      const talismans = await storage.getTalismans();
      res.json(talismans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch talismans" });
    }
  });

  app.post("/api/talismans", async (req, res) => {
    try {
      const validatedData = insertTalismanSchema.parse(req.body);
      const talisman = await storage.createTalisman(validatedData);
      res.json(talisman);
    } catch (error) {
      res.status(400).json({ message: "Invalid talisman data" });
    }
  });

  // Elections
  app.get("/api/elections", async (req, res) => {
    try {
      const { goal } = req.query;
      let elections;
      
      if (goal) {
        elections = await storage.getElectionsByGoal(goal as string);
      } else {
        elections = await storage.getElections();
      }
      
      res.json(elections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch elections" });
    }
  });

  app.post("/api/elections", async (req, res) => {
    try {
      const validatedData = insertElectionSchema.parse(req.body);
      const election = await storage.createElection(validatedData);
      res.json(election);
    } catch (error) {
      res.status(400).json({ message: "Invalid election data" });
    }
  });

  // Election finder endpoint
  app.post("/api/elections/find", async (req, res) => {
    try {
      const { goal, timeFrame } = req.body;
      
      // Mock election calculation - in real implementation this would use Swiss Ephemeris
      const mockElections = [
        {
          date: "2024-03-15",
          time: "14:30",
          goal,
          score: 94,
          planetaryHour: "Mars Hour",
          moonPhase: "Waxing Crescent",
          keyAspect: "Mars trine Jupiter",
          justification: "Mars rising in Aries provides strong protective energy. Jupiter's trine offers expansion and blessing of the work."
        },
        {
          date: "2024-03-22", 
          time: "11:45",
          goal,
          score: 87,
          planetaryHour: "Sun Hour",
          moonPhase: "First Quarter",
          keyAspect: "Sun sextile Mars",
          justification: "Sun's supportive aspect to Mars provides steady, confident energy for protection work."
        },
        {
          date: "2024-03-29",
          time: "18:15", 
          goal,
          score: 76,
          planetaryHour: "Mercury Hour",
          moonPhase: "Waxing Gibbous",
          keyAspect: "Moon conjunct Mars",
          justification: "Moon-Mars conjunction provides emotional drive but may be more volatile. Good for urgent protection needs."
        }
      ];

      for (const election of mockElections) {
        await storage.createElection(election);
      }

      res.json(mockElections);
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate elections" });
    }
  });

  // Transits
  app.get("/api/transits/active/:natalChartId", async (req, res) => {
    try {
      const transits = await storage.getActiveTransits(req.params.natalChartId);
      res.json(transits);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch active transits" });
    }
  });

  app.get("/api/transits/upcoming/:natalChartId", async (req, res) => {
    try {
      const transits = await storage.getUpcomingTransits(req.params.natalChartId);
      res.json(transits);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch upcoming transits" });
    }
  });

  app.post("/api/transits", async (req, res) => {
    try {
      const validatedData = insertTransitSchema.parse(req.body);
      const transit = await storage.createTransit(validatedData);
      res.json(transit);
    } catch (error) {
      res.status(400).json({ message: "Invalid transit data" });
    }
  });

  // Calculate transits endpoint
  app.post("/api/transits/calculate", async (req, res) => {
    try {
      const { natalChartId } = req.body;
      
      // Mock transit calculations - in real implementation this would use Swiss Ephemeris
      const mockActiveTransits = [
        {
          natalChartId,
          transitPlanet: "Saturn",
          natalPlanet: "Moon", 
          aspect: "Square",
          exactDate: "2024-03-18",
          impact: "challenging",
          description: "Potential for emotional restrictions, melancholy, or obstacles in home/family matters.",
          isActive: true
        },
        {
          natalChartId,
          transitPlanet: "Jupiter",
          natalPlanet: "Venus",
          aspect: "Trine", 
          exactDate: "2024-03-25",
          impact: "positive",
          description: "Excellent for love, beauty, artistic pursuits, and financial opportunities.",
          isActive: true
        },
        {
          natalChartId,
          transitPlanet: "Mercury",
          natalPlanet: "Mars",
          aspect: "Conjunction",
          exactDate: "2024-03-20", 
          impact: "mixed",
          description: "Quick, decisive communication but potential for arguments or hasty decisions.",
          isActive: true
        }
      ];

      const mockUpcomingTransits = [
        {
          natalChartId,
          transitPlanet: "Mars",
          natalPlanet: "Jupiter",
          aspect: "Opposition",
          exactDate: "2024-04-02",
          impact: "challenging",
          description: "Potential for overconfidence, excess, or conflicts between action and expansion.",
          isActive: false
        },
        {
          natalChartId,
          transitPlanet: "Venus", 
          natalPlanet: "Moon",
          aspect: "Sextile",
          exactDate: "2024-04-05",
          impact: "positive",
          description: "Harmonious emotional expression, good for relationships and creative work.",
          isActive: false
        }
      ];

      for (const transit of [...mockActiveTransits, ...mockUpcomingTransits]) {
        await storage.createTransit(transit);
      }

      res.json({ active: mockActiveTransits, upcoming: mockUpcomingTransits });
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate transits" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
