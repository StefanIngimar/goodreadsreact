import React from 'react';
import BookSearch from './BookSearch';

const Layout = ({ children }) => {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <BookSearch />
      </div>
      {children}
    </div>
  );
};

export default Layout;