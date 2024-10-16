const PeopleCards = ({ children, key }) => {
  return (
    <li className='max-w-48 bg-dark-neutral-a40 p-2 rounded-xl' key={key}>
      {children}
    </li>
  );
};

export default PeopleCards;