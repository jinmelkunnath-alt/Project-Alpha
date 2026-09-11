// Prediction / forecasting engine — deterministic mock. Replace with a real
// forecasting model later.

export const predictionEngine = {
  future(year: number) {
    return {
      bullets: [`${year} → analyzed`],
    };
  },
  probability() {
    return {
      bullets: ['Weighted probability model applied', 'Confidence 78%'],
      confidence: 78,
    };
  },
};
