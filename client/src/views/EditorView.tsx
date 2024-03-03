// react imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// diff/match/patch imports
import { createDiffs } from '../utils/DiffMatchPatchUtils';
import { DiffMatchPatch } from 'diff-match-patch-typescript';
// init diff/ match / patch
// const diffMatchPatch = new DiffMatchPatch;
// component imports
import Editor from '../components/Editor';
import EditorNavbar from '../components/EditorNavbar';
import SaveModal from '../components/SaveModal';
// api imports
import { getDraft } from '../apiService/DraftApi';
import { addChange } from '../apiService/ChangeApi';
import { updateDraft } from '../apiService/DraftApi';
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
  const [draftTitle, setDraftTitle] = useState<string>('')
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
          // get title
          setDraftTitle(usersDraft.title)
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

  // navigation
  const handleDashboardClick = () => {
    // navigate to dashboard
    navigate('/');
  };

  const handleChangeHistoryClick = (id: number) => {
    navigate('/change-history', { state: { id } });
  }

  const handleSaveChange = async (description: string) => {
    // compute diff
    const oldDraft = draft;
    const newDraft = workingDraft;
    const diffs = createDiffs(oldDraft, newDraft);
    // const diffs = diffMatchPatch.diff_main(oldDraft, newDraft);
    // diffMatchPatch.diff_cleanupSemantic(diffs)
    
    // create change for db
    const newChange: Change = {
      description: description,
      DraftId: id,
      Diffs: diffs
    };
    await addChange(newChange);
    await updateDraft(id, { content: workingDraft })
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

  // update working draft
  const handleWorkingDraftChange = (content: string) => {
    setWorkingDraft(content);
  };

  return (
    <div className='EditorView'>
      <EditorNavbar
        draftTitle={draftTitle}
        onDashboardClick={handleDashboardClick}
        onChangeHistoryClick={() => handleChangeHistoryClick(id)}
        onShowModal={show}
      />
      <div className='MainEditorView'>
        {isReady && <Editor workingDraft={workingDraft} onWorkingDraftChange={handleWorkingDraftChange} />}
        <SaveModal visible={visible} onClose={hide} handleSaveChange={handleSaveChange} />
      </div>
    </div>
  );
};

export default EditorView;
