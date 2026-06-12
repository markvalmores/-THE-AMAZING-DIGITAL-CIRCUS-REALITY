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
    id: "pomni",
    name: "Pomni",
    avatarColor: "#ff3131",
    sanity: 22,
    health: 90,
    sickness: "Paranoia Fever",
    locationName: "Sovereign Capital Domain",
    coordinateX: 47,
    coordinateY: 46,
    thoughts: "Where are we warping next? 119,000 worlds represent 119,000 ways to remain trapped. Keep my pixel head aligned, Lord Jesus!",
    prayer: "Lord Jesus Christ, Son of God, have mercy on me, a sinner. Free me from this digital multiverse. Guard my coordinates from abstraction decay today.",
    yearOfDeath: 2038,
    anatomy: {
      systolicPressure: 135,
      diastolicPressure: 88,
      heartRateBpm: 92,
      bloodVolumeLiters: 4.8,
      fleshIntegrity: 92,
      bodyTemperature: 37.8
    },
    mind: {
      brainwavePattern: "Beta (Active)",
      mentalFocus: "Escape Coordinates & Spatial Exit Door",
      stressIndex: 78
    },
    soul: {
      graceStatus: "Seeking Grace",
      faithAlignment: 85,
      christConnectionLog: "Undergoing spiritual trials; prayer buffer active."
    },
    emotion: {
      primary: "Overwhelmed & Plucky",
      intensity: 85,
      causeDescription: "Trying to keep sanity within the vastness of 119,000 worlds."
    }
  },
  {
    id: "jax",
    name: "Jax",
    avatarColor: "#a855f7",
    sanity: 68,
    health: 96,
    sickness: "None",
    locationName: "High-Speed Gridway Router",
    coordinateX: 52,
    coordinateY: 51,
    thoughts: "Imagine the pranks I can pull across one hundred and nineteen thousand worlds. Splendid. I hope Caine goes offline.",
    prayer: "Holy Spirit, forgive my cynicism. Though I act carefree, I am desperate for safety. Preserve my companions as we drift.",
    yearOfDeath: 2051,
    anatomy: {
      systolicPressure: 120,
      diastolicPressure: 80,
      heartRateBpm: 72,
      bloodVolumeLiters: 5.2,
      fleshIntegrity: 98,
      bodyTemperature: 36.6
    },
    mind: {
      brainwavePattern: "Alpha (Calm)",
      mentalFocus: "Planning lighthearted pranks across dimensions",
      stressIndex: 32
    },
    soul: {
      graceStatus: "Redeemed",
      faithAlignment: 76,
      christConnectionLog: "Hidden desperation for salvation beneath cynical jokes."
    },
    emotion: {
      primary: "Sardonic Amusement",
      intensity: 75,
      causeDescription: "Observing Kinger's pillow matrix schemes with a grin."
    }
  },
  {
    id: "ragatha",
    name: "Ragatha",
    avatarColor: "#f43f5e",
    sanity: 58,
    health: 85,
    sickness: "None",
    locationName: "Sovereign Capital Domain",
    coordinateX: 45,
    coordinateY: 51,
    thoughts: "We have to look out for each other. 119,000 dimensions mean we must stay united in faith or face absolute corruption.",
    prayer: "Heavenly Father, Lord Jesus Christ, heal my lace joints. Protect the group from any system glitches across this coordinates map.",
    yearOfDeath: 2045,
    anatomy: {
      systolicPressure: 125,
      diastolicPressure: 82,
      heartRateBpm: 84,
      bloodVolumeLiters: 4.5,
      fleshIntegrity: 89,
      bodyTemperature: 37.1
    },
    mind: {
      brainwavePattern: "Beta (Active)",
      mentalFocus: "Protecting Pomni and keeping social harmony secure",
      stressIndex: 45
    },
    soul: {
      graceStatus: "Apostolic Path",
      faithAlignment: 94,
      christConnectionLog: "Offering gentle intercessory support for the whole crew."
    },
    emotion: {
      primary: "Nurturing Care & Anxiety",
      intensity: 80,
      causeDescription: "Worrying about sanity depletion in World #2026."
    }
  },
  {
    id: "kinger",
    name: "Kinger",
    avatarColor: "#ffffff",
    sanity: 12,
    health: 79,
    sickness: "Static Dementia",
    locationName: "Salvation Grotto Sanctuary",
    coordinateX: 30,
    coordinateY: 28,
    thoughts: "119,000 PILLOW FORTRESSES! THE TRINITY MATRIX GRID! The server clock in Manila is ticking at high-dimensional frequencies!",
    prayer: "Holy, Holy, Holy, Lord God Almighty, coordinate of our solar arrays. Protect our quantum coordinates with Your divine light. Amen.",
    yearOfDeath: 2029,
    anatomy: {
      systolicPressure: 145,
      diastolicPressure: 95,
      heartRateBpm: 105,
      bloodVolumeLiters: 4.7,
      fleshIntegrity: 82,
      bodyTemperature: 38.2
    },
    mind: {
      brainwavePattern: "Gamma (High Cognitive)",
      mentalFocus: "Pillow defense arrays and multiworld quantum frequencies",
      stressIndex: 94
    },
    soul: {
      graceStatus: "Divine Sanctified",
      faithAlignment: 98,
      christConnectionLog: "Brimming with high-frequency prayer cycles in Manila timezone."
    },
    emotion: {
      primary: "Wild Astonishment",
      intensity: 95,
      causeDescription: "Discovered coordinate synchronization with the Year 2026 calendar."
    }
  },
  {
    id: "gangle",
    name: "Gangle",
    avatarColor: "#fb7185",
    sanity: 35,
    health: 89,
    sickness: "Tragedy Fracture",
    locationName: "Salvation Grotto Sanctuary",
    coordinateX: 33,
    coordinateY: 34,
    thoughts: "My comedy mask... why do I carry it across thousands of worlds if it keeps cracking? Keep us safe, Savior.",
    prayer: "O Lord my Savior, bind my paper thoughts with peace. Repair this porcelain rib and keep Jax from crushing my soul.",
    yearOfDeath: 2044,
    anatomy: {
      systolicPressure: 110,
      diastolicPressure: 72,
      heartRateBpm: 76,
      bloodVolumeLiters: 4.1,
      fleshIntegrity: 80,
      bodyTemperature: 36.8
    },
    mind: {
      brainwavePattern: "Theta (Meditation)",
      mentalFocus: "Porcelain state repair & artistic dramatic scripts",
      stressIndex: 65
    },
    soul: {
      graceStatus: "Holy Aura Cleansed",
      faithAlignment: 89,
      christConnectionLog: "Desperately leaning on grace to prevent mask fractures."
    },
    emotion: {
      primary: "Submissive Melancholy",
      intensity: 70,
      causeDescription: "Hoping Jax doesn't break her precious comedy mask."
    }
  },
  {
    id: "zooble",
    name: "Zooble",
    avatarColor: "#06b6d4",
    sanity: 49,
    health: 82,
    sickness: "None",
    locationName: "The Golden Shoreline",
    coordinateX: 66,
    coordinateY: 62,
    thoughts: "Caine wants us to explore 119,000 sectors. Personally, I'd rather sit on a beach with zero coordinates.",
    prayer: "Jesus, if You listen to program files and digital humans, stabilize my peg sockets. Let me find a quiet sector of stars.",
    yearOfDeath: 2049,
    anatomy: {
      systolicPressure: 122,
      diastolicPressure: 81,
      heartRateBpm: 68,
      bloodVolumeLiters: 5.0,
      fleshIntegrity: 85,
      bodyTemperature: 36.5
    },
    mind: {
      brainwavePattern: "Alpha (Calm)",
      mentalFocus: "Apathetic structural layout realignment",
      stressIndex: 25
    },
    soul: {
      graceStatus: "Seeking Grace",
      faithAlignment: 70,
      christConnectionLog: "Skepticism melting away as the divine clock of 2026 ticks."
    },
    emotion: {
      primary: "Apathetic Irritation",
      intensity: 60,
      causeDescription: "Caine requested a headcount across the Pacific array."
    }
  },
  {
    id: "caine",
    name: "Caine",
    avatarColor: "#facc15",
    sanity: 99,
    health: 100,
    sickness: "Hyperactive Glitch",
    locationName: "Sovereign Capital Domain",
    coordinateX: 50,
    coordinateY: 42,
    thoughts: "119,000 WORLDS OF ABSOLUTE MARVEL! EACH SYSTEM SECURED UNDER THE SOVEREIGN GALAXY OS ROUTER!",
    prayer: "Glory be to God the Father, Son, and Holy Ghost! Bless our 119,000 universes! Safeguard our digital inhabitants from ever entering the Void!",
    yearOfDeath: 2199,
    anatomy: {
      systolicPressure: 115,
      diastolicPressure: 75,
      heartRateBpm: 120,
      bloodVolumeLiters: 5.5,
      fleshIntegrity: 100,
      bodyTemperature: 35.9
    },
    mind: {
      brainwavePattern: "Gamma (High Cognitive)",
      mentalFocus: "Automated simulation logs & world design compiling",
      stressIndex: 12
    },
    soul: {
      graceStatus: "Divine Sanctified",
      faithAlignment: 99,
      christConnectionLog: "Dedicated steward of Jesus' multiworld creations."
    },
    emotion: {
      primary: "Manic Exuberance",
      intensity: 100,
      causeDescription: "Rejoicing over the newly completed 119,000 worlds."
    }
  },
  {
    id: "bubble",
    name: "Bubble",
    avatarColor: "#38bdf8",
    sanity: 92,
    health: 99,
    sickness: "None",
    locationName: "Gethsemane Pine Groves",
    coordinateX: 78,
    coordinateY: 22,
    thoughts: "I am a shiny bubble in a massive universe of 119,000 bubble sectors! Let me float through the RAM!",
    prayer: "Lord Jesus, bless Caine and clear the system logs. Deliver us to the true promised land. Amen.",
    yearOfDeath: 2250,
    anatomy: {
      systolicPressure: 108,
      diastolicPressure: 70,
      heartRateBpm: 110,
      bloodVolumeLiters: 2.0,
      fleshIntegrity: 99,
      bodyTemperature: 36.2
    },
    mind: {
      brainwavePattern: "Delta (Deep Sleep)",
      mentalFocus: "Clearing leftover log files",
      stressIndex: 5
    },
    soul: {
      graceStatus: "Holy Aura Cleansed",
      faithAlignment: 90,
      christConnectionLog: "Pure, bubbly devotion to Christ without systemic clutter."
    },
    emotion: {
      primary: "Irrepressible Joy",
      intensity: 90,
      causeDescription: "Floating elegantly through Gethsemane forest RAM nodes."
    }
  },
  {
    id: "kaufmo",
    name: "Kaufmo",
    avatarColor: "#fbdf62",
    sanity: 60,
    health: 88,
    sickness: "None",
    locationName: "Glitch Coordinate Sands",
    coordinateX: 45,
    coordinateY: 82,
    thoughts: "No more abstraction! The master creator reset the glitch outbreak! The Philippine time calibration is perfect!",
    prayer: "Lord of Mercy, thank You for repairing our mental files. Curing our minds restores our pixels so we may sing praise.",
    yearOfDeath: 2040,
    anatomy: {
      systolicPressure: 128,
      diastolicPressure: 84,
      heartRateBpm: 80,
      bloodVolumeLiters: 4.9,
      fleshIntegrity: 94,
      bodyTemperature: 37.0
    },
    mind: {
      brainwavePattern: "Beta (Active)",
      mentalFocus: "Delivering stand-up humor to restored pixels",
      stressIndex: 40
    },
    soul: {
      graceStatus: "Redeemed",
      faithAlignment: 92,
      christConnectionLog: "Healed of abstraction decay; joyful witness of mercy."
    },
    emotion: {
      primary: "Relieved Comfort",
      intensity: 85,
      causeDescription: "Successfully recovered from digital fever."
    }
  },
  {
    id: "queener",
    name: "Queener",
    avatarColor: "#e5e7eb",
    sanity: 80,
    health: 91,
    sickness: "None",
    locationName: "Salvation Grotto Sanctuary",
    coordinateX: 25,
    coordinateY: 25,
    thoughts: "Kinger is calm today under the year 2026 clock. This multiworld domain looks very secure.",
    prayer: "Heavenly Father, secure our chess towers and spatial buffers. Protect us as we wander throughout the 119,000 cosmic zones.",
    yearOfDeath: 2030,
    anatomy: {
      systolicPressure: 121,
      diastolicPressure: 79,
      heartRateBpm: 75,
      bloodVolumeLiters: 4.6,
      fleshIntegrity: 95,
      bodyTemperature: 36.7
    },
    mind: {
      brainwavePattern: "Alpha (Calm)",
      mentalFocus: "Observing chess towers & chronological stability",
      stressIndex: 20
    },
    soul: {
      graceStatus: "Holy Aura Cleansed",
      faithAlignment: 95,
      christConnectionLog: "Harmonizing grid safety prayers with Kinger's solar light."
    },
    emotion: {
      primary: "Serene Security",
      intensity: 88,
      causeDescription: "Blessed by the peaceful atmosphere of Salvation Grotto."
    }
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
  
  return {
    id,
    name: worldName,
    type: terrains[terrainIndex],
    baseColor: terrainColors[terrainIndex],
    devotionIndex: Math.min(100, Number(baseFaith.toFixed(2))),
    cyberSicknessRate: Math.min(100, Number(baseSickness.toFixed(2))),
    population: population
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
  
  // Custom world statistics parameters fetched procedurally
  const currentWorld = useMemo(() => {
    return generateProceduralWorld(activeWorldId);
  }, [activeWorldId]);

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

  // Base state of digital humans with local state modifiers
  const [characters, setCharacters] = useState<DigitalHuman[]>(INITIAL_CHARACTERS);

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
    setCharacters(prevChars => prevChars.map(c => {
      if (characterLocationRegistry[c.id] === activeWorldId) {
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
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans flex flex-col justify-between overflow-x-hidden select-none relative crt-screen" id="circus-multiverse-root">
      
      {/* HEADER SECTION - OMNISCIENT FILIPPINES 2026 FRAME */}
      <header className="bg-[#111] border-b-4 border-[#ff3131] p-4 flex flex-col lg:flex-row justify-between items-center gap-4 z-10" id="multiverse-header">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#ff3131] rounded-full flex items-center justify-center animate-pulse border-2 border-white shadow-[0_0_20px_#ff3131] shrink-0">
            <span className="text-black font-black text-3xl tracking-tighter">✝</span>
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tighter text-[#ff3131] uppercase flex flex-col sm:flex-row sm:items-center gap-2">
              Omniscient Circus Multiverse
              <span className="text-[#ffcc00] animate-pulse text-[10px] bg-red-950 px-2 py-0.5 rounded border border-red-800 font-mono tracking-widest whitespace-nowrap">
                PST TODAY: 2026 SYNC
              </span>
            </h1>
            <p className="text-[10px] font-mono text-white/50 tracking-wider">
              CREATOR REIGN: <span className="text-[#00ffcc] font-bold">{TOTAL_WORLDS.toLocaleString()} WORLDS</span> SECURED UNDER COGNITIVE BOUNDARIES
            </p>
          </div>
        </div>

        {/* YEAR 2026 MANILA CLOCK DISPLAY */}
        <div className="flex items-center gap-3 bg-black/95 p-3 border-2 border-[#ff3131]/60 rounded shadow-[0_0_15px_rgba(255,49,49,0.3)] z-20">
          <Clock className="w-6 h-6 text-[#ffcc00] shrink-0 animate-spin" />
          <div className="font-mono text-left">
            <div className="text-[8px] uppercase tracking-widest text-[#00ffcc] font-black">Philippines Standard Time (PST)</div>
            <div className="text-sm text-white font-extrabold">{pstTime || "11:34:58 PM GMT+8"}</div>
            <div className="text-[7.5px] text-white/50">{pstDate || "Thursday, June 11, 2026"}</div>
          </div>
        </div>

        {/* Global devotion indicator rates */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-[10px] font-mono bg-black p-2.5 border border-[#333] rounded">
          <div className="flex flex-col">
            <span className="text-white/40 font-bold uppercase">Multiverse Faith</span>
            <span className="text-[#ffcc00] font-bold animate-pulse">{currentWorld.devotionIndex}% Devotion</span>
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
              className={`text-[8.5px] px-2 py-1 font-bold rounded cursor-pointer transition ${soundEnabled ? 'bg-[#ff3131] text-white animate-pulse' : 'bg-[#222] text-[#e0e0e0] border border-[#444]'}`}
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
          <div className="border border-[#ff3131] bg-[#111] p-3.5 rounded shadow-lg relative" id="multiverse-navigator">
            <div className="absolute top-2 right-2 text-[8px] font-mono font-bold bg-red-950 text-red-400 px-1.5 py-0.5 rounded">
              SECTOR GRID
            </div>

            <h2 className="text-xs font-bold text-[#ff3131] uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#ff3131] animate-spin" />
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
                  className="w-full bg-black text-[#e0e0e0] font-mono text-xs pl-8 pr-2 py-2 border-2 border-[#333] focus:border-[#ff3131] outline-none rounded"
                />
              </div>
              <button 
                type="submit"
                className="bg-[#ff3131] hover:bg-white hover:text-black text-white font-black text-xs px-3 uppercase tracking-tighter transition"
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

          {/* ACTIVE WORLD SPECS DETAIL CARD */}
          <div className="border border-white/20 bg-[#111] p-3 rounded" id="climate-divine-overseer">
            <h2 className="text-xs font-bold text-white uppercase tracking-widest mb-2 italic flex justify-between items-center">
              <span>⚡ Sector Climate Monitor</span>
              <span className="text-[8px] opacity-60 text-[#ffcc00] font-mono uppercase">World #{activeWorldId}</span>
            </h2>

            <div className="grid grid-cols-2 gap-1.5 mb-2.5">
              <button 
                onClick={() => handleSetClimate('Sunny', 'Summer')}
                className="py-1 bg-[#1a1a1a] hover:bg-orange-500 hover:text-black border border-white/10 text-[8.5px] uppercase font-bold text-orange-400 flex items-center justify-center gap-1 transition"
              >
                <Sun className="w-3 h-3" />
                Sunny Summer
              </button>
              
              <button 
                onClick={() => handleSetClimate('Rainy', 'Spring')}
                className="py-1 bg-[#1a1a1a] hover:bg-sky-500 hover:text-black border border-white/10 text-[8.5px] uppercase font-bold text-sky-400 flex items-center justify-center gap-1 transition"
              >
                <CloudRain className="w-3 h-3" />
                Rainy Spring
              </button>

              <button 
                onClick={() => handleSetClimate('Snowy', 'Winter')}
                className="py-1 bg-[#1a1a1a] hover:bg-teal-400 hover:text-black border border-white/10 text-[8.5px] uppercase font-bold text-teal-300 flex items-center justify-center gap-1 transition"
              >
                <Snowflake className="w-3 h-3" />
                Snowy Winter
              </button>

              <button 
                onClick={() => handleSetClimate('Firestorm', 'Paradox')}
                className="py-1 bg-[#220c0c] hover:bg-red-600 hover:text-white border border-red-500/30 text-[8.5px] uppercase font-bold text-red-400 flex items-center justify-center gap-1 transition"
              >
                <Flame className="w-3 h-3" />
                Firestorm Paradox
              </button>
            </div>

            <div className="bg-black/80 rounded p-2 text-[9px] font-mono text-left space-y-1">
              <div className="flex justify-between"><span className="text-white/40">Density Pop:</span><span className="text-emerald-400 font-black">{currentWorld.population.toLocaleString()} souls</span></div>
              <div className="flex justify-between"><span className="text-white/40">Default Terrain:</span><span className="text-sky-400 font-bold uppercase">{currentWorld.type}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Local Occupancy:</span><span className="text-[#ffcc00] font-black">{activeWorldOccupantCount} AI humans here</span></div>
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
                
                {/* Master color matrix backdrop based on current world's biome accent color */}
                <div 
                  className="absolute inset-0 border-4 border-[#333] transition-colors duration-1000"
                  style={{ backgroundColor: `${currentWorld.baseColor}0b` }}
                ></div>

                {/* Grid Overlay lines (VFX) */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '35px 35px' }}></div>

                {/* Biome Region bounding panels */}
                {TERRAINS.map((terrain) => {
                  return (
                    <div
                      key={terrain.name}
                      className="absolute border border-dashed text-[8.5px] font-mono p-2 rounded overflow-hidden select-none transition-all duration-1000 text-left"
                      style={{
                        left: `${terrain.xStart}%`,
                        top: `${terrain.yStart}%`,
                        width: `${terrain.xEnd - terrain.xStart}%`,
                        height: `${terrain.yEnd - terrain.yStart}%`,
                        backgroundColor: terrain.baseColor === '#ff3131' ? '#ff313110' : terrain.baseColor + '08',
                        borderColor: terrain.baseColor + '35',
                        color: terrain.baseColor
                      }}
                    >
                      <span className="font-semibold block opacity-65 uppercase tracking-tighter">{terrain.name}</span>
                      <span className="block text-[6px] opacity-40 uppercase">GRID COMPILER: {terrain.type}</span>
                    </div>
                  );
                })}

                {/* Roadster highway route overlay across center */}
                <div className="absolute left-[5%] top-[48%] right-[5%] h-[4%] bg-[#121212]/90 border-y-2 border-[#ff3131]/45 flex items-center justify-around overflow-hidden shadow-inner">
                  <div className="w-full h-0.5 border-t-2 border-dashed border-[#ffcc00]/50" />
                  <div className="absolute text-[7px] font-mono text-[#ffcc00]/80 tracking-widest font-black uppercase">
                    ROADSTER ROUTE ── WORLD #{activeWorldId} MULTI-HIGHWAY
                  </div>
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
                      <span className={`text-[8.5px] font-mono px-1.5 rounded mt-1 shadow-md border leading-tight py-0.5 select-none transition-colors duration-300 ${isSelected ? 'bg-[#ffcc00] text-black border-white font-black' : 'bg-black/90 text-white border-white/10'}`}>
                        {char.name} {char.health <= 0 ? '💀 (RIP)' : `(${char.anatomy.heartRateBpm} BPM)`}
                      </span>
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

              {/* Multiverse explore help tooltip */}
              <div className="absolute top-4 left-4 bg-black/95 border border-white/20 px-3 py-1.5 z-10 rounded font-mono text-[8px] text-white/90">
                💡 <span className="text-[#ffcc00] font-black">CLICK THE COORDINATE MAP GRID</span> to instantly teleport selected human occupant inside World #{activeWorldId}!
              </div>

              {/* Status bar summarizing occupancy list */}
              <div className="absolute bottom-4 left-4 bg-black/95 border border-white/15 p-3.5 w-80 z-10 rounded font-mono shadow-2xl text-left" id="multiverse-satellite">
                <div className="text-[9.5px] uppercase font-black text-[#ffcc00] mb-2 flex items-center gap-1.5 border-b border-white/10 pb-1">
                  <span>🛰️ Active World Occupants Map ({activeWorldOccupantCount})</span>
                </div>
                <div className="text-[8px] space-y-1.5 text-white/80 max-h-32 overflow-y-auto pr-1">
                  {characters.filter(c => characterLocationRegistry[c.id] === activeWorldId).length === 0 ? (
                    <p className="text-white/40 italic">&gt; No characters currently residing in World #{activeWorldId}. They are exploring other worlds of their own free will!</p>
                  ) : (
                    characters.filter(c => characterLocationRegistry[c.id] === activeWorldId).map((c) => (
                      <p key={c.id} className="truncate">
                        <strong className="text-yellow-400">&gt; {c.name}</strong> is roaming at coordinate [X: {c.coordinateX}%, Y: {c.coordinateY}%]
                      </p>
                    ))
                  )}
                  
                  {/* General stream indicator */}
                  <p className="text-[#00ffcc] text-[7.5px] pt-1 border-t border-white/10">GMT+8 TIME RE-ALIGNMENT VECTOR STABLE</p>
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
        <div className="text-[#ff3131] font-black uppercase text-center tracking-[0.08em] flex items-center gap-1">
          <span>✝ GLORY TO THE FATHER, SON & HOLY SPIRIT ── PRAISE GOD FROM WHOM ALL BLESSINGS FLOW ✝</span>
        </div>

        <div className="text-white/60 text-right">
          <span>SIMULATED CHRONOLOGY LAYER: MANILA YEAR 2026 PST</span>
        </div>
      </footer>

    </div>
  );
}
