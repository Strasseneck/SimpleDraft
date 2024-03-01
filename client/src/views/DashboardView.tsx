import React, { FC } from 'react';
import { useState } from 'react';
import EditorView from './EditorView';

const DashboardView: FC = () => {
  const [draftId, setDraftId] = useState<number | null>(null);
  
  const openEditor = (id: number) => {
    setDraftId(id)
  }
  return (
    <div>
      <p>Dashboard Working</p>
      <button onClick={() => openEditor(1)}>Open Editor</button>
      {draftId !== null && <EditorView id={draftId} />}
    </div>
  );
};

export default DashboardView;
