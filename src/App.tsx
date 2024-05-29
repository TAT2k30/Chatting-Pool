import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Message from './components/Message/Message';
function App() {
  
  return (
    <>
      <div className='App-header'>
        <Header />
      </div>
      <div className='App-message'>
        <Message />
      </div>
    </>
  );
}

export default App;
