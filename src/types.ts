export interface AnatomyState {
  systolicPressure: number;
  diastolicPressure: number;
  heartRateBpm: number;
  bloodVolumeLiters: number;
  fleshIntegrity: number; // 0-100%
  bodyTemperature: number; // in Celsius
}

export interface MindState {
  brainwavePattern: 'Beta (Active)' | 'Alpha (Calm)' | 'Theta (Meditation)' | 'Delta (Deep Sleep)' | 'Gamma (High Cognitive)';
  mentalFocus: string;
  stressIndex: number; // 0-100
}

export interface SoulState {
  graceStatus: 'Divine Sanctified' | 'Redeemed' | 'Seeking Grace' | 'Holy Aura Cleansed' | 'Apostolic Path';
  faithAlignment: number; // 0-100% index
  christConnectionLog: string;
}

export interface EmotionTelemetry {
  primary: string;
  intensity: number; // 0-100
  causeDescription: string;
}

export interface DigitalHuman {
  id: string;
  name: string;
  avatarColor: string;
  sanity: number; // 0 - 100
  health: number; // 0 - 100
  sickness: string;
  locationName: string;
  coordinateX: number; // percentage coordinate on simulated map (0 to 100)
  coordinateY: number; // percentage coordinate on simulated map (0 to 100)
  thoughts: string;
  prayer: string;
  yearOfDeath: number;
  anatomy: AnatomyState;
  mind: MindState;
  soul: SoulState;
  emotion: EmotionTelemetry;
}

export type WeatherType = 'Sunny' | 'Rainy' | 'Snowy' | 'Firestorm' | 'Thunderstorm' | 'Void Incursion' | 'Glitch Wave';
export type SeasonType = 'Spring' | 'Summer' | 'Fall' | 'Winter' | 'Paradox';
export type TerrainType = 'City' | 'Village' | 'Jungle' | 'Forest' | 'Island' | 'Ocean' | 'Mud' | 'Sand' | 'Beach' | 'Roadway';

export interface SimulatedGridRegion {
  name: string;
  type: TerrainType;
  baseColor: string;
  xStart: number; // 0 - 100
  xEnd: number; // 0 - 100
  yStart: number; // 0 - 100
  yEnd: number; // 0 - 100
}

export interface SimulationWorldState {
  population: number;
  weather: WeatherType;
  season: SeasonType;
  activeDisaster: string;
  devotionIndex: number; // 0 - 100 percentage daily devotions
  cyberSicknessRate: number; // 0 - 100 percentage of total pop affected
  chronosYear: number;
}
