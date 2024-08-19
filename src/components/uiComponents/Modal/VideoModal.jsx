// import { useState, useEffect } from 'react';

const VideoModal = ({isVisible, onClose, children}) => {

  if (!isVisible) return null;

  const handleClose = (e) => {
    if( e.target.id === 'wrapper')
      onClose();
  };
  

  return (
    <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-full h-full" onClick={handleClose} id='wrapper'>
      <div className="flex flex-col w-[90%] h-[90%] sm:w-[70%] sm:h-[70%] md:w-[60%] md:h-[60%] lg:w-[50%] lg:h-[50%] bg-black">
        <button className="place-self-end mx-2" onClick={() => onClose()}>x</button>
        <div className="text-white">{children}</div>
      </div>
    </div>
  );
};

export default VideoModal;
