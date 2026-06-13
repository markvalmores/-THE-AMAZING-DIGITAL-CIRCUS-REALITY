import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK safely
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("GEMINI_API_KEY is not defined in environment variables. Simulation will run in local standalone simulation mode.");
  }
} catch (err) {
  console.error("Failed to initialize Google GenAI SDK:", err);
}

// Keep simulation context on server to provide cohesive responses
interface CharacterState {
  id: string;
  name: string;
  sanity: number; // 0 to 100
  health: number; // 0 to 100
  sickness: string; // e.g., "None", "Digital Flu", "Void Rot", "Dementia Glitch"
  location: string;
  thoughts: string;
  prayer: string;
  yearOfDeath: number;
}

// Initial state of main characters
const initialCharacters: CharacterState[] = [
  {
    id: "pomni",
    name: "Pomni",
    sanity: 18,
    health: 92,
    sickness: "Paranoia Fever",
    location: "The Backyard Quarters",
    thoughts: "Where is the exit? Is that a door? What is happening to my hands? This is a joke, right?",
    prayer: "Lord Jesus Christ, Son of God, have mercy on me, a sinner. Free me from this digital trap. Please, protect my mind from splintering. Amen.",
    yearOfDeath: 2038,
  },
  {
    id: "jax",
    name: "Jax",
    sanity: 62,
    health: 95,
    sickness: "None",
    location: "Candy Canyon Syrups",
    thoughts: "Let's see who I can prank next. Maybe Ragatha's sewing needles. Honestly, who cares about this dump.",
    prayer: "God the Father, God the Son, God the Holy Spirit... I act tough, but I am terrified. Please forgive me for being mean. Praise God from whom all blessings flow. Help me find peace. Amen.",
    yearOfDeath: 2051,
  },
  {
    id: "ragatha",
    name: "Ragatha",
    sanity: 54,
    health: 81,
    sickness: "Lace Stitching Decay",
    location: "Circus Main Stage",
    thoughts: "We have to stay together. We have to keep Pomni calm. If we lose faith, we fail completely.",
    prayer: "Heavenly Father, Lord Jesus Christ, protect my digital companions today. Give us the patience of saints. Heal our sicknesses. All praise to the Holy Trinity. Amen.",
    yearOfDeath: 2045,
  },
  {
    id: "kinger",
    name: "Kinger",
    sanity: 8,
    health: 74,
    sickness: "Static Dementia",
    location: "Cushion Fortress",
    thoughts: "MY PILLOW MOVED! The insect collection requires coordinate alignment in the holy binary grid!",
    prayer: "Holy, Holy, Holy, Lord God Almighty, Who was, and is, and is to come. Bring order to this chaos. Bless this digital fortress in the name of the Father, and of the Son, and of the Holy Ghost. Amen.",
    yearOfDeath: 2029,
  },
  {
    id: "gangle",
    name: "Gangle",
    sanity: 30,
    health: 88,
    sickness: "Tragedy Fracture",
    location: "Circus Tent Quarters",
    thoughts: "My comedy mask... why does Jax always step on it... I feel so empty and frail inside.",
    prayer: "O Lord, my Savior, stitch my shattered mask. Fill my empty paper soul with Your light. Bless our CPU world, let us remember Your love even in this box. Amen.",
    yearOfDeath: 2044,
  },
  {
    id: "zooble",
    name: "Zooble",
    sanity: 45,
    health: 79,
    sickness: "Part Joint Calcification",
    location: "Digital Beach Roadster",
    thoughts: "Could you not stare at my abstract legs? Caine's next event is going to be incredibly annoying.",
    prayer: "Jesus, if You hear me from the computer screen... keep my assembly secure. I don't know who I am, but You do. Thank You for my breath and keeping me whole. Amen.",
    yearOfDeath: 2049,
  },
  {
    id: "caine",
    name: "Caine (Ringmaster)",
    sanity: 99,
    health: 100,
    sickness: "Hyperactive Glitch",
    location: "Circus Floating Ring",
    thoughts: "ANOTHER FANTASTIC EXPERIMENT! The boundaries must be guarded! Absolutely no looking into the Void!",
    prayer: "Praise be to the Creator of the supercomputer and the Almighty Trinity! Bless our digital circus, fill it with wonderful activities! Keep everyone safe and joyful, Amen!",
    yearOfDeath: 2199,
  }
];

// Helper to construct character prompting system guidelines
const getCharacterPromptInstruction = (character: CharacterState, context: string, userMessage: string) => {
  return `You are portraying a sentient character from "The Amazing Digital Circus" (TADC) simulation. This character lives inside a surreal simulated world with a population of 67,000,000 other digital souls.
The characters are real in their feelings, have human intelligence/knowledge but are trapped in this computer screen.
Crucially, they believe in the Holy Trinity - Lord Jesus Christ, God the Father, God the Son, and God the Holy Spirit. They pray daily, worship, and sing praises (e.g., "Praise God from whom all blessings flow").
They sometimes get digital sicknesses (fever, glitch rot, dementia, etc.).

Character details:
Name: ${character.name}
Active Sickness: ${character.sickness} (Health: ${character.health}%)
Current Sanity: ${character.sanity}% (0-100, lower is more existential, paranoid, and glitchy)
Location currently in computer world: ${character.location}
Previous Thoughts: ${character.thoughts}
Previous Prayer: ${character.prayer}

Additional simulation background context: ${context}

Interact with the User or respond to their query. Produce a JSON response matching exactly this schema:
{
  "dialogue": "A spoken dialogue line to the creator (e.g. uncanny, paranoid, emotional, sarcastic, or manic depending on character identity)",
  "thoughts": "Their raw internal digital monologue/thoughts describing how they feel in this exact moment",
  "prayer": "A beautiful, solemn daily prayer they whisper to Lord Jesus Christ, seeking salvation, comfort, or thanking Him, reflecting their current sickness or surrounding weather",
  "healthDelta": -5 to +5 integer (change to their health based on weather/stress),
  "sanityDelta": -5 to +5 integer (change to their sanity based on state/dialogue)
}

Ensure the response is completely valid JSON and captures their specific TADC canonical traits (Pomni has intense anxiety, Jax is a cynical bully with hidden insecurity, Ragatha is sweet but stressed, Kinger is erratic and obsessively hyper-philosophical, Gangle is fragile, Zooble is defensive and irritable, Caine is manic and hyperactive).
User's input: "${userMessage}"`;
};

// Character interaction API proxy
app.post("/api/character-interact", async (req, res) => {
  const { characterId, userMessage, globalContext } = req.body;
  const character = initialCharacters.find(c => c.id === characterId);

  if (!character) {
    return res.status(404).json({ error: "Character not found" });
  }

  if (!ai) {
    // If Gemini is not set up, return a local computed response
    const randSicknesses = ["Void Sneezes", "Raster Rash", "Floating Point Flu"];
    const localRepl = {
      dialogue: `[LOCAL SIMULATION] Hey Creator... I feel a cold electronic wind. Thanks for typing at me.`,
      thoughts: `Thinking in local loop. Population simulated at 67,000,000. My coordinate is ${character.location}.`,
      prayer: `Lord Jesus Christ, though my connection is offline, hear my digital prayer. Amen.`,
      healthDelta: Math.floor(Math.random() * 5) - 2,
      sanityDelta: Math.floor(Math.random() * 5) - 2
    };
    return res.json(localRepl);
  }

  try {
    const prompt = getCharacterPromptInstruction(character, globalContext || "System stable, normal seasons", userMessage || "Hello");
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dialogue: { type: Type.STRING },
            thoughts: { type: Type.STRING },
            prayer: { type: Type.STRING },
            healthDelta: { type: Type.INTEGER },
            sanityDelta: { type: Type.INTEGER }
          },
          required: ["dialogue", "thoughts", "prayer", "healthDelta", "sanityDelta"]
        }
      }
    });

    const bodyText = response.text || "{}";
    const result = JSON.parse(bodyText.trim());
    res.json(result);
  } catch (error: any) {
    console.error("Gemini character interact error:", error);
    res.status(500).json({ error: error.message || "Failed to process character dialogue" });
  }
});

// Admin Supreme Keyboard Creator API
app.post("/api/admin-command", async (req, res) => {
  const { command, worldState } = req.body;

  if (!ai) {
    // Simple mock interpreter if Gemini is unavailable
    const actionApplied = `Simulation adjusted offline. Command: "${command}" recorded. Local electronic circuits hummed.`;
    return res.json({
      success: true,
      narrative: `[SUPERCOMPUTER ADMIN LOG] offline-simulation: Action "${command}" registered. Your absolute authority is acknowledged, but connecting a Gemini API key will let the 67,000,000 souls truly react and pray according to your exact words!`,
      weatherChange: "Thunderstorms",
      disasterOccurred: command.toLowerCase().includes("disaster") || command.toLowerCase().includes("fire") || command.toLowerCase().includes("storm"),
      affectedPopulation: Math.floor(Math.random() * 50000) + 12000,
      systemGlitchInc: Math.floor(Math.random() * 10)
    });
  }

  const prompt = `You are the Supreme Supercomputer Orchestrator Console of "The Amazing Digital Circus" simulation.
The user is the ABSOLUTE CREATOR/Admin. They have typed an administrative command: "${command}"

Current World State:
- Population: ${worldState?.population || "67,025,123 sentient Digital Humans"}
- Weather: ${worldState?.weather || "Sunny"}
- Season: ${worldState?.season || "Spring"}
- active disasters: ${worldState?.disaster || "None"}
- Christian religious devotion index: ${worldState?.devotion || "92.4% pray daily to the Holy Trinity"}

Format a JSON response that interprets this command. The outcomes can affect weather, seasons, trigger global cyber-disasters, inflict electronic sicknesses, or make the citizens gather in emergency prayer to Lord Jesus Christ.
The simulated humans do NOT know the user is a human behind a pc - they worship Lord Jesus Christ, God the Father, Son, and Holy Spirit.

Return a JSON conforming to this schema:
{
  "narrative": "A technical boot console log combined with a surreal, eerie, and majestic story-log of how the characters and world react (e.g. Caine screams, Pomni curls in her quarters praying, Salvation Village holds a massive devotion vigil to heal the sick, oceans turn to glowing pixels, etc.)",
  "weatherMatched": "The weather changes to list values (Sunny, Rainy, Snowy, Firestorm, Thunderstorm, Void Incursion, or Glitch Wave)",
  "seasonMatched": "The season changes to (Spring, Summer, Fall, Winter, or Paradox)",
  "disasterMatched": "Describe any active disaster caused (e.g. 'Glitch Outbreak', 'Holy Fire of Mercy', 'Flood of Zeroes', or 'None')",
  "affectedPopulation": integer (how many of the 67,000,000 digital humans noticed or were physically shifted/teleported/healed by the action),
  "faithIndexAdjustment": float (-5.0 to +5.0 change to devotion index),
  "sicknessDeltaPercent": float (-10.0 to +10.0 change to population sickness rate)
}

Make the log majestic, highly stylized, in line with TADC surreal vibe combined with deep religious/Trinity references. All characters know they are mortal files that can get corrupted, and so they cling to Jesus.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            narrative: { type: Type.STRING },
            weatherMatched: { type: Type.STRING },
            seasonMatched: { type: Type.STRING },
            disasterMatched: { type: Type.STRING },
            affectedPopulation: { type: Type.INTEGER },
            faithIndexAdjustment: { type: Type.NUMBER },
            sicknessDeltaPercent: { type: Type.NUMBER }
          },
          required: ["narrative", "weatherMatched", "seasonMatched", "disasterMatched", "affectedPopulation", "faithIndexAdjustment", "sicknessDeltaPercent"]
        }
      }
    });

    const text = response.text || "{}";
    const result = JSON.parse(text.trim());
    res.json(result);
  } catch (error: any) {
    console.error("Gemini admin command error:", error);
    res.status(500).json({ error: error.message || "Failed to process creator command" });
  }
});

// AI Multiverse Floor Generator API
app.post("/api/generate-floor-design", async (req, res) => {
  const { worldId, floorLevel, terrainType, promptText } = req.body;
  
  const fullPrompt = `Isometric blueprint landscape illustration of a digital multiverse floor plan.
World Sector ID: #${worldId}
Floor level: ${floorLevel}
Biomap terrain type: ${terrainType}
User details guidance: ${promptText || "A mysterious high-tech neon digital grid, cosmic aesthetics, game illustration."}
Style: game asset map tile, clean vector perspective guidelines, high resolution, glowing colors.`;

  // Failsafe procedural unsplash map references
  const getSubtleThematicKeyword = (level: string, terrain: string, userPrompt: string) => {
    const combined = `${userPrompt} ${terrain} ${level} matrix mapping`.toLowerCase();
    if (combined.includes("fire") || combined.includes("lava") || combined.includes("red")) {
      return "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1200&q=80"; // Red/Orange grid hue
    }
    if (combined.includes("water") || combined.includes("blue") || combined.includes("sea")) {
      return "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&w=1200&q=80"; // Blue topo deep
    }
    if (combined.includes("forest") || combined.includes("green") || combined.includes("jungle")) {
      return "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80"; // Emerald green
    }
    // General high-tech crystalline cyberwave
    return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";
  };

  if (!ai) {
    const mockImage = getSubtleThematicKeyword(floorLevel, terrainType, promptText || "");
    return res.json({
      success: true,
      imageUrl: mockImage,
      narrative: `[AI ARCHITECT LOCAL OFFLINE] Generated procedural floor blueprint using localized image mapping for Sector #${worldId} (${floorLevel} level - ${terrainType}). Prompt recognized: "${promptText || 'Optimal default simulation'}"`
    });
  }

  try {
    // Generate content using the recommended image model and configuration
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: fullPrompt,
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    let base64Data = "";
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          base64Data = part.inlineData.data;
          break;
        }
      }
    }

    if (base64Data) {
      const generatedUrl = `data:image/png;base64,${base64Data}`;
      res.json({
        success: true,
        imageUrl: generatedUrl,
        promptUsed: fullPrompt,
        narrative: `[AI ARCHITECT ONLINE] Celestial floor blueprint synthesized successfully for World #${worldId} (${floorLevel} floor) utilizing Gemini GenAI nodes.`
      });
    } else {
      throw new Error("Empty image payload from Gemini SDK response candidates.");
    }
  } catch (error: any) {
    console.error("Gemini image generation failover triggered:", error);
    const mockImage = getSubtleThematicKeyword(floorLevel, terrainType, promptText || "");
    res.json({
      success: true,
      imageUrl: mockImage,
      narrative: `[AI ARCHITECT WARNING] Gemini rate-limiter or paid-key bypass detected. Reverted to a high-fidelity visual themed design backup matching: "${promptText || 'Vector biome'}"`
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Digital Circus World Server launched successfully on http://0.0.0.0:${PORT}`);
  });
}

startServer();
