import { Routes, Route } from 'react-router-dom';
import { AnalysisProvider } from './context/AnalysisContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewDecision from './pages/NewDecision';
import DecisionDetail from './pages/DecisionDetail';
import DecisionEvidence from './pages/DecisionEvidence';
import DecisionResearch from './pages/DecisionResearch';
import DecisionDebate from './pages/DecisionDebate';
import DecisionVerification from './pages/DecisionVerification';
import DecisionRisks from './pages/DecisionRisks';
import DecisionVerdict from './pages/DecisionVerdict';
import Monitoring from './pages/Monitoring';
import History from './pages/History';
import Workspace from './pages/Workspace';
import AnalysisWorkspace from './pages/AnalysisWorkspace';
import OutcomePlaceholder from './pages/OutcomePlaceholder';
import Research from './pages/Research';
import Settings from './pages/Settings';
import Insights from './pages/Insights';

export default function App() {
  return (
    <AnalysisProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/decision/new" element={<NewDecision />} />
          <Route path="/decision/:id" element={<DecisionDetail />} />
          <Route path="/decision/:id/evidence" element={<DecisionEvidence />} />
          <Route path="/decision/:id/research" element={<DecisionResearch />} />
          <Route path="/decision/:id/debate" element={<DecisionDebate />} />
          <Route path="/decision/:id/verification" element={<DecisionVerification />} />
          <Route path="/decision/:id/risks" element={<DecisionRisks />} />
          <Route path="/decision/:id/verdict" element={<DecisionVerdict />} />
          <Route path="/decision/:id/analyze" element={<AnalysisWorkspace />} />
          <Route path="/decision/:id/outcome" element={<OutcomePlaceholder />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/workspace/:id" element={<Workspace />} />
          <Route path="/decisions" element={<History />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/history" element={<History />} />
          <Route path="/research" element={<Research />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </AnalysisProvider>
  );
}
