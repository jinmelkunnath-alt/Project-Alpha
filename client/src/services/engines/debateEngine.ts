// Debate engine — deterministic mock. Replace with a real adversarial/reasoning
// engine later; the returned shape stays the same.

export const debateEngine = {
  construct() {
    return {
      bullets: [
        'Supporting case constructed',
        'Counter-case constructed',
        'Weak assumptions challenged',
        'Contradictions reviewed',
      ],
    };
  },
};
