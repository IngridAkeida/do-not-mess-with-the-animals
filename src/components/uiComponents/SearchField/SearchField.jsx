import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchField = ({wrapStyle, buttonStyle, inputStyle}) => {

  const [searchTerm, setSearchTerm] = useState(''); 
  const router = useRouter();

  const handleClick = () => {
    router.push(`/search?term=${encodeURIComponent(searchTerm)}`);
  }

  return (
      <div className={wrapStyle}>
        <input 
          className={inputStyle}
          type='text' 
          placeholder='Search for movies or tv shows...' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        <button 
        className={buttonStyle}
        onClick={handleClick}>Search</button>
      </div>
  );
}

export default SearchField;