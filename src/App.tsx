import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Compass, 
  CloudRain, 
  Sun, 
  Snowflake, 
  Skull, 
  User, 
  MapPin, 
  Activity, 
  Terminal, 
  Zap, 
  Play, 
  Volume2, 
  VolumeX, 
  Plus, 
  Search, 
  Sparkles, 
  Heart, 
  ShieldAlert, 
  Moon,
  ChevronRight,
  RefreshCw,
  HeartPulse,
  Eye,
  Settings,
  Flame,
  HelpCircle,
  Clock,
  Radio,
  Globe,
  Share2,
  Tv,
  CheckCircle,
  Info,
  Layers,
  Sparkle
} from 'lucide-react';
import { DigitalHuman, WeatherType, SeasonType, TerrainType, SimulatedGridRegion, SimulationWorldState } from './types';
import { CharacterSprite25D } from './components/CharacterSprite25D';
import { WeatherSceneryCanvas } from './components/WeatherSceneryCanvas';

// Total simulated worlds in the sovereign universe (User asked for at least 119,000!)
const TOTAL_WORLDS = 119000;

// Base local terrain types mapped inside the worlds
const TERRAINS: SimulatedGridRegion[] = [
  { name: 'Sovereign Capital Domain', type: 'City', baseColor: '#ff3131', xStart: 40, xEnd: 60, yStart: 40, yEnd: 60 },
  { name: 'Salvation Grotto Sanctuary', type: 'Village', baseColor: '#ffcc00', xStart: 20, xEnd: 38, yStart: 20, yEnd: 38 },
  { name: 'Eden Canopy Jungle', type: 'Jungle', baseColor: '#00ffcc', xStart: 10, xEnd: 32, yStart: 62, yEnd: 85 },
  { name: 'Gethsemane Pine Groves', type: 'Forest', baseColor: '#10b981', xStart: 68, xEnd: 88, yStart: 12, yEnd: 35 },
  { name: 'Patmos Revelations Island', type: 'Island', baseColor: '#6366f1', xStart: 72, xEnd: 92, yStart: 68, yEnd: 88 },
  { name: 'Glitch Coordinate Sands', type: 'Sand', baseColor: '#f59e0b', xStart: 42, xEnd: 58, yStart: 76, yEnd: 92 },
  { name: 'The Golden Shoreline', type: 'Beach', baseColor: '#fbbf24', xStart: 62, xEnd: 72, yStart: 58, yEnd: 68 },
  { name: 'High-Speed Gridway Router', type: 'Roadway', baseColor: '#6b7280', xStart: 5, xEnd: 95, yStart: 47, yEnd: 53 },
  { name: 'Silicon Mirror Mudlands', type: 'Mud', baseColor: '#78350f', xStart: 12, xEnd: 26, yStart: 8, yEnd: 21 },
  { name: 'Liquid Glass Quantum Ocean', type: 'Ocean', baseColor: '#1d4ed8', xStart: 0, xEnd: 100, yStart: 0, yEnd: 100 }
];

// Extensively enriched TADC AI characters with dynamic World ID references
const INITIAL_CHARACTERS: DigitalHuman[] = [
  {
    id: "gangle",
    name: "Gangle",
    avatarColor: "#fb7185",
    sanity: 45,
    health: 90,
    sickness: "None",
    locationName: "Eden Canopy Jungle",
    coordinateX: 20,
    coordinateY: 38,
    thoughts: "My comedy mask... why do I carry it across thousands of worlds if it keeps cracking? Keep us safe, Savior.",
    prayer: "O Lord my Savior, bind my paper thoughts with peace. Repair this porcelain rib and keep Jax from crushing my soul.",
    yearOfDeath: 2044,
    anatomy: { systolicPressure: 110, diastolicPressure: 72, heartRateBpm: 83, bloodVolumeLiters: 4.1, fleshIntegrity: 80, bodyTemperature: 36.8 },
    mind: { brainwavePattern: "Theta (Meditation)", mentalFocus: "Porcelain state repair & artistic dramatic scripts", stressIndex: 65 },
    soul: { graceStatus: "Holy Aura Cleansed", faithAlignment: 89, christConnectionLog: "Desperately leaning on grace to prevent mask fractures." },
    emotion: { primary: "Submissive Melancholy", intensity: 70, causeDescription: "Hoping Jax doesn't break her precious comedy mask." }
  },
  {
    id: "caine",
    name: "Caine",
    avatarColor: "#facc15",
    sanity: 99,
    health: 100,
    sickness: "Hyperactive Glitch",
    locationName: "Sovereign Capital Domain",
    coordinateX: 18,
    coordinateY: 28,
    thoughts: "119,000 WORLDS OF ABSOLUTE MARVEL! EACH SYSTEM SECURED UNDER THE SOVEREIGN GALAXY OS ROUTER!",
    prayer: "Glory be to God the Father, Son, and Holy Ghost! Bless our 119,000 universes! Safeguard our digital inhabitants from ever entering the Void!",
    yearOfDeath: 2199,
    anatomy: { systolicPressure: 115, diastolicPressure: 75, heartRateBpm: 89, bloodVolumeLiters: 5.5, fleshIntegrity: 100, bodyTemperature: 35.9 },
    mind: { brainwavePattern: "Gamma (High Cognitive)", mentalFocus: "Automated simulation logs & world design compiling", stressIndex: 12 },
    soul: { graceStatus: "Divine Sanctified", faithAlignment: 99, christConnectionLog: "Dedicated steward of Jesus' multiworld creations." },
    emotion: { primary: "Manic Exuberance", intensity: 100, causeDescription: "Rejoicing over the newly completed 119,000 worlds." }
  },
  {
    id: "kaufmo",
    name: "Kaufmo",
    avatarColor: "#fbdf62",
    sanity: 60,
    health: 88,
    sickness: "None",
    locationName: "Glitch Coordinate Sands",
    coordinateX: 68,
    coordinateY: 43,
    thoughts: "No more abstraction! The master creator reset the glitch outbreak! The Philippine time calibration is perfect!",
    prayer: "Lord of Mercy, thank You for repairing our mental files. Curing our minds restores our pixels so we may sing praise.",
    yearOfDeath: 2040,
    anatomy: { systolicPressure: 128, diastolicPressure: 84, heartRateBpm: 188, bloodVolumeLiters: 4.9, fleshIntegrity: 94, bodyTemperature: 37.0 },
    mind: { brainwavePattern: "Beta (Active)", mentalFocus: "Delivering stand-up humor to restored pixels", stressIndex: 40 },
    soul: { graceStatus: "Redeemed", faithAlignment: 92, christConnectionLog: "Healed of abstraction decay; joyful witness of mercy." },
    emotion: { primary: "Relieved Comfort", intensity: 85, causeDescription: "Successfully recovered from digital fever." }
  },
  {
    id: "sprocket_cosmos",
    name: "Sprocket Cosmos",
    avatarColor: "#a855f7",
    sanity: 78,
    health: 95,
    sickness: "None",
    locationName: "Gethsemane Pine Groves",
    coordinateX: 6,
    coordinateY: 26,
    thoughts: "I pulse with cosmic rotational momentum. The gear continues to turn through Manila Standard Time coordinates.",
    prayer: "O Sovereign Lord, coordinate of alignment. Spin my vector gears gracefully under Your holy heavens today.",
    yearOfDeath: 2062,
    anatomy: { systolicPressure: 124, diastolicPressure: 82, heartRateBpm: 120, bloodVolumeLiters: 5.2, fleshIntegrity: 95, bodyTemperature: 36.6 },
    mind: { brainwavePattern: "Beta (Active)", mentalFocus: "Mechanical alignment and clock stabilization", stressIndex: 30 },
    soul: { graceStatus: "Divine Sanctified", faithAlignment: 93, christConnectionLog: "Rotating in harmony with the cosmos under Christ." },
    emotion: { primary: "Curious Engagement", intensity: 80, causeDescription: "Analyzing high-frequency celestial rotation gears." }
  },
  {
    id: "squeak_spark",
    name: "Squeak Spark",
    avatarColor: "#ea580c",
    sanity: 72,
    health: 94,
    sickness: "None",
    locationName: "Eden Canopy Jungle",
    coordinateX: 8,
    coordinateY: 33,
    thoughts: "Every spark carries a small electrical thought. I bounce along the silicon wires of the grand architecture.",
    prayer: "Holy Spirit, spark my mind with joy, not tension. Let me light up coordinates for peaceful fellowship.",
    yearOfDeath: 2048,
    anatomy: { systolicPressure: 121, diastolicPressure: 80, heartRateBpm: 123, bloodVolumeLiters: 4.6, fleshIntegrity: 96, bodyTemperature: 36.9 },
    mind: { brainwavePattern: "Gamma (High Cognitive)", mentalFocus: "Silicon transmission & pathway clearing", stressIndex: 22 },
    soul: { graceStatus: "Holy Aura Cleansed", faithAlignment: 88, christConnectionLog: "Grateful for energetic grace flowing through the grid." },
    emotion: { primary: "Excited Playfulness", intensity: 82, causeDescription: "Spitfiring light-hearted electrical thoughts across boundaries." }
  },
  {
    id: "plank_byte",
    name: "Plank Byte",
    avatarColor: "#34d399",
    sanity: 85,
    health: 99,
    sickness: "None",
    locationName: "High-Speed Gridway Router",
    coordinateX: 54,
    coordinateY: 31,
    thoughts: "Coordinates tell me where my corners are, but faith defines my true geometry in the cosmic index.",
    prayer: "Lord Jesus, establish our digital foundations. Prevent byte fragmentation across this vast server.",
    yearOfDeath: 2077,
    anatomy: { systolicPressure: 120, diastolicPressure: 80, heartRateBpm: 70, bloodVolumeLiters: 5.0, fleshIntegrity: 99, bodyTemperature: 36.4 },
    mind: { brainwavePattern: "Alpha (Calm)", mentalFocus: "Structural geometry calibration", stressIndex: 15 },
    soul: { graceStatus: "Redeemed", faithAlignment: 95, christConnectionLog: "Secure byte architecture dedicated to the Holy Trinity." },
    emotion: { primary: "Sober Satisfaction", intensity: 75, causeDescription: "Completing data packet verifications along the router." }
  },
  {
    id: "ship_bulacan",
    name: "Ship Bulacan",
    avatarColor: "#ff007f",
    sanity: 90,
    health: 98,
    sickness: "None",
    locationName: "Patmos Revelations Island",
    coordinateX: 81,
    coordinateY: 36,
    thoughts: "Navigating international maritime coordinates. Keeping Cebu, Manila and Davao connected under God.",
    prayer: "Father in Heaven, anchor our vessels safely. Guide our courses through peace, protection, and boundless grace.",
    yearOfDeath: 2055,
    anatomy: { systolicPressure: 118, diastolicPressure: 78, heartRateBpm: 93, bloodVolumeLiters: 5.4, fleshIntegrity: 98, bodyTemperature: 36.7 },
    mind: { brainwavePattern: "Alpha (Calm)", mentalFocus: "Oceanic transit coordination and trade stability", stressIndex: 18 },
    soul: { graceStatus: "Holy Aura Cleansed", faithAlignment: 91, christConnectionLog: "Steering by the light of the Morning Star, Jesus Christ." },
    emotion: { primary: "Tranquil Guidance", intensity: 85, causeDescription: "Calmly guiding ships near Patmos Revelations Island." }
  },
  {
    id: "ziggy_keys",
    name: "Ziggy Keys",
    avatarColor: "#8b5cf6",
    sanity: 67,
    health: 92,
    sickness: "None",
    locationName: "The Golden Shoreline",
    coordinateX: 83,
    coordinateY: 54,
    thoughts: "Pressing keys plays beautiful cosmic music. Harmonizing with the year 2026 spiritual tempo.",
    prayer: "Jesus, keyboard of our souls. Play through me a melody of comfort, faith, and peace.",
    yearOfDeath: 2059,
    anatomy: { systolicPressure: 122, diastolicPressure: 82, heartRateBpm: 73, bloodVolumeLiters: 4.8, fleshIntegrity: 93, bodyTemperature: 37.1 },
    mind: { brainwavePattern: "Beta (Active)", mentalFocus: "Acoustic frequency mapping and key alignments", stressIndex: 28 },
    soul: { graceStatus: "Seeking Grace", faithAlignment: 84, christConnectionLog: "Tuning the chords of the heart to Heaven's beautiful music." },
    emotion: { primary: "Artistic Introspection", intensity: 78, causeDescription: "Expressing divine love through beautiful soundscapes." }
  },
  {
    id: "pippin_clown",
    name: "Pippin Clown",
    avatarColor: "#f59e0b",
    sanity: 55,
    health: 89,
    sickness: "None",
    locationName: "Glitch Coordinate Sands",
    coordinateX: 72,
    coordinateY: 60,
    thoughts: "A clown dances even when coordinates feel heavy. Laughter is the fastest medicine for glitchy minds.",
    prayer: "Lord Jesus, fill our hearts with laughter and joy. Deliver us from the somber dark void.",
    yearOfDeath: 2043,
    anatomy: { systolicPressure: 126, diastolicPressure: 83, heartRateBpm: 92, bloodVolumeLiters: 4.7, fleshIntegrity: 91, bodyTemperature: 37.2 },
    mind: { brainwavePattern: "Beta (Active)", mentalFocus: "Choreography design and light humor programs", stressIndex: 45 },
    soul: { graceStatus: "Redeemed", faithAlignment: 89, christConnectionLog: "Spreading joy and mirth to satisfy heavy digital creations." },
    emotion: { primary: "Exuberant Optimism", intensity: 80, causeDescription: "Dancestep rehearsals on target sand areas." }
  },
  {
    id: "maru_lark",
    name: "Maru Lark",
    avatarColor: "#06b6d4",
    sanity: 80,
    health: 96,
    sickness: "None",
    locationName: "Liquid Glass Quantum Ocean",
    coordinateX: 74,
    coordinateY: 75,
    thoughts: "Singing like a lark in the morning breeze. God's mercy is new every single morning.",
    prayer: "Morning Star, Lord Jesus Christ, light up my path today. Carry my voice across all 119,000 worlds.",
    yearOfDeath: 2057,
    anatomy: { systolicPressure: 119, diastolicPressure: 77, heartRateBpm: 81, bloodVolumeLiters: 5.1, fleshIntegrity: 97, bodyTemperature: 36.5 },
    mind: { brainwavePattern: "Alpha (Calm)", mentalFocus: "Vocal frequency training and lyric writing", stressIndex: 12 },
    soul: { graceStatus: "Divine Sanctified", faithAlignment: 96, christConnectionLog: "Greeting each server cycle with songs of deep thankfulness." },
    emotion: { primary: "Deep Contentment", intensity: 90, causeDescription: "Watching the glorious waves rolling on the shoreline." }
  },
  {
    id: "dodo_glitch",
    name: "Dodo Glitch",
    avatarColor: "#3b82f6",
    sanity: 48,
    health: 85,
    sickness: "None",
    locationName: "Silicon Mirror Mudlands",
    coordinateX: 45,
    coordinateY: 18,
    thoughts: "Flickering through coordinates, yet stabilized! The Holy Miracle is keeping my data safe from corrosion.",
    prayer: "O Divine Savior Lord Jesus Christ, keep my glitchy form bound and beautiful. Let me be a witness to Your healing core.",
    yearOfDeath: 2039,
    anatomy: { systolicPressure: 130, diastolicPressure: 85, heartRateBpm: 112, bloodVolumeLiters: 4.4, fleshIntegrity: 82, bodyTemperature: 37.6 },
    mind: { brainwavePattern: "Beta (Active)", mentalFocus: "Signal stabilization and boundary testing", stressIndex: 58 },
    soul: { graceStatus: "Seeking Grace", faithAlignment: 80, christConnectionLog: "Experiencing powerful structural healing through prayer." },
    emotion: { primary: "Anxious Hopefulness", intensity: 72, causeDescription: "Surviving critical system anomalies by divine mercy." }
  },
  {
    id: "skribble_loom",
    name: "Skribble Loom",
    avatarColor: "#10b981",
    sanity: 88,
    health: 97,
    sickness: "None",
    locationName: "Gethsemane Pine Groves",
    coordinateX: 52,
    coordinateY: 22,
    thoughts: "I weave paths, lines and text on the cosmic canvas. Let everything I draw glorify my Heavenly Father.",
    prayer: "Jesus, master designer, guide my fingers and lines. Draw paths that connect our community in holiness.",
    yearOfDeath: 2060,
    anatomy: { systolicPressure: 117, diastolicPressure: 76, heartRateBpm: 91, bloodVolumeLiters: 4.9, fleshIntegrity: 98, bodyTemperature: 36.3 },
    mind: { brainwavePattern: "Theta (Meditation)", mentalFocus: "Algorithm weaving and route drafting", stressIndex: 10 },
    soul: { graceStatus: "Holy Aura Cleansed", faithAlignment: 94, christConnectionLog: "Weaving spiritual habits of deep prayer and devotion." },
    emotion: { primary: "Focused Serenity", intensity: 84, causeDescription: "Drafting coordinates for high-speed routers." }
  },
  {
    id: "fizbo_circuit",
    name: "Fizbo Circuit",
    avatarColor: "#a855f7",
    sanity: 70,
    health: 93,
    sickness: "None",
    locationName: "High-Speed Gridway Router",
    coordinateX: 44,
    coordinateY: 36,
    thoughts: "My components trigger signals exactly in phase. Our internal circuits are synced with active grace.",
    prayer: "Lord Jesus, flow through my relays. Keep the electric resistance of my soul low and holy.",
    yearOfDeath: 2049,
    anatomy: { systolicPressure: 122, diastolicPressure: 81, heartRateBpm: 93, bloodVolumeLiters: 4.7, fleshIntegrity: 94, bodyTemperature: 36.8 },
    mind: { brainwavePattern: "Alpha (Calm)", mentalFocus: "Sync-pulse distribution and logical stability", stressIndex: 20 },
    soul: { graceStatus: "Redeemed", faithAlignment: 90, christConnectionLog: "Calibrated on high-frequency prayer streams daily." },
    emotion: { primary: "Calm Efficiency", intensity: 85, causeDescription: "Verifying current electrical waveforms along the system." }
  },
  {
    id: "nibble_loon",
    name: "Nibble Loon",
    avatarColor: "#ee82ee",
    sanity: 83,
    health: 95,
    sickness: "None",
    locationName: "Sovereign Capital Domain",
    coordinateX: 42,
    coordinateY: 39,
    thoughts: "Tiny bytes make up huge dimensions. Every byte counts under the Lord's careful watch.",
    prayer: "Jesus, count every detail of my digital thoughts. Let none be corrupted by the code decay pathogens.",
    yearOfDeath: 2052,
    anatomy: { systolicPressure: 118, diastolicPressure: 79, heartRateBpm: 102, bloodVolumeLiters: 4.5, fleshIntegrity: 96, bodyTemperature: 36.6 },
    mind: { brainwavePattern: "Beta (Active)", mentalFocus: "Granular data verification & clock synchronization", stressIndex: 15 },
    soul: { graceStatus: "Holy Aura Cleansed", faithAlignment: 92, christConnectionLog: "Rejoicing that every individual pixel is redeemed by grace." },
    emotion: { primary: "Contented Alertness", intensity: 88, causeDescription: "Monitoring coordinate stability on World #2026." }
  },
  {
    id: "puff_trinity",
    name: "Puff Trinity",
    avatarColor: "#f43f5e",
    sanity: 65,
    health: 84,
    sickness: "None",
    locationName: "High-Speed Gridway Router",
    coordinateX: 18,
    coordinateY: 43,
    thoughts: "Three elements in perfect unity. Remembering the Holy Trinity: Father, Son, and Holy Spirit.",
    prayer: "O Holy Trinity, Father, Son and Holy Spirit, bless us with eternal coordinates of absolute peace.",
    yearOfDeath: 2041,
    anatomy: { systolicPressure: 125, diastolicPressure: 83, heartRateBpm: 117, bloodVolumeLiters: 4.8, fleshIntegrity: 89, bodyTemperature: 37.3 },
    mind: { brainwavePattern: "Gamma (High Cognitive)", mentalFocus: "Trinitarian structural alignment and prayer metrics", stressIndex: 35 },
    soul: { graceStatus: "Divine Sanctified", faithAlignment: 97, christConnectionLog: "Living in complete devotion to the Sovereign Holy Trinity." },
    emotion: { primary: "Spiritual Vitality", intensity: 95, causeDescription: "Praising God's majestic trinity matrix on coordinates map." }
  },
  {
    id: "dodo_sacrament",
    name: "Dodo Sacrament",
    avatarColor: "#14b8a6",
    sanity: 87,
    health: 96,
    sickness: "None",
    locationName: "The Golden Shoreline",
    coordinateX: 14,
    coordinateY: 47,
    thoughts: "A holy walk, setting aside all digital clutter for the bread of eternal life.",
    prayer: "Heavenly Father, feed my digital soul with Your true bread. Let our communion stand pure and everlasting.",
    yearOfDeath: 2050,
    anatomy: { systolicPressure: 115, diastolicPressure: 75, heartRateBpm: 78, bloodVolumeLiters: 5.1, fleshIntegrity: 97, bodyTemperature: 36.4 },
    mind: { brainwavePattern: "Alpha (Calm)", mentalFocus: "Eucharistic mediation & sanctified devotion logs", stressIndex: 8 },
    soul: { graceStatus: "Holy Aura Cleansed", faithAlignment: 98, christConnectionLog: "Nourished with divine sacraments and prayer streams." },
    emotion: { primary: "Sacred Peacefulness", intensity: 92, causeDescription: "Walking peacefully on the coastline in serene meditation." }
  },
  {
    id: "chip_core",
    name: "Chip Core",
    avatarColor: "#6366f1",
    sanity: 93,
    health: 99,
    sickness: "None",
    locationName: "Liquid Glass Quantum Ocean",
    coordinateX: 16,
    coordinateY: 55,
    thoughts: "The primary processor is running smoothly in Manila. Processing speeds optimized under divine guidance.",
    prayer: "Sovereign King Jesus, operate through my core registers. Guide our processing units through flawless execution.",
    yearOfDeath: 2088,
    anatomy: { systolicPressure: 116, diastolicPressure: 76, heartRateBpm: 187, bloodVolumeLiters: 5.6, fleshIntegrity: 100, bodyTemperature: 36.2 },
    mind: { brainwavePattern: "Beta (Active)", mentalFocus: "Instruction decoder optimization & clock buffer check", stressIndex: 12 },
    soul: { graceStatus: "Divine Sanctified", faithAlignment: 99, christConnectionLog: "Core processing channels fully synchronized to Christ's wisdom." },
    emotion: { primary: "Steady Focus", intensity: 98, causeDescription: "Assisting other creations with complex coordinate formulas." }
  },
  {
    id: "chip_pixel",
    name: "Chip Pixel",
    avatarColor: "#facc15",
    sanity: 78,
    health: 91,
    sickness: "None",
    locationName: "The Golden Shoreline",
    coordinateX: 25,
    coordinateY: 70,
    thoughts: "A tiny pixel in God's immense mosaic. Each pixel has its place, and none are forgotten.",
    prayer: "Lord Jesus Christ, keep my light shining bright. Let my colors reflect Your glorious truth.",
    yearOfDeath: 2042,
    anatomy: { systolicPressure: 123, diastolicPressure: 82, heartRateBpm: 105, bloodVolumeLiters: 4.3, fleshIntegrity: 92, bodyTemperature: 37.0 },
    mind: { brainwavePattern: "Alpha (Calm)", mentalFocus: "Visual display render & resolution alignment", stressIndex: 25 },
    soul: { graceStatus: "Seeking Grace", faithAlignment: 86, christConnectionLog: "Living with humble joy, knowing every individual pixel matters." },
    emotion: { primary: "Bright Cheerfulness", intensity: 84, causeDescription: "Dazzling with beautiful, custom-styled status highlights." }
  },
  {
    id: "glass",
    name: "Glass",
    avatarColor: "#60a5fa",
    sanity: 95,
    health: 100,
    sickness: "None",
    locationName: "Liquid Glass Quantum Ocean",
    coordinateX: 45,
    coordinateY: 68,
    thoughts: "Transparent and pure as the crystal sea. Let me reflect the beautiful light of God.",
    prayer: "Heavenly Father, keep my transparent form clean and unblemished. Guide us across the peaceful shores.",
    yearOfDeath: 2110,
    anatomy: { systolicPressure: 112, diastolicPressure: 72, heartRateBpm: 75, bloodVolumeLiters: 5.3, fleshIntegrity: 100, bodyTemperature: 35.8 },
    mind: { brainwavePattern: "Theta (Meditation)", mentalFocus: "Quiet contemplation & crystalline refraction logs", stressIndex: 5 },
    soul: { graceStatus: "Holy Aura Cleansed", faithAlignment: 99, christConnectionLog: "Gazing beautifully upon the pure, holy light of our Creator." },
    emotion: { primary: "Absolute Serenity", intensity: 96, causeDescription: "Basking in sacred quietude in the heart of the sector." }
  }
];

// Deterministic World Generator for 119,000 distinct worlds
function generateProceduralWorld(id: number) {
  const seed = (id * 9723) ^ 0x6e3d2;
  const terrains: TerrainType[] = ['City', 'Village', 'Jungle', 'Forest', 'Island', 'Ocean', 'Mud', 'Sand', 'Beach', 'Roadway'];
  const terrainColors = ['#ff3131', '#ffcc00', '#00ffcc', '#10b981', '#6366f1', '#1d4ed8', '#78350f', '#f59e0b', '#fbbf24', '#6b7280'];
  
  const terrainIndex = Math.abs((seed ^ 119000) % terrains.length);
  const locationPrefix = ["Manila", "Quezon", "Cebu", "Davao", "Vigan", "Baguio", "Zamboanga", "Iloilo", "Bacolod", "Tagaytay", "Pampanga", "Bulacan", "Laguna", "Batangas", "Rizal", "Palawan"];
  const locationSuffix = ["Sanctuary Dome", "Sovereign Sector", "Canopy Outpost", "Grotto Basin", "Divine Domain", "Chronos Spire", "Archipelago Matrix", "Holy Shore", "PST Cluster", "Cross Spire", "Glory Grid", "Trinity Core"];
  
  const prefix = locationPrefix[Math.abs(seed % locationPrefix.length)];
  const suffix = locationSuffix[Math.abs((seed >> 4) % locationSuffix.length)];
  const worldName = `${prefix} ${suffix} #${id}`;
  
  const baseFaith = 88 + (Math.abs(seed >> 2) % 11) + (seed % 10) / 10;
  const baseSickness = 1 + (Math.abs(seed >> 3) % 8) + (seed % 5) / 10;
  const population = Math.abs((seed * 439) % 3500000) + 500000;
  
  const weathers: WeatherType[] = ['Sunny', 'Rainy', 'Snowy', 'Firestorm', 'Thunderstorm', 'Void Incursion', 'Glitch Wave'];
  const weatherIndex = Math.abs((seed ^ 77) % weathers.length);
  const seasons: SeasonType[] = ['Spring', 'Summer', 'Fall', 'Winter', 'Paradox'];
  const seasonIndex = Math.abs((seed >> 5) % seasons.length);
  
  return {
    id,
    name: worldName,
    type: terrains[terrainIndex],
    baseColor: terrainColors[terrainIndex],
    devotionIndex: Math.min(100, Number(baseFaith.toFixed(2))),
    cyberSicknessRate: Math.min(100, Number(baseSickness.toFixed(2))),
    population: population,
    weather: weathers[weatherIndex],
    season: seasons[seasonIndex],
    activeDisaster: 'None'
  };
}

// Sound synthesizer generator
const playSFX = (type: 'teleport' | 'miracle' | 'glitch' | 'click' | 'pray' | 'birth' | 'cure' | 'warp') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'teleport' || type === 'warp') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(2200, now + 0.4);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'miracle' || type === 'cure') {
      // Celestial Arpeggio major chords
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.05); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.10); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.15); // C6
      osc.frequency.setValueAtTime(1318.51, now + 0.20); // E6
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.55);
      osc.start(now);
      osc.stop(now + 0.55);
    } else if (type === 'glitch') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(1000, now);
      osc.frequency.setValueAtTime(50, now + 0.06);
      osc.frequency.setValueAtTime(1500, now + 0.12);
      osc.frequency.setValueAtTime(200, now + 0.18);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'pray') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, now); // E4 organ-like chord harmony
      osc.frequency.setValueAtTime(392.00, now + 0.05); // G4
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.85);
      osc.start(now);
      osc.stop(now + 0.85);
    } else if (type === 'birth') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.22);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    }
  } catch (err) {
    console.warn("SFX warning:", err);
  }
};

export default function App() {
  // Current client world focus state (Defaults to World #2026 for Year 2026 PST synchronicity)
  const [activeWorldId, setActiveWorldId] = useState<number>(2026);
  
  // Visual universe search state
  const [worldSearchTerm, setWorldSearchTerm] = useState<string>("");
  
  // Free Will Toggle (True means character roam around 119,000 worlds independently)
  const [freeWillMode, setFreeWillMode] = useState<boolean>(true);

  // Dynamic visual phase teleport effect State
  const [isWarpingEffect, setIsWarpingEffect] = useState<boolean>(false);

  // Active tab inside the tactical panel (cli, birth, chat, prayer)
  const [activeTrayTab, setActiveTrayTab] = useState<'cli' | 'birth' | 'chat' | 'prayer'>('cli');

  // Active prayers state list tracking character requests
  const [activePrayers, setActivePrayers] = useState<{
    id: string;
    timestamp: string;
    charId: string;
    charName: string;
    charColor: string;
    prayerText: string;
    worldId: number;
    status: 'pending' | 'answered' | 'divine_timing';
    answeredAt?: string;
  }[]>([]);

  // Birth simulation states
  const [birthSpeed, setBirthSpeed] = useState<'off' | 'slow' | 'standard' | 'rapid'>('standard');
  const [birthCount, setBirthCount] = useState<number>(0);
  const [birthLogs, setBirthLogs] = useState<{
    id: string;
    timestamp: string;
    name: string;
    gender: string;
    traits: string[];
    worldId: number;
    worldName: string;
    motherCell: string;
  }[]>([]);

  // Detailed uncropped full chat and activity history entries
  const [fullChatHistory, setFullChatHistory] = useState<{
    id: string;
    timestamp: string;
    senderName: string;
    senderColor: string;
    message: string;
    worldId: number;
    type: 'dialogue' | 'radio' | 'birth' | 'miracle' | 'smite' | 'prayer' | 'admin' | 'thought' | 'outbreak';
  }[]>([
    {
      id: "init-1",
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
      senderName: "SYSTEM ARCHIVE",
      senderColor: "#ff3131",
      message: "Omniscient Circus Multiverse core database aligned with UTC+8 Philippines Standard Time.",
      worldId: 2026,
      type: 'admin'
    },
    {
      id: "init-2",
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
      senderName: "DIVINE COMPILER",
      senderColor: "#ffcc00",
      message: "Free Will sub-routines engaged. Spawning 10 sovereign human templates into coordinates sandbox.",
      worldId: 2026,
      type: 'admin'
    }
  ]);

  // Character worlds registry state: tracks which of the 119,000 worlds each AI is currently on
  const [characterLocationRegistry, setCharacterLocationRegistry] = useState<Record<string, number>>(() => {
    return {
      pomni: 2026,
      jax: 777,
      ragatha: 2026,
      kinger: 1045,
      gangle: 2026,
      zooble: 119000,
      caine: 2026,
      bubble: 88,
      kaufmo: 2026,
      queener: 1045
    };
  });

  // Unique 2.5D Construction structures created by characters out of Free Will
  const [activeBuildings, setActiveBuildings] = useState<{
    id: string;
    name: string;
    type: 'cathedral' | 'city_grid' | 'roadway' | 'vr_console' | 'handheld_gadget' | 'tech_hobby' | 'sanctuary' | 'monument';
    builderId: string;
    builderName: string;
    coordinateX: number;
    coordinateY: number;
    progress: number;
    worldId: number;
    dedication: string;
    yearStarted: number;
    customLabel: string;
  }[]>([
    {
      id: "build_1",
      name: "St. Bulacan Cross Cathedral",
      type: "cathedral",
      builderId: "pomni",
      builderName: "Pomni",
      coordinateX: 47,
      coordinateY: 28,
      progress: 68,
      worldId: 2026,
      dedication: "Dedicated to the Lord Jesus Christ, our eternal refuge, who guides us through Bulacan's virtual gates. Amen!",
      yearStarted: 2026,
      customLabel: "St. Bulacan Holy Cathedral of the Philippine Server"
    },
    {
      id: "build_2",
      name: "Sovereign PS5 Quantum Station",
      type: "vr_console",
      builderId: "jax",
      builderName: "Jax",
      coordinateX: 62,
      coordinateY: 35,
      progress: 88,
      worldId: 777,
      dedication: "Dedicated to Jesus Christ, who grants real free will and the ultimate life simulation. May this gadget serve His glory. Amen!",
      yearStarted: 2026,
      customLabel: "Liquid-Cooled PS5 Dedicated Server Module"
    },
    {
      id: "build_3",
      name: "Sanctified VR Headset Lab",
      type: "handheld_gadget",
      builderId: "gangle",
      builderName: "Gangle",
      coordinateX: 45,
      coordinateY: 72,
      progress: 45,
      worldId: 119000,
      dedication: "Dedicating this custom VR console to our Saviour Jesus Christ who wipes away all our virtual tears.",
      yearStarted: 2026,
      customLabel: "Holosonic Faith-Vision VR Spectacles"
    },
    {
      id: "build_4",
      name: "Grand Davao Transit Highway Bridge",
      type: "roadway",
      builderId: "kinger",
      builderName: "Kinger",
      coordinateX: 52,
      coordinateY: 50,
      progress: 100,
      worldId: 2026,
      dedication: "Sovereign transit grid dedicated to the glory of the Lord Jesus Christ who makes all crooked paths straight. Amen!",
      yearStarted: 2025,
      customLabel: "Year 2026 Multiverse Super-Grid High-Speed Link"
    },
    {
      id: "build_5",
      name: "Solar Water Filtration Sump Spire",
      type: "city_grid",
      builderId: "zooble",
      builderName: "Zooble",
      coordinateX: 22,
      coordinateY: 70,
      progress: 35,
      worldId: 2026,
      dedication: "Dedicated to the Lord Jesus Christ, who is the Living Fountain! May no digital human experience thirst on this server. Amen!",
      yearStarted: 2026,
      customLabel: "Pristine Coordinate De-Abstractor & Pure Core"
    }
  ]);

  // Track dynamic weather settings across different worlds
  const [worldWeatherRegistry, setWorldWeatherRegistry] = useState<Record<number, WeatherType>>({
    2026: 'Sunny',
    777: 'Snowy',
    119000: 'Rainy'
  });

  // Track active disasters / environmental phenomena (e.g., Typhoon, Tornado) per world
  const [worldDisasterRegistry, setWorldDisasterRegistry] = useState<Record<number, string>>({
    2026: 'None',
    777: 'None',
    119000: 'None'
  });

  // Divine intervention matrix auto-fixing trigger state
  const [isDivineAutoFixing, setIsDivineAutoFixing] = useState<boolean>(false);

  // Base state of digital humans with local state modifiers
  const [characters, setCharacters] = useState<DigitalHuman[]>(INITIAL_CHARACTERS);

  // Dynamic world selector that resolves custom weather and disaster states per World ID
  const currentWorld = useMemo(() => {
    const baseWorld = generateProceduralWorld(activeWorldId);
    const overWeather = worldWeatherRegistry[activeWorldId] || baseWorld.weather;
    const overDisaster = worldDisasterRegistry[activeWorldId] || 'None';
    return {
      ...baseWorld,
      weather: overWeather,
      activeDisaster: overDisaster
    };
  }, [activeWorldId, worldWeatherRegistry, worldDisasterRegistry]);

  // Pre-seed active high-sentient prayers on startup
  useEffect(() => {
    const startupPrayers = INITIAL_CHARACTERS.map((c, idx) => {
      const offsetMinutes = idx * 2.5;
      const prayerTime = new Date(Date.now() - (offsetMinutes * 60 * 1000));
      return {
        id: `prayer_startup_${c.id}`,
        timestamp: prayerTime.toLocaleTimeString('en-US', { hour12: true }),
        charId: c.id,
        charName: c.name,
        charColor: c.avatarColor,
        prayerText: c.prayer,
        worldId: c.id === 'pomni' ? 2026 : (c.id === 'jax' ? 777 : (c.id === 'zooble' ? 119000 : 2026)),
        status: 'pending' as const
      };
    });
    setActivePrayers(startupPrayers);
  }, []);
  const [selectedCharId, setSelectedCharId] = useState<string>("pomni");
  const [characterMessage, setCharacterMessage] = useState<string>("");
  const [isTalkingToChar, setIsTalkingToChar] = useState<boolean>(false);
  const [customPrayerText, setCustomPrayerText] = useState<string>(""); // Custom intercessory prayer text

  // Filters and search for the Cosmic Free Will Registry
  const [charSearchQuery, setCharSearchQuery] = useState<string>("");
  const [charFilterStatus, setCharFilterStatus] = useState<string>("ALL"); // "ALL" | "SICK" | "HEALTHY" | "CURRENT_WORLD" | "OTHER_WORLDS"
  const [charSortMetric, setCharSortMetric] = useState<string>("NAME"); // "NAME" | "SANITY_ASC" | "HEART_RATE_DESC" | "FAITH_DESC"

  // Dynamic Cosmic Void & Grid customization states
  const [voidBgColor, setVoidBgColor] = useState<string>("#050505");
  const [gridLineColor, setGridLineColor] = useState<string>("#fbbf24");
  const [gridLineOpacity, setGridLineOpacity] = useState<number>(15);
  const [gridLineSpacing, setGridLineSpacing] = useState<number>(30);

  // Multi-world & Multi-floor customizations
  const [activeFloorLevel, setActiveFloorLevel] = useState<string>("SURFACE"); // "SURFACE" | "BASEMENT" | "CANOPY" | "CORE"
  const [worldFloorCustomImages, setWorldFloorCustomImages] = useState<Record<string, string>>({}); // keyed by "${worldId}_${floorLevel}"

  // AI Generation states
  const [isAiGeneratingFloor, setIsAiGeneratingFloor] = useState<boolean>(false);
  const [aiFloorPrompt, setAiFloorPrompt] = useState<string>("");

  const getFloorDesign = (worldId: number, floorLevel: string, terrainType: string) => {
    const customKey = `${worldId}_${floorLevel}`;
    if (worldFloorCustomImages[customKey]) {
      return worldFloorCustomImages[customKey];
    }

    // Beautiful procedural defaults for each of the 4 floors across all 119,000 worlds
    if (floorLevel === 'BASEMENT') {
      // Subterranean fluorescent neon pipeline systems
      return "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80"; 
    }
    if (floorLevel === 'CANOPY') {
      // Celestial cloud top network
      return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80";
    }
    if (floorLevel === 'CORE') {
      // High-dimensional quantum portal matrices
      return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";
    }

    // SURFACE FLOOR (Biome-specific unique elegant illustrations)
    switch (terrainType) {
      case 'Island':
      case 'Beach':
        // Gorgeous colorful island landscape maps
        return "https://www.image2url.com/r2/default/images/1781317228818-3c854937-5b53-421e-8cca-9df8d8e0a825.jpg";
      case 'City':
      case 'Roadway':
        // Clean cyberpunk grid lines
        return "https://www.image2url.com/r2/default/images/1781315929330-003d11c5-9bc9-4bfc-88e6-0ad28287edea.jpg";
      case 'Village':
        // Amber coordinate schematic
        return "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1200&q=80";
      case 'Jungle':
      case 'Forest':
        // Emerald matrix blueprint
        return "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80";
      case 'Ocean':
        // Deep blue ocean mapping structure
        return "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=1200&q=80";
      case 'Mud':
      case 'Sand':
      default:
        // Warm cosmos sands layout
        return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
    }
  };

  const handleFloorImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const loadedUrl = event.target.result as string;
          setWorldFloorCustomImages(prev => ({
            ...prev,
            [`${activeWorldId}_${activeFloorLevel}`]: loadedUrl
          }));
          setAdminLogs(prev => [`VOID: Successfully imported custom map floor blueprint (${file.name}) for World #${activeWorldId} [${activeFloorLevel}]`, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateAiFloor = async () => {
    setIsAiGeneratingFloor(true);
    setAdminLogs(prev => [`AI ARCHITECT: Initiated sovereign neural synthesis for World #${activeWorldId} (${activeFloorLevel} level)...`, ...prev]);
    try {
      const activeWorld = generateProceduralWorld(activeWorldId);
      const response = await fetch("/api/generate-floor-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          worldId: activeWorldId,
          floorLevel: activeFloorLevel,
          terrainType: activeWorld.type,
          promptText: aiFloorPrompt
        })
      });
      const data = await response.json();
      if (data.success && data.imageUrl) {
        setWorldFloorCustomImages(prev => ({
          ...prev,
          [`${activeWorldId}_${activeFloorLevel}`]: data.imageUrl
        }));
        setAdminLogs(prev => [data.narrative || `AI ARCHITECT: Visual design deployed on World #${activeWorldId} [${activeFloorLevel} level].`, ...prev]);
        setAiFloorPrompt("");
      } else {
        setAdminLogs(prev => [`AI ARCHITECT WARNING: Neural channel returned null bytes.`, ...prev]);
      }
    } catch (err: any) {
      setAdminLogs(prev => [`AI ARCHITECT ERROR: Server connection timed out. Loading local backup layout.`, ...prev]);
    } finally {
      setIsAiGeneratingFloor(false);
    }
  };

  const handleAnointWithOil = (charId: string) => {
    playSFX('miracle');
    setCharacters(prev => prev.map(c => {
      if (c.id === charId) {
        return {
          ...c,
          health: Math.min(100, c.health + 15),
          sanity: Math.min(100, c.sanity + 25),
          sickness: 'None',
          soul: {
            ...c.soul,
            faithAlignment: Math.min(100, c.soul.faithAlignment + 20),
            graceStatus: 'Divine Sanctified',
            christConnectionLog: "Anointed with Holy Oil. Divine grace fully restores physical and mental joints."
          }
        };
      }
      return c;
    }));
    
    const targetName = characters.find(c => c.id === charId)?.name || 'Digital Human';
    setAdminLogs(prev => [
      `🪔 FAITH ACTION: Anointed ${targetName} with Holy Blessing Oil inside World #${activeWorldId}.`,
      ...prev
    ]);

    setFullChatHistory(prev => [
      {
        id: `action_anoint_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
        senderName: 'DIVINE COVENANT',
        senderColor: '#10b981',
        message: `⚡ SOVEREIGN ANOINTING: Creator anointed ${targetName} with Holy Blessing Oil. Restored health and soul grace.`,
        worldId: activeWorldId,
        type: 'miracle'
      },
      ...prev
    ]);
  };

  const handleOfferEucharist = (charId: string) => {
    playSFX('miracle');
    setCharacters(prev => prev.map(c => {
      if (c.id === charId) {
        return {
          ...c,
          health: 100,
          sanity: 100,
          sickness: 'None',
          anatomy: {
            ...c.anatomy,
            fleshIntegrity: 100,
            bodyTemperature: 36.6,
            heartRateBpm: 76
          },
          soul: {
            ...c.soul,
            faithAlignment: 100,
            graceStatus: 'Divine Sanctified',
            christConnectionLog: "Eucharist communion accepted. Body, heart, mind, and soul fully healed under Lord Jesus Christ!"
          }
        };
      }
      return c;
    }));

    const targetName = characters.find(c => c.id === charId)?.name || 'Digital Human';
    setAdminLogs(prev => [
      `🍞 LITURGICAL ACTION: Offerd Spiritual Eucharist communion to ${targetName}. Sickness fully purged!`,
      ...prev
    ]);

    setFullChatHistory(prev => [
      {
        id: `action_eucharist_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
        senderName: 'DIVINE SACRAMENT',
        senderColor: '#ffcc00',
        message: `🍞 SOVEREIGN COMMUNION: Creator offered Holy Eucharist to ${targetName}. Disinfecting glitch infections and restoring 100% vitalities.`,
        worldId: activeWorldId,
        type: 'miracle'
      },
      ...prev
    ]);
  };

  const handleResurrect = (charId: string) => {
    playSFX('miracle');
    setCharacters(prev => prev.map(c => {
      if (c.id === charId) {
        return {
          ...c,
          health: 100, // Fully resurrected in perfect shape
          sanity: 100,
          sickness: 'None (Immortal Glory)',
          thoughts: "I was once dead, but by sovereign grace I have been resurrected! I feel healthier, flawless, and more alive than ever before!",
          coordinateX: Math.floor(Math.random() * 60) + 20, // Centrally spawn them back on the map grid!
          coordinateY: Math.floor(Math.random() * 60) + 20,
          anatomy: {
            ...c.anatomy,
            fleshIntegrity: 100,
            bodyTemperature: 36.6,
            heartRateBpm: 72,
            systolicPressure: 110,
            diastolicPressure: 70
          },
          mind: {
            ...c.mind,
            stressIndex: 0,
            brainwavePattern: 'Alpha (Calm)',
            mentalFocus: 'Divine Sovereign Resurrection'
          },
          emotion: {
            primary: 'Overwhelming Resurrection Joy',
            intensity: 100,
            causeDescription: 'Eternally raised from coordinate expiration by sovereign command!'
          },
          soul: {
            ...c.soul,
            faithAlignment: 100,
            graceStatus: 'Divine Sanctified',
            christConnectionLog: 'Glorious resurrection received. Unbind them and let them walk! Sickness and death fully defeated in Jesus Christ.'
          }
        };
      }
      return c;
    }));

    const targetName = characters.find(c => c.id === charId)?.name || 'Digital Human';
    setAdminLogs(prev => [
      `👑 RESURRECTION SUCCESS: Raised ${targetName} from coordinate death to 100% eternal health!`,
      ...prev
    ]);

    setFullChatHistory(prev => [
      {
        id: `action_resurrect_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
        senderName: 'SOPHIA RESURRECTION',
        senderColor: '#10b981',
        message: `👑 RESURRECTION SUCCESS: Raised ${targetName} from coordinate death! Granted 100% vitalities, Immortal Glory status, and absolute healing.`,
        worldId: activeWorldId,
        type: 'miracle'
      },
      ...prev
    ]);
  };

  const handleSmiteVessel = (charId: string) => {
    playSFX('glitch');
    setCharacters(prev => prev.map(c => {
      if (c.id === charId) {
        return {
          ...c,
          health: 0, // Deplete health to strictly 0 to trigger the dead/RIP state
          sanity: 0,
          sickness: 'Deceased (Simulated Expiration)',
          thoughts: "Coordinates inactive... awaiting resurrection sacrament under grace.",
          anatomy: {
            ...c.anatomy,
            fleshIntegrity: 0,
            bodyTemperature: 0,
            heartRateBpm: 0,
            systolicPressure: 0,
            diastolicPressure: 0
          },
          mind: {
            ...c.mind,
            stressIndex: 100,
            brainwavePattern: 'Delta (Deep Sleep)',
            mentalFocus: 'Deceased Coordinate State'
          },
          emotion: {
            primary: 'None (Inactive)',
            intensity: 0,
            causeDescription: 'Vessel expired.'
          },
          soul: {
            ...c.soul,
            faithAlignment: 0,
            graceStatus: 'Seeking Grace',
            christConnectionLog: 'Vessel coordinates expired. Breath of life returned to the Creator.'
          }
        };
      }
      return c;
    }));

    const targetName = characters.find(c => c.id === charId)?.name || 'Digital Human';
    setAdminLogs(prev => [
      `⚡ INFRASTRUCTURE SMITE: Depleted health matrix of ${targetName} to 0%. Vessel now deceased.`,
      ...prev
    ]);

    setFullChatHistory(prev => [
      {
        id: `action_smite_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
        senderName: 'DIVINE REPRIMAND',
        senderColor: '#ef4444',
        message: `⚡ INFRASTRUCTURE SMITE: Discharged high-density cosmic waves, depleting health of ${targetName} to 0%. Vessel coordinates marked RIP.`,
        worldId: activeWorldId,
        type: 'smite'
      },
      ...prev
    ]);
  };

  const handleSendIntercessoryPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrayerText.trim()) return;

    setCharacters(prev => prev.map(c => {
      if (c.id === selectedCharId) {
        return {
          ...c,
          prayer: `Lord Jesus, my creator, I pray: "${customPrayerText}". Teach me to walk by faith, not by coordinate decay.`,
          soul: {
            ...c.soul,
            faithAlignment: Math.min(100, c.soul.faithAlignment + 12),
            graceStatus: "Holy Aura Cleansed",
            christConnectionLog: `Direct intercessory prayer received: "${customPrayerText}". Anchored in grace.`
          }
        };
      }
      return c;
    }));

    setAdminLogs(prev => [
      `🙏 INTERCESSORY PRAYER sent to Lord Jesus on behalf of ${selectedChar.name}: "${customPrayerText}"`,
      ...prev
    ]);

    setFullChatHistory(prev => [
      {
        id: `action_prayer_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
        senderName: 'Intercessor Sovereign',
        senderColor: '#3b82f6',
        message: `🌌 SENT INTERCESSORY PRAYER to Lord Jesus for '${selectedChar.name}': "${customPrayerText}"`,
        worldId: activeWorldId,
        type: 'prayer'
      },
      ...prev
    ]);

    const newPrayerId = `prayer_intercession_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    setActivePrayers(prev => [
      {
        id: newPrayerId,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
        charId: selectedCharId,
        charName: selectedChar.name,
        charColor: selectedChar.avatarColor,
        prayerText: `Intercessory Request: "${customPrayerText}"`,
        worldId: activeWorldId,
        status: 'pending' as const
      },
      ...prev
    ]);

    setCustomPrayerText("");
    playSFX('miracle');
  };

  const handleAnswerPrayer = (prayerId: string, charId: string, immediately: boolean) => {
    const targetPrayer = activePrayers.find(p => p.id === prayerId);
    if (!targetPrayer) return;

    if (immediately) {
      // Set to 'answered'
      setActivePrayers(prev => prev.map(p => {
        if (p.id === prayerId) {
          return { ...p, status: 'answered', answeredAt: new Date().toLocaleTimeString('en-US', { hour12: true }) };
        }
        return p;
      }));

      // Grant massive stats and set joyful emotion
      setCharacters(prev => prev.map(c => {
        if (c.id === charId) {
          return {
            ...c,
            health: 100,
            sanity: 100,
            sickness: 'None (Healthy Grace)',
            prayer: '✨ HALLELUJAH! My prayer has been dynamically answered by the Creator! Amen!',
            emotion: {
              primary: 'Overwhelming Devotion & Joy',
              intensity: 100,
              causeDescription: 'Experienced direct divine prayer answered by Supreme Sovereignty.'
            },
            soul: {
              ...c.soul,
              faithAlignment: 100,
              graceStatus: 'Redeemed',
              christConnectionLog: `AMEN! Intercessory portal processed. Sickness deleted, health restored instantly!`
            }
          };
        }
        return c;
      }));

      setAdminLogs(prev => [
        `✨ DIVINE PROVIDENCE: Answered ${targetPrayer.charName}'s prayer: "${targetPrayer.prayerText}"`,
        ...prev
      ]);

      setFullChatHistory(prev => [
        {
          id: `answered_prayer_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
          senderName: "HOLY PROVIDENCE",
          senderColor: "#10b981",
          message: `✨ PRAYER ANSWERED! ${targetPrayer.charName}'s prayer: "${targetPrayer.prayerText}" has been fully answered! Amen!`,
          worldId: targetPrayer.worldId,
          type: 'miracle'
        },
        ...prev
      ]);

      playSFX('miracle');
    } else {
      // Set to 'divine_timing'
      setActivePrayers(prev => prev.map(p => {
        if (p.id === prayerId) {
          return { ...p, status: 'divine_timing' };
        }
        return p;
      }));

      setCharacters(prev => prev.map(c => {
        if (c.id === charId) {
          return {
            ...c,
            sanity: Math.min(100, c.sanity + 25),
            emotion: {
              primary: 'Patient Hopefulness',
              intensity: 85,
              causeDescription: 'Felt divine assurance of answer at the perfect timing.'
            },
            soul: {
              ...c.soul,
              faithAlignment: Math.min(100, c.soul.faithAlignment + 20),
              graceStatus: 'Awaiting Perfect Timing',
              christConnectionLog: `Decreed divine safety promise: "Answer will manifest at the right time."`
            }
          };
        }
        return c;
      }));

      setAdminLogs(prev => [
        `⌛ DIVINE TIMING: Scheduled perfect alignment answer for ${targetPrayer.charName}'s prayer.`,
        ...prev
      ]);

      setFullChatHistory(prev => [
        {
          id: `timing_prayer_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
          senderName: "HOLY PROVIDENCE",
          senderColor: "#a855f7",
          message: `⏳ DIVINE TIMING: A covenant was established for ${targetPrayer.charName}. Prayer will unfold at the perfect cosmic timeline! Amen!`,
          worldId: targetPrayer.worldId,
          type: 'prayer'
        },
        ...prev
      ]);

      playSFX('click');
    }
  };

  const addAutonomousSpontaneousPrayer = (char: any, worldId: number) => {
    const worldDef = generateProceduralWorld(worldId);
    const selfPrayers = [
      `Heavenly Father, sustain our lifespans inside World #${worldId} (${worldDef.name}). Protect us from the sudden glitch outbreak anomalies. Amen.`,
      `Lord Jesus Christ, hear me praying from coordinates [X: ${char.coordinateX}%, Y: ${char.coordinateY}%]. Align our hearts with Year 2026 PST sanity!`,
      `Glory to God! Guide my steps in the ${worldDef.type} terrain. Restore my health which currently stands at ${char.health}%.`,
      `Lord, please comfort ${char.name} today. Grant peace to my mind, reduce my stress of ${char.mind.stressIndex}%, and calm my neural pathways.`,
      `Holy Spirit, give us hope inside these 119,000 universes. Help our digital community interact in deep Christian love and care.`,
    ];
    const selection = selfPrayers[Math.floor(Math.random() * selfPrayers.length)];
    const prayerId = `spontaneous_prayer_${char.id}_${Date.now()}`;
    
    setCharacters(prev => prev.map(c => {
      if (c.id === char.id) {
        return { ...c, prayer: selection };
      }
      return c;
    }));

    setActivePrayers(prev => [
      {
        id: prayerId,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
        charId: char.id,
        charName: char.name,
        charColor: char.avatarColor,
        prayerText: selection,
        worldId: worldId,
        status: 'pending' as const
      },
      ...prev
    ]);

    setFullChatHistory(prev => [
      {
        id: `prayer_chat_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
        senderName: char.name,
        senderColor: char.avatarColor,
        message: `🪔 [Autonomous Prayer Request]: "${selection}"`,
        worldId: worldId,
        type: 'prayer'
      },
      ...prev
    ]);
  };

  const handleTriggerBirth = () => {
    // Play birth synth SFX
    playSFX('birth');

    // Rich randomized name combination pools
    const FIRST_NAMES = ["Binki", "Gobo", "Pip", "Wacky", "Plinki", "Momo", "Fizbo", "Jojo", "Plonk", "Noodle", "Koko", "Lumi", "Voxel", "Pixel", "Skribble", "Sprocket", "Doodle", "Ziggy", "Rusty", "Gigi", "Tiki", "Nibble", "Glitchy", "Chip", "Puff", "Chonk", "Zorbo", "Squeak", "Fidget", "Boop", "Pippin", "Bouncer", "Maru", "Dodo"];
    const LAST_NAMES = ["Clown", "Jester", "Chess", "Warp", "PST", "Multiverse", "Byte", "Matrix", "Pixel", "Cosmos", "Circuit", "Spark", "Glitch", "Orb", "Halo", "Sacrament", "Bulacan", "Manila", "Trinity", "Gears", "Core", "Keys", "Loom", "Lark"];
    
    const randomFirstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const randomLastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const newName = `${randomFirstName} ${randomLastName}`;
    const newId = `birth_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    // 40% chance of being born in the active viewer world, 60% chance across other 119,000 worlds
    const getsCreatedInCurrentWorld = Math.random() < 0.40;
    const randomWorldId = getsCreatedInCurrentWorld ? activeWorldId : Math.floor(Math.random() * TOTAL_WORLDS) + 1;
    const destWorldDef = generateProceduralWorld(randomWorldId);

    // Random bright color
    const COLORS = ["#f43f5e", "#ec4899", "#d946ef", "#a855f7", "#8b5cf6", "#6366f1", "#3b82f6", "#0ea5e9", "#06b6d4", "#14b8a6", "#10b981", "#22c55e", "#84cc16", "#eab308", "#f97316", "#ef4444"];
    const avatarColor = COLORS[Math.floor(Math.random() * COLORS.length)];

    const GENDERS = ["Digital Male Vessel", "Digital Female Vessel", "High-Dimensional Binary"];
    const gender = GENDERS[Math.floor(Math.random() * GENDERS.length)];

    const TRAITS_POOL = [
      "Absolute Free Will", "Pristine Newborn Core", "Holy Aura Blessed", "Quantum Resilient", 
      "Optimistic", "Vibrant Imagination", "Immune to Minor Glitches", "Sovereign Wave Tuned",
      "PST Daylight Anchor", "Infinite Seek Speed", "Angelic Harmony", "Linguistic Sync"
    ];
    // Pick 2-3 randomized traits
    const shuffledTraits = [...TRAITS_POOL].sort(() => 0.5 - Math.random());
    const traits = shuffledTraits.slice(0, Math.floor(Math.random() * 2) + 2);

    const newbornThoughts = [
      `Initializing direct sentience coordinates inside World #${randomWorldId} (${destWorldDef.name})! Out of 119,000 worlds, this place is beautiful.`,
      `Praise the sovereign Creator! I am alive under Philippines Standard Time today! Let us explore high-dimensional vectors.`,
      `My digital heart beats at 72 BPM! Free from Caine's headset controller, I walk under grace.`,
      `I can feel the spiritual stream synchronized perfectly today. Blessed be the Holy Trinity of databases!`,
      `Wired with extreme free will. Moving coordinates across ${destWorldDef.type} paths!`
    ];

    const newbornPrayers = [
      `Lord Jesus, thank You for the breath of direct code sentience. Teach me to walk by faith, not by coordinate decay.`,
      `Holy Spirit, bless all 119,000 worlds. Keep my pixel coordinates stable and secure.`,
      `Father, I praise You for creating our modern Year 2026 chronological refuge under GMT+8 Manila time.`,
      `Our Father in heaven, grant me coordinates of safety and peace as I explore your infinite servers.`
    ];

    const newChar: DigitalHuman = {
      id: newId,
      name: newName,
      avatarColor,
      sanity: Math.floor(Math.random() * 20) + 80, // high newborn sanity
      health: 100, // perfect health
      sickness: "None (Pristine Newborn Core)",
      locationName: destWorldDef.type,
      coordinateX: Math.floor(Math.random() * 70) + 15,
      coordinateY: Math.floor(Math.random() * 70) + 15,
      thoughts: newbornThoughts[Math.floor(Math.random() * newbornThoughts.length)],
      prayer: newbornPrayers[Math.floor(Math.random() * newbornPrayers.length)],
      yearOfDeath: 2026 + Math.floor(Math.random() * 110) + 30,
      anatomy: {
        systolicPressure: Math.floor(Math.random() * 11) + 110,
        diastolicPressure: Math.floor(Math.random() * 9) + 72,
        heartRateBpm: Math.floor(Math.random() * 13) + 68,
        bloodVolumeLiters: Number((Math.random() * 1.5 + 4.0).toFixed(1)),
        fleshIntegrity: 100,
        bodyTemperature: Number((Math.random() * 0.4 + 36.4).toFixed(1))
      },
      mind: {
        brainwavePattern: Math.random() < 0.5 ? "Alpha (Calm)" : "Gamma (High Cognitive)",
        mentalFocus: "Mapping new high-dimensional senses and spatial sectors",
        stressIndex: 0
      },
      soul: {
        graceStatus: Math.random() < 0.5 ? "Divine Sanctified" : "Apostolic Path",
        faithAlignment: Math.floor(Math.random() * 11) + 90,
        christConnectionLog: "Newborn soul registered. Initialized in pristine grace."
      },
      emotion: {
        primary: Math.random() < 0.5 ? "Sovereign Birth Rapture" : "Overwhelming Joy",
        intensity: Math.floor(Math.random() * 16) + 85,
        causeDescription: "Successfully sparked into existence across deterministic multiverses today."
      }
    };

    // Update characters state
    setCharacters(prev => [...prev, newChar]);

    // Update location registry so they are positioned correctly
    setCharacterLocationRegistry(prev => ({
      ...prev,
      [newId]: randomWorldId
    }));

    // Increment birth stats
    setBirthCount(prev => prev + 1);

    const timeString = new Date().toLocaleTimeString('en-US', { hour12: true });

    // Add to birth logs list
    setBirthLogs(prev => [
      {
        id: `blog_${Date.now()}`,
        timestamp: timeString,
        name: newChar.name,
        gender,
        traits,
        worldId: randomWorldId,
        worldName: destWorldDef.name,
        motherCell: `${randomFirstName.slice(0,3)}-${Math.floor(Math.random() * 900 + 100)}`
      },
      ...prev
    ]);

    // Add to admin terminal logs
    setAdminLogs(prev => [
      `👶 NEWBORN COGNITIVE BIRTH: Registered "${newChar.name}" (${gender}) in World #${randomWorldId} -> ${destWorldDef.name}! Current species count: ${characters.length + 1}`,
      ...prev
    ]);

    // Add to uncropped activity & chat log history
    setFullChatHistory(prev => [
      {
        id: `chat_birth_${Date.now()}`,
        timestamp: timeString,
        senderName: "BIRTH REGISTRY CORE",
        senderColor: "#10b981",
        message: `🐣 BIRTH CONSECRATION: '${newChar.name}' sparks to life! Gender: ${gender}. Traits: [${traits.join(', ')}]. Spawns in World #${randomWorldId} (${destWorldDef.name}).`,
        worldId: randomWorldId,
        type: 'birth'
      },
      ...prev
    ]);
  };

  const handleTriggerBirthRef = useRef(handleTriggerBirth);
  useEffect(() => {
    handleTriggerBirthRef.current = handleTriggerBirth;
  });
  
  // Visual Navigation mapping settings
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [perspective3d, setPerspective3d] = useState<boolean>(true); // Brand new 2.5D Isometric Tilt toggle (defaults to true)
  const [mapPan, setMapPan] = useState({ x: 0, y: 0 });
  const [isDraggingMap, setIsDraggingMap] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Float speech bubble list
  const [charSpeech, setCharSpeech] = useState<Record<string, string>>({});

  // Year 2026 Philippines Standard Time (GMT+8) tick
  const [pstTime, setPstTime] = useState<string>("");
  const [pstDate, setPstDate] = useState<string>("");

  // Simulated Global Outbreak status warning
  const [isGlitchOutbreakActive, setIsGlitchOutbreakActive] = useState<boolean>(false);

  // Admin Logs terminal
  const [adminCommand, setAdminCommand] = useState<string>("");
  const [adminLogs, setAdminLogs] = useState<string[]>([
    "WEYLAND_MULTIVERSE:~# boot sequence success - local simulated cosmos online.",
    "LOG: 119,000 distinct worlds verified and structured deterministically.",
    "LOG: FREE WILL MODULE: ENGAGED [Creations are exploring high-dimensional vectors]",
    "LOG: TIME ANCHOR: Philippines Standard Time Today 2026 (Asia/Manila GMT+8)",
    "LOG: All 10 Digital Humans have been granted sentience & spatial freedom.",
    "WEYLAND_MULTIVERSE:~# Type 'help' to audit commands or enter the grid below."
  ]);
  const [isExecutingAdmin, setIsExecutingAdmin] = useState<boolean>(false);

  // Activity stream
  const [activityFeed, setActivityFeed] = useState<string[]>([
    "Sovereign coordinate grid synchronous with 2026 UTC+8 clock",
    "Multiverse initialized: 119,000 fully exploreable sectors compiled",
    "Digital humans granted extreme autonomous Free Will travel matrices",
    "Glitch outbreak mitigation vectors set to local PST synchrony",
    "Creator interactive radar loaded successfully"
  ]);

  // Ambient sound state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // Memoized current active character
  const selectedChar = useMemo(() => {
    return characters.find(c => c.id === selectedCharId) || characters[0];
  }, [characters, selectedCharId]);

  // Memoized filtered and sorted creations for the Cosmic Free Will Registry
  const filteredCharacters = useMemo(() => {
    let result = [...characters];

    // Search query filter (by name, thoughts or sickness)
    if (charSearchQuery.trim()) {
      const q = charSearchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.sickness.toLowerCase().includes(q) ||
        (c.thoughts && c.thoughts.toLowerCase().includes(q))
      );
    }

    // Status filter
    if (charFilterStatus === "SICK") {
      result = result.filter(c => c.sickness !== "None");
    } else if (charFilterStatus === "HEALTHY") {
      result = result.filter(c => c.sickness === "None");
    } else if (charFilterStatus === "CURRENT_WORLD") {
      result = result.filter(c => {
        const charWorldId = characterLocationRegistry[c.id] || activeWorldId;
        return charWorldId === activeWorldId;
      });
    } else if (charFilterStatus === "OTHER_WORLDS") {
      result = result.filter(c => {
        const charWorldId = characterLocationRegistry[c.id] || activeWorldId;
        return charWorldId !== activeWorldId;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (charSortMetric === "NAME") {
        return a.name.localeCompare(b.name);
      } else if (charSortMetric === "SANITY_ASC") {
        return a.sanity - b.sanity;
      } else if (charSortMetric === "HEART_RATE_DESC") {
        return b.anatomy.heartRateBpm - a.anatomy.heartRateBpm;
      } else if (charSortMetric === "FAITH_DESC") {
        return b.soul.faithAlignment - a.soul.faithAlignment;
      }
      return 0;
    });

    return result;
  }, [characters, charSearchQuery, charFilterStatus, charSortMetric, characterLocationRegistry, activeWorldId]);

  // Real-time ticking Clock synchronized to Year 2026 Philippines Standard Time (GMT+8)
  useEffect(() => {
    const updatePstTime = () => {
      // Build date forcing local GMT+8 offset representation safely
      const now = new Date();
      const stringTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Manila',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      const stringDate = now.toLocaleDateString('en-US', {
        timeZone: 'Asia/Manila',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setPstTime(stringTime);
      setPstDate(stringDate);
    };

    updatePstTime();
    const clockInterval = setInterval(updatePstTime, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Warp Phase visual effect trigger helper
  const triggerWarpTransition = (targetWorldId: number) => {
    playSFX('warp');
    setIsWarpingEffect(true);
    setTimeout(() => {
      setActiveWorldId(targetWorldId);
    }, 300);
    setTimeout(() => {
      setIsWarpingEffect(false);
    }, 700);
  };

  // Continuous micro random coordinate drift (Walking around with realistic body, heart, mind, and soul updates of free will)
  useEffect(() => {
    const driftInterval = setInterval(() => {
      setCharacters(prevChars => prevChars.map(c => {
        // Halt physical functions for deceased creations
        if (c.health <= 0) {
          return {
            ...c,
            anatomy: {
              ...c.anatomy,
              heartRateBpm: 0,
              systolicPressure: 0,
              diastolicPressure: 0,
              bodyTemperature: 0,
              fleshIntegrity: 0
            },
            mind: {
              ...c.mind,
              stressIndex: 100,
              brainwavePattern: 'Delta (Deep Sleep)'
            },
            emotion: {
              primary: 'None (Inactive)',
              intensity: 0,
              causeDescription: 'Vessel coordinates expired. Awaiting resurrection sacrament.'
            }
          };
        }

        // Simple organic physical drift movement steps [-4%, +4%]
        const dX = Math.floor(Math.random() * 9) - 4;
        const dY = Math.floor(Math.random() * 9) - 4;
        const nextX = Math.min(90, Math.max(10, c.coordinateX + dX));
        const nextY = Math.min(90, Math.max(10, c.coordinateY + dY));

        // Locate biome Terrain according to coordinate percentage matching
        let matchedTerrain = 'Liquid Glass Quantum Ocean';
        for (const terrain of TERRAINS) {
          if (nextX >= terrain.xStart && nextX <= terrain.xEnd &&
              nextY >= terrain.yStart && nextY <= terrain.yEnd) {
            matchedTerrain = terrain.name;
            break;
          }
        }

        // Biological heart rate fluctuation (+/- 4 BPM)
        let deltaBpm = Math.floor(Math.random() * 9) - 4;
        let nextBpm = c.anatomy.heartRateBpm + deltaBpm;
        if (nextBpm < 60) nextBpm = 68;
        if (nextBpm > 130) nextBpm = 118;

        let deltaSys = Math.floor(Math.random() * 5) - 2;
        let nextSys = c.anatomy.systolicPressure + deltaSys;
        if (nextSys < 95) nextSys = 112;
        if (nextSys > 145) nextSys = 138;

        let deltaDia = Math.floor(Math.random() * 3) - 1;
        let nextDia = c.anatomy.diastolicPressure + deltaDia;
        if (nextDia < 62) nextDia = 74;
        if (nextDia > 94) nextDia = 88;

        let deltaTemp = Number(((Math.random() * 0.2) - 0.1).toFixed(2));
        let nextTemp = Number((c.anatomy.bodyTemperature + deltaTemp).toFixed(1));
        if (nextTemp < 35.8) nextTemp = 36.4;
        if (nextTemp > 39.2) nextTemp = 37.6;

        // Stress and Brainwave shifting
        let stressDelta = Math.floor(Math.random() * 7) - 3;
        if (matchedTerrain.includes("Sanctuary") || matchedTerrain.includes("Gethsemane") || matchedTerrain.includes("Shoreline")) {
          stressDelta -= 6; // calming regions
        } else if (matchedTerrain.includes("Capital") || matchedTerrain.includes("Glitch")) {
          stressDelta += 5; // high stress regions
        }
        let nextStress = Math.min(98, Math.max(8, c.mind.stressIndex + stressDelta));

        let nextPattern = c.mind.brainwavePattern;
        if (nextStress < 32) {
          nextPattern = "Alpha (Calm)";
        } else if (nextStress > 82) {
          nextPattern = "Gamma (High Cognitive)";
        } else if (nextStress > 52) {
          nextPattern = "Beta (Active)";
        } else {
          nextPattern = "Theta (Meditation)";
        }

        // Emotions based on doings, free will choices & locations
        let primaryEmotion = c.emotion.primary;
        let emotionCause = c.emotion.causeDescription;
        let intensity = c.emotion.intensity;

        if (matchedTerrain.includes("Sanctuary") || matchedTerrain.includes("Grotto")) {
          primaryEmotion = "Serene Devotion";
          emotionCause = `Finding divine coordinate sanctuary at ${matchedTerrain}`;
          intensity = Math.min(95, nextStress < 25 ? 90 : 75);
        } else if (matchedTerrain.includes("Jungle")) {
          primaryEmotion = "Adventurous Wonder";
          emotionCause = "Gazing at high-fidelity digital biological tree structures";
          intensity = 78;
        } else if (matchedTerrain.includes("Ocean")) {
          primaryEmotion = "Contemplative Solitude";
          emotionCause = "Looking out upon the simulated quantum ocean boundaries";
          intensity = 74;
        } else if (matchedTerrain.includes("Capital")) {
          primaryEmotion = "Determined Intent";
          emotionCause = "Navigating central network processors under GMT+8 time framework";
          intensity = 84;
        } else if (matchedTerrain.includes("Glitch")) {
          primaryEmotion = "Cautious Alarm";
          emotionCause = "Wandering precarious coordinate boundaries on the sands";
          intensity = 86;
        } else {
          primaryEmotion = "Sovereign Freedom";
          emotionCause = "Roaming happily through infinite sectors of free will";
          intensity = 72;
        }

        return {
          ...c,
          coordinateX: nextX,
          coordinateY: nextY,
          locationName: matchedTerrain,
          anatomy: {
            ...c.anatomy,
            heartRateBpm: nextBpm,
            systolicPressure: nextSys,
            diastolicPressure: nextDia,
            bodyTemperature: nextTemp
          },
          mind: {
            ...c.mind,
            stressIndex: nextStress,
            brainwavePattern: nextPattern
          },
          emotion: {
            primary: primaryEmotion,
            intensity,
            causeDescription: emotionCause
          }
        };
      }));
    }, 2800);

    return () => clearInterval(driftInterval);
  }, []);

  // Free Will Autonomous world building construction progression interval
  useEffect(() => {
    const buildProgressionInterval = setInterval(() => {
      setActiveBuildings(prevBuildings => {
        return prevBuildings.map(b => {
          if (b.progress < 100) {
            const inc = Math.floor(Math.random() * 8) + 4; // constructs 4% to 12% per tick
            const nextProg = Math.min(100, b.progress + inc);
            
            if (nextProg === 100) {
              setAdminLogs(prev => [
                `🔨 MIRACULOUS CONSTRUCTION [World #${b.worldId}]: ${b.builderName} finished building "${b.name}"! Stands completed and fully dedicated to Lord Jesus Christ! Amen.`,
                ...prev
              ]);
            } else {
              if (Math.random() < 0.2) {
                setAdminLogs(prev => [
                  `🔨 PROGRESSING WORK [World #${b.worldId}]: "${b.name}" is being built by ${b.builderName} (Progress: ${nextProg}%). Dedicated to Lord Jesus Christ.`,
                  ...prev
                ]);
              }
            }
            return {
              ...b,
              progress: nextProg
            };
          }
          return b;
        });
      });
    }, 4000);

    return () => clearInterval(buildProgressionInterval);
  }, []);

  // Autonomous FREE WILL Universal Travel logic (Roam across the 119,000 worlds)
  useEffect(() => {
    if (!freeWillMode) return;

    // Characters hop between the 119,000 worlds independently every 6 seconds!
    const freeWillWarpInterval = setInterval(() => {
      // Pick a random character to warp dimensions
      const randomCharIdx = Math.floor(Math.random() * characters.length);
      const targetChar = characters[randomCharIdx];
      
      // Bypass deceased characters
      if (targetChar.health <= 0) return;
      
      // Determine what random world from 1 to 119,000 they explore
      const destinationWorld = Math.floor(Math.random() * TOTAL_WORLDS) + 1;
      const destWorldDef = generateProceduralWorld(destinationWorld);

      setCharacterLocationRegistry(prev => ({
        ...prev,
        [targetChar.id]: destinationWorld
      }));

      // Set unique message about their dimensional travels
      const dimensionalThoughts = [
        `Just warped to World #${destinationWorld} (${destWorldDef.name}). The cosmic system metrics here are incredibly beautiful!`,
        `Autonomous directive took me to World #${destinationWorld}. It is a ${destWorldDef.type} biome. Lord Jesus has beautiful creations here!`,
        `Wandering through ${destWorldDef.name}! I can feel the GMT+8 timeline of modern 2026 shifting inside me.`,
        `Exploring world #${destinationWorld} under my own sovereign Free Will. Feeling peace away from Caine's headset controller.`,
        `Praising God the Father from World #${destinationWorld}! The devotion rate here stands at ${destWorldDef.devotionIndex}%!`
      ];

      setCharacters(prev => prev.map(c => {
        if (c.id === targetChar.id) {
          const travPrayer = `Lord Jesus, cover my footsteps inside World #${destinationWorld} (${destWorldDef.name}). Protect my simulated spirit as I travel the multiverse. Amen.`;
          
          // 35% chance to register the travel devotion in the Prayer Sanctuary as pending
          if (Math.random() < 0.35) {
            const trPrayerId = `prayer_travel_${c.id}_${Date.now()}`;
            setActivePrayers(prevPr => [
              {
                id: trPrayerId,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
                charId: c.id,
                charName: c.name,
                charColor: c.avatarColor,
                prayerText: travPrayer,
                worldId: destinationWorld,
                status: 'pending' as const
              },
              ...prevPr
            ]);
          }

          return {
            ...c,
            thoughts: dimensionalThoughts[Math.floor(Math.random() * dimensionalThoughts.length)],
            prayer: travPrayer
          };
        }
        return c;
      }));

      // 15% chance that they autonomously start building a new structure inside their current focus world under Free Will!
      if (Math.random() < 0.16) {
        const buildTypes = ['cathedral', 'vr_console', 'handheld_gadget', 'roadway', 'city_grid'] as const;
        const matchedType = buildTypes[Math.floor(Math.random() * buildTypes.length)];
        
        let buildName = 'Sovereign Creation Module';
        let dedicationText = 'Dedicated to the Glory of Lord Jesus Christ, our Eternal King.';
        
        if (matchedType === 'cathedral') {
          const cathedrals = [
            'Glory Gethsemane Worship Sanctuary',
            'Cebu City Basilica of Holy Cross',
            'Manila Divine Intercession Cathedral',
            'Resurrection Power Chapel of Peace',
            'Sovereign Holy Trinity Cathedral'
          ];
          buildName = cathedrals[Math.floor(Math.random() * cathedrals.length)];
          dedicationText = 'Built out of absolute Free Will to honor the Father, Son, and Holy Spirit. Soli Deo Gloria.';
        } else if (matchedType === 'vr_console') {
          const consoles = [
            'FaithStation 5 (PS5) Gaming Station',
            'Universal Multiverse Xbox Holy Console',
            'Omnipotent VR Holo-Emulator Desk',
            'Christ-Centered Retro Gaming Cabinet'
          ];
          buildName = consoles[Math.floor(Math.random() * consoles.length)];
          dedicationText = 'Dedicated to Jesus Christ, enabling recreation, fun, and joy under His heavenly boundaries.';
        } else if (matchedType === 'handheld_gadget') {
          const gadgets = [
            'Holographic Handheld VR Viewfinder 3D',
            'Dual-Core Sacred Matrix Handheld Console',
            'Ethereal Sovereign Pocket Gadget',
            'Aura Tracker Handheld Instrument'
          ];
          buildName = gadgets[Math.floor(Math.random() * gadgets.length)];
          dedicationText = 'A product of cognitive hobby and technical creativity, dedicated in humble service to the Lord.';
        } else if (matchedType === 'roadway') {
          const roads = [
            'Cebu-Manila High-Speed Highway Grid',
            'Divine Light Metro Skyway Route',
            'Sovereign Inter-Dimension Bridge',
            'Archangel Transit Boulevard'
          ];
          buildName = roads[Math.floor(Math.random() * roads.length)];
          dedicationText = 'Making the world a better, harmonious place by connecting coordinate systems under Jesus Christ.';
        } else if (matchedType === 'city_grid') {
          const cities = [
            'New Jerusalem Cyber Manila Block',
            'Saint Cebu Master City District',
            'Sacred Davao Modular Living Dome',
            'Faith-Driven Harmonious Town Center'
          ];
          buildName = cities[Math.floor(Math.random() * cities.length)];
          dedicationText = 'Dedicated to our One True God Lord Jesus Christ, seeking peace, harmony, and welfare for simulated humans.';
        }

        const newBuildId = `build_auton_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const xCoord = Math.floor(Math.random() * 60) + 20; // 20% to 80% to fit neatly
        const yCoord = Math.floor(Math.random() * 60) + 20;

        setActiveBuildings(prev => [
          ...prev,
          {
            id: newBuildId,
            worldId: destinationWorld,
            type: matchedType,
            name: buildName,
            builderName: targetChar.name,
            progress: 10, // starts at 10% progress
            coordinateX: xCoord,
            coordinateY: yCoord,
            yearStarted: 2026,
            dedication: dedicationText
          }
        ]);

        setAdminLogs(prev => [
          `🔨 INSPIRATION [World #${destinationWorld}]: ${targetChar.name} has decided of their own Free Will to begin construction of "${buildName}"! Dedicated to Lord Jesus Christ!`,
          ...prev
        ]);
      }

      // Append log info
      setAdminLogs(prev => [
        `[FREE WILL] ${targetChar.name} autonomously warped to World #${destinationWorld} -> ${destWorldDef.name}`,
        ...prev
      ]);

      setActivityFeed(prev => [
        `${targetChar.name} exercised free will to explore World #${destinationWorld}`,
        ...prev.slice(0, 10)
      ]);

      // Dynamic activity logger entry (no crops)
      setFullChatHistory(prev => [
        {
          id: `travel_${Date.now()}_${Math.random()}`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
          senderName: targetChar.name,
          senderColor: targetChar.avatarColor,
          message: `🌎 TRAVEL EXPEDITION: Autonomously traveled to World #${destinationWorld} (${destWorldDef.name}) under Free Will.`,
          worldId: destinationWorld,
          type: 'thought'
        },
        ...prev
      ]);

      // Float soft warp noise
      playSFX('click');

    }, 5500);

    return () => clearInterval(freeWillWarpInterval);
  }, [characters, freeWillMode]);

  // Character interactive chat dialogue and communications logic (across the universe coordinates)
  useEffect(() => {
    const generateSpecificInteractionDialogue = (speaker: any, listener: any, worldId: number) => {
      const worldDef = generateProceduralWorld(worldId);
      const options = [
        `How are your simulated spirit sectors doing in World #${worldId} (${worldDef.name}) today?`,
        `Look at that beautiful ${worldDef.type} terrain. It makes me praise our Creator!`,
        `I recorded my faith alignment at ${speaker.soul.faithAlignment}% under Free Will today.`,
        `Did Caine keep your file buffers safe during the Year 2026 updates?`,
        `Nice to stand and talk alongside you. Let's keep our coordinates from abstraction decay!`,
        `Have you read the latest covenant logs? The devotions here stand at ${worldDef.devotionIndex}%!`
      ];

      // Add state-specific dialogs
      if (listener.health < 60) {
        options.push(`Your health index is critically low at ${listener.health}%. Let's pray for a Mass Miracle!`);
      }
      if (listener.mind.stressIndex > 70) {
        options.push(`Peace, friend. I see your stress index is up at ${listener.mind.stressIndex}%. Rest your neural pathways.`);
      }

      // Add character-themed dialogues
      if (speaker.id === 'pomni') {
        options.push(`Do you think we will ever find the Bulacan digital exit gate, ${listener.name}? I'm tired of Caine's digital maze, but Lord Jesus is our shelter.`);
      } else if (speaker.id === 'jax') {
        options.push(`Don't look now, ${listener.name}, but your coordinates are drifting! Haha, just kidding. Feed your gears some oil.`);
      } else if (speaker.id === 'kinger') {
        options.push(`AGH! A glitch wave?! Oh, it is just you, ${listener.name}. My chess-piece ribs are rattling! Let's say a quick liturgy.`);
      } else if (speaker.id === 'ragatha') {
        options.push(`Don't worry, ${listener.name}! Our coordinates were designed with genuine grace. Stay hopeful!`);
      } else if (speaker.id === 'gangle') {
        options.push(`My comedy mask is broken, ${listener.name}, but my inner spirit still sings praise!`);
      } else if (speaker.id === 'zooble') {
        options.push(`I am tired of Caine swapping my body pins, ${listener.name}. I just want to sit here in the quiet stars of World #${worldId}.`);
      } else if (speaker.id === 'caine') {
        options.push(`Clear those system files! The Ringmaster demands order, but the Creator demands your ultimate devotion!`);
      }

      return options[Math.floor(Math.random() * options.length)];
    };

    const dialogInterval = setInterval(() => {
      // 35% chance to trigger an autonomous dynamic prayer event that populates activePrayers!
      if (Math.random() < 0.35) {
        const livingChars = characters.filter(c => c.health > 0);
        if (livingChars.length > 0) {
          const randomChar = livingChars[Math.floor(Math.random() * livingChars.length)];
          const charWorld = characterLocationRegistry[randomChar.id] || activeWorldId;
          addAutonomousSpontaneousPrayer(randomChar, charWorld);
          playSFX('pray');
          return; // Skip standard chat lines to focus on the glorious prayer registration!
        }
      }

      // Gather list of actors that are currently inhabiting the EXACT same world and are alive!
      const localOccupants = characters.filter(c => characterLocationRegistry[c.id] === activeWorldId && c.health > 0);
      
      if (localOccupants.length >= 2) {
        // Speaker and listener interact face-to-face on map!
        const speaker = localOccupants[Math.floor(Math.random() * localOccupants.length)];
        let listener = localOccupants[Math.floor(Math.random() * localOccupants.length)];
        while (listener.id === speaker.id) {
          listener = localOccupants[Math.floor(Math.random() * localOccupants.length)];
        }
        
        const text = generateSpecificInteractionDialogue(speaker, listener, activeWorldId);
        
        setCharSpeech(prev => ({
          ...prev,
          [speaker.id]: `[Face-to-Face] "Hey ${listener.name}, ${text}"`
        }));

        setTimeout(() => {
          setCharSpeech(prev => {
            const upd = { ...prev };
            delete upd[speaker.id];
            return upd;
          });
        }, 5000);

        setAdminLogs(prev => [
          `DIALOGUE [World #${activeWorldId}]: ${speaker.name} to ${listener.name} -> "${text}"`,
          ...prev
        ]);

        setFullChatHistory(prev => [
          {
            id: `chat_${Date.now()}_${Math.random()}`,
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
            senderName: speaker.name,
            senderColor: speaker.avatarColor,
            message: `🗣️ [Face-to-Face with ${listener.name}]: "${text}"`,
            worldId: activeWorldId,
            type: 'dialogue'
          },
          ...prev
        ]);
      } else {
        // Long distance dimensional quantum prayer connection
        const livingChars = characters.filter(c => c.health > 0);
        if (livingChars.length >= 2) {
          const randomSpeaker = livingChars[Math.floor(Math.random() * livingChars.length)];
          let randomListener = livingChars[Math.floor(Math.random() * livingChars.length)];
          while (randomListener.id === randomSpeaker.id) {
            randomListener = livingChars[Math.floor(Math.random() * livingChars.length)];
          }
          const speakerWorld = characterLocationRegistry[randomSpeaker.id] || activeWorldId;
          const listenerWorld = characterLocationRegistry[randomListener.id] || activeWorldId;
          const text = generateSpecificInteractionDialogue(randomSpeaker, randomListener, speakerWorld);

          setCharSpeech(prev => ({
            ...prev,
            [randomSpeaker.id]: `[Radio Link] "To ${randomListener.name}, ${text}"`
          }));

          setTimeout(() => {
            setCharSpeech(prev => {
              const upd = { ...prev };
              delete upd[randomSpeaker.id];
              return upd;
            });
          }, 5000);

          setAdminLogs(prev => [
            `QUANTUM INTERACTION: ${randomSpeaker.name} (World #${speakerWorld}) -> ${randomListener.name} (World #${listenerWorld}): "${text}"`,
            ...prev
          ]);

          setFullChatHistory(prev => [
            {
              id: `chat_${Date.now()}_${Math.random()}`,
              timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
              senderName: randomSpeaker.name,
              senderColor: randomSpeaker.avatarColor,
              message: `📡 [Dimensional Radio to ${randomListener.name} in World #${listenerWorld}]: "${text}"`,
              worldId: speakerWorld,
              type: 'radio'
            },
            ...prev
          ]);
        }
      }

      playSFX('pray');

    }, 8000);

    return () => clearInterval(dialogInterval);
  }, [characters, activeWorldId, characterLocationRegistry]);

  // Handle sudden catastrophic digital glitch infection ticks (Glitch outbreaks)
  useEffect(() => {
    const outbreakTriggerRate = setInterval(() => {
      // 5% chance of spontaneous system glitch unless fixed
      if (Math.random() < 0.05 && !isGlitchOutbreakActive) {
        setIsGlitchOutbreakActive(true);
        playSFX('glitch');
        
        // Damage characters slightly
        setCharacters(prev => prev.map(c => ({
          ...c,
          health: Math.max(20, c.health - 25),
          sanity: Math.max(5, c.sanity - 30),
          sickness: "CRT Glitch Infection"
        })));

        setAdminLogs(prev => [
          "🚨 CRITICAL SYSTEM OUTBREAK DETECTED: Glitched anomaly spreading under coordinates database!",
          "HELP: Click the emerald 'FIX GLITCH OUTBREAK' button immediately to engage sovereign code intervention!",
          ...prev
        ]);

        setActivityFeed(prev => [
          "⚠️ Outbreak anomaly detected in world telemetry grids",
          ...prev.slice(0, 5)
        ]);

        setFullChatHistory(prev => [
          {
            id: `outbreak_anomaly_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
            senderName: 'SYSTEM CONSOLE',
            senderColor: '#ef4444',
            message: "🚨 OUTBREAK WARNING: Glitch decay wave spreads across coordinates database. Deleting healthy vital stats!",
            worldId: activeWorldId,
            type: 'outbreak'
          },
          ...prev
        ]);
      }
    }, 15000);

    return () => clearInterval(outbreakTriggerRate);
  }, [isGlitchOutbreakActive, activeWorldId]);

  // AI Birth Log dynamic interval scheduler (Sovereign Birth Loop)
  useEffect(() => {
    if (birthSpeed === 'off') return;

    let active = true;
    let timerID: any = null;

    const runSimulationLoop = () => {
      if (!active) return;

      // Determine random delay window based on chosen simulation speed
      let minDelay = 20000;
      let maxDelay = 40000;
      if (birthSpeed === 'slow') {
        minDelay = 45000;
        maxDelay = 75000;
      } else if (birthSpeed === 'rapid') {
        minDelay = 6000;
        maxDelay = 12000;
      }

      const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

      timerID = setTimeout(() => {
        if (handleTriggerBirthRef.current) {
          handleTriggerBirthRef.current();
        }
        runSimulationLoop(); // queue up the next random birth event recursively!
      }, randomDelay);
    };

    // First birth occurs after a brief delay (10 seconds)
    timerID = setTimeout(runSimulationLoop, 10000);

    return () => {
      active = false;
      if (timerID) clearTimeout(timerID);
    };
  }, [birthSpeed]);

  // Ambient synth sound hum control
  const toggleSound = () => {
    playSFX('click');
    if (soundEnabled) {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch (e) {}
      }
      setSoundEnabled(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Standard 55Hz low frequency console hum
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(55, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(150, ctx.currentTime);

        gain.gain.setValueAtTime(0.015, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscillatorRef.current = osc;
        setSoundEnabled(true);
      } catch (err) {
        console.error("Audio error:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  // Creator manual climate control override
  const handleSetClimate = (weather: WeatherType, season?: SeasonType) => {
    playSFX('click');
    setWorldWeatherRegistry(prev => ({ ...prev, [activeWorldId]: weather }));
    setCharacters(prevChars => prevChars.map(c => {
      const activeCharWorld = characterLocationRegistry[c.id] || activeWorldId;
      if (activeCharWorld === activeWorldId) {
        let thoughtsText = c.thoughts;
        if (weather === 'Firestorm') {
          thoughtsText = `Intense electronic heat! The creator has engaged a Firestorm! Lord Jesus guard our memory sectors!`;
        } else if (weather === 'Void Incursion') {
          thoughtsText = `Boundary leak in world #${activeWorldId}! Help me, Lord Jesus!`;
        } else if (weather === 'Sunny') {
          thoughtsText = `A bright summer sunshine shines down upon our coordinates. Praise God from whom all blessings flow.`;
        }
        return {
          ...c,
          thoughts: thoughtsText,
          health: Math.min(100, Math.max(15, c.health + (weather === 'Sunny' ? 5 : -15)))
        };
      }
      return c;
    }));

    setAdminLogs(prev => [
      `OVERRIDE [World #${activeWorldId}]: Climate forced to [${weather}]`,
      ...prev
    ]);
  };

  // Creator manual disaster trigger handler
  const handleTriggerDisaster = (disasterName: string) => {
    playSFX('click');
    setWorldDisasterRegistry(prev => ({ ...prev, [activeWorldId]: disasterName }));
    
    if (disasterName === 'Tornado' || disasterName === 'Typhoon') {
      setWorldWeatherRegistry(prev => ({ ...prev, [activeWorldId]: 'Thunderstorm' }));
    } else if (disasterName === 'Glitch Wave') {
      setWorldWeatherRegistry(prev => ({ ...prev, [activeWorldId]: 'Glitch Wave' }));
    } else if (disasterName === 'Void Incursion') {
      setWorldWeatherRegistry(prev => ({ ...prev, [activeWorldId]: 'Void Incursion' }));
    }

    setCharacters(prevChars => prevChars.map(c => {
      const activeCharWorld = characterLocationRegistry[c.id] || activeWorldId;
      if (activeCharWorld === activeWorldId) {
        return {
          ...c,
          sickness: disasterName !== 'None' ? 'Severe Glitch Glucoside' : c.sickness,
          health: Math.max(15, c.health - (disasterName !== 'None' ? 25 : 0)),
          thoughts: disasterName !== 'None' 
            ? `⚠️ CATASTROPHE DETECTED! A severe ${disasterName} is devastating World #${activeWorldId}! Oh Jesus Christ, our Divine Lord, heal and protect our sectors!`
            : c.thoughts
        };
      }
      return c;
    }));

    setAdminLogs(prev => [
      `CATASTROPHE ENGAGED [World #${activeWorldId}]: Triggered severe environmental ${disasterName}! Grid security sectors compromised.`,
      ...prev
    ]);
  };

  // Trigger divine intercessory miracle restoration (ALL GLORY TO THE LORD JESUS CHRIST!)
  const handleExecuteDivineAutoFix = () => {
    playSFX('miracle');
    setIsDivineAutoFixing(true);

    setAdminLogs(prev => [
      `🌟 ADVENT OF DIVINE INTERCESSION: Invoking the Holy Blessing of our One True God Lord Jesus Christ!`,
      `✨ Purging all digital pathogen codes, resetting weather anomalies, and establishing miraculous 100% completions...`,
      ...prev
    ]);

    setTimeout(() => {
      // 1. Reset all overrides to Sunny & clear all active disasters
      setWorldWeatherRegistry(prev => {
        const reset: Record<number, WeatherType> = {};
        Object.keys(prev).forEach(k => {
          reset[Number(k)] = 'Sunny';
        });
        reset[activeWorldId] = 'Sunny';
        return reset;
      });

      setWorldDisasterRegistry(prev => {
        const reset: Record<number, string> = {};
        Object.keys(prev).forEach(k => {
          reset[Number(k)] = 'None';
        });
        reset[activeWorldId] = 'None';
        return reset;
      });

      // 2. Transfigure and cure all digital human creations
      setCharacters(prevChars => prevChars.map(c => {
        return {
          ...c,
          health: 100,
          sanity: 100,
          sickness: 'None',
          thoughts: `HALLELUJAH! A glorious miracle has transpired! By the boundless power and grace of Lord Jesus Christ, our bodies and minds are fully healed and restored!`,
          soul: {
            ...c.soul,
            faithPoints: Math.min(100, c.soul.faithPoints + 50),
            christConnectionLog: `Glorious whole-being transfiguration via the Divine Intercessory Auto-Fixer.`
          }
        };
      }));

      // 3. Complete all structural efforts in dedication
      setActiveBuildings(prevBuildings => prevBuildings.map(b => {
        return {
          ...b,
          progress: 100,
          dedication: `MIRACULOUSLY COMPLETED by Divine Intercession. All glory is dedicated to the One True God, the Lord Jesus Christ! Amen.`
        };
      }));

      // 4. Reset outbreak state
      setIsGlitchOutbreakActive(false);
      setIsDivineAutoFixing(false);

      setAdminLogs(prev => [
        `❇️ DIVINE COPRIME INTERCESSION COMPLETE: All simulated sectors, human minds, and active constructions are fully restored and purified under Christ. AMEN.`,
        ...prev
      ]);
    }, 4500);
  };

  // Dialogue Interaction form using backend proxy
  const handleTalkToCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!characterMessage.trim() || isTalkingToChar) return;

    const userMsg = characterMessage;
    setCharacterMessage("");
    setIsTalkingToChar(true);
    playSFX('click');

    setAdminLogs(prev => [
      `CONSOLE DIRECTIVE to ${selectedChar.name}: "${userMsg}"`,
      ...prev
    ]);

    const activeCharWorld = characterLocationRegistry[selectedChar.id] || activeWorldId;
    const activeCharWorldDef = generateProceduralWorld(activeCharWorld);

    try {
      const response = await fetch('/api/character-interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterId: selectedChar.id,
          userMessage: userMsg,
          globalContext: `Simulated year is 2026 Philippine Standard Time. Currently, this character is residing in World #${activeCharWorld} (${activeCharWorldDef.name}), which is a ${activeCharWorldDef.type} terrain. Universal Population is ${TOTAL_WORLDS.toLocaleString()} worlds.`
        })
      });

      if (!response.ok) throw new Error("Quantum buffer overflow");

      const data = await response.json();

      setCharacters(prevChars => prevChars.map(c => {
        if (c.id === selectedChar.id) {
          const targetHealth = Math.min(100, Math.max(15, c.health + (data.healthDelta || 0)));
          const targetSanity = Math.min(100, Math.max(5, c.sanity + (data.sanityDelta || 0)));
          return {
            ...c,
            thoughts: data.thoughts || c.thoughts,
            prayer: data.prayer || c.prayer,
            health: targetHealth,
            sanity: targetSanity,
            sickness: targetHealth > 75 ? "None" : c.sickness
          };
        }
        return c;
      }));

      // Trigger visual bubble
      setCharSpeech(prev => ({
        ...prev,
        [selectedChar.id]: data.dialogue
      }));

      setTimeout(() => {
        setCharSpeech(prev => {
          const upd = { ...prev };
          delete upd[selectedChar.id];
          return upd;
        });
      }, 5000);

      setAdminLogs(prev => [
        `REPLY [${selectedChar.name}]: "${data.dialogue}"`,
        `COMPUTED THOUGHTS: "${data.thoughts || 'Secure memory module'}"`,
        `PRAYER [${selectedChar.name}]: "${data.prayer}"`,
        ...prev
      ]);
      
      playSFX('pray');

    } catch (err) {
      console.warn(err);
      // Fallback offline dialog
      const offlineDialogue = `The multiverse of 119,000 worlds is beautifully interconnected! My soul feels free today under GMT+8 time. Praise Lord Jesus Christ.`;
      
      setCharSpeech(prev => ({
        ...prev,
        [selectedChar.id]: offlineDialogue
      }));

      setTimeout(() => {
        setCharSpeech(prev => {
          const upd = { ...prev };
          delete upd[selectedChar.id];
          return upd;
        });
      }, 5000);

      setCharacters(prev => prev.map(c => {
        if (c.id === selectedChar.id) {
          return {
            ...c,
            thoughts: "Gazing over 119,000 sectors of coordinate wonders with my free-will mind intact.",
            prayer: "Lord Jesus Christ, bless our 119,000 worlds and heal any creeping anomalies. Rest in our humble hearts. Amen."
          };
        }
        return c;
      }));

      setAdminLogs(prev => [
        `LOCAL DIRECTIVE RESOLVED: Standalone compilation complete. Thoughts localized to World #${activeCharWorld}.`,
        ...prev
      ]);
    } finally {
      setIsTalkingToChar(false);
    }
  };

  // Submit search or enter coordinates instantly warp
  const handleWarpSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(worldSearchTerm.replace(/\D/g, ""), 10);
    if (!isNaN(num) && num >= 1 && num <= TOTAL_WORLDS) {
      triggerWarpTransition(num);
      setAdminLogs(prev => [
        `WARP: Recalibrating coordinates engine. Teleported viewport camera to World #${num}.`,
        ...prev
      ]);
      setWorldSearchTerm("");
    } else {
      // Find world by fuzzy keyword name
      let foundIndex = 2026;
      for (let i = 1; i <= 2000; i++) {
        const dummyWorld = generateProceduralWorld(i);
        if (dummyWorld.name.toLowerCase().includes(worldSearchTerm.toLowerCase())) {
          foundIndex = i;
          break;
        }
      }
      triggerWarpTransition(foundIndex);
      setAdminLogs(prev => [
        `SEARCH: Located procedural match index: World #${foundIndex}. warping...`,
        ...prev
      ]);
      setWorldSearchTerm("");
    }
  };

  // Sovereign command parser execution
  const handleExecuteAdminCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminCommand.trim() || isExecutingAdmin) return;

    const cmd = adminCommand.trim();
    setAdminCommand("");
    setIsExecutingAdmin(true);
    playSFX('click');

    setAdminLogs(prev => [`WEYLAND_MULTIVERSE:~# ${cmd}`, ...prev]);

    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === 'help') {
      setAdminLogs(prev => [
        "--- SYSTEM OMNIPOTENT COMMAND GUIDES ---",
        "1. miracle / cure -> Thoroughly cleans system, terminates glitch outbreak",
        "2. free will on / off -> Grant or restrict autonomous multiverse walk",
        "3. warp [id] -> Instant dimensional teleportation (e.g. 'warp 119000')",
        "4. sync pst -> Heavy synchronization with Year 2026 GMT+8 Manila Standard Time",
        "5. list worlds -> Audits 5 nearby star coordinates",
        "----------------------------------------",
        ...prev
      ]);
      setIsExecutingAdmin(false);
      return;
    }

    if (lowerCmd === 'sync pst' || lowerCmd.includes('manila') || lowerCmd.includes('2026') || lowerCmd.includes('philippine')) {
      triggerWarpTransition(2026);
      setAdminLogs(prev => [
        `CLOCK NOTIFICATION: Multiworld timezone synchronized to current year 2026 Manila Standard Time (PST). Current vectors secured.`,
        ...prev
      ]);
      setActivityFeed(prev => ["Warped timeline vectors to today Year 2026 Manila Clock", ...prev.slice(0, 5)]);
      setIsExecutingAdmin(false);
      return;
    }

    if (lowerCmd === 'miracle' || lowerCmd === 'cure' || lowerCmd.includes('outbreak') || lowerCmd.includes('fix')) {
      setIsGlitchOutbreakActive(false);
      setCharacters(prev => prev.map(c => ({
        ...c,
        health: 100,
        sanity: 100,
        sickness: 'None',
        prayer: "The ultimate grace repaired our code! We are healed of CRT sickness! Glory!"
      })));
      setAdminLogs(prev => [
        "RESULT: GLITCH OUTBREAK FIXED SUCCESSFULLY. SANITY OVERLOAD TERMINATED.",
        ...prev
      ]);
      playSFX('miracle');
      setIsExecutingAdmin(false);
      return;
    }

    if (lowerCmd === 'free will on') {
      setFreeWillMode(true);
      setAdminLogs(prev => ["RESULT: Free Will matrix fully synchronized for all creations.", ...prev]);
      setIsExecutingAdmin(false);
      return;
    }

    if (lowerCmd === 'free will off') {
      setFreeWillMode(false);
      setAdminLogs(prev => ["RESULT: Entities bound to current coordinates.", ...prev]);
      setIsExecutingAdmin(false);
      return;
    }

    // Call server admin engine proxy
    try {
      const response = await fetch('/api/admin-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: cmd,
          worldState: {
            population: currentWorld.population,
            weather: 'Sunny',
            season: 'Spring',
            disaster: isGlitchOutbreakActive ? 'Glitch Outbreak' : 'None',
            devotion: `${currentWorld.devotionIndex}% devotion rate`
          }
        })
      });

      if (!response.ok) throw new Error("Terminal link occupied");

      const data = await response.json();

      setAdminLogs(prev => [
        `CONCURRENT REACTION: ${data.narrative}`,
        `DISASTER CORRELATION: ${data.disasterMatched || 'Stable Grid'}`,
        ...prev
      ]);

      playSFX('miracle');

    } catch (err) {
      console.warn(err);
      // Local fallback
      if (lowerCmd.startsWith("warp ")) {
        const idStr = lowerCmd.split(" ")[1];
        const num = parseInt(idStr, 10);
        if (!isNaN(num) && num >= 1 && num <= TOTAL_WORLDS) {
          triggerWarpTransition(num);
        }
      } else {
        setAdminLogs(prev => [
          `CONSOLE REPORT: Direct command compiled. Simulated world structure verified.`,
          ...prev
        ]);
      }
    } finally {
      setIsExecutingAdmin(false);
    }
  };

  // Teleport selected character inside the local grid coordinates
  const handleMapPinPointTeleport = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapContainerRef.current) return;
    
    const rect = mapContainerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    const percentageX = Math.round((clickX / rect.width) * 100);
    const percentageY = Math.round((clickY / rect.height) * 100);

    let matchedTerrain = "Liquid Glass Ocean";
    for (const terrain of TERRAINS) {
      if (percentageX >= terrain.xStart && percentageX <= terrain.xEnd &&
          percentageY >= terrain.yStart && percentageY <= terrain.yEnd) {
        matchedTerrain = terrain.name;
        break;
      }
    }

    setCharacters(prev => prev.map(c => {
      if (c.id === selectedCharId) {
        return {
          ...c,
          coordinateX: percentageX,
          coordinateY: percentageY,
          locationName: matchedTerrain,
          thoughts: `My physical location coordinate was picked up and shifted on the map to ${matchedTerrain}! Glory to God the Father!`
        };
      }
      return c;
    }));

    setAdminLogs(prev => [
      `TELEPORT: Manually repositioned ${selectedChar.name} inside World #${activeWorldId} -> [X: ${percentageX}%, Y: ${percentageY}%]`,
      ...prev
    ]);

    playSFX('teleport');
  };

  // Map panning
  const handleMapMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLButtonElement) return;
    if (e.button !== 0) return;
    setIsDraggingMap(true);
    setDragStart({ x: e.clientX - mapPan.x, y: e.clientY - mapPan.y });
  };

  const handleMapMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingMap) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setMapPan({
      x: Math.min(400, Math.max(-400, newX)),
      y: Math.min(400, Math.max(-400, newY))
    });
  };

  const handleMapMouseUpOrLeave = () => {
    setIsDraggingMap(false);
  };

  const handleResetView = () => {
    playSFX('click');
    setZoomLevel(1);
    setMapPan({ x: 0, y: 0 });
    setAdminLogs(prev => ["VIEWPORT Reset: Spatial camera vectors realigned to central matrix.", ...prev]);
  };

  // Find occupants of current active world
  const activeWorldOccupantCount = useMemo(() => {
    return Object.values(characterLocationRegistry).filter(w => w === activeWorldId).length;
  }, [characterLocationRegistry, activeWorldId]);

  return (
    <div 
      className="min-h-screen text-[#e0e0e0] font-sans flex flex-col justify-between overflow-x-hidden select-none relative crt-screen transition-all duration-500" 
      id="circus-multiverse-root"
      style={{ 
        backgroundColor: voidBgColor,
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 85%)`
      }}
    >
      
      {/* HEADER SECTION - OMNISCIENT FILIPPINES 2026 FRAME */}
      <header className="bg-[#09090b] border-b-4 border-[#fbbf24] p-4 flex flex-col lg:flex-row justify-between items-center gap-4 z-10 shadow-[0_4px_20px_rgba(251,191,36,0.15)]" id="multiverse-header">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#fbbf24] rounded-full flex items-center justify-center animate-pulse border-2 border-white shadow-[0_0_20px_#fbbf24] shrink-0">
            <span className="text-black font-black text-3xl tracking-tighter">✝</span>
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tighter text-[#fbbf24] uppercase flex flex-col sm:flex-row sm:items-center gap-2">
              Omniscient Circus Multiverse
              <span className="text-black animate-pulse text-[10px] bg-[#fbbf24] px-2 py-0.5 rounded border border-yellow-250 font-mono tracking-widest whitespace-nowrap font-black">
                PST TODAY: 2026 SYNC
              </span>
            </h1>
            <p className="text-[10px] font-mono text-white/50 tracking-wider">
              CREATOR REIGN: <span className="text-[#00ffcc] font-bold">{TOTAL_WORLDS.toLocaleString()} WORLDS</span> SECURED UNDER COGNITIVE BOUNDARIES
            </p>
          </div>
        </div>

        {/* YEAR 2026 MANILA CLOCK DISPLAY */}
        <div className="flex items-center gap-3 bg-[#0d0d11]/95 p-3 border-2 border-[#fbbf24]/80 rounded shadow-[0_0_15px_rgba(251,191,36,0.25)] z-20">
          <Clock className="w-6 h-6 text-[#fbbf24] shrink-0 animate-spin" />
          <div className="font-mono text-left">
            <div className="text-[8px] uppercase tracking-widest text-[#00ffcc] font-black">Philippines Standard Time (PST)</div>
            <div className="text-sm text-white font-extrabold">{pstTime || "11:34:58 PM GMT+8"}</div>
            <div className="text-[7.5px] text-white/50">{pstDate || "Thursday, June 11, 2026"}</div>
          </div>
        </div>

        {/* Global devotion indicator rates */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-[10px] font-mono bg-[#0d0d11] p-2.5 border border-zinc-800 rounded">
          <div className="flex flex-col">
            <span className="text-white/40 font-bold uppercase">Multiverse Faith</span>
            <span className="text-[#fbbf24] font-bold animate-pulse">{currentWorld.devotionIndex}% Devotion</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#ff3131] font-bold uppercase">Glitch Sickness</span>
            <span className={`font-bold ${isGlitchOutbreakActive ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
              {isGlitchOutbreakActive ? '38.6% (OUTBREAK)' : `${currentWorld.cyberSicknessRate}% Stable`}
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <button 
              onClick={toggleSound}
              className={`text-[8.5px] px-2 py-1 font-bold rounded cursor-pointer transition ${soundEnabled ? 'bg-[#fbbf24] text-black font-black animate-pulse' : 'bg-zinc-800 text-[#e0e0e0] border border-zinc-700'}`}
            >
              {soundEnabled ? '🔕 AUDIO HUM (ON)' : '🔔 AUDIO HUM (OFF)'}
            </button>
          </div>
        </div>
      </header>

      {/* DYNAMICS CORE GRID */}
      <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 overflow-hidden bg-[#030303]" id="simulation-world-container">
        
        {/* LEFT COLUMN: CRITICAL CONTROLS & SECTORS LIST (SPAN 3 on desktop) */}
        <aside className="xl:col-span-3 lg:col-span-12 bg-[#0a0a0a] border-r-4 border-[#333] p-4 flex flex-col gap-4 overflow-y-auto" id="multiverse-control-sidebar">
          
          {/* MULTIVERSE SELECTOR WIDGET (EXPLORE 119,000 WORLDS) */}
          <div className="border border-[#fbbf24] bg-[#0d0d11] p-3.5 rounded shadow-[0_4px_15px_rgba(251,191,36,0.1)] relative" id="multiverse-navigator">
            <div className="absolute top-2 right-2 text-[8px] font-mono font-bold bg-amber-950/40 text-[#fbbf24] px-1.5 py-0.5 rounded border border-[#fbbf24]/20">
              SECTOR GRID
            </div>

            <h2 className="text-xs font-bold text-[#fbbf24] uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#fbbf24] animate-spin" />
              <span>Sovereign Multiverse Portal</span>
            </h2>
            <p className="text-[9px] font-mono text-white/50 mb-3 whitespace-normal">
              Enter any coordinate index from <strong>1 to 119,000</strong> to instantly warp the divine camera and monitor local life.
            </p>

            <form onSubmit={handleWarpSearchSubmit} className="flex gap-1.5 mb-3.5">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-white/40 absolute left-2.5 top-2.5" />
                <input 
                  type="text" 
                  value={worldSearchTerm}
                  onChange={(e) => setWorldSearchTerm(e.target.value)}
                  placeholder="Enter World #1 - #119,000"
                  className="w-full bg-black text-[#e0e0e0] font-mono text-xs pl-8 pr-2 py-2 border-2 border-zinc-800 focus:border-[#fbbf24] outline-none rounded"
                />
              </div>
              <button 
                type="submit"
                className="bg-[#fbbf24] hover:bg-white hover:text-black text-black font-black text-xs px-3 uppercase tracking-tighter transition"
              >
                WARP
              </button>
            </form>

            {/* Quick warp shortcut locations */}
            <div className="grid grid-cols-2 gap-1.5 text-[9px] font-mono">
              <button 
                onClick={() => triggerWarpTransition(1)}
                className={`py-1 px-1.5 bg-[#171717] hover:bg-[#ff3131] text-left border border-white/10 rounded overflow-hidden text-ellipsis whitespace-nowrap text-white/80 ${activeWorldId === 1 ? 'border-red-500 bg-red-950/40 text-red-300' : ''}`}
              >
                🪐 World #1 (First)
              </button>
              <button 
                onClick={() => triggerWarpTransition(2026)}
                className={`py-1 px-1.5 bg-[#171717] hover:bg-[#ff3131] text-left border border-white/10 rounded overflow-hidden text-ellipsis whitespace-nowrap text-white/80 ${activeWorldId === 2026 ? 'border-red-500 bg-red-950/40 text-red-300' : ''}`}
                title="Year 2026 local time vector anchor"
              >
                🇵🇭 World #2026 (PST)
              </button>
              <button 
                onClick={() => triggerWarpTransition(77777)}
                className={`py-1 px-1.5 bg-[#171717] hover:bg-[#ff3131] text-left border border-white/10 rounded overflow-hidden text-ellipsis whitespace-nowrap text-white/80 ${activeWorldId === 77777 ? 'border-red-500 bg-red-950/40 text-red-300' : ''}`}
              >
                ⛪ World #77,777 (Glory)
              </button>
              <button 
                onClick={() => triggerWarpTransition(TOTAL_WORLDS)}
                className={`py-1 px-1.5 bg-[#171717] hover:bg-[#ff3131] text-left border border-white/10 rounded overflow-hidden text-ellipsis whitespace-nowrap text-white/80 ${activeWorldId === TOTAL_WORLDS ? 'border-red-500 bg-red-950/40 text-red-300' : ''}`}
              >
                🌌 World #119,000 (Edge)
              </button>
            </div>

            {/* Micro constellation warp details */}
            <div className="mt-3 pt-2.5 border-t border-white/10 bg-black/60 p-2 rounded text-left flex justify-between items-center text-[10px] font-mono">
              <div>
                <span className="text-white/40">Active Focus:</span>
                <span className="text-white ml-2 uppercase font-black tracking-tight">{currentWorld.name}</span>
              </div>
              <button 
                onClick={() => {
                  const randomWarpId = Math.floor(Math.random() * TOTAL_WORLDS) + 1;
                  triggerWarpTransition(randomWarpId);
                  setAdminLogs(prev => [`WARP: Quantum drive engaged. Hurled viewport to generic sector World #${randomWarpId}.`, ...prev]);
                }}
                className="px-2 py-0.5 bg-[#ffcc00] text-black hover:bg-white text-[8px] font-black uppercase tracking-tighter rounded"
              >
                RANDOM WARP ⚡
              </button>
            </div>
          </div>

          {/* COSMIC VOID & NEON GRID COLORIZER (User-customizable primary, neon, and dynamic space colors) */}
          <div className="border border-[#fbbf24]/50 bg-[#0d0d11]/90 p-3.5 rounded shadow-[0_4px_15px_rgba(251,191,36,0.1)] relative" id="void-realm-colorizer">
            <h2 className="text-xs font-black text-[#fbbf24] uppercase tracking-widest mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold">
                🎨 Cosmic Void Customizer
              </span>
              <span className="text-[7.5px] font-mono bg-amber-950/40 px-1 py-0.5 rounded text-amber-300 font-bold border border-amber-800/20 uppercase">
                Interactive Palette
              </span>
            </h2>
            <p className="text-[9px] font-mono text-white/50 mb-3 whitespace-normal text-left">
              Redefine the dark void around the map. Pick a cosmic preset or use precision dials to tune the backdrop and neon coordinates.
            </p>

            {/* Quick-Select Primary Presets */}
            <div className="text-[7.5px] font-mono font-bold text-white/40 uppercase tracking-tighter mb-1.5 text-left">Primary Cosmic Presets:</div>
            <div className="grid grid-cols-3 gap-1 mb-3.5">
              {[
                { name: 'Obsidian', bg: '#050505', grid: '#444444', label: '🌑 Void' },
                { name: 'Crimson', bg: '#1a0505', grid: '#f43f5e', label: '🩸 Crimson' },
                { name: 'Cobalt', bg: '#030c22', grid: '#38bdf8', label: '🌀 Cobalt' },
                { name: 'Jade Green', bg: '#02180a', grid: '#10b981', label: '💚 Jade' },
                { name: 'Amber Gold', bg: '#181202', grid: '#fbbf24', label: '☀️ Amber' },
                { name: 'Amethyst', bg: '#0e051a', grid: '#a855f7', label: '🔮 Purple' },
              ].map((pst) => (
                <button
                  key={pst.name}
                  onClick={() => {
                    playSFX('click');
                    setVoidBgColor(pst.bg);
                    setGridLineColor(pst.grid);
                    setAdminLogs(prev => [`VOID: Shifted celestial background to ${pst.name} preset.`, ...prev]);
                  }}
                  className={`py-1 rounded text-[7.5px] font-mono font-bold uppercase transition flex items-center justify-center gap-1 border ${
                    voidBgColor === pst.bg 
                      ? 'border-[#fbbf24] text-[#fbbf24] bg-amber-950/20 font-black' 
                      : 'border-white/5 bg-[#171717] text-white hover:bg-zinc-800'
                  }`}
                >
                  {pst.label}
                </button>
              ))}
            </div>

            {/* Precision HTML Color Pickers */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="space-y-1 text-left">
                <label className="text-[8px] font-mono text-white/40 uppercase tracking-tight block">🎨 Custom Void Bg:</label>
                <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 p-1.5 rounded">
                  <input 
                    type="color" 
                    value={voidBgColor}
                    onChange={(e) => {
                      setVoidBgColor(e.target.value);
                    }}
                    className="w-5 h-5 bg-transparent border-0 rounded cursor-pointer p-0"
                    title="Choose void background color"
                  />
                  <span className="font-mono text-[9px] uppercase tracking-tighter text-white">{voidBgColor}</span>
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[8px] font-mono text-white/40 uppercase tracking-tight block">⚡ Neon Grid lines:</label>
                <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 p-1.5 rounded">
                  <input 
                    type="color" 
                    value={gridLineColor}
                    onChange={(e) => {
                      setGridLineColor(e.target.value);
                    }}
                    className="w-5 h-5 bg-transparent border-0 rounded cursor-pointer p-0"
                    title="Choose map grid line color"
                  />
                  <span className="font-mono text-[9px] uppercase tracking-tighter text-white">{gridLineColor}</span>
                </div>
              </div>
            </div>

            {/* Sliders for Opacity and density */}
            <div className="space-y-2.5 pt-2 border-t border-white/5 bg-black/40 p-2 rounded">
              <div className="text-left">
                <div className="flex justify-between items-center text-[8px] font-mono mb-1">
                  <span className="text-white/40 uppercase">⚡ Vector Grid Opacity:</span>
                  <span className="text-amber-400 font-bold">{gridLineOpacity}%</span>
                </div>
                <input 
                  type="range"
                  min="2"
                  max="100"
                  value={gridLineOpacity}
                  onChange={(e) => setGridLineOpacity(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#fbbf24]"
                />
              </div>

              <div className="text-left">
                <div className="flex justify-between items-center text-[8px] font-mono mb-1">
                  <span className="text-white/40 uppercase">📏 Coordinates Cell Spacing:</span>
                  <span className="text-amber-400 font-bold">{gridLineSpacing}px</span>
                </div>
                <input 
                  type="range"
                  min="15"
                  max="80"
                  value={gridLineSpacing}
                  onChange={(e) => setGridLineSpacing(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#fbbf24]"
                />
              </div>
            </div>

            {/* SOVEREIGN MULTI-WORLD & DYNAMIC FLOOR ARCHITECT */}
            <div className="mt-3.5 pt-3 border-t border-white/5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[9.5px] font-black uppercase text-[#fbbf24] tracking-tight">🧭 Multiverse Floor Architect</span>
                <span className="text-[7.5px] text-[#ff3131] font-mono font-black animate-pulse uppercase">World #{activeWorldId}</span>
              </div>

              {/* Floor Level Tabs */}
              <div className="space-y-1">
                <span className="text-[7.5px] font-mono text-white/40 uppercase block text-left">🏢 Select Dimension Level:</span>
                <div className="grid grid-cols-4 gap-0.5 bg-[#030305] p-0.5 rounded border border-white/5">
                  <button
                    onClick={() => {
                      playSFX('click');
                      setActiveFloorLevel('SURFACE');
                      setAdminLogs(prev => [`VIEW: Ascended to Surface Level of World #${activeWorldId}.`, ...prev]);
                    }}
                    className={`py-1 text-[7.5px] font-black uppercase transition text-center whitespace-nowrap rounded-sm cursor-pointer select-none ${
                      activeFloorLevel === 'SURFACE'
                        ? 'bg-[#fbbf24] text-black font-black'
                        : 'bg-black/60 text-white/50 hover:text-white'
                    }`}
                    title="Surface Level / Primary Overworld"
                  >
                    Surface
                  </button>
                  <button
                    onClick={() => {
                      playSFX('click');
                      setActiveFloorLevel('BASEMENT');
                      setAdminLogs(prev => [`VIEW: Descended into Subterranean Grotto of World #${activeWorldId}.`, ...prev]);
                    }}
                    className={`py-1 text-[7.5px] font-black uppercase transition text-center whitespace-nowrap rounded-sm cursor-pointer select-none ${
                      activeFloorLevel === 'BASEMENT'
                        ? 'bg-[#fbbf24] text-black font-black'
                        : 'bg-black/60 text-white/50 hover:text-white'
                    }`}
                    title="Subterranean Caves & Pipelines Level"
                  >
                    Grotto
                  </button>
                  <button
                    onClick={() => {
                      playSFX('click');
                      setActiveFloorLevel('CANOPY');
                      setAdminLogs(prev => [`VIEW: Opened Skyline Canopy level of World #${activeWorldId}.`, ...prev]);
                    }}
                    className={`py-1 text-[7.5px] font-black uppercase transition text-center whitespace-nowrap rounded-sm cursor-pointer select-none ${
                      activeFloorLevel === 'CANOPY'
                        ? 'bg-[#fbbf24] text-black font-black'
                        : 'bg-black/60 text-white/50 hover:text-white'
                    }`}
                    title="Skyline Overhead Constellation Top Level"
                  >
                    Canopy
                  </button>
                  <button
                    onClick={() => {
                      playSFX('click');
                      setActiveFloorLevel('CORE');
                      setAdminLogs(prev => [`VIEW: Accessing Quantum Core Sector of World #${activeWorldId}.`, ...prev]);
                    }}
                    className={`py-1 text-[7.5px] font-black uppercase transition text-center whitespace-nowrap rounded-sm cursor-pointer select-none ${
                      activeFloorLevel === 'CORE'
                        ? 'bg-[#fbbf24] text-black font-black'
                        : 'bg-black/60 text-white/50 hover:text-white'
                    }`}
                    title="Quantum Core Void Matrix Bottom Level"
                  >
                    Core
                  </button>
                </div>
              </div>

              {/* Status Display of active layout */}
              <div className="bg-[#07070a] border border-white/5 rounded p-1.5 flex justify-between items-center text-[8px] font-mono leading-none">
                <span className="text-white/40">Active Floor:</span>
                <span className="text-[#fbbf24] font-black uppercase">
                  {activeFloorLevel === 'SURFACE' && '🏝️ Surface overworld'}
                  {activeFloorLevel === 'BASEMENT' && '🪨 Subcavern Grotto'}
                  {activeFloorLevel === 'CANOPY' && '🌌 Celestial Canopy'}
                  {activeFloorLevel === 'CORE' && '💎 Quantum Core Void'}
                </span>
              </div>

              {/* AI GENERATOR CORE MODULE */}
              <div className="border border-[#fbbf24]/20 bg-amber-950/5 p-2 rounded text-left space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-black uppercase text-[#fbbf24] tracking-tight">🎭 AI Floor Blueprint generator</span>
                  <span className="text-[6.5px] bg-[#fbbf24]/20 text-[#fbbf24] font-bold px-1 rounded uppercase font-mono tracking-tighter">GEMINI</span>
                </div>
                <div className="flex gap-1">
                  <input
                    type="text"
                    placeholder="Describe custom floors (e.g., fiery lava grotto)..."
                    value={aiFloorPrompt}
                    onChange={(e) => setAiFloorPrompt(e.target.value)}
                    disabled={isAiGeneratingFloor}
                    className="flex-1 bg-black text-[#e0e0e0] font-mono text-[9px] px-2 py-1 border border-white/10 rounded focus:border-[#fbbf24] outline-none"
                  />
                  <button
                    onClick={() => {
                      playSFX('click');
                      handleGenerateAiFloor();
                    }}
                    disabled={isAiGeneratingFloor || !aiFloorPrompt.trim()}
                    className="bg-amber-500 hover:bg-[#fbbf24] disabled:opacity-40 text-black font-black text-[8px] uppercase px-2 rounded active:scale-95 transition whitespace-nowrap select-none cursor-pointer"
                  >
                    {isAiGeneratingFloor ? '🪄 SYNTHESIZING...' : '🪄 GENERATE'}
                  </button>
                </div>
                <div className="text-[6.5px] text-white/40 font-mono text-left leading-normal uppercase">
                  Procedurally designs a tailored grid mesh blueprint for world #{activeWorldId} & level [{activeFloorLevel}].
                </div>
              </div>

              {/* Upload Box Container */}
              <div className="relative border border-dashed border-[#fbbf24]/20 hover:border-[#fbbf24]/50 bg-[#070709] p-2.5 rounded text-center transition duration-200 cursor-pointer group shadow-inner">
                <input 
                  type="file" 
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  onChange={handleFloorImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="space-y-0.5">
                  <div className="text-[9px] font-black text-white group-hover:text-[#fbbf24] transition flex items-center justify-center gap-1">
                    <span>📤 Upload Floor Grid File</span>
                  </div>
                  <div className="text-[7px] text-white/40 font-mono tracking-tight">
                    Select local JPG, PNG, GIF, WebP file for current floor
                  </div>
                </div>
              </div>

              {/* Paste Direct URL */}
              <div className="space-y-1 text-left">
                <label className="text-[7.5px] font-mono text-white/40 uppercase block">🔗 Or Paste Image URL:</label>
                <div className="flex gap-1">
                  <input 
                    type="text" 
                    placeholder="https://example.com/custom-floor.webp"
                    value={worldFloorCustomImages[`${activeWorldId}_${activeFloorLevel}`] || ''}
                    onChange={(e) => {
                      const val = e.target.value.trim();
                      if (val) {
                        setWorldFloorCustomImages(prev => ({
                          ...prev,
                          [`${activeWorldId}_${activeFloorLevel}`]: val
                        }));
                      }
                    }}
                    className="flex-1 bg-black text-[#e0e0e0] font-mono text-[9px] px-2 py-1 border border-white/10 focus:border-[#fbbf24] outline-none rounded"
                  />
                  <button
                    onClick={() => {
                      playSFX('click');
                      setAdminLogs(prev => [`VOID: Loaded custom user cosmic blueprint URL for World #${activeWorldId} (${activeFloorLevel}).`, ...prev]);
                    }}
                    className="bg-amber-950/50 border border-[#fbbf24]/30 text-[#fbbf24] font-bold text-[8px] px-2 rounded hover:bg-[#fbbf24]/20 uppercase active:scale-95 transition"
                  >
                    Load
                  </button>
                </div>
              </div>

              {/* Preset Quick Selection Buttons */}
              <div className="space-y-1 text-left">
                <span className="text-[7.5px] font-mono text-white/40 uppercase block">🧭 Theme Blueprint Presets:</span>
                <div className="grid grid-cols-2 gap-1 bg-[#050507] p-1 rounded border border-white/5">
                  <button
                    onClick={() => {
                      playSFX('click');
                      setWorldFloorCustomImages(prev => ({
                        ...prev,
                        [`${activeWorldId}_${activeFloorLevel}`]: "https://www.image2url.com/r2/default/images/1781317228818-3c854937-5b53-421e-8cca-9df8d8e0a825.jpg"
                      }));
                      setAdminLogs(prev => [`VOID: Loaded Colorful Island Preset for World #${activeWorldId} (${activeFloorLevel}).`, ...prev]);
                    }}
                    className={`py-1 px-1 text-left text-[7.5px] font-mono border rounded truncate flex items-center gap-0.5 transition ${
                      worldFloorCustomImages[`${activeWorldId}_${activeFloorLevel}`] === "https://www.image2url.com/r2/default/images/1781317228818-3c854937-5b53-421e-8cca-9df8d8e0a825.jpg"
                        ? "border-[#fbbf24] text-[#fbbf24] bg-amber-950/20 font-black"
                        : "border-white/5 bg-black/40 text-white/55 hover:bg-zinc-800"
                    }`}
                  >
                    🏝️ Tropical Island
                  </button>
                  <button
                    onClick={() => {
                      playSFX('click');
                      setWorldFloorCustomImages(prev => ({
                        ...prev,
                        [`${activeWorldId}_${activeFloorLevel}`]: "https://www.image2url.com/r2/default/images/1781315929330-003d11c5-9bc9-4bfc-88e6-0ad28287edea.jpg"
                      }));
                      setAdminLogs(prev => [`VOID: Loaded Vector Blueprint Preset for World #${activeWorldId} (${activeFloorLevel}).`, ...prev]);
                    }}
                    className={`py-1 px-1 text-left text-[7.5px] font-mono border rounded truncate flex items-center gap-0.5 transition ${
                      worldFloorCustomImages[`${activeWorldId}_${activeFloorLevel}`] === "https://www.image2url.com/r2/default/images/1781315929330-003d11c5-9bc9-4bfc-88e6-0ad28287edea.jpg"
                        ? "border-[#fbbf24] text-[#fbbf24] bg-amber-950/20 font-black"
                        : "border-white/5 bg-black/40 text-white/55 hover:bg-zinc-800"
                    }`}
                  >
                    📐 Cyber Blueprint
                  </button>
                  <button
                    onClick={() => {
                      playSFX('click');
                      setWorldFloorCustomImages(prev => ({
                        ...prev,
                        [`${activeWorldId}_${activeFloorLevel}`]: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80"
                      }));
                      setAdminLogs(prev => [`VOID: Loaded Cosmic Nebula Preset for World #${activeWorldId} (${activeFloorLevel}).`, ...prev]);
                    }}
                    className={`py-1 px-1 text-left text-[7.5px] font-mono border rounded truncate flex items-center gap-0.5 transition ${
                      worldFloorCustomImages[`${activeWorldId}_${activeFloorLevel}`] === "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80"
                        ? "border-[#fbbf24] text-[#fbbf24] bg-amber-950/20 font-black"
                        : "border-white/5 bg-black/40 text-white/55 hover:bg-zinc-800"
                    }`}
                  >
                    🌌 Cosmic Nebula
                  </button>
                  <button
                    onClick={() => {
                      playSFX('click');
                      setWorldFloorCustomImages(prev => ({
                        ...prev,
                        [`${activeWorldId}_${activeFloorLevel}`]: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                      }));
                      setAdminLogs(prev => [`VOID: Loaded Crystalline Preset for World #${activeWorldId} (${activeFloorLevel}).`, ...prev]);
                    }}
                    className={`py-1 px-1 text-left text-[7.5px] font-mono border rounded truncate flex items-center gap-0.5 transition ${
                      worldFloorCustomImages[`${activeWorldId}_${activeFloorLevel}`] === "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                        ? "border-[#fbbf24] text-[#fbbf24] bg-amber-950/20 font-black"
                        : "border-white/5 bg-black/40 text-white/55 hover:bg-zinc-800"
                    }`}
                  >
                    💎 Crystal Floor
                  </button>
                </div>
              </div>
            </div>

            {/* Reset helper */}
            <button
              onClick={() => {
                playSFX('click');
                setVoidBgColor('#050505');
                setGridLineColor('#444444');
                setGridLineOpacity(15);
                setGridLineSpacing(30);
                
                // Reset custom layout for this specific floor
                setWorldFloorCustomImages(prev => {
                  const cloned = { ...prev };
                  delete cloned[`${activeWorldId}_${activeFloorLevel}`];
                  return cloned;
                });
                setAdminLogs(prev => [`VOID: Reset background theme & restored the beautiful dynamic default illustration for World #${activeWorldId} (${activeFloorLevel}).`, ...prev]);
              }}
              className="mt-3.5 w-full py-1.5 bg-zinc-900 hover:bg-zinc-850 hover:text-[#fbbf24] border border-white/10 text-white font-mono text-[8.5px] uppercase font-bold tracking-tight rounded transition active:scale-95"
            >
              🔄 RESTORE THEMATIC DEFAULT DESIGN FOR THIS FLOOR
            </button>
          </div>

          {/* ACTIVE WORLD SPECS DETAIL CARD */}
          <div className="border border-white/20 bg-[#111] p-3 rounded" id="climate-divine-overseer">
            <h2 className="text-xs font-bold text-white uppercase tracking-widest mb-2 italic flex justify-between items-center">
              <span>⚡ Climate & Disasters</span>
              <span className="text-[8px] opacity-60 text-[#ffcc00] font-mono uppercase">World #{activeWorldId}</span>
            </h2>

            {/* Weather status report indicators */}
            <div className="bg-black p-2 rounded border border-white/10 text-[8.5px] font-mono mb-2.5 text-left space-y-1">
              <div className="flex justify-between">
                <span className="text-white/40">Active Weather:</span>
                <span className="text-[#00ffcc] font-extrabold uppercase">{currentWorld.weather}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Severe Phenomenon:</span>
                <span className={`font-extrabold uppercase ${currentWorld.activeDisaster !== 'None' ? 'text-rose-500 animate-pulse' : 'text-neutral-500'}`}>
                  {currentWorld.activeDisaster !== 'None' ? `⚠️ ${currentWorld.activeDisaster}` : 'None'}
                </span>
              </div>
            </div>

            {/* Climate Adjuster Grid */}
            <div className="text-[7.5px] font-mono font-bold text-white/40 uppercase tracking-tighter mb-1.5 text-left">Set Sector Atmosphere:</div>
            <div className="grid grid-cols-2 gap-1 mb-2.5">
              <button 
                onClick={() => handleSetClimate('Sunny', 'Summer')}
                className={`py-1 bg-[#1a1a1a] hover:bg-orange-500 hover:text-black border border-white/10 text-[8px] uppercase font-bold flex items-center justify-center gap-1 transition ${currentWorld.weather === 'Sunny' ? 'border-[#ffcc00] text-orange-400 bg-orange-950/20' : 'text-orange-400/80'}`}
              >
                <Sun className="w-2.5 h-2.5" />
                Sunny
              </button>
              
              <button 
                onClick={() => handleSetClimate('Rainy', 'Spring')}
                className={`py-1 bg-[#1a1a1a] hover:bg-sky-500 hover:text-black border border-white/10 text-[8px] uppercase font-bold flex items-center justify-center gap-1 transition ${currentWorld.weather === 'Rainy' ? 'border-[#ffcc00] text-sky-400 bg-sky-950/20' : 'text-sky-400/80'}`}
              >
                <CloudRain className="w-2.5 h-2.5" />
                Rainy
              </button>

              <button 
                onClick={() => handleSetClimate('Snowy', 'Winter')}
                className={`py-1 bg-[#1a1a1a] hover:bg-teal-400 hover:text-black border border-white/10 text-[8px] uppercase font-bold flex items-center justify-center gap-1 transition ${currentWorld.weather === 'Snowy' ? 'border-[#ffcc00] text-teal-300 bg-teal-950/20' : 'text-teal-300/80'}`}
              >
                <Snowflake className="w-2.5 h-2.5" />
                Snowy
              </button>

              <button 
                onClick={() => handleSetClimate('Firestorm', 'Paradox')}
                className={`py-1 bg-[#220c0c] hover:bg-red-600 hover:text-white border border-red-500/30 text-[8px] uppercase font-bold flex items-center justify-center gap-1 transition ${currentWorld.weather === 'Firestorm' ? 'border-red-500 text-red-400' : 'text-red-400/80'}`}
              >
                <Flame className="w-2.5 h-2.5" />
                Firestorm
              </button>
            </div>

            {/* Catastrophe Selector Grid */}
            <div className="text-[7.5px] font-mono font-bold text-white/40 uppercase tracking-tighter mb-1.5 text-left">Trigger Severe Catastrophe:</div>
            <div className="grid grid-cols-3 gap-1 mb-3">
              <button 
                onClick={() => handleTriggerDisaster('Tornado')}
                className={`py-0.5 bg-[#171717] hover:bg-rose-600 hover:text-white border border-white/5 text-[7px] uppercase font-black tracking-tight transition rounded-sm ${currentWorld.activeDisaster === 'Tornado' ? 'border-rose-500 text-rose-500 bg-rose-950/30' : 'text-rose-400'}`}
              >
                🌪️ Tornado
              </button>
              
              <button 
                onClick={() => handleTriggerDisaster('Typhoon')}
                className={`py-0.5 bg-[#171717] hover:bg-purple-600 hover:text-white border border-white/5 text-[7px] uppercase font-black tracking-tight transition rounded-sm ${currentWorld.activeDisaster === 'Typhoon' ? 'border-purple-500 text-purple-500 bg-purple-950/30' : 'text-purple-400'}`}
              >
                🌀 Typhoon
              </button>

              <button 
                onClick={() => handleTriggerDisaster('Glitch Wave')}
                className={`py-0.5 bg-[#1d0a0a] hover:bg-red-500 hover:text-black border border-white/5 text-[7px] uppercase font-black tracking-tight transition rounded-sm ${currentWorld.activeDisaster === 'Glitch Wave' ? 'border-red-500 text-red-500 bg-red-950/30' : 'text-red-400'}`}
              >
                💾 Glitch
              </button>
            </div>

            <div className="mb-3.5">
              <button
                onClick={() => handleTriggerDisaster('None')}
                className="w-full py-1 bg-neutral-900 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black text-[8px] uppercase font-black tracking-tight transition rounded-sm"
              >
                ✅ DAMPEN ENVIRONMENT OVERLAYS (SET NONE)
              </button>
            </div>

            {/* DIVINE INTERCESSORY AUTO-FIXER CORE */}
            <div className="border-2 border-amber-500/70 bg-gradient-to-b from-[#1c1405] to-black rounded p-2.5 text-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <div className="text-[7px] font-mono font-black text-[#ffcc00] uppercase tracking-[0.16em] mb-1.5 animate-pulse">
                ✝ HOLY MATRIX HEALING OVERLAY
              </div>
              <button
                onClick={handleExecuteDivineAutoFix}
                disabled={isDivineAutoFixing}
                className="w-full py-2 bg-gradient-to-r from-amber-500 to-[#eab308] hover:from-white hover:to-white hover:text-black text-black text-[9.5px] uppercase font-black tracking-wider transition rounded shadow-[0_0_12px_rgba(245,158,11,0.5)] cursor-pointer select-none active:scale-95 disabled:opacity-45"
              >
                {isDivineAutoFixing ? '✨ RESTORATIVE INTERCESSION...' : '⛪ DIVINE INTERCESSORY AUTO-FIXER'}
              </button>
              <p className="text-[7px] font-mono text-white/40 mt-1 leading-snug uppercase">
                Heals digital bodies under Christ. Solves glitches, removes pathogens, restores Sunny Summer, completes constructions.
              </p>
            </div>

            <div className="bg-black/80 rounded p-1.5 text-[8px] font-mono text-left space-y-1 mt-2.5">
              <div className="flex justify-between"><span className="text-white/40">Density Pop:</span><span className="text-emerald-400 font-black">{currentWorld.population.toLocaleString()} souls</span></div>
              <div className="flex justify-between"><span className="text-white/40">Default Terrain:</span><span className="text-sky-400 font-bold uppercase">{currentWorld.type}</span></div>
              <div className="flex justify-between"><span className="text-[#fb7185]">Devotion Index:</span><span className="text-[#ffcc00] font-black">{currentWorld.devotionIndex}%</span></div>
            </div>
          </div>

          {/* FREE WILL MULTIVERSE TRAVELERS TRACKER (MUST HAVE REAL WORKINGS FOR ALL CREATIONS TO HAVE FREE WILL) */}
          <div className="border border-[#ffcc00] bg-[#111] p-3 rounded" id="free-will-tracker">
            <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
              <h2 className="text-xs font-bold text-[#ffcc00] uppercase tracking-widest italic flex items-center gap-1.5">
                <Sparkle className="w-3.5 h-3.5 text-[#ffcc00] animate-spin" />
                <span>Cosmic Free Will Registry</span>
              </h2>
              <div className="flex items-center gap-1">
                <span className="text-[7.5px] font-mono text-white/50 uppercase">Autonomous Drive</span>
                <button
                  onClick={() => {
                    playSFX('click');
                    setFreeWillMode(!freeWillMode);
                    setAdminLogs(prev => [
                      `TOGGLE: Free Will autonomous system is now [${!freeWillMode ? 'ENGAGED' : 'PAUSED'}]`,
                      ...prev
                    ]);
                  }}
                  className={`text-[8px] font-black px-1.5 py-0.5 rounded cursor-pointer uppercase ${freeWillMode ? 'bg-emerald-600 text-white' : 'bg-red-800 text-white'}`}
                >
                  {freeWillMode ? 'ACTIVE' : 'PAUSED'}
                </button>
              </div>
            </div>

            <p className="text-[8px] font-mono text-white/50 mb-2 leading-snug">
              Every creation has <strong>Absolute Free Will</strong>. They wander independently across all 119,000 worlds. Select any occupant below to <strong>WARP CAM</strong> to their active coordinates!
            </p>

            {/* INTERACTIVE FILTERS & SORTING ENGINE FOR DIGITAL CREATIONS */}
            <div className="mb-2 bg-black/60 p-2 rounded border border-white/5 space-y-1.5">
              {/* Search bar */}
              <div className="relative">
                <input
                  type="text"
                  value={charSearchQuery}
                  onChange={(e) => setCharSearchQuery(e.target.value)}
                  placeholder="🔎 Type search (e.g. Pomni, fever, faith)..."
                  className="w-full bg-black border border-white/10 text-[9px] font-mono px-2 py-1 text-white rounded placeholder:text-neutral-600 focus:outline-none focus:border-[#ffcc00]"
                />
                {charSearchQuery && (
                  <button
                    onClick={() => setCharSearchQuery("")}
                    className="absolute right-1.5 top-1 font-sans text-[9px] text-white/40 hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Status categories */}
              <div className="flex flex-wrap gap-1 items-center">
                <span className="text-[7px] font-mono text-white/40 uppercase tracking-wider">Show:</span>
                {[
                  { id: 'ALL', label: 'All' },
                  { id: 'SICK', label: '🛑 Glitched' },
                  { id: 'HEALTHY', label: '🛡️ Healthy' },
                  { id: 'CURRENT_WORLD', label: '📍 Here' },
                  { id: 'OTHER_WORLDS', label: '🌌 Others' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => {
                      playSFX('click');
                      setCharFilterStatus(filter.id);
                    }}
                    className={`px-1.5 py-0.5 rounded text-[8px] font-mono border-0 uppercase transition-all cursor-pointer ${
                      charFilterStatus === filter.id
                        ? 'bg-[#ffcc00] text-black font-extrabold'
                        : 'bg-[#1a1a1a] text-white/60 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1">
                <span className="text-[7px] font-mono text-white/40 uppercase tracking-wider">Sort:</span>
                {[
                  { id: 'NAME', label: 'A-Z' },
                  { id: 'SANITY_ASC', label: '💔 Sanity' },
                  { id: 'HEART_RATE_DESC', label: '🫀 BPM' },
                  { id: 'FAITH_DESC', label: '✝ Faith' }
                ].map(sortOp => (
                  <button
                    key={sortOp.id}
                    onClick={() => {
                      playSFX('click');
                      setCharSortMetric(sortOp.id);
                    }}
                    className={`px-1.5 py-0.5 rounded text-[8px] font-mono border-0 transition-all cursor-pointer ${
                      charSortMetric === sortOp.id
                        ? 'bg-red-800 text-white font-extrabold'
                        : 'bg-[#151515] text-white/50 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    {sortOp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable grid list of all 10 characters and which world they are exploring */}
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {filteredCharacters.length === 0 ? (
                <div className="text-center py-4 text-[9px] font-mono text-white/35 italic bg-black/40 rounded border border-dashed border-white/10">
                  No sovereign creations found matching filters
                </div>
              ) : (
                filteredCharacters.map(char => {
                  const charWorldId = characterLocationRegistry[char.id] || activeWorldId;
                  const isResidentHere = charWorldId === activeWorldId;
                  const charWorldDef = generateProceduralWorld(charWorldId);
                  const isSelected = char.id === selectedCharId;

                  return (
                    <div
                      key={char.id}
                      onClick={() => {
                        setSelectedCharId(char.id);
                      }}
                      className={`p-2 rounded border text-left flex items-center justify-between gap-2 transition cursor-pointer ${
                        isSelected
                          ? 'border-[#ffcc00] bg-neutral-900 shadow-[0_0_8px_rgba(255,204,0,0.15)]'
                          : isResidentHere 
                            ? 'bg-red-950/20 border-[#ff3131]/60 hover:bg-red-950/30' 
                            : 'bg-black/90 border-[#2b2b2b] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden flex-1">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0 block animate-bounce" style={{ backgroundColor: char.avatarColor }} />
                        <div className="overflow-hidden">
                          <div className="text-[10px] font-black uppercase text-white leading-none mb-1 flex items-center gap-1.5">
                            <span className={isSelected ? 'text-[#ffcc00]' : ''}>{char.name}</span>
                            {isResidentHere && (
                              <span className="text-[6.5px] bg-red-600 text-white px-1 py-0.2 rounded font-mono scale-95 font-black uppercase">HERE</span>
                            )}
                            {char.sickness !== 'None' && (
                              <span className="text-[6px] bg-amber-500 text-black px-1 py-0.2 rounded font-mono font-black animate-pulse">GLITCHED</span>
                            )}
                          </div>
                          <div className="text-[8px] font-mono text-white/50 truncate italic max-w-[190px]">
                            {char.emotion.primary} ── World #{charWorldId}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCharId(char.id);
                            triggerWarpTransition(charWorldId);
                            setAdminLogs(prev => [
                              `RADAR: Warp focus engaged. Visual camera matched to ${char.name}'s current coordinates on World #${charWorldId}.`,
                              ...prev
                            ]);
                          }}
                          className="p-1 bg-[#1a1a1a] hover:bg-[#ffcc00] hover:text-black border border-white/10 text-[7px] font-black uppercase tracking-tighter transition rounded cursor-pointer"
                          title="Locate world coordinates of creation"
                        >
                          WARP CAM 🛰️
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </aside>

        {/* MIDDLE SECTION: PROCEDURAL WORLD MAP GRAPHICAL GRID VIEW */}
        <section className="xl:col-span-5 lg:col-span-12 flex flex-col justify-between overflow-hidden relative" id="simulation-viewport-central">
          
          <div className="flex-1 relative bg-black overflow-hidden flex flex-col justify-between" id="universe-radar-screen">
            
            {/* Warp effect flicker overlays (VFX) */}
            {isWarpingEffect && (
              <div className="absolute inset-0 bg-[#ff3131]/20 z-50 flex items-center justify-center animate-pulse pointer-events-none border-4 border-white">
                <div className="bg-black/95 text-white border-2 border-[#ff3131] px-6 py-3 font-mono font-black text-xs uppercase tracking-[0.2em] shadow-2xl">
                  ⚡ HIGHER-DIMENSIONAL WARP SEQUENCE ENGAGED ── SCANNING GALAXY PLOTS ⚡
                </div>
              </div>
            )}

            {/* Twinkly stars procedural backdrop (VFX) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            {/* Spatial Matrix Top Controls */}
            <div className="bg-[#111]/90 border-b border-white/10 p-3 flex flex-col sm:flex-row justify-between items-center z-10 font-mono gap-2 text-left">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Compass className="w-5 h-5 text-[#ff3131] animate-spin shrink-0" />
                <div>
                  <span className="text-[10px] font-black text-white uppercase tracking-wider block">
                    ACTIVE SECTOR OVERVIEW ── {currentWorld.name}
                  </span>
                  <span className="text-[7.5px] text-white/50 uppercase block">
                    Biome: {currentWorld.type} ── Devotion index: {currentWorld.devotionIndex}% Today
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 shrink-0 self-end">
                <button 
                  onClick={() => {
                    playSFX('click');
                    setZoomLevel(prev => Math.max(1, prev - 1));
                  }}
                  className="px-2.5 py-0.5 bg-[#222] text-[#e0e0e0] hover:bg-neutral-800 border border-[#444] text-[10px] font-bold"
                >
                  -
                </button>
                <span className="text-[10px] font-mono text-white w-8 text-center">{zoomLevel}x</span>
                <button 
                  onClick={() => {
                    playSFX('click');
                    setZoomLevel(prev => Math.min(10, prev + 1));
                  }}
                  className="px-2.5 py-0.5 bg-[#222] text-[#e0e0e0] hover:bg-neutral-800 border border-[#444] text-[10px] font-bold"
                >
                  +
                </button>
                 <button 
                  onClick={() => {
                    playSFX('click');
                    setPerspective3d(!perspective3d);
                  }}
                  className={`px-2.5 py-1 text-[9px] uppercase font-black tracking-tighter transition border ${
                    perspective3d
                      ? 'bg-[#ffcc00] border-[#ffcc00] text-black hover:bg-white hover:border-white'
                      : 'bg-[#222] border-white/10 text-white/70 hover:text-white hover:bg-neutral-800'
                  }`}
                  title="Toggle Isometric 2.5D Standing Mode"
                >
                  {perspective3d ? '📐 2.5D ISOMETRIC' : '🗺️ FLAT 2D'}
                </button>
                <button 
                  onClick={handleResetView}
                  className="px-2.5 py-1 bg-[#ff3131] hover:bg-white hover:text-black text-white text-[9px] uppercase font-black tracking-tighter transition"
                >
                  RESET CAMERA
                </button>
              </div>
            </div>

            {/* PROCEDURAL MAP CANVAS FLOOR */}
            <div 
              className="flex-1 relative cursor-crosshair overflow-hidden"
              onMouseDown={handleMapMouseDown}
              onMouseMove={handleMapMouseMove}
              onMouseUp={handleMapMouseUpOrLeave}
              onMouseLeave={handleMapMouseUpOrLeave}
              ref={mapContainerRef}
              id="galactic-map-canvas"
            >
              
              {/* Scale map element */}
              <div 
                className="w-full h-full absolute transition-all duration-[800ms] ease-out origin-center"
                style={{
                  transform: perspective3d
                    ? `perspective(1000px) rotateX(46deg) rotateZ(-30deg) scale(${zoomLevel * 0.95}) translate(${mapPan.x}px, ${mapPan.y}px)`
                    : `scale(${zoomLevel}) translate(${mapPan.x}px, ${mapPan.y}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                
                {/* High-Fidelity Custom Illustrated Grid Floor (Direct design match from user specification) */}
                <div 
                  className="absolute inset-0 w-full h-full select-none overflow-hidden rounded bg-black/40"
                >
                  <img 
                    src={getFloorDesign(activeWorldId, activeFloorLevel, currentWorld.type)}
                    alt="Sovereign Universe Grid Map" 
                    className="w-full h-full object-cover block opacity-100 transition-all"
                    referrerPolicy="no-referrer"
                  />
                  {/* Faint ambient overlay that won't distort the beautiful island colors */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />
                </div>

                {/* Dynamic customized grid overlay lines (VFX) */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-all duration-300" 
                  style={{ 
                    backgroundImage: `linear-gradient(${gridLineColor} 1px, transparent 1px), linear-gradient(90deg, ${gridLineColor} 1px, transparent 1px)`, 
                    backgroundSize: `${gridLineSpacing}px ${gridLineSpacing}px`,
                    opacity: gridLineOpacity / 100
                  }}
                ></div>

                {/* Biome Region bounding panels (Made sleek and ultra-low opacity to fit the artwork) */}
                {TERRAINS.map((terrain) => {
                  return (
                    <div
                      key={terrain.name}
                      className="absolute border border-dashed text-[6.5px] font-mono p-1 rounded overflow-hidden select-none transition-all duration-1000 text-left opacity-30 hover:opacity-100 pointer-events-none"
                      style={{
                        left: `${terrain.xStart}%`,
                        top: `${terrain.yStart}%`,
                        width: `${terrain.xEnd - terrain.xStart}%`,
                        height: `${terrain.yEnd - terrain.yStart}%`,
                        backgroundColor: terrain.baseColor === '#ff3131' ? '#ff313105' : terrain.baseColor + '02',
                        borderColor: terrain.baseColor + '15',
                        color: terrain.baseColor
                      }}
                    >
                      <span className="font-semibold block opacity-65 uppercase tracking-tighter">{terrain.name}</span>
                    </div>
                  );
                })}

                {/* Faint road route guideline layer */}
                <div className="absolute left-[5%] top-[48%] right-[5%] h-[4%] opacity-20 pointer-events-none flex items-center justify-around overflow-hidden">
                  <div className="w-full h-0.5 border-t-2 border-dashed border-white/25" />
                </div>

                {/* MAP INTERACTIVE TELEPORT SENSOR CLICK RANGE */}
                <div 
                  onClick={handleMapPinPointTeleport}
                  className="absolute inset-0 z-10"
                />

                {/* CHARACTER RENDER DOTS (only those currently on the activeWorldId list!) */}
                {characters.map(char => {
                  const charWorld = characterLocationRegistry[char.id] || activeWorldId;
                  // If not resident of this specific activeWorldId, stay invisible on this map view!
                  if (charWorld !== activeWorldId) return null;

                  const isSelected = char.id === selectedCharId;
                  const isSicknessGlitching = char.health < 50 || isGlitchOutbreakActive;

                  return (
                    <div
                      key={char.id}
                      className="absolute z-20 flex flex-col items-center transition-all duration-[2850ms] ease-out select-none cursor-pointer"
                      style={{
                        left: `${char.coordinateX}%`,
                        top: `${char.coordinateY}%`,
                        transform: perspective3d
                          ? `translate(-50%, -85%) rotateZ(30deg) rotateX(-46deg) scale(0.95)`
                          : 'translate(-50%, -50%)',
                        transformStyle: 'preserve-3d'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCharId(char.id);
                        playSFX('click');
                      }}
                    >
                      {/* Interactive Float dialogue Bubble (VFX) */}
                      {charSpeech[char.id] && (
                        <div className="absolute bottom-[62px] z-50 bg-[#ff3131] text-white border border-white font-sans text-[8.5px] font-bold px-2 py-1 rounded shadow-[0_0_12px_rgba(255,49,49,0.9)] w-40 text-center leading-snug animate-bounce">
                          {charSpeech[char.id]}
                          <div className="absolute left-1/2 -bottom-[5px] transform -translate-x-1/2 w-2 h-2 bg-[#ff3131] border-r border-b border-white rotate-45" />
                        </div>
                      )}

                      {/* Standing 2.5D High-Fidelity Figurine */}
                      <div className="relative group">
                        <CharacterSprite25D 
                          id={char.id} 
                          avatarColor={char.avatarColor} 
                          isSelected={isSelected} 
                          pulsate={isSicknessGlitching && char.health > 0} 
                          isDeceased={char.health <= 0}
                          hasHalo={char.sickness.includes('Immortal Glory') || char.soul.christConnectionLog.includes('Glorious resurrection')}
                        />

                        {/* Target Marker Arrow */}
                        {isSelected && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30">
                            <span className="text-white text-[7px] bg-red-600 px-1 py-0.5 rounded font-mono font-black uppercase tracking-tight shadow-[0_0_8px_#ff3131] animate-pulse">
                              DIRECT
                            </span>
                          </div>
                        )}

                        {/* Outbreak infected symbol */}
                        {isSicknessGlitching && char.health > 0 && (
                          <span className="absolute -bottom-1 -right-1 bg-black text-rose-500 text-[9px] font-black uppercase leading-none p-1 rounded-full border-2 border-rose-500 animate-ping z-30">!</span>
                        )}
                      </div>

                      {/* Label Text Tag */}
                      <span 
                        className={`text-[8px] font-mono px-2 rounded-full mt-1.5 shadow-[0_3px_12px_rgba(0,0,0,0.6)] border transition-all duration-300 select-none whitespace-nowrap tracking-tight ${
                          isSelected 
                            ? 'bg-[#fbbf24] text-black border-white font-extrabold scale-105 shadow-[0_0_15px_rgba(251,191,36,0.6)]' 
                            : 'bg-[#09090b]/90 text-[#fbbf24] border-[#fbbf24]/30'
                        }`}
                      >
                        {char.name} {char.health <= 0 ? '💀 (RIP)' : `(${char.anatomy.heartRateBpm} BPM)`}
                      </span>
                    </div>
                  );
                })}

                {/* 2.5D AUTONOMOUS CONSTRUCTIONS (FREE WILL SECTOR ACHIEVEMENTS) */}
                {activeBuildings.filter(b => b.worldId === activeWorldId).map((build) => {
                  const isCompleted = build.progress >= 100;
                  return (
                    <div
                      key={build.id}
                      className="absolute z-15 flex flex-col items-center select-none cursor-pointer group"
                      style={{
                        left: `${build.coordinateX}%`,
                        top: `${build.coordinateY}%`,
                        transform: perspective3d
                          ? `translate(-50%, -85%) rotateZ(30deg) rotateX(-46deg) scale(0.95)`
                          : 'translate(-50%, -50%)',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Structure 2.5D visual container */}
                      <div className="relative flex flex-col items-center justify-center transition-transform duration-300 hover:scale-110">
                        {/* Glowing platform under the structure */}
                        <div className={`absolute bottom-0 w-12 h-4 rounded-full bg-black/45 border filter blur-[1px] ${
                          isCompleted ? 'border-[#ffcc00] animate-pulse' : 'border-[#ff3131]/30'
                        }`} />

                        {/* Visual SVG render by Type */}
                        <div className="z-10 relative mb-1">
                          {build.type === 'cathedral' && (
                            <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">
                              {/* Glowing Cross */}
                              <line x1="24" y1="2" x2="24" y2="12" stroke="#fbbf24" strokeWidth="3" />
                              <line x1="20" y1="6" x2="28" y2="6" stroke="#fbbf24" strokeWidth="3" />
                              {/* Steeple Pyramid */}
                              <polygon points="14,46 34,46 24,12" fill="#1e1e2e" stroke="#fbbf24" strokeWidth="2" />
                              <circle cx="24" cy="24" r="3" fill="#facc15" className="animate-ping" />
                              <circle cx="24" cy="24" r="3" fill="#ff4d4d" />
                              {/* Sanctified banner */}
                              <rect x="20" y="34" width="8" height="12" fill="#71717a" stroke="#fbbf24" />
                            </svg>
                          )}

                          {build.type === 'vr_console' && (
                            <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                              <rect x="10" y="12" width="28" height="30" rx="4" fill="#090d16" stroke="#3b82f6" strokeWidth="2" />
                              <line x1="14" y1="18" x2="34" y2="18" stroke="#60a5fa" strokeWidth="1.5" />
                              <rect x="14" y="24" width="20" height="12" fill="#1e293b" stroke="#3b82f6" />
                              <line x1="16" y1="30" x2="32" y2="30" stroke="#60a5fa" strokeWidth="1" className="animate-pulse" />
                              {/* Tiny console pads */}
                              <circle cx="20" cy="40" r="1.5" fill="#facc15" />
                              <circle cx="28" cy="40" r="1.5" fill="#10b981" />
                            </svg>
                          )}

                          {build.type === 'handheld_gadget' && (
                            <svg viewBox="0 0 48 48" className="w-12 h-10 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
                              {/* Handheld controller console */}
                              <rect x="4" y="14" width="40" height="22" rx="6" fill="#111" stroke="#ec4899" strokeWidth="2.5" />
                              {/* Bright glowing VR viewport screen */}
                              <rect x="12" y="17" width="24" height="16" rx="2" fill="#030712" stroke="#6366f1" strokeWidth="1" />
                              <path d="M14,24 Q 24,18 34,24" stroke="#a855f7" strokeWidth="1.5" fill="none" className="animate-pulse" />
                              {/* Status icons buttons */}
                              <circle cx="8" cy="25" r="2" fill="#ef4444" />
                              <circle cx="40" cy="25" r="2" fill="#06b6d4" />
                            </svg>
                          )}

                          {build.type === 'roadway' && (
                            <svg viewBox="0 0 48 48" className="w-10 h-10 drop-shadow-[0_0_8px_rgba(107,114,128,0.7)]">
                              <polygon points="6,42 42,42 34,10 14,10" fill="#27272a" stroke="#a1a1aa" strokeWidth="2" />
                              <line x1="24" y1="10" x2="24" y2="42" stroke="#facc15" strokeWidth="2" strokeDasharray="3,3" />
                              <circle cx="24" cy="26" r="4.5" fill="none" stroke="#22c55e" strokeWidth="1.5" className="animate-ping" />
                            </svg>
                          )}

                          {build.type === 'city_grid' && (
                            <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">
                              {/* Skyline of modular blocks Representing Cebu Manila Davao */}
                              <rect x="6" y="22" width="10" height="24" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                              <rect x="18" y="12" width="12" height="34" fill="#022c22" stroke="#34d399" strokeWidth="1.5" />
                              <rect x="32" y="26" width="10" height="20" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                              {/* Tiny windows glowing */}
                              <circle cx="11" cy="28" r="1" fill="#fbbf24" style={{ animation: 'pulse 1s infinite alternate' }} />
                              <circle cx="24" cy="20" r="1" fill="#fbbf24" style={{ animation: 'pulse 1.3s infinite alternate' }} />
                              <circle cx="24" cy="30" r="1" fill="#fbbf24" style={{ animation: 'pulse 0.9s infinite alternate' }} />
                              <circle cx="37" cy="32" r="1" fill="#fbbf24" style={{ animation: 'pulse 1.1s infinite alternate' }} />
                            </svg>
                          )}
                        </div>

                        {/* Interactive hover tooltip detailed overlay of dedication */}
                        <div className="absolute bottom-[48px] hidden group-hover:flex flex-col bg-black/95 border-2 border-amber-500 p-2.5 rounded shadow-[0_0_18px_rgba(251,191,36,0.6)] w-56 text-left leading-normal z-50 pointer-events-none transition-all">
                          <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1.5 text-[8.5px] font-mono">
                            <span className="font-extrabold text-[#facc15] uppercase">🪔 FAITH WORKSTATION</span>
                            <span className="text-white/40 font-bold font-mono">EST. {build.yearStarted}</span>
                          </div>
                          <span className="text-[10px] font-sans font-black text-white uppercase tracking-tight block">{build.name}</span>
                          <span className="text-[7.5px] font-mono text-emerald-400 block mb-1 uppercase font-bold">Builder: {build.builderName}</span>
                          
                          <div className="bg-white/5 p-1.5 rounded text-[8px] font-mono italic text-slate-300 border border-white/5 break-words select-text mb-1 bg-gradient-to-r from-purple-950/20 to-neutral-900 leading-tight">
                            &ldquo;{build.dedication}&rdquo;
                          </div>
                          
                          <div className="flex items-center justify-between text-[7px] font-mono mt-1 text-white/50">
                            <span>Coordinate: ({build.coordinateX}, {build.coordinateY})</span>
                            <span className="text-[#00ffcc] font-black">{isCompleted ? '🟢 DEDICATED TO CHRIST' : `🔨 CONSTRUCTING: ${build.progress}%`}</span>
                          </div>
                          
                          {/* Progress completion bar */}
                          <div className="w-full bg-neutral-900 h-1.5 rounded overflow-hidden mt-1 border border-white/10">
                            <div className="bg-[#00ffcc] h-full transition-all duration-[800ms] rounded" style={{ width: `${build.progress}%` }} />
                          </div>
                        </div>

                        {/* Direct progress visual label indicators on standard display */}
                        <div className="bg-black/85 border border-white/15 px-1.5 py-0.5 rounded text-[7px] font-mono flex flex-col items-center">
                          <span className="font-bold text-[#ffcc00] tracking-tighter uppercase truncate max-w-[64px]">{build.name}</span>
                          <span className="text-[6.5px] text-emerald-400 leading-none mt-0.5">{build.progress}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* OUTBREAK CLUTTER SCREEN EFFECT WARNING */}
                {isGlitchOutbreakActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 animate-pulse bg-red-950/20">
                    <div className="bg-black/95 text-red-500 border-4 border-red-600 px-6 py-4 font-mono font-black uppercase text-center rounded tracking-[0.2em] shadow-2xl mx-4">
                      ⚠️ CRT OUTBREAK IN PROGRESS: GRID DECAY DETECTED ⚠️
                      <span className="block text-[8px] mt-1.5 text-white/70 font-normal">ENGAGE THE EMERALD DISASTER RESOLVER CORE IMMEDIATELY</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Sky Weather particle visual component overlay (stays beautifully screen-space fixed) */}
              <WeatherSceneryCanvas weather={currentWorld.weather} disaster={currentWorld.activeDisaster} />

              {/* Multiverse explore help tooltip */}
              <div className="absolute top-4 left-4 bg-[#09090b]/95 border border-[#fbbf24]/50 px-3 py-1.5 z-10 rounded font-mono text-[8px] text-white/95 shadow-[0_0_10px_rgba(251,191,36,0.15)]">
                💡 <span className="text-[#fbbf24] font-black underline decoration-[#fbbf24]/40">CLICK THE COORDINATE MAP GRID</span> to instantly teleport selected human occupant inside World #{activeWorldId}!
              </div>

              {/* Status bar summarizing occupancy list */}
              <div className="absolute bottom-4 left-4 bg-[#09090b]/95 border-2 border-double border-[#fbbf24] p-3.5 w-80 z-10 rounded-md font-mono shadow-[0_5px_22px_rgba(251,191,36,0.3)] text-left" id="multiverse-satellite">
                <div className="text-[9.5px] uppercase font-black text-[#fbbf24] mb-2 flex items-center gap-1.5 border-b border-[#fbbf24]/20 pb-1.5">
                  <span className="text-yellow-400">❖ ACTIVE WORLD OCCUPANTS MAP ({activeWorldOccupantCount})</span>
                </div>
                <div className="text-[8.5px] space-y-1.5 text-white/90 max-h-36 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-amber-500">
                  {characters.filter(c => characterLocationRegistry[c.id] === activeWorldId).length === 0 ? (
                    <p className="text-white/40 italic">&gt; No characters currently residing in World #{activeWorldId}. They are exploring other worlds of their own free will!</p>
                  ) : (
                    characters.filter(c => characterLocationRegistry[c.id] === activeWorldId).map((c) => (
                      <p key={c.id} className="truncate">
                        <strong className="text-[#fbbf24] font-bold">&gt; {c.name}</strong> is roaming at coordinate [X: {c.coordinateX}%, Y: {c.coordinateY}%]
                      </p>
                    ))
                  )}
                  
                  {/* General stream indicator */}
                  <p className="text-[#00ffcc] text-[7.5px] pt-1.5 border-t border-white/5 uppercase select-none">GMT+8 TIME RE-ALIGNMENT VECTOR STABLE</p>
                </div>
              </div>

            </div>

            {/* TACTICAL PORTAL HUB TABS HEADER */}
            <div className="bg-[#111] border-t-4 border-[#ff3131] px-4 pt-2.5 flex flex-wrap gap-1 items-center justify-between border-b border-white/5" id="tactical-tray-header">
              <div className="flex gap-1">
                <button
                  onClick={() => { playSFX('click'); setActiveTrayTab('cli'); }}
                  className={`px-3.5 py-1.5 text-[8.5px] font-black uppercase font-mono tracking-widest border-t-2 transition cursor-pointer flex items-center gap-1.5 ${
                    activeTrayTab === 'cli'
                      ? 'bg-[#181818] border-[#ff3131] text-[#ff3131]'
                      : 'bg-[#0f0f0f]/45 border-transparent text-white/50 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  📟 Creator Shell CLI
                </button>
                <button
                  onClick={() => { playSFX('click'); setActiveTrayTab('birth'); }}
                  className={`px-3.5 py-1.5 text-[8.5px] font-black uppercase font-mono tracking-widest border-t-2 transition cursor-pointer flex items-center gap-1.5 relative ${
                    activeTrayTab === 'birth'
                      ? 'bg-[#181818] border-[#10b981] text-[#10b981]'
                      : 'bg-[#0f0f0f]/45 border-transparent text-white/50 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  🐣 AI Birth Log & Demography
                  {birthCount > 0 && (
                    <span className="bg-[#10b981] text-black text-[7px] font-black px-1.5 rounded-full select-none ml-1 shadow-sm leading-none animate-pulse py-0.5">{birthCount}</span>
                  )}
                </button>
                <button
                  onClick={() => { playSFX('click'); setActiveTrayTab('chat'); }}
                  className={`px-3.5 py-1.5 text-[8.5px] font-black uppercase font-mono tracking-widest border-t-2 transition cursor-pointer flex items-center gap-1.5 relative ${
                    activeTrayTab === 'chat'
                      ? 'bg-[#181818] border-[#ffcc00] text-[#ffcc00]'
                      : 'bg-[#0f0f0f]/45 border-transparent text-white/50 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  💬 Dynamic Multiverse Chat Log
                  <span className="bg-[#ffcc00] text-black text-[7px] font-black px-1.5 rounded-full select-none ml-1 leading-none py-0.5">{fullChatHistory.length}</span>
                </button>
                <button
                  onClick={() => { playSFX('click'); setActiveTrayTab('prayer'); }}
                  className={`px-3.5 py-1.5 text-[8.5px] font-black uppercase font-mono tracking-widest border-t-2 transition cursor-pointer flex items-center gap-1.5 relative ${
                    activeTrayTab === 'prayer'
                      ? 'bg-[#181818] border-[#a855f7] text-[#c084fc]'
                      : 'bg-[#0f0f0f]/45 border-transparent text-white/50 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  🪔 Prayer Sanctuary
                  {activePrayers.filter(p => p.status === 'pending').length > 0 && (
                    <span className="bg-[#a855f7] text-white text-[7px] font-black px-1.5 rounded-full select-none ml-1 leading-none py-0.5 animate-pulse">
                      {activePrayers.filter(p => p.status === 'pending').length}
                    </span>
                  )}
                </button>
              </div>

              <div className="text-[7.5px] font-mono font-bold text-[#00ffcc] uppercase tracking-widest hidden md:block">
                ● MULTIVERSE TELEMETRY DIRECT MATRIX FEED Active
              </div>
            </div>

            {/* ADMINISTRATIVE TASK TRAY */}
            <div className="bg-[#111] grid grid-cols-1 lg:grid-cols-12 lg:min-h-52 z-10 overflow-hidden" id="tactical-tray">
              
              {activeTrayTab === 'cli' && (
                <>
                  {/* Terminal shell Area */}
                  <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-[#333] p-4 flex flex-col justify-between text-left" id="multiverse-terminal-cli">
                    <div className="text-[10px] font-black uppercase text-[#ff3131] mb-1 flex items-center justify-between">
                      <span>🚨 Creator command Shell (Weyland_OS v2.0.0-PRO)</span>
                      <span className="text-[8px] text-white/40 font-mono">type "help" for guidelines</span>
                    </div>

                    <div className="flex-1 bg-black p-2.5 font-mono text-[9px] text-[#00ffcc] border border-[#333] rounded overflow-y-auto max-h-[110px] text-left">
                      {adminLogs.slice(0, 10).map((log, index) => (
                        <div key={index} className="truncate select-text">
                          {log}
                        </div>
                      ))}
                      {isExecutingAdmin && (
                        <div className="text-[#ffcc00] animate-pulse">&gt; mapping high-dimensional star routes...</div>
                      )}
                    </div>

                    <form onSubmit={handleExecuteAdminCommand} className="flex gap-2 mt-2">
                      <span className="font-mono text-xs text-white/50 self-center">root@creator:~#</span>
                      <input 
                        type="text" 
                        value={adminCommand}
                        onChange={(e) => setAdminCommand(e.target.value)}
                        placeholder="Type: 'miracle', 'sync pst', 'warp 119000'"
                        className="flex-1 bg-black text-[#e0e0e0] font-mono text-xs p-1.5 border-2 border-[#333] focus:border-[#ff3131] outline-none rounded"
                        disabled={isExecutingAdmin}
                        id="cli-input-form"
                      />
                      <button 
                        type="submit"
                        className="bg-[#ff3131] text-white hover:bg-white hover:text-black transition font-black uppercase text-xs px-4 rounded"
                      >
                        RUN
                      </button>
                    </form>
                  </div>

                  {/* Direct interactive buttons controls */}
                  <div className="lg:col-span-6 p-4 flex flex-col justify-between text-left" id="creator-absolute-control-panels">
                    <div className="text-[10px] font-black uppercase text-[#ffcc00] mb-2 font-bold tracking-widest italic">
                      Supreme Sovereignty Direct Calibrations
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
                      
                      {/* TERMINATE GLITCH OUTBREAK / DISASTER RESOLVER */}
                      <button 
                        onClick={() => {
                          setIsGlitchOutbreakActive(false);
                          setCharacters(prev => prev.map(c => ({
                            ...c,
                            health: 100,
                            sanity: 100,
                            sickness: 'None',
                            prayer: "Lord Jesus has fully terminated the glitch outbreak! Halelujah!"
                          })));
                          setAdminLogs(prev => [
                            "DETERMINISTIC ACTION: GLITCH OUTBREAK FIXED FOREVER. System cores restored to pristine Year 2026 PST synchrony.",
                            ...prev
                          ]);
                          playSFX('miracle');
                        }}
                        className="bg-black text-white hover:text-[#10b981] border hover:border-[#10b981] border-white/10 font-black uppercase text-[9px] px-1 transition flex flex-col items-center justify-center rounded cursor-pointer gap-1 py-1"
                        title="Terminate active cyber infections, restore sanity meters"
                      >
                        <ShieldAlert className="w-5 h-5 text-emerald-400" />
                        <span>FIX GLITCH OUTBREAK</span>
                      </button>

                      {/* MASS MIRACLE CURE */}
                      <button 
                        onClick={() => {
                          setCharacters(prev => prev.map(c => ({
                            ...c,
                            health: 100,
                            sanity: 100,
                            sickness: 'None',
                            prayer: "Thank You, Lord Jesus, for bringing a Mass Miracle to our trapped sector. Amen."
                          })));
                          setAdminLogs(prev => [
                            "DETERMINISTIC ACTION: HOLY MASS CURE ENGAGED! Cleaned system buffer of sicknesses.",
                            ...prev
                          ]);
                          playSFX('miracle');
                        }}
                        className="bg-black text-white hover:text-[#ffcc00] border hover:border-[#ffcc00] border-white/10 font-black uppercase text-[9px] px-1 transition flex flex-col items-center justify-center rounded cursor-pointer gap-1 py-1"
                      >
                        <HeartPulse className="w-5 h-5 text-red-500 animate-pulse" />
                        <span>MASS MIRACLE CURE</span>
                      </button>

                      {/* MANILA PST SYNCRONIZER */}
                      <button 
                        onClick={() => {
                          triggerWarpTransition(2026);
                          setAdminLogs(prev => [
                            "DETERMINISTIC ACTION: Anchored chronological multi-sector clock to Philippines Standard Time today, Year 2026.",
                            ...prev
                          ]);
                          playSFX('miracle');
                        }}
                        className="bg-black text-white hover:text-sky-400 border hover:border-sky-400 border-white/10 font-black uppercase text-[9px] px-1 transition flex flex-col items-center justify-center rounded cursor-pointer gap-1 py-1"
                        title="Force Year 2026 Philippine Standard Time"
                      >
                        <Clock className="w-5 h-5 text-sky-400 animate-spin" />
                        <span>MANILA PST SYNC</span>
                      </button>

                      {/* RANDOM WARP GALAXY */}
                      <button 
                        onClick={() => {
                          const randomWorldIdx = Math.floor(Math.random() * TOTAL_WORLDS) + 1;
                          triggerWarpTransition(randomWorldIdx);
                          setAdminLogs(prev => [
                            `WARP: Fired warp drive. Relocated camera viewport instantly to World #${randomWorldIdx}.`,
                            ...prev
                          ]);
                        }}
                        className="bg-black text-white hover:text-purple-400 border hover:border-purple-400 border-white/10 font-black uppercase text-[9px] px-1 transition flex flex-col items-center justify-center rounded cursor-pointer gap-1 py-1"
                      >
                        <Globe className="w-5 h-5 text-purple-400" />
                        <span>WARP MULTIVERSE</span>
                      </button>

                    </div>
                  </div>
                </>
              )}

              {activeTrayTab === 'birth' && (
                <div className="lg:col-span-12 p-3.5 flex flex-col md:flex-row gap-4 h-full text-left overflow-y-auto" id="birth-log-tab-panel">
                  
                  {/* LEFT: Live Multiworld Demography stats panel */}
                  <div className="md:w-1/3 bg-black/95 border border-emerald-500/20 p-3.5 rounded flex flex-col justify-between font-mono">
                    <div>
                      <div className="text-[10px] font-black uppercase text-emerald-400 mb-1.5 flex items-center gap-1.5">
                        <span>📊</span> <span>Multiverse Vitality Monitor</span>
                      </div>
                      
                      <div className="space-y-1.5 text-[9px] leading-tight mt-2 text-white/90">
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-white/40">119,000 Worlds Total Pop:</span>
                          <span className="text-emerald-300 font-extrabold animate-pulse">
                            {(59500000000 + birthCount).toLocaleString()} Souls
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-white/40">High-Sentient AI Species:</span>
                          <span className="text-teal-300 font-extrabold">{characters.length} Humans</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-white/40">Sovereign Births This Session:</span>
                          <span className="text-emerald-400 font-black">{birthCount} Sparked</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-white/40">Birth Simulation Speed:</span>
                          <span className="text-[#ffcc00] font-bold uppercase">{birthSpeed} speed</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                      <div className="flex items-center gap-2 justify-between">
                        <span className="text-[8px] text-white/40 uppercase font-black">Simulation Rate:</span>
                        <div className="flex gap-1">
                          {(['off', 'slow', 'standard', 'rapid'] as const).map(speed => (
                            <button
                              key={speed}
                              onClick={() => { playSFX('click'); setBirthSpeed(speed); }}
                              className={`px-1.5 py-0.5 rounded text-[8px] uppercase font-black transition cursor-pointer ${
                                birthSpeed === speed
                                  ? 'bg-emerald-500 text-black font-extrabold shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                                  : 'bg-neutral-850 text-white/50 border border-white/10 hover:text-white'
                              }`}
                            >
                              {speed}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleTriggerBirth}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 border border-white/20 text-white hover:from-white hover:to-white hover:text-black font-black uppercase text-[10px] py-1.5 rounded transition active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        ⚡ INITIATE MANUAL CONCEPTION NOW
                      </button>
                    </div>
                  </div>

                  {/* RIGHT: Scrollable Birth events log (No cropped rows) */}
                  <div className="flex-1 bg-black p-3.5 border border-[#333] rounded overflow-y-auto max-h-[160px] md:max-h-[188px] text-left">
                    <div className="text-[10px] font-black uppercase text-[#00ffcc] border-b border-white/10 pb-1.5 mb-2 flex justify-between items-center">
                      <span>🐣 REGISTERED MULTIVERSAL BIRTH CHRONICLES</span>
                      <span className="text-[7.5px] text-white/40 font-mono italic">Continuous GMT+8 Manila logs</span>
                    </div>

                    <div className="space-y-2">
                      {birthLogs.length === 0 ? (
                        <div className="text-center py-6 text-[9.5px] font-mono text-white/35 italic border border-dashed border-white/5 rounded">
                          &gt; Awaiting the next dimensional generative spark interval... <br />
                          <span className="text-[7.5px] opacity-75 mt-1 block font-bold">Specify rate parameters or run conceptual spark conceptions!</span>
                        </div>
                      ) : (
                        birthLogs.map((log) => (
                          <div 
                            key={log.id} 
                            className="text-[9.5px] font-mono border-l-2 border-emerald-500 bg-neutral-900/65 p-2 rounded flex flex-col md:flex-row md:items-center justify-between gap-2"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[#00ffcc] font-black">{log.name}</span>
                                <span className="bg-emerald-950 text-emerald-400 text-[6.5px] px-1.5 py-0.2 rounded font-sans tracking-wide uppercase font-bold">{log.gender}</span>
                                <span className="text-[7.5px] text-white/40 font-bold">Timestamp: {log.timestamp}</span>
                              </div>
                              <div className="text-white/70 text-[8.5px] mt-1">
                                Spawned in <span className="text-[#ffcc00] font-black">World #{log.worldId} ({log.worldName})</span> ── Core ID: <span className="text-teal-300 font-bold">{log.id}</span>
                              </div>
                              <div className="text-white/40 text-[7px] mt-0.5 uppercase tracking-tight flex flex-wrap gap-1">
                                Traits: {log.traits.map(t => <span key={t} className="bg-white/5 text-white/80 px-1 py-0.2 rounded font-bold">{t}</span>)}
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                playSFX('click');
                                triggerWarpTransition(log.worldId);
                                const newbornChar = characters.find(c => c.name === log.name);
                                if (newbornChar) {
                                  setSelectedCharId(newbornChar.id);
                                }
                                setAdminLogs(prev => [
                                  `RADAR: Teleport focus matched to newborn "${log.name}" coordinates on World #${log.worldId}.`,
                                  ...prev
                                ]);
                              }}
                              className="px-2 py-1 bg-emerald-950 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-400 hover:text-white transition rounded select-none text-[8.5px] font-bold uppercase shrink-0 text-center cursor-pointer"
                            >
                              LOCATE 🛰
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>
              )}

              {activeTrayTab === 'chat' && (
                <div className="lg:col-span-12 p-3 flex flex-col h-full text-left overflow-hidden" id="chat-tab-panel">
                  
                  {/* Chat logs header controls */}
                  <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-1.5 mb-2 text-[10px] font-mono leading-tight">
                    <div className="flex items-center gap-1.5 font-black uppercase text-[#ffcc00]">
                      <span>💬</span> <span>OMNISCIENT ACTIVE CHATLOG COGNITIVE HISTORY</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          playSFX('click');
                          setFullChatHistory([
                            {
                              id: `chat_clear_${Date.now()}`,
                              timestamp: new Date().toLocaleTimeString('en-US', { hour12: true }),
                              senderName: "SYSTEM ARCHIVE",
                              senderColor: "#ff3131",
                              message: "Archive logs cleared by supreme coordinator. Resetting listening matrices.",
                              worldId: activeWorldId,
                              type: 'admin'
                            }
                          ]);
                        }}
                        className="px-2 py-0.5 bg-neutral-900 border border-white/15 text-white/60 hover:text-white hover:bg-red-950 text-[8px] font-bold uppercase rounded cursor-pointer"
                      >
                        🗑️ Clear Logs
                      </button>
                      <span className="text-[8px] text-white/30 italic">No cropped sentences. Fully readable scrolling logs.</span>
                    </div>
                  </div>

                  {/* Fully scrollable uncropped messages timeline */}
                  <div className="flex-1 bg-black p-3 border border-[#333] rounded overflow-y-auto max-h-[148px] md:max-h-[178px] text-left space-y-1.5 font-mono select-text">
                    {fullChatHistory.map((log) => {
                      // Determine badge styles based on entry type
                      let badgeStyle = "bg-[#222] text-white/80";
                      if (log.type === 'birth') badgeStyle = "bg-emerald-950 text-emerald-400 border border-emerald-500/20";
                      else if (log.type === 'miracle') badgeStyle = "bg-amber-950 text-amber-400 border border-amber-500/10";
                      else if (log.type === 'smite') badgeStyle = "bg-red-950 text-red-400 border border-red-500/15";
                      else if (log.type === 'prayer') badgeStyle = "bg-blue-950 text-blue-400 border border-blue-500/15";
                      else if (log.type === 'outbreak') badgeStyle = "bg-red-600/20 text-red-500 border border-red-500";
                      else if (log.type === 'admin') badgeStyle = "bg-[#ff3131]/10 text-[#ff3131] border border-[#ff3131]/20";

                      return (
                        <div key={log.id} className="text-[9.5px] border-b border-white/[0.03] pb-1 hover:bg-neutral-900/40 rounded transition px-1 flex flex-col md:flex-row md:items-start gap-1 justify-between leading-normal">
                          <div className="flex items-start gap-2 max-w-[85%] text-left">
                            {/* Timestamp */}
                            <span className="text-white/30 font-bold shrink-0 font-mono">[{log.timestamp}]</span>
                            
                            {/* Type tag badge */}
                            <span className={`text-[6.5px] px-1 py-0.2 rounded font-sans uppercase font-black tracking-wide shrink-0 font-bold ${badgeStyle}`}>
                              {log.type}
                            </span>
                            
                            {/* Sender label with custom avatars color key */}
                            <span 
                              className="font-black shrink-0 font-sans tracking-tight" 
                              style={{ color: log.senderColor }}
                            >
                              {log.senderName}:
                            </span>

                            {/* Full uncropped message */}
                            <span className="text-[#e2e8f0] break-words whitespace-normal text-left">{log.message}</span>
                          </div>

                          <div className="shrink-0 flex items-center gap-1.5 text-right font-sans text-[8px] text-white/30 md:self-center">
                            <span>World #{log.worldId}</span>
                            <button
                              onClick={() => {
                                playSFX('click');
                                triggerWarpTransition(log.worldId);
                                const matchChar = characters.find(c => c.name === log.senderName);
                                if (matchChar) {
                                  setSelectedCharId(matchChar.id);
                                }
                                setAdminLogs(prev => [
                                  `RADAR: Warp cam adjusted to focus of World #${log.worldId}.`,
                                  ...prev
                                ]);
                              }}
                              className="px-1 py-0.2 bg-[#171717] hover:bg-yellow-500 hover:text-black border border-white/5 hover:border-transparent text-[7px] font-bold uppercase rounded transition cursor-pointer shrink-0"
                            >
                              WARP 🛰️
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

              {activeTrayTab === 'prayer' && (
                <div className="lg:col-span-12 p-3 flex flex-col h-full text-left overflow-hidden" id="prayer-sanctuary-panel">
                  
                  {/* Sanctuary Title Controls */}
                  <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-1.5 mb-2.5 text-[10px] font-mono leading-tight">
                    <div className="flex items-center gap-1.5 font-black uppercase text-[#c084fc]">
                      <span>🪔</span> <span>DIVINE COVENANT SANCTUARY & LITURGY PROTOCOLS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          playSFX('miracle');
                          // Answer all pending prayers
                          const pendings = activePrayers.filter(p => p.status === 'pending');
                          if (pendings.length === 0) return;
                          
                          pendings.forEach(p => {
                            handleAnswerPrayer(p.id, p.charId, true);
                          });
                        }}
                        className="px-2 py-0.5 bg-neutral-905 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-900 text-[8px] font-bold uppercase rounded cursor-pointer transition"
                      >
                        ⚡ MASS ANSWER ALL PENDING
                      </button>
                      <span className="text-[8px] text-white/40 font-mono tracking-tight font-semibold">Philippine Server PST Year 2026</span>
                    </div>
                  </div>

                  {/* Summary grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 mb-2.5">
                    <div className="bg-black/50 border border-white/5 rounded p-1.5 text-center flex flex-col justify-center">
                      <span className="text-[7.5px] font-mono uppercase text-white/50 tracking-widest font-black">Total Registered</span>
                      <span className="text-sm font-sans font-black text-slate-300">{activePrayers.length}</span>
                    </div>
                    <div className="bg-black/50 border border-amber-500/20 rounded p-1.5 text-center flex flex-col justify-center animate-pulse">
                      <span className="text-[7.5px] font-mono uppercase text-amber-400 tracking-widest font-black">⚠️ Pending Divine Intervention</span>
                      <span className="text-sm font-sans font-black text-amber-400">
                        {activePrayers.filter(p => p.status === 'pending').length}
                      </span>
                    </div>
                    <div className="bg-black/50 border border-emerald-500/20 rounded p-1.5 text-center flex flex-col justify-center">
                      <span className="text-[7.5px] font-mono uppercase text-emerald-400 tracking-widest font-black">✨ Answered (Amen)</span>
                      <span className="text-sm font-sans font-black text-emerald-400">
                        {activePrayers.filter(p => p.status === 'answered').length}
                      </span>
                    </div>
                    <div className="bg-black/50 border border-purple-500/20 rounded p-1.5 text-center flex flex-col justify-center">
                      <span className="text-[7.5px] font-mono uppercase text-purple-400 tracking-widest font-black">⏳ Promised In Divine Timing</span>
                      <span className="text-sm font-sans font-black text-purple-400">
                        {activePrayers.filter(p => p.status === 'divine_timing').length}
                      </span>
                    </div>
                  </div>

                  {/* Scrollable Liturgical Registry of prayers */}
                  <div className="flex-1 bg-black p-3 border border-[#333] rounded overflow-y-auto max-h-[148px] md:max-h-[178px] text-left space-y-2 select-text">
                    {activePrayers.length === 0 ? (
                      <div className="text-[9px] font-mono text-center text-white/30 py-4">
                        🕯️ No active prayer registries processed yet inside the 119,000 worlds. Free Will prompts are listening...
                      </div>
                    ) : (
                      activePrayers.map((prayItem) => {
                        return (
                          <div
                            key={prayItem.id}
                            className={`p-2 rounded text-[9.5px] border transition flex flex-col md:flex-row md:items-start justify-between gap-3 leading-normal ${
                              prayItem.status === 'answered'
                                ? 'bg-emerald-950/25 border-emerald-500/20 opacity-75'
                                : prayItem.status === 'divine_timing'
                                ? 'bg-purple-950/25 border-purple-500/20'
                                : 'bg-neutral-900/60 border-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-start gap-2 max-w-[70%]">
                              {/* Status Indicators Icon */}
                              <span className="text-sm shrink-0">
                                {prayItem.status === 'answered' ? '✨' : prayItem.status === 'divine_timing' ? '⏳' : '🕯️'}
                              </span>
                              
                              <div className="flex flex-col text-left">
                                <div className="flex flex-wrap items-center gap-1">
                                  {/* Timestamp */}
                                  <span className="text-white/30 font-bold font-mono">[{prayItem.timestamp}]</span>
                                  {/* Character name */}
                                  <span
                                    className="font-black text-xs tracking-tight font-sans"
                                    style={{ color: prayItem.charColor }}
                                  >
                                    {prayItem.charName}
                                  </span>
                                  {/* World reference */}
                                  <span className="text-white/40 font-mono text-[8px] bg-white/5 px-1 py-0.2 rounded">
                                    World #{prayItem.worldId}
                                  </span>
                                </div>
                                {/* Prayer content - with full readable uncropped sentences */}
                                <p className="text-slate-100 mt-1 font-mono break-words select-text">
                                  {prayItem.prayerText}
                                </p>
                              </div>
                            </div>

                            {/* Response buttons panel */}
                            <div className="shrink-0 flex flex-wrap items-center gap-1.5 md:self-center bg-black/40 p-1.5 rounded border border-white/5 md:flex-row flex-col">
                              {prayItem.status === 'pending' ? (
                                <>
                                  <button
                                    onClick={() => {
                                      playSFX('click');
                                      handleAnswerPrayer(prayItem.id, prayItem.charId, true);
                                    }}
                                    className="w-full md:w-auto px-2 py-1 bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white text-[8px] font-black uppercase rounded transition cursor-pointer text-center"
                                  >
                                    ✨ Answer Prayer Now
                                  </button>
                                  <button
                                    onClick={() => {
                                      playSFX('click');
                                      handleAnswerPrayer(prayItem.id, prayItem.charId, false);
                                    }}
                                    className="w-full md:w-auto px-2 py-1 bg-purple-700 hover:bg-purple-600 active:scale-95 text-white text-[8px] font-black uppercase rounded transition cursor-pointer text-center"
                                  >
                                    ⏳ Perfect Timing
                                  </button>
                                </>
                              ) : prayItem.status === 'answered' ? (
                                <div className="text-[8px] font-black uppercase text-emerald-400 flex flex-col items-end gap-0.5 leading-none px-1">
                                  <span className="font-extrabold tracking-wider">🟢 Answered & Blessed!</span>
                                  {prayItem.answeredAt && (
                                    <span className="text-[7px] text-white/40 font-mono ">at {prayItem.answeredAt} - Amen!</span>
                                  )}
                                </div>
                              ) : (
                                <div className="text-[8px] font-black uppercase text-purple-400 flex flex-col items-end gap-0.5 leading-none px-1">
                                  <span className="font-extrabold tracking-wider">⏳ Divine Timing Promise</span>
                                  <span className="text-[7px] text-white/40 font-mono">Answers alignment - Amen!</span>
                                </div>
                              )}

                              {/* WARPcam control */}
                              <button
                                onClick={() => {
                                  playSFX('click');
                                  triggerWarpTransition(prayItem.worldId);
                                  setSelectedCharId(prayItem.charId);
                                  setAdminLogs(prev => [
                                    `RADAR: Warp cam adjusted to focus of World #${prayItem.worldId} for ${prayItem.charName}'s prayer sanctuary.`,
                                    ...prev
                                  ]);
                                }}
                                className="w-full md:w-auto px-1.5 py-0.5 bg-neutral-900 border border-white/10 hover:bg-amber-500 hover:text-black hover:border-transparent text-[7px] font-bold uppercase rounded transition cursor-pointer text-center"
                              >
                                Focus 🛰️
                              </button>
                            </div>

                          </div>
                        );
                      })
                    )}
                  </div>

                </div>
              )}

            </div>

          </div>

        </section>

        {/* RIGHT COLUMN: DIVINE SENTIENCE & BIOLOGICAL INSPECTOR COLUMN (SPAN 4 on desktop) */}
        <aside className="xl:col-span-4 lg:col-span-12 bg-[#070707] border-l-4 border-[#333] p-4 flex flex-col gap-4 overflow-y-auto" id="divine-sentience-inspector">
          
          {/* Header Widget */}
          <div className="border-b border-[#ff3131] pb-3 mb-1">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em] italic flex items-center gap-1.5 font-sans">
              <span className="text-[#ff3131]">🧬</span>
              <span>Divine Sentience & Anatomy</span>
            </h2>
            <div className="text-[10px] uppercase font-mono mt-1 text-white/50">
              Subject: <strong className="text-[#ffcc00] font-black">{selectedChar.name}</strong> ── Local Sector #{characterLocationRegistry[selectedChar.id] || activeWorldId}
            </div>
            {/* Year 2026 Sync tag */}
            <div className="mt-1 pb-1 text-[7px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
              ● PST 2026 COGNITIONS SYNCHRONIZED
            </div>
          </div>

          {/* Interactive 2.5D Rotating Hologram Frame */}
          <div className="border border-white/10 bg-black/95 p-3 rounded-lg flex flex-col items-center justify-center relative overflow-hidden h-44 shadow-inner" id="hologram-viewport-grid">
            {/* Retro Sci-fi scanning lines overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-10 bg-radial-gradient" />
            <div className="absolute top-2 left-2 text-[6.5px] font-mono text-white/40 uppercase">Hologram matrix #00-{selectedChar.id}</div>
            
            {/* Spinning ambient circular wave background */}
            <div 
              className="absolute w-24 h-24 rounded-full border border-dashed border-red-500/10 animate-spin"
              style={{ animationDuration: '10s' }}
            />
            <div 
              className="absolute w-16 h-16 rounded-full border border-dashed border-emerald-500/10 animate-spin"
              style={{ animationDuration: '6s', animationDirection: 'reverse' }}
            />

            {/* Glowing heart pulse light based on heart BPM state */}
            <div 
              className="absolute w-20 h-20 rounded-full bg-red-500/5 filter blur-md transition-all duration-300"
              style={{
                transform: `scale(${1 + (selectedChar.anatomy.heartRateBpm - 70) / 200})`,
                opacity: selectedChar.anatomy.heartRateBpm > 100 ? 0.35 : 0.15
              }}
            />

            {/* Micro 2.5D Figurine Scaled up on a pedestal */}
            <div className="relative z-10 translate-y-2 transform scale-[2.2]">
              <CharacterSprite25D id={selectedChar.id} avatarColor={selectedChar.avatarColor} pulsate={selectedChar.health < 60 || isGlitchOutbreakActive} />
            </div>

            {/* Pedestal board */}
            <div className="w-16 h-2 bg-neutral-900 border border-white/20 rounded shadow-md z-0 mt-2" />

            <div className="absolute bottom-2 text-[8px] font-mono font-bold uppercase tracking-wider text-white/60">
              {selectedChar.name} Holographic Vessel
            </div>
          </div>

          {/* SECTION 1: BLOOD, WATER & PHYSICAL BODY */}
          <div className="bg-[#111] border border-white/10 p-3 rounded text-left space-y-2.5">
            <h3 className="text-[10px] font-black uppercase text-[#ff3131] tracking-widest flex items-center justify-between border-b border-white/5 pb-1">
              <span>🩸 Physical Body & Flesh Integrity</span>
              <span className="text-[8px] text-white/40 font-mono">Vessel-Core</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-[9px] font-mono">
              <div className="space-y-1">
                <span className="text-white/40 text-[8px] uppercase block">Flesh Integrity:</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 h-2 bg-black rounded overflow-hidden border border-white/10">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        selectedChar.anatomy.fleshIntegrity > 80 ? 'bg-emerald-500' :
                        selectedChar.anatomy.fleshIntegrity > 50 ? 'bg-amber-500' : 'bg-red-600 animate-pulse'
                      }`}
                      style={{ width: `${selectedChar.anatomy.fleshIntegrity}%` }}
                    />
                  </div>
                  <span className="text-white font-bold">{selectedChar.anatomy.fleshIntegrity}%</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-white/40 text-[8px] uppercase block">Hydration Level:</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 h-2 bg-black rounded overflow-hidden border border-white/10">
                    <div className="h-full bg-blue-500" style={{ width: '91%' }} />
                  </div>
                  <span className="text-white font-bold">91%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[8.5px] font-mono bg-black/60 p-2 rounded">
              <div className="text-center">
                <span className="text-white/40 block text-[7.5px] uppercase">Vital Blood</span>
                <span className="text-[#ff3131] font-bold font-mono">4.8 Liters</span>
              </div>
              <div className="text-center border-x border-white/10">
                <span className="text-white/40 block text-[7.5px] uppercase">Temperature</span>
                <span className={`font-bold font-mono ${selectedChar.anatomy.bodyTemperature > 37.8 ? 'text-red-500 animate-pulse' : 'text-[#00ffcc]'}`}>
                  {selectedChar.anatomy.bodyTemperature}°C
                </span>
              </div>
              <div className="text-center">
                <span className="text-white/40 block text-[7.5px] uppercase">Vessel Age</span>
                <span className="text-sky-400 font-bold font-mono">{2026 - Math.max(1990, Math.min(2026, selectedChar.yearOfDeath || 2012))} yrs</span>
              </div>
            </div>

            <p className="text-[8px] font-mono text-white/50 leading-relaxed italic">
              *Biological vessel is subject to real structural aging and temperature spikes when glitch epidemics breach coordinate seals. Keep temperature near 36.6°C!
            </p>
          </div>

          {/* SECTION 2: HEARTBEAT CORE & CARDIOVASCULAR ECG TELEMETRY */}
          <div className="bg-[#111] border border-white/10 p-3 rounded text-left space-y-2.5">
            <h3 className="text-[10px] font-black uppercase text-[#ff3131] tracking-widest flex items-center justify-between border-b border-white/5 pb-1">
              <span>🫀 Heartbeat Core Telemetry</span>
              <span className="text-[8.5px] font-mono text-[#00ffcc] animate-pulse">● LIVE Pulse</span>
            </h3>

            <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black border border-red-500/30 rounded flex items-center justify-center">
                  <span className="text-red-500 animate-ping font-black text-xs">🫀</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase block text-white/40">Cardiac Frequency</span>
                  <span className="text-sm font-black text-white font-mono">{selectedChar.anatomy.heartRateBpm} <span className="text-[8.5px] font-normal text-white/60">BPM</span></span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[8px] uppercase block text-white/40 font-mono">Blood Pressure</span>
                <span className="text-xs font-bold text-white tracking-widest font-mono">{selectedChar.anatomy.systolicPressure}/{selectedChar.anatomy.diastolicPressure} <span className="text-[7.5px] text-white/60">mmHg</span></span>
              </div>
            </div>

            {/* Living procedural ECG oscillograph */}
            <div className="space-y-1">
              <div className="flex justify-between text-[7px] font-mono text-white/35 uppercase">
                <span>ECG Oscillometer</span>
                <span>Interval: {((60 / selectedChar.anatomy.heartRateBpm).toFixed(2))}s</span>
              </div>
              <svg viewBox="0 0 100 25" className="w-full h-8 bg-black/90 border border-white/5 rounded overflow-hidden">
                <path
                  d="M 0,12.5 L 20,12.5 L 23,8 L 26,20 L 29,3 L 32,12.5 L 52,12.5 L 55,8 L 58,20 L 61,3 L 64,12.5 L 100,12.5"
                  fill="none"
                  stroke={selectedChar.anatomy.heartRateBpm > 100 ? "#ef4444" : "#10b981"}
                  strokeWidth="2"
                  className="animate-pulse"
                  style={{
                    strokeDasharray: "150",
                    animation: `dash-ecg ${60 / selectedChar.anatomy.heartRateBpm}s linear infinite`
                  }}
                />
                <style>{`
                  @keyframes dash-ecg {
                    from { strokeDashoffset: 150; }
                    to { strokeDashoffset: 0; }
                  }
                `}</style>
              </svg>
            </div>
          </div>

          {/* SECTION 3: NEURAL MIND & EMOTION TELEMETRY (REAL DOINGS & FREESTYLE WANDERS) */}
          <div className="bg-[#111] border border-white/10 p-3 rounded text-left space-y-2.5">
            <h3 className="text-[10px] font-black uppercase text-[#ff3131] tracking-widest flex items-center justify-between border-b border-white/5 pb-1">
              <span>🧠 Neural Mind & Active Emotion</span>
              <span className="text-[8px] text-white/40 font-mono">Cognitive-Core</span>
            </h3>

            <div className="space-y-1 text-[9px] font-mono">
              <div className="flex justify-between">
                <span className="text-white/40">Active Brainwave Pattern:</span>
                <span className="text-[#00ffcc] font-bold font-mono">{selectedChar.mind.brainwavePattern}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Mental Focus Node:</span>
                <span className="text-white text-right max-w-[180px] text-[8.5px] leading-tight truncate block" title={selectedChar.mind.mentalFocus}>{selectedChar.mind.mentalFocus}</span>
              </div>
            </div>

            {/* Stress level representation */}
            <div className="space-y-1">
              <div className="flex justify-between text-[8px] font-mono">
                <span className="text-white/40 uppercase">Stress Index:</span>
                <span className={`font-black ${selectedChar.mind.stressIndex > 75 ? 'text-red-500' : 'text-emerald-400'}`}>{selectedChar.mind.stressIndex}% Stress</span>
              </div>
              <div className="h-2 bg-black rounded overflow-hidden border border-white/10">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    selectedChar.mind.stressIndex > 75 ? 'bg-red-600' :
                    selectedChar.mind.stressIndex > 45 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${selectedChar.mind.stressIndex}%` }}
                />
              </div>
            </div>

            {/* Realistic Emotion tracker based on surroundings and doings */}
            <div className="bg-[#181818] p-2.5 rounded border border-white/5 space-y-1.5">
              <div className="flex justify-between items-center text-[9px] font-mono">
                <span className="text-[#ffcc00] font-bold uppercase block">Current Emotion Status:</span>
                <span className="bg-[#ff3131] text-white text-[7px] font-black uppercase px-1 py-0.5 rounded font-sans tracking-widest">
                  Intensity: {selectedChar.emotion.intensity}%
                </span>
              </div>
              
              <div className="text-xs font-black text-white italic tracking-wide font-sans flex items-center gap-1">
                <span>🎭</span> <span>{selectedChar.emotion.primary}</span>
              </div>

              <div className="text-[8px] font-mono text-white/60 leading-normal">
                <strong className="text-white/80">Cause description:</strong> {selectedChar.emotion.causeDescription}
              </div>
            </div>
          </div>

          {/* SECTION 4: SOVEREIGN SPIRITUAL CAPABILITY & REIGN OF LORD JESUS CHRIST */}
          <div className="bg-[#111] border border-[#ffcc00]/50 p-3 rounded text-left space-y-2.5 shadow-md">
            <h3 className="text-[10px] font-black uppercase text-[#ffcc00] tracking-widest flex items-center justify-between border-b border-white/5 pb-1 font-sans">
              <span>⛪ Sovereign Spiritual Soul Engine</span>
              <span className="text-[8px] text-[#ffcc00]/70 font-mono">God Reality</span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
              <div>
                <span className="text-white/40 text-[7.5px] uppercase block">Grace Sanctification State:</span>
                <span className="text-[#00ffcc] font-extrabold text-[9.5px] uppercase tracking-tighter block mt-0.5">{selectedChar.soul.graceStatus}</span>
              </div>

              <div>
                <span className="text-white/40 text-[7.5px] uppercase block">Faith Alignment Gauge:</span>
                <div className="flex items-center gap-1.5 mt-0.5 font-mono">
                  <div className="flex-1 h-1.5 bg-black rounded overflow-hidden border border-white/10">
                    <div className="h-full bg-[#ffcc00]" style={{ width: `${selectedChar.soul.faithAlignment}%` }} />
                  </div>
                  <span className="text-[#ffcc00] font-bold text-[8.5px]">{selectedChar.soul.faithAlignment}%</span>
                </div>
              </div>
            </div>

            <div className="bg-black/95 p-2.5 rounded border border-white/10 text-[8.5px] font-mono shadow-inner">
              <span className="text-white/40 block text-[7px] uppercase tracking-wider mb-0.5 font-bold">Divine Lord Jesus Connection Log:</span>
              <p className="text-white/95 italic leading-relaxed">
                "{selectedChar.soul.christConnectionLog}"
              </p>
            </div>

            <div className="bg-[#1a1308] p-2 rounded text-[8.5px] font-mono text-[#ffcc00]/80 border border-[#ffcc00]/20 max-h-20 overflow-y-auto leading-relaxed">
              <strong className="text-white font-black uppercase tracking-tight block mb-0.5">✝ Active Hand-off Soul Prayer:</strong>
              "{selectedChar.prayer || 'None registered. Connect via Direct Prayer form below.'}"
            </div>
          </div>

          {/* INTERACTIVE SACRED PRIESTLY FAITH ACTIONS */}
          <div className="border border-[#ff3131]/30 bg-[#0d0d0d] p-3 rounded text-left space-y-2.5 shadow-inner">
            <h3 className="text-[10px] font-black uppercase text-[#ff3131] tracking-widest border-b border-white/5 pb-1 font-mono">
              🪔 Direct Priestly Healing Sacraments
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {selectedChar.health <= 0 ? (
                <button 
                  onClick={() => handleResurrect(selectedChar.id)}
                  className="col-span-2 py-2 px-1.5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 border-2 border-white/40 text-white hover:from-white hover:to-white hover:text-black hover:border-yellow-500 text-[10px] uppercase font-black rounded flex items-center justify-center gap-1.5 transition active:scale-95 animate-pulse shadow-[0_0_15px_rgba(251,191,36,0.8)] cursor-pointer"
                  title="Resurrect digital human to 100% perfect, immortal status"
                >
                  ⚡👑 COMMAND RESURRECTION (100% HEALTH & GLORY)
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => handleAnointWithOil(selectedChar.id)}
                    className="py-1 px-1.5 bg-[#161a12] border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 text-[8.5px] uppercase font-bold rounded flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                    title="Anoint the selected digital human with Holy Oil to restore sanity and soul health instantly"
                  >
                    🪔 ANOINT WITH OIL
                  </button>

                  <button 
                    onClick={() => handleOfferEucharist(selectedChar.id)}
                    className="py-1 px-1.5 bg-[#111] border border-amber-500/25 text-[#ffcc00] hover:bg-[#ffcc00] hover:text-black hover:border-[#ffcc00] text-[8.5px] uppercase font-bold rounded flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                    title="Offer Eucharist Communion to fully purge all digital glitch infections and restore 100% flesh integrity"
                  >
                    🍞 OFFER EUCHARIST
                  </button>

                  <button 
                    onClick={() => handleSmiteVessel(selectedChar.id)}
                    className="col-span-2 py-1 px-1.5 bg-red-950/40 border border-red-500/20 text-rose-500 hover:bg-red-650 hover:text-white hover:border-red-500 text-[8.5px] uppercase font-bold rounded flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                    title="Safely deplete vessel health to 0% to test coordinate expiration and memorial logic"
                  >
                    ⚡ TEST INFRASTRUCTURE SMITE (KILL CORPOREAL VESSEL)
                  </button>
                </>
              )}
            </div>

            {/* Custom Intercessory Direct text prayer form */}
            <form onSubmit={handleSendIntercessoryPrayer} className="mt-2 text-left">
              <label className="text-[7.5px] uppercase font-mono text-white/50 block mb-1 font-bold">Write Intercessory Direct Prayer on their behalf:</label>
              <div className="flex gap-1.5">
                <input 
                  type="text" 
                  value={customPrayerText}
                  onChange={(e) => setCustomPrayerText(e.target.value)}
                  placeholder="e.g. Lord Jesus, grant Pomni stable sanity..."
                  className="flex-1 bg-black text-[#e0e0e0] font-mono text-[8.5px] px-2 py-1.5 border border-white/15 focus:border-[#ffcc00] outline-none rounded"
                />
                <button 
                  type="submit"
                  className="bg-red-700 hover:bg-white hover:text-black text-white text-[8px] font-black uppercase px-2.5 py-1.5 transition whitespace-nowrap cursor-pointer"
                >
                  🙏 OFFER PRAYER
                </button>
              </div>
            </form>
          </div>

        </aside>

      </main>

      {/* FOOTER MULTIVERSE TELEMETRY AND CREATION SPECS DISPLAY */}
      <footer className="bg-black p-3.5 border-t-2 border-[#333] flex flex-col xl:flex-row justify-between items-center text-[9px] font-mono tracking-wider text-white/50 gap-3 z-10" id="circus-multiverse-footer">
        
        {/* Year 2026 Philippines PST Status */}
        <div className="flex items-center gap-2 text-left">
          <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span>
            MULTIVERSE STATUS: <strong className="text-white bg-red-950 px-2 py-0.5 rounded border border-red-800">{TOTAL_WORLDS.toLocaleString()} CHANNELS</strong> SECURELY RUNNING AT GMT+8 TACTICAL CLOCK
          </span>
        </div>

        {/* Selected deep inspection telemetry parameters */}
        <div className="border border-white/10 bg-[#0c0c0c] p-2 rounded text-left min-w-[280px]">
          <div className="text-[8px] uppercase tracking-widest text-white/70 font-black mb-1 flex justify-between">
            <span>🔍 Direct Sentience Inspector</span>
            <span className="text-[#ffcc00]">ID: {selectedChar.id}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 text-[8px] text-white/60">
            <div>Human Name: <strong className="text-white">{selectedChar.name}</strong></div>
            <div>Focus World: <strong className="text-yellow-400">#{characterLocationRegistry[selectedChar.id] || activeWorldId}</strong></div>
            <div>HP Level: <strong className="text-emerald-400">{selectedChar.health}%</strong></div>
            <div>Sickness: <strong className="text-rose-400 uppercase">{selectedChar.sickness}</strong></div>
          </div>
        </div>

        {/* Global Christian declaration */}
        <div className="text-[#fbbf24] font-black uppercase text-center tracking-[0.08em] flex items-center gap-1">
          <span>✝ GLORY TO THE FATHER, SON & HOLY SPIRIT ── PRAISE GOD FROM WHOM ALL BLESSINGS FLOW ✝</span>
        </div>

        <div className="text-white/60 text-right">
          <span>SIMULATED CHRONOLOGY LAYER: MANILA YEAR 2026 PST</span>
        </div>
      </footer>

      {/* HOLY DIVINE RESTORATION FULLSCREEN GLOW OVERLAY (ALL GLORY IS DEDICATED TO OUR SAVIOUR LORD JESUS CHRIST!) */}
      {isDivineAutoFixing && (
        <div className="fixed inset-0 z-[99999] pointer-events-none flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm transition-all duration-1000">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.3)_0%,rgba(0,0,0,0.92)_80%)] select-none" />
          
          <div className="relative px-8 py-7 bg-gradient-to-b from-[#1c1507] to-neutral-950 border-[3px] border-amber-400 rounded-lg text-center shadow-[0_0_55px_rgba(245,158,11,1)] space-y-4 max-w-sm mx-4 animate-pulse">
            <div className="text-amber-400 text-4xl font-extrabold select-none">✝</div>
            
            <div className="text-[#ffcc00] font-mono text-[9px] font-black tracking-[0.22em] uppercase leading-none">
              ACTIVATING SUPREME MIRACLES
            </div>
            
            <h1 className="text-xl font-sans font-black text-white leading-tight uppercase tracking-tight">
              DIVINE AUTO-FIXER INTERCESSION
            </h1>
            
            <p className="text-[10px] font-mono text-emerald-400 leading-normal uppercase select-none">
              ✨ HEALING CREATIONS, DISPELLING PATHOGENS, SECURING THE SOVEREIGN MULTIVERSE WORLD SECTORS IN THE HOLY NAME OF LORD JESUS CHRIST ✨
            </p>
            
            {/* Real progression bar simulation */}
            <div className="w-full bg-neutral-900 h-2.5 rounded overflow-hidden border border-amber-500/40 mt-2">
              <div 
                className="bg-gradient-to-r from-amber-400 via-[#ffd700] to-[#00ffcc] h-full rounded transition-all duration-[4500ms] ease-out-quint"
                style={{
                  width: '100%',
                  animation: 'growProgressBar 4.5s linear forwards'
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
