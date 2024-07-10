import Image from 'next/image';

function reduceText(text, maxLength) {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...(See More)';
};

const SearchResults = ({results, searchTerm}) => {
  
  const maxLength = 200;

  return (
    <div>
    <h2>Results: {searchTerm}</h2>
    <ul className='flex flex-col gap-2'>
      {results.map((result, index) => (
        <li key={index} className='p-2 flex flex-col items-center justify-center md:flex-row gap-4 border-2 border-red-300 border-solid'>
          {result.posterImage === null ? (
            <Image className='w-64 md:w-20 h-auto' src='/assets/movie-nf.png' width={300} height={300} alt={result.name} />
          ) : (
            <Image className='w-64 md:w-20 h-auto' src={`https://www.doesthedogdie.com/content/200/0/${result.posterImage}`} width={300} height={300} alt={result.name} />
          )}
          <div className=''>
            <h2 className='text-base text-center font-bold'>{result.name}</h2>
            <p>Release data: {result.releaseYear}</p>
            {result.genre && <p>Genre: {result.genre}</p>}
            <div className='flex'>
              {result.additionalData && result.additionalData.length > 0 && 
                result.additionalData.map((data, index) => (
                  data.name === 'Animal' && data.topics && data.topics.length > 0 && 
                    data.topics.map((topic, topicIndex) => (
                      topic.doesName === 'Does an animal die' && (
                        <div key={`${index}-${topicIndex}`}>
                          <h2>{topic.doesName}</h2>
                          {topic.yesSum === 0 && topic.noSum === 0 ? (
                            'no data'
                          ) : (
                            <div className='flex'>
                              <p className='bg-red-800'> Yes {topic.yesSum}</p>
                              <p className='bg-green-800'> No {topic.noSum}</p>
                            </div>
                          )}
                        </div>
                      )
                    ))
                ))
              }
            </div>
            <p>Overview: {reduceText(result.overview, maxLength)}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );

};

export default SearchResults;
