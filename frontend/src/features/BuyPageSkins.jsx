const BuyPageSkins = ({ sortedSkins, handleAddToOffer }) => {
    return (
      <div className="grid-container">
        {sortedSkins.map((skin) => (
          <div
            key={skin.id}
            className="square"
            onClick={() => handleAddToOffer(skin)} // Dodajemy obsługę kliknięcia
          >
            <p style={{ color: 'white', fontWeight: 'bold' }}>{"Dostępne od: "}</p>
            <p
              style={{
                color: skin.tradeability == "true" ? 'green' : 'yellow',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              {skin.tradeability == "true" ? "dzisiaj" : skin.tradeability}
            </p>
            <p style={{ color: 'white' }}>
              {skin.name}{" "}
              {skin.isStattrack == "true" ? (
                <span style={{ color: 'orange' }}>{"ST  "}</span>
              ) : (
                ""
              )}{" "}
              {skin.condition}
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
                color: 'white',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              {skin.price} zł
            </p>
          </div>
        ))}
      </div>
    );
  };
  
  export default BuyPageSkins;
  