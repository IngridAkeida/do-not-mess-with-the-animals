import { useState, useEffect } from 'react';
import Modal from 'react-modal';

const VideoModal = ({ isOpen, onRequestClose, item }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (item?.id) {
      const fetchVideos = async () => {
        try {
          const response = await fetch(`/api/serverDataTMDB?id=${item.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch videos');
          }
          const data = await response.json();
          setVideos(data.results);
        } catch (error) {
          console.error('Error fetching videos:', error);
        }
      };
  
      fetchVideos(item.id); 
    }
  }, [item]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Video Modal"
      overlayClassName="overlay"
      className="modal-content" // Optional: Add specific class for modal content
      shouldCloseOnOverlayClick={true} // Optional: Close on overlay click
    >
      <button 
        onClick={onRequestClose} 
        aria-label="Close modal"
        className="close-button" // Optional: Add specific class for close button
      >
        X
      </button>
      <h2>{item.title || item.name}</h2>
      {videos.length > 0 ? (
        <div>
          {videos.map(video => (
            <div key={video.id}>
              <h3>{video.name}</h3>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      ) : (
        <p>No videos available</p>
      )}
    </Modal>
  );
};

export default VideoModal;
