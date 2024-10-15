import Link from 'next/link';
import LayoutCards from '../../uiComponents/Layouts/LayoutCards';

const GenreMenu = ({ list, content, getGenreIcon }) => {

  return(
    <div className='flex flex-wrap flex-row gap-4 justify-center items-center my-4 pb-4'>
        {list.map((genre, index) => (
          <div key={index} className=''>
          <Link href={`/${content}/genres/genre/${genre.slug}`} passHref> 
            <LayoutCards>
              {getGenreIcon(genre.slug)}
              <div className='text-center mt-4'>
                {genre.title}
              </div>
            </LayoutCards>
          </Link>
          </div>
        ))}
    </div>
  )

}

export default GenreMenu;