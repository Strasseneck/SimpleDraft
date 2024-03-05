import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// services
import { DraftResponse } from '../apiService/responseTypes';
import { getAllDrafts } from '../apiService/DraftApi';
import { addDraft } from '../apiService/DraftApi';
// components
import DashNavbar from '../components/DashNavbar';
import AllDraftsGrid from '../components/AllDraftsGrid';
import NewDraftModal from '../components/NewDraftModal';
// styling
import './DashboardView.css'


const DashboardView: FC = () => {
  const [allDrafts, setAllDrafts] = useState<DraftResponse[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [newVisible, setNewVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function retrieveAllDrafts() {
      try {
        // get all drafts from api
        const drafts = await getAllDrafts();
        setAllDrafts(drafts);
        setIsReady(true);
      } catch (error) {
        console.error(`Error getting all drafts ${error}`)
      }
    }
    retrieveAllDrafts()
  }, [])

  const showNew = () => {
    setNewVisible(true);
  };

  const hideNew = () => {
    setNewVisible(false);
  };


  const handleNewDraftClick = async (title: string) => {
    try {
      // try to create a new draft
      const newDraft = await addDraft(title);
      const id = newDraft.id;
      // open editor with new draft
      navigate('/editor', { state: { id } })
    } catch (error) {
      console.error(`Error creating draft with title ${title}, ${error}`)
    }
  }

  const handleDeleteDraft = (deleteId: number) => {
    setAllDrafts(allDrafts.filter((draft) => draft.id !== deleteId))
  }

  return (
    <div className='DashboardView'>
      < DashNavbar onShowModal={showNew} />
      {isReady && allDrafts && <AllDraftsGrid drafts={allDrafts} handleDeleteDraft={handleDeleteDraft} />
      }
      <NewDraftModal visible={newVisible} onClose={hideNew} handleNewDraftClick={handleNewDraftClick} />
    </div>
  );
};

export default DashboardView;