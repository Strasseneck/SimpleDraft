import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardView from './views/DashboardView';
import EditorView from './views/EditorView';
import ChangeHistoryView from './views/ChangeHistoryView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/editor" element={<EditorView />} />
        <Route path="/change-history" element={<ChangeHistoryView />} />
        <Route path="/" element={<DashboardView />} />
      </Routes>
    </Router>
  );
}

export default App;
