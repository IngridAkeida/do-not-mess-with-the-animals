import { IoClose } from 'react-icons/io5';

const Modal = ({isVisible, onClose, styleContainer, styleContent, children}) => {

  if (!isVisible) return null;

  const handleClose = (e) => {
    if( e.target.id === 'wrapper')
      onClose();
  };
  

  return (
    <div className={styleContainer} onClick={handleClose} id='wrapper'>
      <div className={styleContent}>
        <button className='place-self-end' onClick={() => onClose()}><IoClose /></button>
        <div className='text-white'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
