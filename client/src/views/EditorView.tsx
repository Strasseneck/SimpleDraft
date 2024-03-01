// EditorView.tsx
import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';

const EditorView: React.FC = () => {
  const [draft, setDraft] = useState<string>('Initial draft');
  const [workingDraft, setWorkingDraft] = useState<string>(draft);

  // use effect to get draft

  // update working draft
  const handleWorkingDraftChange = (content: string) => {
    setWorkingDraft(content);
  };

  return (
    <div>
      <h1>Editor View</h1>
      <Editor workingDraft={workingDraft} onWorkingDraftChange={handleWorkingDraftChange} />
    </div>
  );
};

export default EditorView;
