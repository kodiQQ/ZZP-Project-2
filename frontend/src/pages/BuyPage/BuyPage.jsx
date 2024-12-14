import { useState, useEffect } from 'react';
import SkinService from '../../axios/SkinService.js';
import './BuyPage.css'
import BuyPageSkins  from '../../features/BuyPageSkins';

function BuyPage() {
  const [skins, setSkins] = useState([]);
  const [installmentList, setInstallmentList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [selectedSkins, setSelectedSkins] = useState([]);  // Nowy stan na przechowywanie wybranych skórek
  const [showForm, setShowForm] = useState(false);
  const [showInstallments, setShowInstallments] = useState(false);  // Kontrola widoczności formularza
  const [installments, setInstallments] = useState(''); // Ilość rat
  const [interval, setInterval] = useState(''); // Odstęp czasowy
  const [wholePrice, setWholePrice] = useState(0);//łączna cena wybranych skinów
  const [numberList, setNumberList] = useState([]);//łączna cena wybranych skinów
  // const [dateDifference, setDateDifference] = useState(0);
  const [installmentsChecker, setInstallmentsChecker] = useState(0);// ustawia -1 gdy długość rat jest zbyt krótka, 0 gdy jest dobra, 1 gdy jest zbyt długa
  const [showCommunicatTooLowPrice,setShowCommunicatTooLowPrice]= useState(false)
  const minimumPrice=1500;
  
  const minimumDaysOfInstallments=60;
  const maximumDaysOfInstallments=355;
  const rate=1.0065;

  const fetchSkins = async () => {
    try {
      console.log("RESPONSE:1111")
      const response = await SkinService.getAllSkins();
      console.log("RESPONSE:")
      console.log(response);
      const updatedSkins = response.productsList.map(item => {
        const updatedPrice = (parseFloat(item.price) * 1.05).toFixed(2); // Zwiększamy cenę o 3% i zaokrąglamy do dwóch miejsc po przecinku
        return { ...item, price: updatedPrice }; // Zwracamy obiekt z zaktualizowaną ceną
      });
      setSkins(updatedSkins);
    } catch (error) {
      console.error('Error fetching skins:', error);
    }
  };

  // useEffect(() => {
  //   fetchSkins();
  // }, [dateList, installmentList,numberList]);

  useEffect(() => {
    fetchSkins();
    // if (wholePrice<0){
    //   setWholePrice(0);
    // }
  }, []);

  // Funkcja dodająca skórkę do oferty
  const handleAddToOffer = (skin) => {
    setSelectedSkins((prevSelected) => [...prevSelected, skin]);  // Dodajemy wybraną skórkę do `selectedSkins`
    setSkins((prevSkins) => prevSkins.filter((s) => s.id !== skin.id));  // Usuwamy skórkę z listy dostępnych skórek
    let result=Number(wholePrice)+Number(skin.price);
    setWholePrice(result.toFixed(2));
    setShowForm(false);
    setShowInstallments(false);
    setShowCommunicatTooLowPrice(false);
  };


  const handledeleteFromOffer = (skin) => {
    setSelectedSkins((prevSkins) => prevSkins.filter((s) => s.id !== skin.id));  // Dodajemy wybraną skórkę do `selectedSkins`
    setSkins((prevSelected) => [...prevSelected, skin]);
    let result=Number(wholePrice)-Number(skin.price);
    setWholePrice(result.toFixed(2));
    if(wholePrice<0){
      setWholePrice(0);
    }
    setShowForm(false);
    setShowInstallments(false);
    setShowCommunicatTooLowPrice(false);
    // setSelectedSkins();  // Usuwamy skórkę z listy dostępnych skórek
    // setSkins();
  };


  // Funkcja kalkulatora rat
function installment_calculator(c, r, w, d, n) {
  // Konwersja na liczby zmiennoprzecinkowe
  c = Number(c);
  r = Number(r);
  w = Number(w);
  d = Number(d);

  // Obliczenia
  return +(c / r + (c - (c / r * n)) * (Math.pow(w, d) - 1)).toFixed(2);
}

// Główna funkcja generująca listę rat
function generateInstallmentList(price, iloscRat,  wspolczynnik, odstep) {
  const listaRat = [];

  for (let i = 0; i < iloscRat; i++) {
    let rata = "";
    let kwotaRaty;

    if (i !== iloscRat - 1) {
      kwotaRaty = installment_calculator(price, iloscRat, wspolczynnik, odstep, i + 1);
    } else {
      kwotaRaty = +(price / iloscRat).toFixed(2);
    }

    rata = kwotaRaty + " zł";
    listaRat.push(rata);
  }
  return listaRat;

  // setInstallmentList(listaRat);
}

function getPolishCurrentDate() {
  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset();
  
  // Polska strefa czasowa ma przesunięcie UTC +1 godzina, lub +2 przy czasie letnim
  const polishDate = new Date(currentDate.getTime() - offset * 60 * 1000);
  return polishDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
}


function generateDateList(startDate, interval2, numDates) {
  const dateList0 = []; // Tworzymy listę dat
  let currentDate = new Date(startDate); // Ustawiamy datę początkową

  for (let i = 0; i < numDates; i++) {
    // Formatujemy datę w formacie DD.MM.YYYY
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Miesiące w JS są zero-indeksowane, więc dodajemy 1
    const year = currentDate.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;
    dateList0.push(formattedDate); // Dodajemy sformatowaną datę

    currentDate.setDate(currentDate.getDate() + interval2); // Dodajemy odstęp czasowy do aktualnej daty
  }

  // setDateList(dateList0); // Aktualizujemy stan listy dat
  return dateList0;
}




const handleButtonClick = () => {
  if(wholePrice>minimumPrice){
    setShowForm(true); // Ustawienie widoczności formularza na true po kliknięciu
  }else{
    setShowCommunicatTooLowPrice(true);
  }
    
};


// Funkcja obsługi zmiany ilości rat
const handleInstallmentsChange = (e) => {
  setInstallments(e.target.value); // Aktualizacja ilości rat
};

// Funkcja obsługi zmiany odstępu czasowego
const handleIntervalChange = (e) => {
  setInterval(e.target.value); // Aktualizacja odstępu czasowego
};

function calculateDateDifference(date1, date2) {
  // Konwersja dat z formatu dd.mm.yyyy na obiekty Date
  const [day1, month1, year1] = date1.split('.').map(Number);
  const [day2, month2, year2] = date2.split('.').map(Number);
  
  const firstDate = new Date(year1, month1 - 1, day1); // miesiące w Date są indeksowane od 0
  const secondDate = new Date(year2, month2 - 1, day2);
  
  // Oblicz różnicę w milisekundach
  const differenceInMilliseconds = Math.abs(firstDate - secondDate);
  
  // Konwersja milisekund na dni
  const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
  return differenceInDays;
};

const handleConfirmInstallments= (event)=>{
  event.preventDefault();
  console.log("Włączono")
  let numberList2=[];
  let polishDate= getPolishCurrentDate();
  //zapisanie listy dat
  const dateList0= generateDateList(String(polishDate),Number(interval),Number(installments));
  
  //zapisanie listy rat
  // generateInstallmentList()

  for(let i=0;i<dateList0.length;i++){
    numberList2.push(i+1);
  }
  //zapisanie listy numerów
  
  const installmentsList0= generateInstallmentList(wholePrice,installments,rate,interval);
  setInstallmentList(installmentsList0);
  let datedifference0=calculateDateDifference(dateList0[0],dateList0[dateList0.length-1]);
  if(installmentsList0.length==1){
    setInstallmentsChecker(0);
  }else{
    if(datedifference0<minimumDaysOfInstallments){
      setInstallmentsChecker(-1);
    }else if(datedifference0>maximumDaysOfInstallments){
      setInstallmentsChecker(1);
    }else{
      setInstallmentsChecker(0);
    }
  }
  
 
  console.log("installmentschecker: "+installmentsChecker)
  console.log(dateList0[0]);
  console.log(dateList0[dateList0.length-1]);
  console.log(datedifference0);
  // setDateDifference(datedifference0);
  setDateList(dateList0);
  setNumberList(numberList2);
  setShowInstallments("true");
  console.log(installmentList);
  console.log(dateList);
  console.log(numberList);

};



  const createTable = (list1, list2, list3) => {
    return (
      <table className="styled-table">
        <thead>
          <tr>
            <th>Numer raty</th>
            <th>Kwota raty</th>
            <th>Data raty</th>
          </tr>
        </thead>
        <tbody>
          {list1.map((item, index) => (
            <tr key={index}>
              <td>{item}</td>
              <td>{list2[index]}</td>
              <td>{list3[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


// Wywołanie funkcji
// createTable(list1, list2, list3);


const sortedSkins = Array.isArray(skins) && skins.length > 0 ? [...skins].sort((a, b) => b.price - a.price) : [];

  return (
    <div className="buy-container">
      <div className="offer-container">
        <div className="offer-header">
          <span>Twoje zamówienie:</span>
          <span className="offer-amount">{wholePrice} {" zł"} <i className="icon-basket"></i></span>
        </div>
        <div className="offer-content">
          {/* <h2>Twoja Oferta</h2> */}
          <p>Dodaj przedmioty, które chcesz kupić</p>
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
  <button className="bg-[#FFD700] text-[#5D4037] px-5 py-2.5 rounded-md text-center font-bold cursor-pointer transition-colors duration-300 hover:bg-yellow-400 " onClick={handleButtonClick}>Sprawdź wysokość rat</button>
</div>}
          


        </div>

        {showForm && (
        <div className="form-style-and-confirm">
            <div>
            <div className="form-style">
                <div>
                </div>

                <div>
                <form className="rent-form" onSubmit={handleConfirmInstallments}>
          <label>
            Liczba rat (im większa, tym drożej):
            <input
              type="number"
              value={installments}
              onChange={handleInstallmentsChange}
              min="1"
              max="24"
              
            />
          </label>
          <label>
            Liczba dni między ratami (im większa, tym drożej) :
            <input
              type="number"
              value={interval}
              onChange={handleIntervalChange}
              min="1"
              max="40"
              
            />
          </label>
          <button className="button" type="submit">Potwierdź</button>
        </form >
            </div>

            <div className="form-style">
            <div></div>
              <div></div>
              <div>


              
       
      
              </div>
            </div>
                </div>

                <div>
                </div>
            </div>
            <div>
            {/* <div class="rent-button-style">
                    <div></div>
                    <div class="button" onClick={handleConfirmInstallments} >Zatwierdź</div>
                    <div></div>
                    </div> */}
              </div>


            
          </div>
        
      )}

{showCommunicatTooLowPrice &&(
        ( 
          <div className="rent-cost">
              Cena skinów jest zbyt niska. Jeśli chcesz kupić skiny na raty, ich łączna wartość powinna przekraczać 1500 zł. Skiny poniżej 1500 zł sprzedaję w 1 racie, widocznej na ekranie.
          </div>
          
        )
      )}


{showInstallments && installmentsChecker==0&&(
        ( 
          <div className="table-container">
            {createTable(numberList,installmentList ,dateList )}

          </div>
          
        )
      )}

{showInstallments && installmentsChecker==1&&(
        ( 
          <div className="rent-cost">
            Zbyt długi czas spłaty. Zmniejsz liczbę dni między ratami lub liczbę rat. Maksymalny czas spłaty to 12 miesięcy.

          </div>
          
        )
      )}

{showInstallments && installmentsChecker==-1&&(
        ( 
          <div className="rent-cost">
            Zbyt krótki czas spłaty. Zwiększ liczbę dni między ratami lub liczbę rat. Minimalny czas spłaty to 2 miesiące.

          </div>
        )
      )}
        
      </div>

      <BuyPageSkins 
  sortedSkins={sortedSkins} 
  handleAddToOffer={handleAddToOffer} 
/>

      {/* <div className="grid-container">
        {sortedSkins.map((skin) => (
          
          <div
            key={skin.id}
            className="square"
            onClick={() => handleAddToOffer(skin)} 
          >
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
            <p style={{ color: 'white' ,fontWeight: 'bold', fontSize: '20px' }}>{skin.price} zł</p>
          </div>
        ))}
      </div> */}
    </div>
  );

}

export default BuyPage;
