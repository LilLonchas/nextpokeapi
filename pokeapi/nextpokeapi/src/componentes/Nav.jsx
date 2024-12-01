// components/Navbar.js
import React from "react";

const Navbar = ({ setGeneration }) => {
  return (
    <nav>
      <ul style={{ display: "flex", gap: "20px", listStyleType: "none" }}>
        <li>
          <button onClick={() => setGeneration(1)}>Generación 1</button>
        </li>
        <li>
          <button onClick={() => setGeneration(2)}>Generación 2</button>
        </li>
        <li>
          <button onClick={() => setGeneration(3)}>Generación 3</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
