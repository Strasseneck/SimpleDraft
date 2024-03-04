interface DownloadDraftProps {
    draft: string;
    title: string;
}

const DownloadDraftButton: React.FC<DownloadDraftProps> = ({ draft, title }) => {
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([draft], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${title}.fountain`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <button onClick={handleDownload}>
      Download
    </button>
  );
};

export default DownloadDraftButton;
