import React from 'react';
import { ErrorSnackbar } from './components/ErrorSnackbar/ErrorSnackbar';
import { Navigates } from './components/Routes/Navigates';

function App() {
  return (
    <>
      <ErrorSnackbar />
      <Navigates />
    </>
  );
}

export default App;
