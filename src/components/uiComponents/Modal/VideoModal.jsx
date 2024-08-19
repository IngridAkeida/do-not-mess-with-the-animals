// import { useState, useEffect } from 'react';

const VideoModal = ({isVisible, onClose}) => {

  if (!isVisible) return null;
  

  return (
    <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button className="place-self-end" onClick={() => onClose()}>x</button>
        <div className="bg-white text-black">Modal</div>
      </div>
    </div>
  );
};

export default VideoModal;
