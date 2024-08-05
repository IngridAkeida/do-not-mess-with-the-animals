import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchField = ({wrapStyle, buttonStyle, inputStyle}) => {

  const [searchTerm, setSearchTerm] = useState(''); 
  const [error, setError] = useState('');
  const router = useRouter();

  const handleClick = () => {
    if (searchTerm.trim() === '') {
      setError('The search field cannot be empty.');
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
        onClick={handleClick}>Search</button>
        <div className='h-6'>
          {error && <p className='text-sm rounded-xl bg-alert-danger-600 text-alert-danger-100'>{error}</p>}
        </div>
        
      </div>
  );
}

export default SearchField;