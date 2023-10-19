import React from 'react';
import BlockchainView from './components/BlockchainView/BlockchainView';
import AddBlockForm from './components/AddBlockForm/AddBlockForm';

function App() {
  return (
    <div>
      <h1>Blockchain App</h1>
      <BlockchainView />
      <AddBlockForm />
    </div>
  );
}

export default App;
