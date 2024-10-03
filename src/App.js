import React from 'react';
import DeploymentTable from './DeploymentTable'; 
function App() {
  return (
    <div className="App">
     <h1 style={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif',color:'#3a3b38',paddingLeft: '20px'}}>Deployments</h1>
      <DeploymentTable />
    </div>
  );
}

export default App;
