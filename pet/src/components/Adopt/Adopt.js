import React from 'react';
import { Link } from 'react-router-dom';

const Adopt = () => {
  return (
    <div>
      <h2>Adopt a Pet</h2>
      <div>
        <Link to="/adopt/dog">
          <button>Adopt Dog</button>
        </Link>
        <Link to="/adopt/cat">
          <button>Adopt Cat</button>
        </Link>
        <Link to="/adopt/bird">
          <button>Adopt Bird</button>
        </Link>
        <Link to="/adopt/other">
          <button>Adopt Other</button>
        </Link>
      </div>
    </div>
  );
};

export default Adopt;
