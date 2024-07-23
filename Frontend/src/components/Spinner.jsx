import React from 'react';
import './CSS_Files/Spinner.css'; // Import the CSS file

const Spinner = () => {
  return (
    <section>
    <svg>
      <filter id="gooey">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        <feColorMatrix
          values="1 0 0 0 0  
                  0 1 0 0 0  
                  0 0 1 0 0  
                  0 0 0 20 -10"
        />
      </filter>
    </svg>
    <div className="loader">
      <span style={{ '--i': 1 }} />
      <span style={{ '--i': 2 }} />
      <span style={{ '--i': 3 }} />
      <span style={{ '--i': 4 }} />
      <span style={{ '--i': 5 }} />
      <span style={{ '--i': 6 }} />
      <span style={{ '--i': 7 }} />
      <span style={{ '--i': 8 }} />

      <span className="rotate" style={{ '--j': 0 }} />
      <span className="rotate" style={{ '--j': 1 }} />
      <span className="rotate" style={{ '--j': 2 }} />
      <span className="rotate" style={{ '--j': 3 }} />
      <span className="rotate" style={{ '--i': 4 }} />
    </div>
  </section>
  );
};

export default Spinner;
