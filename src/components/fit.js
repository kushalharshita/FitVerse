import React from 'react';

const FitPage = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '50px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '48px', marginBottom: '40px' }}>Welcome to Fit Page</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '50%', backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }}>
          <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '30px' }}>Start Your Fitness Routine</h2>
          <button style={{ display: 'block', margin: '0 auto', backgroundColor: '#0099ff', color: '#fff', fontSize: '24px', padding: '10px 20px', borderRadius: '5px', border: 'none' }}>Create New Fitness Routine</button>
        </div>
      </div>
    </div>
  );
};
 
export default FitPage;

