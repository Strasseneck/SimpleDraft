import React, { FC } from 'react';

// types the props, representing the draft to be edited
interface EditorProps {
  workingDraft: string,
  onWorkingDraftChange: (content: string) => void;
}

const Editor: FC<EditorProps> = ({ workingDraft, onWorkingDraftChange }) => {
  // handle changes made in the text area
  const handleChange = ( event: React.ChangeEvent<HTMLTextAreaElement> ) => {
    const content = event.target.value;
    onWorkingDraftChange(content);
  }

  return (
    <textarea className='main-editor' value={workingDraft} onChange={handleChange} />
  );
};

export default Editor;