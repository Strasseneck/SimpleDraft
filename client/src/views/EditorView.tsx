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
import { addChange } from '../apiService/ChangeApi';
// types import
import Change from '../types/ChangeType';
// styling
import './Editorview.css';

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

  useEffect(() => {
    if (id !== undefined && id !== null) {
      async function retrieveDraft() {
        try {
          // get draft from api
          const usersDraft = await getDraft(id);
          // set draft state to retrieved draft
          setDraft(usersDraft.content);
          // set working draft initially to draft
          setWorkingDraft(usersDraft.content);
          setIsReady(true);
        } catch (error) {
          console.error(`Error retrieving draft with id: ${id}`, error);
        }
      }
      retrieveDraft();
    }
  }, [id]);

  const handleDashboardClick = () => {
    // navigate to dashboard
    navigate('/');
  };

  const handleSaveChange = async (description: string) => {
    // compute diff
    const oldDraft = draft;
    const newDraft = workingDraft;
    const diffs = diffMatchPatch.diff_main(oldDraft, newDraft);
    // create change for db
    const newChange: Change = {
      description: description,
      DraftId: id,
      Diffs: diffs
    };
    await addChange(newChange);
    // update draft state
    setDraft(workingDraft);
    hide();
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
        onSaveDraftClick={handleSaveDraftClick} 
        onShowModal={show}
      />
      {isReady && <Editor workingDraft={workingDraft} onWorkingDraftChange={handleWorkingDraftChange} />}
      <SaveModal visible={visible} onClose={hide} handleSaveChange={handleSaveChange} /> 
    </div>
  );
};

export default EditorView;
