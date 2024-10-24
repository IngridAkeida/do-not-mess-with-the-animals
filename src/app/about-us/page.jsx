'use client'
import Layout from '@/components/uiComponents/Layouts/LayoutContainer';
import LayoutSection from '@/components/uiComponents/Layouts/LayoutSection';
import Subtitles from '@/components/uiComponents/Layouts/LayoutSubtitles';

const contentSections = [
  {
    title: "Mission Statement",
    content: `Our mission is to create an inclusive platform that offers comprehensive insights into movies and series, 
    specifically highlighting potential triggers such as animal violence and other sensitive content. 
    We aim to empower viewers by providing the necessary information to make informed choices about their viewing experiences, 
    ensuring they can enjoy entertainment without unexpected surprises.`
  },
  {
    title: "Vision Statement",
    content: `We envision a world where every viewer can enjoy films and series with confidence, knowing they have access to detailed information 
    about the content they are consuming. Our platform will be the leading resource for individuals seeking knowledge about entertainment, 
    fostering a safe and enjoyable viewing environment for all.`
  },
  {
    title: "Core Values",
    content: (
      <ul className='list-disc pl-10 space-y-2'>
        <li><strong>Transparency:</strong> We believe in offering clear and precise information about the content of movies and series, including potential triggers.</li>
        <li><strong>Inclusivity:</strong> Our platform welcomes users from diverse backgrounds and experiences.</li>
        <li><strong>Empowerment:</strong> By allowing users to create accounts and track their viewing history, we empower them to take control of their entertainment choices.</li>
        <li><strong>Community:</strong> We strive to build a supportive community where users can share their thoughts and experiences.</li>
        <li><strong>Innovation:</strong> As we grow, we are committed to leveraging the latest technologies, including React Native for our future mobile application.</li>
      </ul>
    )
  },
  {
    title: "Technology Stack",
    content: (
      <p>
        <strong>APIs:</strong> We integrate multiple APIs, including The Does Dog Die, The Guardian, and TMDB, to provide rich content and detailed insights about films and series.
        <br /><strong>Styling:</strong> Our platform utilizes Tailwind CSS, ensuring a responsive and visually appealing user interface.
        <br /><strong>Framework:</strong> Built on ReactJS using Next.js, our application guarantees optimal performance and a smooth user experience.
      </p>
    )
  },
  {
    title: "Personal Motivation",
    content: `The inspiration behind this application stems from my personal experiences of encountering unexpected triggers while watching films and series. 
    Having faced distressing moments, such as scenes involving animal violence, I recognized the need for a resource that provides clear information about content warnings.`
  }
];

const AboutUs = () => {
  return (
    <Layout>
      <div className='mx-auto'>
        <section className='h-[85vh] flex flex-col justify-center font-serif pl-4 text-dark-menu-y10 '>
          <h1 className='text-left font-light text-7xl md:text-8xl mb-4'>I really love watching movies,</h1>
          <p className='text-xl mb-4'>
            But I hate when I see an animal. It makes me feel bad, and even if I try, I can&apos;t continue watching, which ruins my experience completely. 
            <br/>Do you also feel this way about this or any other trigger?
          </p>
          <p className='font-bold text-xl'>This site is for you!</p>
        </section>
        {contentSections.map((section, index) => (
          <LayoutSection key={index}>
            <div className='flex flex-col justify-center items-center'>
              <Subtitles>{section.title}</Subtitles>
              <div className='max-w-6xl text-justify'>{section.content}</div>
            </div>
          </LayoutSection>
        ))}
      </div>
    </Layout>
  );
}

export default AboutUs;
