import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const natalCharts = pgTable("natal_charts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  birthDate: text("birth_date").notNull(),
  birthTime: text("birth_time").notNull(),
  birthLocation: text("birth_location").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  planetaryPositions: jsonb("planetary_positions").notNull(),
  houses: jsonb("houses").notNull(),
  aspects: jsonb("aspects").notNull(),
});

export const spirits = pgTable("spirits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  planet: text("planet").notNull(),
  element: text("element").notNull(),
  zodiacSigns: jsonb("zodiac_signs").notNull(),
  virtues: jsonb("virtues").notNull(),
  colors: jsonb("colors").notNull(),
  numbers: jsonb("numbers").notNull(),
  shapes: jsonb("shapes").notNull(),
  days: jsonb("days").notNull(),
  materials: jsonb("materials").notNull(),
  symbols: jsonb("symbols").notNull(),
});

export const talismans = pgTable("talismans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  goal: text("goal").notNull(),
  spiritIds: jsonb("spirit_ids").notNull(),
  electionDate: text("election_date").notNull(),
  design: jsonb("design").notNull(),
  astrological_justification: text("astrological_justification").notNull(),
});

export const elections = pgTable("elections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: text("date").notNull(),
  time: text("time").notNull(),
  goal: text("goal").notNull(),
  score: integer("score").notNull(),
  planetaryHour: text("planetary_hour").notNull(),
  moonPhase: text("moon_phase").notNull(),
  keyAspect: text("key_aspect").notNull(),
  justification: text("justification").notNull(),
});

export const transits = pgTable("transits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  natalChartId: varchar("natal_chart_id").notNull(),
  transitPlanet: text("transit_planet").notNull(),
  natalPlanet: text("natal_planet").notNull(),
  aspect: text("aspect").notNull(),
  exactDate: text("exact_date").notNull(),
  impact: text("impact").notNull(), // positive, challenging, mixed
  description: text("description").notNull(),
  isActive: boolean("is_active").notNull().default(false),
});

export const insertNatalChartSchema = createInsertSchema(natalCharts).omit({ id: true });
export const insertSpiritSchema = createInsertSchema(spirits).omit({ id: true });
export const insertTalismanSchema = createInsertSchema(talismans).omit({ id: true });
export const insertElectionSchema = createInsertSchema(elections).omit({ id: true });
export const insertTransitSchema = createInsertSchema(transits).omit({ id: true });

export type InsertNatalChart = z.infer<typeof insertNatalChartSchema>;
export type InsertSpirit = z.infer<typeof insertSpiritSchema>;
export type InsertTalisman = z.infer<typeof insertTalismanSchema>;
export type InsertElection = z.infer<typeof insertElectionSchema>;
export type InsertTransit = z.infer<typeof insertTransitSchema>;

export type NatalChart = typeof natalCharts.$inferSelect;
export type Spirit = typeof spirits.$inferSelect;
export type Talisman = typeof talismans.$inferSelect;
export type Election = typeof elections.$inferSelect;
export type Transit = typeof transits.$inferSelect;
