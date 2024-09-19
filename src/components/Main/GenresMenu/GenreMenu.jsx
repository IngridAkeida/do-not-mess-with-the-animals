import Link from 'next/link';

const GenreMenu = ({ list, content, getGenreIcon }) => {

  return(
    <div className='flex flex-wrap flex-row gap-4 justify-center items-center my-4 pb-4'>
        {list.map((genre, index) => (
          <div key={index} className=''>
          <Link href={`/${content}/genres/genre/${genre.slug}`} passHref> 
            <div 
              className='h-80 w-52 border rounded-md flex flex-col items-center justify-center bg-dark-accent-a40 hover:bg-dark-accent-a30 transition duration-300 cursor-pointer text-white hover:text-dark-accent-a0 hover:animate-jump animate-once animate-duration-1000 animate-ease-in-out' 
            >
              {getGenreIcon(genre.slug)}
              <div className='text-center mt-4'>
                {genre.title}
              </div>
            </div>
          </Link>
          </div>
        ))}
    </div>
  )

}

export default GenreMenu;