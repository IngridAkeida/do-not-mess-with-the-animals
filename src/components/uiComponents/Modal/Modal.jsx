import { IoClose } from 'react-icons/io5';

const Modal = ({isVisible, onClose, children}) => {

  if (!isVisible) return null;

  const handleClose = (e) => {
    if( e.target.id === 'wrapper')
      onClose();
  };
  

  return (
    <div className='fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center w-full h-full' onClick={handleClose} id='wrapper'>
      <div className='flex flex-col w-[90%] h-[90%] sm:w-[70%] sm:h-[70%] md:w-[60%] md:h-[60%] lg:w-[50%] lg:h-auto p-1 bg-black bg-opacity-80 '>
        <button className='place-self-end m-1' onClick={() => onClose()}><IoClose /></button>
        <div className='text-white'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
