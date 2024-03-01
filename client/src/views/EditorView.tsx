// EditorView.tsx
import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';
import { getDraft } from '../apiService/DraftApi';

interface EditorViewProps {
  id: number,
}

const EditorView: React.FC<EditorViewProps> = ({ id }) => {
  const [draft, setDraft] = useState<string>('');
  const [workingDraft, setWorkingDraft] = useState<string>('');
  const [isReady, setIsReady] = useState<boolean>(false);

  // set working draft initially to draft
  useEffect(() => {
    setWorkingDraft(draft);
    console.log(`setting working draft to ${draft}`)
    setIsReady(true);
  }, [draft]);

  // use effect to get and set draft
  useEffect(() => {
    async function retrieveDraft () {
      try {
        // get draft from api
        const usersDraft = await getDraft(id);
        // set both states to the content returned
        setDraft(usersDraft.content)
      } catch (error) {
        console.error(`Error retrieving draft with id: ${id} ${error}`)
      }
    };

    if (id) {
      retrieveDraft()
    }
  }, [id, draft]);

  // update working draft
  const handleWorkingDraftChange = (content: string) => {
    setWorkingDraft(content);
  };

  return (
    <div>
      {isReady && ( // Render Editor only when isReady is true
      <Editor workingDraft={workingDraft} onWorkingDraftChange={handleWorkingDraftChange} />
    )}
    </div>
  );
};

export default EditorView;
