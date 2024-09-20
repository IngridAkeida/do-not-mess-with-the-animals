import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const SearchField = ({ wrapStyle, buttonStyle, inputStyle, buttonDisabledStyle }) => {
  const [searchTerm, setSearchTerm] = useState(''); 
  const [error, setError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsButtonDisabled(searchTerm.trim() === '');
  }, [searchTerm]);

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
        className={`${buttonStyle} ${isButtonDisabled ? buttonDisabledStyle : ''}`}
        onClick={handleClick}
        disabled={isButtonDisabled}
      >
        <FaMagnifyingGlass />
      </button>
      <div className=''>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default SearchField;
