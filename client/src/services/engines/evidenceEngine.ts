// Evidence engine — deterministic mock. Swap the internals for a real
// document/vector store later; the returned shape stays the same.

export const evidenceEngine = {
  initialize() {
    return {
      bullets: ['Evidence Engine initialized', 'Loaded 7 documents', 'Indexed 12 sources'],
    };
  },
  collect() {
    return {
      bullets: ['12 evidence points evaluated', '8 supporting signals', '4 conflicting signals'],
      evidence: 12,
    };
  },
};
