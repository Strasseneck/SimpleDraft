
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// utils
import { saveChange } from '../utils/SaveChangeUtil';
// components
import Editor from '../components/Editor';
import EditorNavbar from '../components/EditorNavbar';
import SaveModal from '../components/SaveModal';
// services
import { getDraft } from '../apiService/DraftApi';
// styling
import './Editorview.css';
import { createDraft } from '../utils/DiffMatchPatchUtils';

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
          // create the current state of the draft from patches
          const currentState = createDraft(usersDraft);
          // get title
          setDraftTitle(usersDraft.title)
          // set draft state to retrieved draft
          setDraft(currentState);
          // set working draft initially to draft
          setWorkingDraft(currentState);
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
    const save = await saveChange(description, oldDraft, newDraft, id)
    if (save) {
      setDraft(workingDraft);
      hide();
    }
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
        onDashboardClick={handleDashboardClick}
        onChangeHistoryClick={() => handleChangeHistoryClick(id)}
        onShowModal={show}
        draft={workingDraft}
        title={draftTitle}
      />
      <div className='MainEditorView'>
        <div className='EditorContainer'>
          {isReady && <Editor workingDraft={workingDraft} onWorkingDraftChange={handleWorkingDraftChange} />}
        </div>
        <SaveModal visible={visible} onClose={hide} handleSaveChange={handleSaveChange} />
      </div>
    </div>
  );
};

export default EditorView;
