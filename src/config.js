// ═══════════════════════════════════════════════════════
//  BYTA UT YOUR_API_KEY mot din riktiga Anthropic API-nyckel
//  Exempel: const API_KEY = "sk-ant-api03-abc123...";
// ═══════════════════════════════════════════════════════
const API_KEY = "YOUR_API_KEY";

const CONFIG = {
  model: "claude-haiku-4-5-20251001",
  maxTokens: 800,
  questionsPath: "public/questions/manniskokroppen.json",
  facitPath: "public/facit/facit.json",
  imagesPath: "public/images/",
};
