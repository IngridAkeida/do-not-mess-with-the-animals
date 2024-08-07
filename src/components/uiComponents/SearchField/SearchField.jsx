import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";


const SearchField = ({wrapStyle, buttonStyle, inputStyle, errorStyle}) => {

  const [searchTerm, setSearchTerm] = useState(''); 
  const [error, setError] = useState('');
  const router = useRouter();

  const handleClick = () => {
    if (searchTerm.trim() === '') {
      setError('The search field cannot be empty');
      return;
    }
    setError(''); 
    router.push(`/search?term=${encodeURIComponent(searchTerm)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
      <div className={wrapStyle}>
        <input 
          className={inputStyle}
          type='text' 
          placeholder='Search for movies or tv shows...' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          />
        <button 
        className={buttonStyle}
        onClick={handleClick}><FaMagnifyingGlass /></button>
        <div className='h-6'>
          {error && <p className={errorStyle}>{error}</p>}
        </div>
        
      </div>
  );
}

export default SearchField;