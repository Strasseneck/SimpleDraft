// EditorView.tsx
import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';
import { getDraft } from '../apiService/DraftApi';

interface EditorViewProps {
  draftid: number,
}

const EditorView: React.FC<EditorViewProps> = ({ draftid }) => {
  const [draft, setDraft] = useState<string>('My Great Project');
  const [workingDraft, setWorkingDraft] = useState<string>(draft);

  // use effect to get draft
  useEffect(() => {
    async function retrieveDraft () {
      try {
        // get draft from api
        const draft = await getDraft(draftid);
        // set both states to the content returned
        setDraft(draft.content)
      } catch (error) {
        console.error(`Error retrieving draft with id: ${draftid} ${error}`)
      }
    };

    if (draftid) {
      retrieveDraft()
    }
  }, [draftid]);

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
