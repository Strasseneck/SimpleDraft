import React, { FC } from 'react';
import './Editor.css';

// types the props, representing the draft to be edited
interface EditorProps {
  workingDraft: string,
  onWorkingDraftChange: (content: string) => void;
}

const Editor: FC<EditorProps> = ({ workingDraft, onWorkingDraftChange }) => {
  // handle changes made in the text area
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;
    onWorkingDraftChange(content);
  }

  const calculateHeight = () => {
    const rows = workingDraft.split('\n').length;
    const lineHeight = 20;
    const minHeight = 100;
    const height = Math.max(minHeight, rows * lineHeight);
    return `${height}px`;
  };

  return (
    <textarea autoFocus className='main-editor' value={workingDraft} onChange={handleChange} style={{ height: calculateHeight() }} />
  );
};

export default Editor;