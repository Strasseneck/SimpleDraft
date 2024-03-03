import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangeHistoryNavbar.css';

interface Props {
  draftId: number;
  draftTitle: string;
}

const ChangeHistoryNavbar: FC<Props> = ({ draftId }) => {
  const navigate = useNavigate();

  const onDashboardClick = () => {
    navigate('/')
  };

  const onEditorClick = () => {
    console.log(draftId)
    const id = draftId;
    navigate('/editor', { state: { id } })
  }


  return (
    <div className='ChangeHistoryNavbar'>
      <button onClick={onDashboardClick}>Dashboard</button>
      <button onClick={onEditorClick}>Editor</button>
    </div>
  );
};

export default ChangeHistoryNavbar;