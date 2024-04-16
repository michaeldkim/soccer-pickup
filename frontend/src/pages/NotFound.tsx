import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className='flex flex-col align-middle items-center justify-center h-full mt-10'>
      <h1 className='text-7xl'>404</h1>
      <h2>Not Found :(</h2>
      <p>Oops! The page you're looking for doesn't exist!</p>
    </div>
  );
};

export default NotFound;