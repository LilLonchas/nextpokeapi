import React from "react";

const Navbar = ({ setGeneration }) => {
  return (
    <nav>
      
      <div className="dropdown show">
      <button type="button" className="btn btn-secondary" onClick={() => setGeneration(0)}>Inicio</button>
        <button
          className="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Selecciona Generación
        </button>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <button
              className="dropdown-item"
              onClick={() => setGeneration(1)}
            >
              Generación 1
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => setGeneration(2)}
            >
              Generación 2
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => setGeneration(3)}
            >
              Generación 3
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
