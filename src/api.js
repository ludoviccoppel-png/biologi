// Handles all Anthropic API calls
const API = (() => {

  async function call(messages, systemPrompt = "", maxTokens = CONFIG.maxTokens) {
    const body = {
      model: CONFIG.model,
      max_tokens: maxTokens,
      messages,
    };
    if (systemPrompt) body.system = systemPrompt;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.content.map(c => c.text || "").join("");
  }

  async function getHint(question) {
    return call(
      [{ role: "user", content: `Fråga: ${question.text}\nNyckelbegrepp: ${question.modelAnswer || ""}\n\nGe ETT kort tips (1-2 meningar) som hjälper eleven komma igång, utan att avslöja svaret. Skriv på svenska.` }]
    );
  }

  async function gradeOpen(question, studentAnswer, facitCriteria) {
    const criteriaText = facitCriteria
      ? `\nBedömningskriterier från Skolverket:\n${JSON.stringify(facitCriteria, null, 2)}`
      : "";

    const prompt = `Du är en biologilärare i Sverige. Bedöm elevens svar på en öppen biologifråga med poängskalan 0–3.

Fråga: ${question.text}
Nyckelbegrepp som bör nämnas: ${question.modelAnswer || ""}${criteriaText}
Elevens svar: ${studentAnswer}

Svara EXAKT i detta format:
POÄNG: [0, 1, 2 eller 3]
ÅTERKOPPLING: [3-5 meningar konstruktiv återkoppling på svenska]

Poängkriterier:
3 – Fullständigt, täcker alla centrala begrepp med tydliga förklaringar.
2 – Bra men saknar något eller har en mindre felaktighet.
1 – Visar grundläggande förståelse men saknar viktiga begrepp.
0 – Felaktigt eller alltför ofullständigt.`;

    return call([{ role: "user", content: prompt }]);
  }

  async function chat(messages, questionContext) {
    return call(
      messages,
      `Du är en biologilärare i Sverige som just bedömt en elevs svar på frågan: "${questionContext}". Svara pedagogiskt och uppmuntrande på elevens följdfrågor. Håll svaren korta (2-4 meningar). Skriv på svenska.`,
      500
    );
  }

  return { getHint, gradeOpen, chat };
})();
