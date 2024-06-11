import React from 'react';

function MapComponent() {
  return (
    <iframe
      src="https://fallingfruit.org/locations/embed?z=2&y=36.45663&x=-49.57031&m=true&t=roadmap&c=forager,freegan&l=false&locale=fr"
      width="100%"
      height="600"
      scrolling="no"
      style={{ border: 'none' }}
    />
  );
}

export default MapComponent;
