import type { OrbState } from 'thinking-orbs';

export interface ThinkingPhase {
  id: string;
  title: string;
  state: OrbState;
  log: string;
  microCode: string;
  terminalCommands: string[];
  terminalLogs: string[];
}

export interface DecisionAnalysisResult {
  verdict: 'GO' | 'CONDITIONAL GO' | 'CAUTION' | 'PIVOT';
  convictionScore: number;
  content: string;
  phases: ThinkingPhase[];
}

export const EXECUTIVE_THINKING_PHASES: ThinkingPhase[] = [
  {
    id: 'evidence',
    title: 'Finding Evidences',
    state: 'searching',
    log: 'Correlating empirical ground truths, baseline metrics, and verifiable signals...',
    microCode: '01000101 01110110 01101001 01100100 01100101 01101110 01100011 01100101',
    terminalCommands: [
      'alpha-cli vector fetch --index "ground-truth-v4" --similarity-threshold 0.88',
      'curl -s https://api.alpha.engine/v3/telemetry/signals | jq \'.market_benchmarks\'',
      'python3 -m telemetry.ground_truth --correlate-datasets --nodes=1492030',
    ],
    terminalLogs: [
      '[INIT] Connecting to Alpha Vector Index (1,492,030 ground truth nodes)...',
      '[INFO] Extracting 28 empirical signals & historical industry baselines.',
      '[DATA] Querying counterfactual precedent database... 42 relevant case studies retrieved.',
      '[EVAL] Vector similarity score: 0.946 [HIGH CONVICTION DATA ALIGNMENT].',
      '[OK] Ground truth evidence extraction complete (elapsed: 640ms).',
    ],
  },
  {
    id: 'attack',
    title: 'Attacking Decisions',
    state: 'weaving',
    log: 'Deploying adversarial red-team subroutines to attack confirmation bias...',
    microCode: '01010010 01000101 01000100 00101101 01010100 01000101 01000001 01001101',
    terminalCommands: [
      'alpha-cli redteam attack --target "executive-assumptions" --mode=adversarial',
      'python3 -m subroutines.stress_test --bias-elimination --confirmation-attack',
      'alpha-cli vulnerability-map --supplier-concentration --margin-erosion',
    ],
    terminalLogs: [
      '[EXEC] Spawning adversarial red-team subroutines (5 isolated agent processes)...',
      '[ATTACK] Challenging core growth velocity assumptions & single-point dependencies.',
      '[WARN] Vulnerability isolated: 74% probability of unexpected margin compression under demand spikes.',
      '[ATTACK] Stress-testing liquidity runway under 90-day deferred payment scenarios.',
      '[OK] Adversarial red-team attack vectors mapped & counter-measures initialized.',
    ],
  },
  {
    id: 'simulation',
    title: 'Creating a Simulation World',
    state: 'solving',
    log: 'Synthesizing 10,000 Monte Carlo multiverse scenario iterations...',
    microCode: '01010011 01001001 01001101 01010101 01001100 01000001 01010100 01000101',
    terminalCommands: [
      'alpha-cli simulation monte-carlo --iterations 10000 --multiverse-forks=8',
      'run_cluster_nodes --gpu-acceleration --threads 128 --seed 0x8F9A',
      'alpha-cli tail-risk calculate --drawdown-quantile p99',
    ],
    terminalLogs: [
      '[SIM] Initializing 10,000 Monte Carlo multiverse scenario simulations...',
      '[SIM] Batch 1/4 (2,500 iterations): P50 expected outcome stabilized.',
      '[SIM] Batch 2/4 (5,000 iterations): P95 drawdown bounded at -11.4%.',
      '[SIM] Batch 3/4 (7,500 iterations): Black Swan stress-test running (liquidity crunch scenario).',
      '[SIM] Batch 4/4 (10,000 iterations): Multiverse convergence verified.',
      '[OK] 10,000 scenario simulations converged (confidence: 99.3%).',
    ],
  },
  {
    id: 'probability',
    title: 'Checking Probability',
    state: 'connecting',
    log: 'Computing Bayesian posterior confidence intervals and asymmetric payoffs...',
    microCode: '01010000 01010010 01001111 01000010 01000001 01000010 01001001 01001100',
    terminalCommands: [
      'alpha-cli bayes calculate --prior "empirical" --posterior "asymmetric-payoff"',
      'python3 -m probability.distribution --confidence-interval 0.95',
    ],
    terminalLogs: [
      '[BAYES] Computing Bayesian posterior probability confidence intervals...',
      '[MATH] Prior probability weight: 0.79 -> Posterior conviction score: 87.8%',
      '[PAYOFF] Asymmetric upside ratio: +4.4x upside vs -1.0x bounded downside risk.',
      '[PAYOFF] Convexity metric: Positive asymmetric skew confirmed.',
      '[OK] Bayesian probability distribution successfully calculated.',
    ],
  },
  {
    id: 'predict',
    title: 'Predicting the Future',
    state: 'shaping',
    log: 'Extrapolating second-order ripple effects and 24-month horizon trajectories...',
    microCode: '01000110 01010101 01010100 01010101 01010010 01000101 01001101 01011001',
    terminalCommands: [
      'alpha-cli trajectory predict --horizon 24m --second-order-effects',
      'python3 -m horizon.forecasting --macro-drift --competitive-reaction',
    ],
    terminalLogs: [
      '[PREDICT] Extrapolating 24-month horizon trajectories & second-order ripple effects...',
      '[HORIZON] Months 0-6: Enterprise adoption velocity accelerates by +32% YoY.',
      '[HORIZON] Months 6-12: Competitive counter-moves emerge in secondary market tiers.',
      '[HORIZON] Months 12-24: Structural moat expansion & compounding margin leverage.',
      '[OK] Strategic timeline trajectory forecast generated.',
    ],
  },
  {
    id: 'risks',
    title: 'Finding Risks & Traps',
    state: 'composing',
    log: 'Isolating structural blind spots, existential traps, and ring-fencing failure modes...',
    microCode: '01010110 01000101 01010010 01000100 01001001 01000011 01010100 00100000',
    terminalCommands: [
      'alpha-cli synthesis verdict --isolate-traps --ring-fence-vulnerabilities',
      'alpha-cli kill-switch generate --milestone-trigger --drift-alarm',
    ],
    terminalLogs: [
      '[TRAP] Isolating structural blind spots & hidden failure modes.',
      '[RING-FENCE] Formulating mandatory 30-day kill-switch conditions precedent.',
      '[ALARM] Setting automated telemetry alarms for variance drift.',
      '[OK] Failure modes ring-fenced & strategic risk map finalized.',
    ],
  },
  {
    id: 'synthesis',
    title: 'Executive Verdict Synthesis',
    state: 'composing',
    log: 'Synthesizing conviction metrics, strategic trade-offs, and final execution playbook...',
    microCode: '01010011 01011001 01001110 01010100 01001008 01000101 01010011 01001001',
    terminalCommands: [
      'alpha-cli executive render --conviction-meter --actionable-playbook',
      'alpha-cli session finalize --checksum 0x99A4',
    ],
    terminalLogs: [
      '[SYNTHESIS] Executive conviction score compiled.',
      '[SYSTEM] Deep cognitive deliberation completed cleanly.',
      '[OK] Streaming final high-conviction decision verdict...',
    ],
  },
];

export function generateDecisionResponse(prompt: string): DecisionAnalysisResult {
  const p = prompt.toLowerCase();
  let verdict: 'GO' | 'CONDITIONAL GO' | 'CAUTION' | 'PIVOT' = 'CONDITIONAL GO';
  let conviction = 86;
  let summary = '';

  if (p.includes('risk') || p.includes('hedge') || p.includes('single-supplier') || p.includes('blind')) {
    verdict = 'CAUTION';
    conviction = 89;
    summary = `### Strategic Stance: CAUTION — Single-Supplier Vulnerability

**Bottom Line:** Multi-agent stress-testing across 10,000 permutations isolates a **73% probability of severe operational bottleneck** within 180 days under volume expansion.

#### Historical Precedent
Across 48 analyzed supply-chain scaleups, single-source dependency produced an average **24% unanticipated margin compression**. Contractual price caps failed 82% of the time under macro supply shocks.

#### Stress-Test Reality Check
Your primary vendor currently holds 100% pricing leverage. If enterprise receivables stretch from 45 to 75 days, cash runway burns 3.2x faster than modeled.

#### Probabilistic Trajectory
* **Bull Case (+14% margin):** Dual-vendor qualification within 45 days unlocks volume auctions and cushions scale.
* **Bear Trap (Margin wipeout):** Vendor allocation clawback forces emergency spot purchases at a 2.4x premium.

#### Immediate Action & Kill-Switch
1. **Immediate Move (Day 1–30):** Initiate parallel qualification sprints for two regional secondary suppliers.
2. **Buffer Reserve:** Lock a 90-day physical component buffer before expanding sales commitments.
3. **Mandatory Kill-Switch:** If secondary supplier validation fails by Day 45, freeze volume expansion.`;
  } else if (p.includes('build') && p.includes('buy')) {
    verdict = 'CONDITIONAL GO';
    conviction = 87;
    summary = `### Strategic Stance: CONDITIONAL GO — Acquire & Absorb

**Bottom Line:** Building internally forfeits 11 months of first-mover distribution. Acquiring compresses time-to-market immediately, provided technical integration debt is strictly ring-fenced.

#### Historical Precedent
In 36 audited early-stage AI acquisitions, **72% of deal value was lost** when key technical founders departed within 12 months due to non-milestone-based earnouts.

#### Stress-Test Reality Check
Target IP must pass a clean-room patent audit. An internal scratch build would push market entry to Q3 2027, handing distribution locks to competitors.

#### Probabilistic Trajectory
* **Bull Case ($22M pipeline):** Unified stacks within 90 days create an unassailable 11-month competitive head start.
* **Bear Trap (Rewrite risk):** Scientist churn leaves undocumented neural architecture requiring an emergency rebuild.

#### Immediate Action & Kill-Switch
1. **Deal Structuring:** Tie 45% of purchase consideration to 3-year milestones and researcher retention locks.
2. **Clean-Room Code Audit:** Complete mandatory 14-day technical audit to certify GPL independence.
3. **Mandatory Kill-Switch:** If lead research founders refuse the 3-year lock, abort deal and pivot to internal build.`;
  } else if (p.includes('launch') || p.includes('product')) {
    verdict = 'CONDITIONAL GO';
    conviction = 85;
    summary = `### Strategic Stance: CONDITIONAL GO — Phased Enterprise Rollout

**Bottom Line:** Delaying launch cedes enterprise mindshare to competitors, but an open public launch risks high infrastructure burn. Execute a **phased rollout gated by paid customer deposits**.

#### Historical Precedent
Across 42 analyzed B2B launches, teams requiring upfront paid pilots achieved an **84% enterprise conversion rate**, versus only 18% for free trial programs.

#### Stress-Test Reality Check
Uncapped customer querying will deplete GPU runway 2.8x faster unless token caching and tiered query quotas are enforced on Day 1.

#### Probabilistic Trajectory
* **Bull Case ($2.7M ARR):** 15 initial design partners convert at $180K ACV, self-funding the dedicated inference infrastructure.
* **Bear Trap (Runway bleed):** Infrastructure latency spikes under unmetered load, inducing pilot churn.

#### Immediate Action & Kill-Switch
1. **Paid Commitments:** Lock first 5 enterprise LOIs with $50K non-refundable deposits before broad launch.
2. **Unit Economics:** Benchmark p99 latency (<18ms) and marginal cost per query under simulated peak loads.
3. **Mandatory Kill-Switch:** If fewer than 8 enterprise design partners convert by Day 60, pause expansion.`;
  } else if (p.includes('market') || p.includes('expand') || p.includes('eu')) {
    verdict = 'PIVOT';
    conviction = 81;
    summary = `### Strategic Stance: PIVOT — Sovereign Channel Route vs Direct Subsidiary

**Bottom Line:** Direct legal incorporation in Europe incurs premature compliance friction under EU AI Act Article 50 ($650K estimated legal overhead). Pivot to a **sovereign reseller channel**.

#### Historical Precedent
US enterprise tech vendors entering Europe directly without sovereign datacenter partners encountered an **11-month average sales cycle stall** at corporate Data Protection Officer (DPO) review.

#### Stress-Test Reality Check
Article 50 disclosure rules expose parent legal entities to global revenue penalty caps. Channel partnerships shield the core balance sheet while accessing regional buyers.

#### Probabilistic Trajectory
* **Bull Case (€18M pipeline):** Co-selling with certified EU systems integrators captures demand with zero direct subsidiary overhead.
* **Bear Trap ($1.2M sink):** Direct incorporation gets stuck in preliminary conformity reviews with zero revenue in year 1.

#### Immediate Action & Kill-Switch
1. **Channel Alliance:** Finalize distribution partnership with sovereign European hosters (OVHcloud / Hetzner).
2. **Standardization:** Secure ISO/IEC 42001 certification prior to enterprise commercial outreach.
3. **Mandatory Kill-Switch:** If channel reseller agreements fail within 90 days, reallocate capital to domestic accounts.`;
  } else if (p.includes('invest') || p.includes('opportunity') || p.includes('capital')) {
    verdict = 'GO';
    conviction = 92;
    summary = `### Strategic Stance: GO — Tranche-Gated Infrastructure Investment

**Bottom Line:** Allocating growth capital to dedicated inference hardware unlocks a **64% reduction in unit computing expense** with an expected **8.4-month payback horizon**.

#### Historical Precedent
Growth-stage AI platforms that transitioned from third-party APIs to dedicated clusters recovered their entire capital outlay within **8.4 months** while insulating unit margins.

#### Stress-Test Reality Check
Secondary hardware markets trade at 70% of MSRP, creating a hard downside liquidity backstop. A 6-month cloud bridge covers fab delivery lead times.

#### Probabilistic Trajectory
* **Bull Case ($8.2M net savings):** Hardware ownership protects 82% gross margins even under intense market price competition.
* **Bear Trap (Extended payback):** Severe macro query drop stretches payback from 8.4 to 18 months.

#### Immediate Action & Kill-Switch
1. **Tranche 1 (30% Deposit):** Release initial deposit only against confirmed fab delivery and fixed colocation terms.
2. **Tranche 2 (Acceptance):** Release balance only after 72-hour burn-in certifies <0.01% hardware failure.
3. **Mandatory Kill-Switch:** Embed a 24-month buyout / return guarantee clause in financing docs.`;
  } else {
    verdict = 'CONDITIONAL GO';
    conviction = 86;
    summary = `### Strategic Stance: CONDITIONAL GO — High-Convexity Phased Stance

**Bottom Line:** Adversarial simulation across 10,000 permutations confirms high asymmetric upside, provided capital release is strictly tied to validated milestones.

#### Historical Precedent
Across 50+ analyzed strategic inflection points, executive teams that established quantitative tripwires prior to commitment achieved **3.2x higher return on invested capital**.

#### Stress-Test Reality Check
Alpha red-team analysis identified 2 assumptions vulnerable to confirmation bias: buyer price elasticity and sales qualification speed.

#### Probabilistic Trajectory
* **Bull Case:** Accelerated category standard-bearer status with expanding gross margins over 24 months.
* **Bear Trap:** Sunk-cost bias driving unhedged cash burn past initial baseline runway limits.

#### Immediate Action & Kill-Switch
1. **Quantitative Tripwires:** Define exact metric boundaries (e.g. CAC, churn) that trigger mandatory strategy reassessment.
2. **Tranche Gating:** Release resources only as verifiable real-world evidence confirms initial assumptions.
3. **24/7 Monitoring:** Maintain live telemetry feeds to catch competitor and regulatory shifts instantly.`;
  }

  return {
    verdict,
    convictionScore: conviction,
    content: summary,
    phases: EXECUTIVE_THINKING_PHASES,
  };
}

export function generateFollowUpResponse(
  followUpPrompt: string,
  sessionTitle?: string
): { content: string; convictionScore: number; logs: string[] } {
  const p = followUpPrompt.toLowerCase();

  const logs = [
    'Parsing follow-up parameters & decision context...',
    'Checking secondary assumptions against ground truth...',
    'Stress-testing Bayesian sensitivity & drawdown margins...',
    'Calibrating trade-off vectors & execution velocity...',
  ];

  let answer = '';

  if (p.includes('risk') || p.includes('mitigat') || p.includes('kill')) {
    answer = `### Tactical Risk Mitigation & Kill-Switch Protocol

Regarding your follow-up on risk containment:

1. **Dual-Sourcing Sprints (Days 1–30)**: Issue immediate RFQs to secondary tier-1 vendors. Do not commit >60% of volume to a single supplier without pre-qualified fallback capacity.
2. **Quantitative Kill-Switch Threshold**: If secondary supplier unit costs exceed baseline by more than **14%**, halt general volume expansion and ring-fence capital into internal capacity.
3. **Escrow & SLA Protection**: Tie 25% of milestone payments directly to guaranteed 99.8% on-time fulfillment SLAs with enforceable liquidated damages.

*Impact on Conviction Score*: Increases overall decision certainty to **91%** by bounding tail-risk drawdown from -34% to -11%.`;
  } else if (p.includes('runway') || p.includes('capital') || p.includes('cost') || p.includes('budget') || p.includes('money')) {
    answer = `### Capital Preservation & Runway Recalibration

Based on updated financial sensitivity modeling:

* **Liquidity Protection**: Maintain a strict minimum **14-month cash buffer** before initiating Capex tranches.
* **Milestone-Gated Tranches**: Release funding in 3 discrete blocks:
  * *Tranche 1 (30%)*: Prototype acceptance & legal audit clearance.
  * *Tranche 2 (40%)*: First 10 paid customer deployment milestones.
  * *Tranche 3 (30%)*: Scaled production under unit margin breakeven.
* **Downside Floor**: Lease arrangements with buyback clauses guarantee 70% capital recovery if macro demand dips.

*Recommendation*: Proceed with phased pilot deposits to self-fund the early integration cycles.`;
  } else if (p.includes('price') || p.includes('pricing') || p.includes('margin') || p.includes('revenue')) {
    answer = `### Unit Margin Economics & Value Capture

Analyzing your unit economics and competitive pricing elasticity:

* **Avoid Race-to-the-Bottom**: Direct price-matching against subsidized incumbents erodes gross margins by an estimated 28%.
* **Value-Based Packaging**: Bundle dedicated enterprise SLAs, audit log conformity (SOC2/EU AI Act), and sub-18ms response guarantees into a premium tier (commanding a **35–45% price premium**).
* **Pilot Conversion Arbitrage**: Charge a non-refundable $35K–$50K onboarding deposit credited towards multi-year contracts to eliminate window-shoppers.`;
  } else if (p.includes('timeline') || p.includes('when') || p.includes('schedule') || p.includes('delay')) {
    answer = `### Critical Path Timeline & Execution Cadence

Here is the synchronized timeline to maintain velocity while containing failure modes:

* **Phase 1 (Weeks 1–4)**: Finalize secondary vendor RFQs and execute clean-room compliance audit.
* **Phase 2 (Weeks 5–8)**: Onboard initial cohort of 5 design partners with dedicated customer success SLAs.
* **Phase 3 (Month 3)**: Checkpoint review against kill-switch criteria. If conversion <70%, pause further rollout.
* **Phase 4 (Months 4–6)**: Full commercial ramp with optimized unit computing margins.`;
  } else {
    answer = `### Executive Clarification & Strategic Directive

Analyzing your query: **"${followUpPrompt}"**

* **Core Ground Truth**: This adjustment does not alter the fundamental strategic thesis, but sharpens operational execution.
* **Empirical Diagnostic**: Retaining execution agility while enforcing milestone-gated capital commitments yields an optimal **+4.2x asymmetric payoff**.
* **Immediate Next Action**:
  1. Validate primary operational metrics against the established 60-day baseline.
  2. Implement continuous 24/7 telemetry monitoring to detect any early drift signals.
  3. Ensure executive leadership signs off on the explicit kill-switch triggers before expanding commitments.`;
  }

  return {
    content: answer,
    convictionScore: 89,
    logs,
  };
}

