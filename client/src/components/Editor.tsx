import React, { FC, useEffect, useRef, useState } from 'react';
import './Editor.css';

interface EditorProps {
  workingDraft: string,
  onWorkingDraftChange: (content: string) => void;
}

const Editor: FC<EditorProps> = ({ workingDraft, onWorkingDraftChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  // resizing based on content
  useEffect(() => {
    if (textareaRef.current) {
      setHeight(textareaRef.current.scrollHeight);
    }
  }, [workingDraft])

  // handle changes made in the text area
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;
    onWorkingDraftChange(content);
  }

  return (
    <textarea
      ref={textareaRef}
      autoFocus className='main-editor'
      value={workingDraft}
      onChange={handleChange}
      style={{ height: height ? `${height}px` : 'auto' }} />
  );
};

export default Editor;