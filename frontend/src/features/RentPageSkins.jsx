const RentPageSkins = ({ skins, handleAddToOffer }) => {
  const znizka_string = "15%";

  return (
    <div className="grid-container">
      {skins.sort((a, b) => b.price - a.price).map((skin) => (
        <div key={skin.id} className="square-container">
          {/* Główna karta */}
          <div
            className="square"
            onClick={() => handleAddToOffer(skin)} // Obsługa kliknięcia
          >
            <span
              style={{
                color: skin.rented === "true" ? "orange" : "yellow",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {skin.rented === "true" ? `ZNIŻKA -${znizka_string}` : ""}
            </span>

            <p style={{ color: "white", fontWeight: "bold" }}>{"Dostępne od: "}</p>
            <p
              style={{
                color: skin.tradeability === "true" ? "green" : "yellow",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {skin.tradeability === "true" ? "dzisiaj" : skin.tradeability}
            </p>

            <p style={{ color: "white" }}>
              {skin.name}{" "}
              {skin.isStattrack === "true" ? (
                <span style={{ color: "orange" }}>{"ST  "} </span>
              ) : (
                ""
              )}{" "}
              {skin.condition}{" "}
            </p>

            <img
              src={`https://community.steamstatic.com/economy/image/${skin.image}`}
              alt={skin.name}
            />
            <span style={{ color: "yellow" }}>
              {skin.floatt ? "Float:" : ""} {skin.floatt}
            </span>
            <p
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {skin.price} zł
            </p>
          </div>

          {/* Kontener z przyciskami */}
          <div class="hover-controls button">
            {/* <button
              className="hover-button"
              onClick={(e) => {
                e.stopPropagation(); 
                console.log("Dodano do koszyka");
              }}
            >
              🛒
            </button> */}
            <button
              class="button"
              onClick={(e) => {
                e.stopPropagation(); // Zatrzymuje propagację kliknięcia
                console.log("Szczegóły produktu");
              }}
            >
              Szczegóły
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentPageSkins;
