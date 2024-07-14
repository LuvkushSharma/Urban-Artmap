import React from "react";

const Oops = () => {
  return (
    <div className="oops-container">
      <video
        src="/videos/oops.mp4"
        autoPlay
        loop
        muted
        style={{
          width: "100%", 
          height: "100vh", 
          objectFit: "cover",
          position: "fixed", 
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default Oops;
