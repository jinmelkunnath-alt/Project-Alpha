// Research engine — deterministic mock. Replace with a real web-search/research
// provider later (no API key required for this prototype).

export const researchEngine = {
  market() {
    return {
      bullets: ['Market demand trending up', 'Competitor activity elevated'],
      researchStatus: 'Active' as const,
    };
  },
  competitive() {
    return {
      bullets: ['5 key competitors mapped', '2 direct threats'],
      researchStatus: 'Complete' as const,
    };
  },
};
