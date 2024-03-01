import React, { FC } from 'react';

interface EditorProps {
  workingDraft: string,
  onWorkingDraftChange: (content: string) => void;
}

const Editor: FC<EditorProps> = ({ workingDraft, onWorkingDraftChange }) => {
  const handleChange = ( event: React.ChangeEvent<HTMLTextAreaElement> ) => {
    const content = event.target.value;
    onWorkingDraftChange(content);
  }

  return (
    <textarea value={workingDraft} onChange={handleChange} />
  );
};

export default Editor;