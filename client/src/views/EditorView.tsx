// react imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// diff/match/patch imports
import { DiffMatchPatch }from 'diff-match-patch-typescript';
// init diff/ match / patch
const diffMatchPatch = new DiffMatchPatch;
// component imports
import Editor from '../components/Editor';
import EditorNavbar from '../components/EditorNavbar';
import SaveModal from '../components/SaveModal';
// api imports
import { getDraft } from '../apiService/DraftApi';
// styling
import './editorview.css';

interface LocationState {
  id: number,
}

const EditorView: React.FC = () => {
  const [draft, setDraft] = useState<string>('');
  const [workingDraft, setWorkingDraft] = useState<string>('');
  const [isReady, setIsReady] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const location = useLocation();
  const { id } = location.state as LocationState;

  // set working draft initially to draft
  useEffect(() => {
    setWorkingDraft(draft);
    setIsReady(true);
  }, [draft]);

  // use effect to get and set draft
  useEffect(() => {
    if (id !== undefined && id !== null) {
      async function retrieveDraft() {
        try {
          // get draft from api
          const usersDraft = await getDraft(id);
          // set draft state to retrieved draft
          setDraft(usersDraft.content)
        } catch (error) {
          console.error(`Error retrieving draft with id: ${id} ${error}`)
        }
      };
      retrieveDraft()
    }
  }, [id, draft]);


  const handleDashboardClick = () => {
    // navigate to dashboard
    navigate('/');
  };

  const handleSaveChangeClick = () => {
    // compute diff
    const oldDraft = draft;
    const newDraft = workingDraft;
    const newDiff = diffMatchPatch.diff_main(oldDraft, newDraft);
    console.log(newDiff);    
  };

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const handleSaveDraftClick = () => {
    // Logic to handle Save Draft button click
  };

  // update working draft
  const handleWorkingDraftChange = (content: string) => {
    setWorkingDraft(content);
  };

  return (
    <div className='EditorView'>
      <EditorNavbar 
        onDashboardClick={handleDashboardClick} 
        onSaveChangeClick={handleSaveChangeClick} 
        onSaveDraftClick={handleSaveDraftClick} 
        onShowModal={show}
      />
      {isReady && <Editor workingDraft={workingDraft} onWorkingDraftChange={handleWorkingDraftChange} />}
      <SaveModal visible={visible} onClose={hide} /> 
    </div>
  );
};

export default EditorView;
