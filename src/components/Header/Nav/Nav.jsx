import Image from "next/image";

const Nav = () => { 
  return (
    <nav className='flex justify-between items-center h-24 bg-blue-800 px-10 gap-6'>
      <div><Image src="/assets/logo2SemFundo.png" alt="Logo" width={70} height={40} style={{objectFit: "contain"}}/></div>
      <ul className='flex gap-6'>
        <li><a href="/">Movies</a></li>
        <li><a href="/">TV Shows</a></li>
        <li><a href="/">People</a></li>
      </ul>
      <ul className='flex gap-6'>
        <li><a href="/">Language</a></li>
        <li><a href="/">Search</a></li>
        <li><a href="/">Account</a></li>
      </ul>
    </nav>
  );
};

export default Nav;