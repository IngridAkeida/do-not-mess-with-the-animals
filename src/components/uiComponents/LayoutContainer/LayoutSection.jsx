const LayoutSection = ({ children }) => {
  return (
    <div className='bg-gradient-to-br from-dark-primary-a40 via-dark-primary-a30 to-dark-primary-a40'>
      {children}
    </div>
  );
};

export default LayoutSection;