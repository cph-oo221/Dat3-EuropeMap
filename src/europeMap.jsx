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

    if (id.includes("-")) {
      id = id.split("-")[0];
    }

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
      .then((data) => setContry(data))
      .catch((error) => console.error("Error fetching joke:", error));
  };

  return (
    <div onClick={hanleClick}>
      <SvgComponent />
    </div>
  );
}

export default EuropeMap;
