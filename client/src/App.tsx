import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardView from './views/DashboardView';
import ChangeHistoryView from './views/ChangeHistoryView';
import EditorView from './views/EditorView';
import SingleChangeView from './views/SingleChangeView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/change' element={<SingleChangeView />} />
        <Route path="/change-history" element={<ChangeHistoryView />} />
        <Route path="/editor" element={<EditorView />} />
        <Route path="/" element={<DashboardView />} />
      </Routes>
    </Router>
  );
}

export default App;
