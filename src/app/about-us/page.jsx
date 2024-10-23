'use client'
import Layout from '@/components/uiComponents/Layouts/LayoutContainer';
import LayoutSection from '@/components/uiComponents/Layouts/LayoutSection';
import Subtitles from '@/components/uiComponents/Layouts/LayoutSubtitles';

const AboutUs = () => {
  return (
    <Layout>
      <div className='max-w-6xl ml-10'>
      <div className='h-[85vh] flex flex-col justify-center items-left font-serif '>
        <span className='text-left font-light text-8xl w-96'>I really love watching movies,</span>
        <span className='text-xl  '>but I hate when I see an animal. It makes me feel bad, and even if I try, I can&apos;t continue watching, which ruins my experience completely. Do you also feel this way about this or any other trigger?</span><span className='font-bold text-xl'>This site is for you!</span>
      </div>
      </div>
      <LayoutSection>
        <div className='flex flex-col justify-center items-center'>
          <Subtitles>Mission Statement</Subtitles>
          <div className='max-w-6xl text-justify first-letter:font-bold first-letter:pl-10'>Our mission is to create an inclusive platform that offers comprehensive insights into movies and series, specifically highlighting potential triggers such as animal violence and other sensitive content. We aim to empower viewers by providing the necessary information to make informed choices about their viewing experiences, ensuring they can enjoy entertainment without unexpected surprises.</div>
        </div>
      </LayoutSection>
      <LayoutSection>
        <Subtitles>Vision Statement</Subtitles>
        We envision a world where every viewer can enjoy films and series with confidence, knowing they have access to detailed information about the content they are consuming. Our platform will be the leading resource for individuals seeking knowledge about entertainment, fostering a safe and enjoyable viewing environment for all.
      </LayoutSection>
      <LayoutSection>
        <Subtitles>Core Values</Subtitles>
        Transparency: We believe in offering clear and precise information about the content of movies and series, including potential triggers. This commitment ensures that our users are well-informed and can prepare for their viewing experiences.

        Inclusivity: Our platform welcomes users from diverse backgrounds and experiences, catering to a wide range of needs and preferences when it comes to media consumption.

        Empowerment: By allowing users to create accounts and track their viewing history, we empower them to take control of their entertainment choices and navigate their experiences safely.

        Community: We strive to build a supportive community where users can share their thoughts and experiences regarding films and series, enhancing the collective knowledge of our platform.

        Innovation: As we grow, we are committed to leveraging the latest technologies, including React Native for our future mobile application, to enhance user experience and accessibility.
    </LayoutSection>
    <LayoutSection>
      <Subtitles>Technology Stack</Subtitles>
      APIs: We integrate multiple APIs, including The Does Dog Die, The Guardian, and TMDB, to provide rich content and detailed insights about films and series. The The Does Dog Die API is particularly significant, as it offers a wide range of trigger information that can help users avoid distressing content.

      Styling: Our platform utilizes Tailwind CSS, ensuring a responsive and visually appealing user interface that adapts seamlessly across devices.

      Framework: Built on ReactJS using Next.js, our application guarantees optimal performance and a smooth user experience, allowing for quick navigation and efficient content delivery.
    </LayoutSection>
    <LayoutSection>
      <Subtitles>Personal Motivation</Subtitles>
      The inspiration behind this application stems from my personal experiences of encountering unexpected triggers while watching films and series. Having faced distressing moments, such as scenes involving animal violence, I recognized the need for a resource that provides clear information about content warnings. This motivation drives our commitment to help others avoid similar experiences and ensure they have access to the information they need.
      </LayoutSection>
    </Layout>
  );
}

export default AboutUs;

