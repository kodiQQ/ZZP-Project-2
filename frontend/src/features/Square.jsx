const Square = ({ skin, handleAddToOffer }) => {
    return (
      <div
        className="square"
        onClick={() => handleAddToOffer(skin)}
      >
        {/* Dostępność */}
        <p style={{ color: 'white', fontWeight: 'bold' }}>
          Dostępne od:
        </p>
        <p style={{ 
          color: skin.tradeability === "true" ? 'green' : 'yellow', 
          fontWeight: 'bold', 
          fontSize: '20px' 
        }}>
          {skin.tradeability === "true" ? "dzisiaj" : skin.tradeability}
        </p>
  
        {/* Nazwa i stattrak */}
        <p style={{ color: 'white' }}>
          {skin.name}{" "}
          {skin.isStattrack === "true" && (
            <span style={{ color: 'orange' }}>ST</span>
          )}{" "}
          {skin.condition}
        </p>
  
        {/* Obrazek */}
        <img
          src={`https://community.steamstatic.com/economy/image/${skin.image}`}
          alt={skin.name}
          style={{ maxWidth: "100%", height: "auto" }} // Dodano style dla responsywności
        />
  
        {/* Float */}
        {skin.floatt && (
          <span style={{ color: "yellow" }}>
            Float: {skin.floatt}
          </span>
        )}
  
        {/* Cena */}
        <p 
          style={{ 
            color: 'white', 
            fontWeight: 'bold', 
            fontSize: '20px' 
          }}
        >
          {skin.price} zł
        </p>
      </div>
    );
  };
  
  export { Square };