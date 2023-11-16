import React, { useState, useEffect } from "react";
import SvgComponent from "./SvgComponent";

function EuropeMap() {
  const [contry, setContry] = useState("");
  const [prevTarget, setPrevTarget] = useState(null);

  useEffect(() => {
    console.log(contry);
  }, [contry]);

  function hanleClick(e) {
    if (prevTarget) {
      prevTarget.style.fill = "silver";
    }

    let id = e.target.id;

    e.target.style.fill = "red";

    if (id.includes("-")) id = id.split("-")[0];

    console.log(id);
    fetchCountries(id);

    setPrevTarget(e.target);
  }

  const fetchCountries = (contryCode) => {
    fetch(`https://restcountries.com/v3.1/alpha/${contryCode}`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setContry(data[0]))
      .catch((error) => console.error("Error fetching joke:", error));
  };

  function displayContry() {
    if (contry) {
      const borders = contry.borders?.map((border) => {
        border = border + ", ";
        return border;
      });

      return (
        <div id="displayContry">
          <p>Contry: {contry.name?.common}</p>
          <p>Population: {contry.population}</p>
          <p>Area: {contry.area}</p>
          <p>Borders: {borders}</p>
        </div>
      );
    }
  }

  return (
    <div onClick={hanleClick}>
      <SvgComponent />

      {displayContry()}
    </div>
  );
}

export default EuropeMap;
