import Image from 'next/image';
import Link from 'next/link';

function reduceText(text, maxLength) {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...(See More)';
};

const SearchResults = ({results, searchTerm}) => {
  
  const maxLength = 200;
  const stylesPoster ='w-64 md:w-20 h-auto max-h-96 object-contain rounded-md shadow-md';

  return (
    <div>
    <h2>Results: {searchTerm}</h2>
    <ul className='flex flex-col gap-2 justify-center items-center'>
      {results.map((result, index) => (
        <li key={index} className='p-2 flex flex-col items-center justify-center md:flex-row gap-4 bg-amber-100 rounded-md shadow-md w-72'>
          {result.posterImage === null ? (
            <Image className={stylesPoster} src='/assets/movie-nf.png' width={300} height={300} alt={result.name} />
          ) : (
            <Image className={stylesPoster} src={`https://www.doesthedogdie.com/content/200/0/${result.posterImage}`} width={300} height={300} alt={result.name} />
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
                        <div className='bg-amber-500 px-1 py-2 rounded-md' key={`${index}-${topicIndex}`}>
                          <h2>{topic.doesName}?</h2>

                          {topic.yesSum === 0 && topic.noSum === 0 ? (
                            'no data'
                          ) : (
                            <div className='flex gap-2 mt-1 text-white'>
                              <p className='bg-red-800 text-center rounded-full w-20 h-auto'> Yes {topic.yesSum}</p>
                              <p className='bg-green-800 text-center rounded-full w-20 h-auto'> No {topic.noSum}</p>
                            </div>
                          )}
                        </div>
                      )
                    ))
                ))
              }
            </div>
            <p>Overview: {reduceText(result.overview, maxLength)}</p>
            <p><Link href={`/movie/${result.id}`}>Ver detalhes</Link></p>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );

};

export default SearchResults;
