
import ja from  '../../assets/ja.png'
import {Link} from 'react-router-dom';
import './InformationPage.css'

function InformationPage() {
    return (
<body className="body">


<div className="container">
<h2 className="h2" style={{ textAlign: 'center' }}>Witaj!</h2>



    <div className="image-container">
      <img className="image-resize" src={ja} alt="Logo" />
    </div>
    <p className="p">Nazywam się <span className="highlight">Konrad „kodiQ” Kunicki</span>.  Jestem jednym z najbardziej rozpoznawalnych traderów skinów cs2 w Polsce. Zajmuję się tym od 2021 roku. Napisałem tę stronę, aby ułatwić nam deala. Możesz na niej sprawdzić cenę zakupu lub wynajmu skina, a następnie skontaktować się ze mną przez Messenger w celu sfinalizowania transakcji <span>&#128512;</span> Zaufało mi ponad 500 zadowolonych klientów. Znajdziesz ich tutaj: <a href="https://www.facebook.com/share/p/taMdA18p5hAYFPKr/" target="_blank" className="a-link">Legit Check  </a>.</p>
    {/* <h3 class="h2">O mnie:</h3> */}
    {/* <p class="p">Jestem jednym z najbardziej rozpoznawalnych handlarzy skinów cs2 w Polsce. Zajmuję się handlem skinów od 3 lat. Zaufało mi ponad 500 zadowolonych klientów. Znajdziesz ich tutaj: <a href="https://www.facebook.com/share/p/taMdA18p5hAYFPKr/" target="_blank" class="a-link">Legit Check  </a>. </p> */}

    
    <h3 className="h2">Moje usługi </h3>
    <ul >
        <li>Wynajem</li>
        <li>Sprzedaż / Sprzedaż na raty</li>
        <li>Kupno/ Kupno na tradebanie {"(mogę zapłacić pierwszy przy skinach powyżej 2000 PLN)"}</li>
        <li>Wymiana / Wymiana z dopłatą</li>
    </ul>
    <h3 className="h2">Jak wynająć skina?</h3>
    <p className="p">Napisz do mnie na Facebooku, który skin chcesz wynająć i na ile dni. Koszt wynajmu sprawdzisz na tej stronie. Kliknij poniższy przycisk, aby sprawdzić cenę wynajmu:</p>
    <div style={{ marginTop: '20px' }}>
        <Link class="button"  to="/rent">Sprawdź cenę wynajmu</Link>

    </div>

    <h3 className="h2">Jak kupić skina na raty?</h3>
    <p className="p">Napisz do mnie na Facebooku, który skin chcesz kupić na raty. Podaj liczbę rat oraz odstęp czasu pomiędzy ratami. Możesz wybrać dowolne parametry. Koszt rat również sprawdzisz na tej stronie. Kliknij poniższy przycisk, aby sprawdzić koszt rat:</p>
    <div style={{ marginTop: '20px' }}>
    <Link class="button"  to="/buy">Sprawdź wysokość rat</Link>

    </div>

    <h3 className="h2">Wynajem i Kupno Skina CS2 na Raty</h3>
    <p className="p">Przy wynajmie i kupnie na raty podpisujemy umowę podpisem zaufanym.</p>
    {/* <p class="p">Po podpisaniu umowy sprawdzam Twoją wiarygodność finansową, między innymi czy nie masz długów. Nie współpracuję z osobami, które mają długi.</p> */}

    <div className="link-section">
        <h3 className="h2">Jak podpisać umowę podpisem zaufanym?</h3>
        <p className="p">Zamieszczam krótki filmik z instrukcją, jak to zrobić:</p>

            <a href="https://www.youtube.com/watch?v=YoTwOnfnRLk&ab_channel=inFakt.pl" target="_blank" className="a-link">Filmik instruktażowy</a>
        
        <p className="p">Link do podpisywania:</p>
        <a href="https://moj.gov.pl/nforms/signer/upload?xFormsAppName=SIGNER" target="_blank" className="a-link">Kliknij tutaj, aby podpisać umowę podpisem zaufanym</a>
    </div>

    <h3 className="h2">Dane niezbędne do podpisania umowy:</h3>
    <ul >
        <li>Twoje imię i nazwisko</li>
        <li>Twój adres zamieszkania</li>
        <li>Tradelink</li>
    </ul>

    <h3 className="h2">Wiarygodność finansowa</h3>
    <p className="p">Nie współpracuję z osobami, które mają długi. Po podpisaniu umowy zostanie sprawdzona Twoja wiarygodność finansowa. Zgodnie z prawem, do jej sprawdzenia będzie potrzebna Twoja zgoda. Formularz zgody zostanie wysłany na Twój e-mail.</p>
    <h3 className="h2">Twoje dane niezbędne do wygenerowania zgody:</h3>


    <ul>
        <li>Numer telefonu</li>
        <li>Email</li>
        <li>Numer dowodu osobistego</li>
    </ul>

    <h3 className="h2">Czy możesz wynająć skina, jeśli nie jesteś osobą pełnoletnią?</h3>
    <p className="p">Tak, o ile umowę podpisze Twój rodzic, brat lub znajomy.</p>



    <h3 className="h2">Linki</h3>
    <ul>
        <li className="list-item2"><a href="https://www.facebook.com/profile.php?id=100008014602450" target="_blank" className="a-link">Profil Facebook</a></li>
        <li className="list-item2"><a href="https://www.facebook.com/share/p/taMdA18p5hAYFPKr/" target="_blank" className="a-link">Legit Check</a></li>
        <li className="list-item2"><a href="https://steamcommunity.com/id/kodiQTrading/" target="_blank" className="a-link">Profil Steam</a></li>
        <li className="list-item2"><a href="https://steamcommunity.com/tradeoffer/new/?partner=303971918&token=9hIhf6li" target="_blank" className="a-link">Tradelink</a></li>
    </ul>
</div>

{/* <footer class="footer">
    <p>Wszystkie prawa zastrzeżone &copy; 2024</p>
</footer> */}

</body>
    );

}
export default InformationPage;
