import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardView from './views/DashboardView/DashboardView';
import ChangeHistoryView from './views/ChangeHistoryView/ChangeHistoryView';
import EditorView from './views/EditorView/EditorView';
import SingleChangeView from './views/SingleChangeView/SingleChangeView';

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
