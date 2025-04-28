import React from 'react';
import '../CSS/Avaleht.css';
import MiddleGrid from '../../components/MiddleGrid'; 


function Avaleht() {
    return (
      <div className="page-container">
  
        {/* Wrapper to center the grid */}
        <div className="grid-wrapper">
          <MiddleGrid />
        </div>
      </div>
    );
  }

export default Avaleht;
