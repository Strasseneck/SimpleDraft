import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChangeResponse } from '../apiService/responseTypes';
import { getDraft } from '../apiService/DraftApi';

interface LocationState {
  id: number,
}

const ChangeHistoryView: FC = () => {
  const [draftTitle, setDraftTitle] = useState<string>('');
  const [draftContent, setDraftContent] = useState<string>('');
  const [draftChanges, setDraftChanges] = useState<ChangeResponse[]>([]);


  const location = useLocation();
  const { id } = location.state as LocationState;

  useEffect(() => {
    if (id !== undefined && id !== null) {
      async function retrieveDraft() {
        try {
          // get draft from api
          const usersDraft = await getDraft(id);
          const { title, content, Changes } = usersDraft;
          console.log(Changes)
          setDraftTitle(title);
          setDraftContent(content);
          setDraftChanges(Changes);
        } catch (error) {
          console.error(`Error retrieving draft with id: ${id}`, error);
        }
      }
      retrieveDraft();
    }
  }, [id]);

  return (
    <div>
    <p>Change History Working</p>
    <p>Draft Title: {draftTitle}</p>
    <p>Draft Content: {draftContent}</p>
    <p>Draft Changes: {JSON.stringify(draftChanges)}</p>
  </div>
  );
};

export default ChangeHistoryView;
