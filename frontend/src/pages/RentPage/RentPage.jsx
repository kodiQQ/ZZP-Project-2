import { useState, useEffect } from 'react';
import SkinService from '../../axios/SkinService.js';
import RentPageSkins from '../../features/RentPageSkins';
import './RentPage.css';

function RentPage() {
  const [skins, setSkins] = useState([]);
  const [selectedSkins, setSelectedSkins] = useState([]);  // Nowy stan na przechowywanie wybranych skórek
  const [showForm, setShowForm] = useState(false);
  const [showDiscountCounter, setShowDiscountCounter] = useState(0);
  const [showRentCost, setShowRentCost] = useState(false);
  const [wholePrice, setWholePrice] = useState(0);//łączna cena wybranych skinów
  const [wholePriceWithDiscount, setWholePriceWithDiscount] = useState(0);//łączna cena wybranych skinów
  const [dayNumber, setDayNumber] = useState(8);
  const [dayNumber2, setDayNumber2] = useState(8);
  const [costPerDay, setCostPerDay] = useState(0);
  const [costPerDayWithDiscount, setCostPerDayWithDiscount] = useState(0);
  const [cost, setCost] = useState(0);
  const [costWithDiscount, setCostWithDiscount] = useState(0);
  const [showCommunicatTooLowPrice,setShowCommunicatTooLowPrice]= useState(false)
  const minimumPrice=1500;
  const znizka=0.15;
  const znizka_string="15%"

  const fetchSkins = async () => {
    try {
      const response = await SkinService.getAllSkins();
      response.productsList.forEach((r) => {
        r.price = parseFloat((r.price * 1.45).toFixed(2));
      });
      setSkins(response.productsList);
    } catch (error) {
      console.error('Error fetching skins:', error);
    }
  };


  useEffect(() => {
    fetchSkins();
  }, []);

  // Funkcja dodająca skórkę do oferty
  const handleAddToOffer = (skin) => {
    setSelectedSkins((prevSelected) => [...prevSelected, skin]);  // Dodajemy wybraną skórkę do `selectedSkins`
    setSkins((prevSkins) => prevSkins.filter((s) => s.id !== skin.id));  // Usuwamy skórkę z listy dostępnych skórek
    let result=Number(wholePrice)+Number(skin.price);
    setWholePrice(result.toFixed(2));
    
    let result_discount_including_discount=Number(wholePriceWithDiscount)+Number(skin.price*(1-znizka));
    let result_discount_not_including_discount=Number(wholePriceWithDiscount)+Number(skin.price);
    // console.log(result_discount_including_discount);
    // console.log(result_discount_not_including_discount);
    if(skin.rented=="true"){
      console.log("prawda");
      setWholePriceWithDiscount(result_discount_including_discount.toFixed(2));
      setShowDiscountCounter(showDiscountCounter+1);
    }else{
      console.log("fałsz")
      setWholePriceWithDiscount(result_discount_not_including_discount.toFixed(2));
    }
    // setShowForm(false);
    // setShowInstallments(false);

    setShowForm(false);
    setShowRentCost(false);
    setShowCommunicatTooLowPrice(false);
  };


  const handledeleteFromOffer = (skin) => {
    setSelectedSkins((prevSkins) => prevSkins.filter((s) => s.id !== skin.id));  // Dodajemy wybraną skórkę do `selectedSkins`
    setSkins((prevSelected) => [...prevSelected, skin]);
    let result = Number(wholePrice) - Number(skin.price);
    setWholePrice(result.toFixed(2));
    if(wholePrice<0){
      setWholePrice(0);
    }

    let result_discount_including_discount=Number(wholePriceWithDiscount)-Number(skin.price*(1-znizka));
    let result_discount_not_including_discount=Number(wholePriceWithDiscount)-Number(skin.price);
    if(skin.rented=="true"){
      setWholePriceWithDiscount(result_discount_including_discount.toFixed(2));
      setShowDiscountCounter(showDiscountCounter-1);
    }else{
      setWholePriceWithDiscount(result_discount_not_including_discount.toFixed(2));
    }
    if(wholePriceWithDiscount<0){
      setWholePriceWithDiscount(0);
    }
    setShowForm(false);
    setShowRentCost(false);
    setShowCommunicatTooLowPrice(false);
    // console.log("showform:")
    // console.log(showForm)
    // setShowForm(false);
    // setShowInstallments(false);
    // setSelectedSkins();  // Usuwamy skórkę z listy dostępnych skórek
    // setSkins();
  };





// function getPolishCurrentDate() {
//   const currentDate = new Date();
//   const offset = currentDate.getTimezoneOffset();
//
//   // Polska strefa czasowa ma przesunięcie UTC +1 godzina, lub +2 przy czasie letnim
//   const polishDate = new Date(currentDate.getTime() - offset * 60 * 1000);
//   return polishDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
// }




const handleButtonClick = () => {
  if(wholePrice>(minimumPrice*1.45)){
    setShowForm(true); // Ustawienie widoczności formularza na true po kliknięciu
  }else{
    setShowCommunicatTooLowPrice(true);
  }
};


// Funkcja obsługi zmiany ilości rat
const handleDayNumberChange = (e) => {
  setDayNumber(e.target.value); // Aktualizacja ilości rat
};


const calculateRentCost=(event)=>{
  event.preventDefault();
    console.log("wykonanie calculateRentCost");
    // console.log(wholePrice);
    // console.log(wholePriceWithDiscount);
    let one_percent=(wholePrice/1.45)*0.009;
    let one_percent_with_discount=(wholePriceWithDiscount/1.45)*0.009;
    let result=(8+Number(dayNumber))*0.5*one_percent
    let result_with_discount=(8+Number(dayNumber))*0.5*one_percent_with_discount
    setCost(result.toFixed(2));
    setCostWithDiscount(result_with_discount.toFixed(2));

    let costPerDay0=((8+Number(dayNumber))*0.5*one_percent)/dayNumber;
    let costPerDay0_with_discount=((8+Number(dayNumber))*0.5*one_percent_with_discount)/dayNumber;
    console.log("Wartość costPerDay przed zaokrągleniem:", costPerDay0);
    let roundedCostPerDay = parseFloat(costPerDay0.toFixed(2));
    let roundedCostPerDay_with_discount = parseFloat(costPerDay0_with_discount.toFixed(2));
    console.log(roundedCostPerDay);
    setCostPerDay(roundedCostPerDay);
    setCostPerDayWithDiscount(roundedCostPerDay_with_discount)
    setDayNumber2(dayNumber);
    setShowRentCost("true");
}



// Wywołanie funkcji
// createTable(list1, list2, list3);



  return (
    <div className="buy-container">
      <div className="offer-container">
        <div className="offer-header">
          <span>Twoje zamówienie:</span>
          <span className="offer-amount"> {wholePrice} {" zł"} <i className="icon-basket"></i></span>
        </div>
        <div className="offer-content">
          {/* <h2>Twoja Oferta</h2> */}
          <p>Dodaj przedmioty, które chcesz wynająć</p>
          {/* Wyświetlanie wybranych skórek */}
          <div className="selected-skins">
            {selectedSkins.map((skin) => (
              <div key={skin.id} 
              className="selected-skin"
              onClick={() => handledeleteFromOffer(skin)}>
                <div className="details">
                  <div>{skin.condition}</div>
                  <div>{skin.isStattrack=="true"&&<div className="ST">ST</div>}</div>
                
                </div>
                <img
                  src={`https://community.steamstatic.com/economy/image/${skin.image}`}
                  alt={skin.name}
                />
                <p>{skin.price} zł</p>
              </div>
            ))}
          </div>
          {selectedSkins.length>0 && <div className="buy-buttons">
        {/* <div class="button">Kup</div> */}
        <div className="button" onClick={handleButtonClick}>Sprawdź koszt wynajmu</div>
        </div>}
          


        </div>

        {showForm && (
          <div className="form-style-and-confirm">
            <div>          
              <div className="form-style">
                <div>
            
            </div>
            <div>
            <form className="rent-form" onSubmit={calculateRentCost}>
          <label>
            Liczba dni (minimum 8):
            <input
              type="number"
              value={dayNumber}
              onChange={handleDayNumberChange}
              min="8"
            />
          </label>
          <button className="button" type="submit">Potwierdź</button>
          
        </form>
            </div>
            <div>
            
            </div>
            
          </div></div>
            <div className="form-style">
              <div></div>
              <div></div>
              {/* <div>
                <div class="rent-button-style">
                    <div></div>
                    <div class="button" onClick={calculateRentCost}>Zatwierdź</div>
                    <div></div>
                    </div>
              </div> */}
            
            </div>
          </div>


          
        
      )}
      {showCommunicatTooLowPrice &&(
        ( 
          <div className="rent-cost">
              Cena skinów jest zbyt niska. Łączna wartość skinów powinna przekraczać 2175 zł. Dodaj skiny.
          </div>
          
        )
      )}

{
        showRentCost&&<div className="rent-cost">
          <p className={`rent-cost ${ showDiscountCounter>0 ? 'przekreslony-tekst' : ''}`}>Koszt wynajmu: za {dayNumber2} dni: {cost} zł</p>
           <p className={`rent-cost ${ showDiscountCounter>0 ? 'przekreslony-tekst' : ''}`}>{costPerDay} zł/ 1 dzień ( IM DŁUŻEJ TYM TANIEJ! ) </p>
           {/* <div onClick={handleAddOrder}>Złóż zamówienie</div> */}
           </div>
           
      }
      {
    showRentCost && showDiscountCounter > 0 && (
        <div className="rent-cost">
          <p className={`rent-cost`} style={{color:"orange"}}>CENA WLICZAJĄC ZNIŻKĘ (-{znizka_string}):  </p>
          <p className={`rent-cost`} style={{color:"green"}}>Koszt wynajmu: za {dayNumber2} dni: {costWithDiscount} zł </p>
          <p className={`rent-cost`} style={{color:"green"}}>{costPerDayWithDiscount} zł/ 1 dzień ( IM DŁUŻEJ TYM TANIEJ! )</p>
        </div>
    )
}
        
      </div>
            
      {/* {showForm && (
        <form className="rent-form">
          <label>
            Ilość dni (minimum 8):
            <input
              type="number"
              value={dayNumber}
              onChange={handleDayNumberChange}
              min="8"
            />
          </label>
          {
        showForm&&<div class="rent-button-style">
            <div></div>
            <div class="button" onClick={calculateRentCost}>Zatwierdź</div>
            <div></div>
            </div>
      }
        </form>
      )} */}
      
      {/* {
        showRentCost&&<div><p>Koszt wynajmu: za {dayNumber} dni: {cost} zł</p> <p>{costPerDay} zł/ 1 dzień</p></div>
      } */}


<RentPageSkins 
  skins={skins} 
  handleAddToOffer={handleAddToOffer} 
/>
      {/* <div className="grid-container">
        {skins.sort((a, b) => b.price - a.price).map((skin) => (
          <div
            key={skin.id}
            className="square"
            onClick={() => handleAddToOffer(skin)}  // Dodajemy obsługę kliknięcia
          >
                    <span style={{ color: skin.rented == "true" ? 'orange' : "yellow", fontWeight: 'bold', fontSize: '20px' }}>
          {skin.rented == "true" ? `ZNIŻKA -${znizka_string}` : ""}
          
        </span>
            
            <p style={{ color: 'white', fontWeight: 'bold' }}>
          {"Dostępne od: "}
        </p>
        <p style={{ color: skin.tradeability == "true" ? 'green' : "yellow", fontWeight: 'bold', fontSize: '20px' }}>
          {skin.tradeability == "true" ? "dzisiaj" : skin.tradeability}
        </p>
        
            <p style={{ color: 'white' }}>{skin.name} {"  "}{skin.isStattrack=="true" ?  <span style={{ color: 'orange' }}>{"ST  "} </span>:""}  {skin.condition} </p>
            
            <img
              src={`https://community.steamstatic.com/economy/image/${skin.image}`}
              alt={skin.name}
            />
            <span style={{color:"yellow"}}>{skin.floatt ? "Float:" : ""} {skin.floatt}</span>
            <p style={{ color: 'white' , fontWeight: 'bold', fontSize: '20px'}}>{skin.price} zł</p>
            </div>
        ))}
      </div> */}
    </div>
  );

}

export default RentPage;
