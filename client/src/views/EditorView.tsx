// EditorView.tsx
import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor';
import EditorNavbar from '../components/EditorNavbar';
import { getDraft } from '../apiService/DraftApi';
import './editorview.css';
import { useLocation } from 'react-router-dom';

interface LocationState {
  id: number,
}

const EditorView: React.FC = () => {
  const [draft, setDraft] = useState<string>('');
  const [workingDraft, setWorkingDraft] = useState<string>('');
  const [isReady, setIsReady] = useState<boolean>(false);
  const location = useLocation();
  const { id } = location.state as LocationState;

  // set working draft initially to draft
  useEffect(() => {
    setWorkingDraft(draft);
    console.log(`setting working draft to ${draft}`)
    setIsReady(true);
  }, [draft]);

  // use effect to get and set draft
  useEffect(() => {
    async function retrieveDraft() {
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


  const handleDashboardClick = () => {
    // Logic to handle Dashboard button click
  };

  const handleSaveChangeClick = () => {
    // Logic to handle Save button click
  };

  const handleSaveDraftClick = () => {
    // Logic to handle Save Draft button click
  };

  // update working draft
  const handleWorkingDraftChange = (content: string) => {
    setWorkingDraft(content);
    console.log(workingDraft)
  };

  return (
    <div className='EditorView'>
      <EditorNavbar onDashboardClick={handleDashboardClick}
        onSaveChangeClick={handleSaveChangeClick}
        onSaveDraftClick={handleSaveDraftClick}
      />
      {isReady && ( // Render Editor only when isReady is true
        <Editor workingDraft={workingDraft} onWorkingDraftChange={handleWorkingDraftChange} />
      )}
    </div>
  );
};

export default EditorView;
