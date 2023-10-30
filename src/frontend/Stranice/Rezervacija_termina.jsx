import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Axios from 'axios';
import './dizajn.css';
import { UserContext } from "C:/Users/User/rezervacija_termina/src/App"; 

export const Rezervacija_termina = () => {
    //  const [ime, setIme] = useState('');
    //  const [prezime, setPrezime] = useState('');
     const [kontakt, setKontakt] = useState('');
     const [datumRezervacije, setDatumRezervacije] = useState('');
     const [vrijemeRezervacije, setVrijemeRezervacije] = useState('');
     const [teren, setTeren] = useState('');
     const location = useLocation();
     const { idKorisnika } = useContext(UserContext); // Dohvati idKorisnika iz konteksta
     
     const [errorMessage, setErrorMessage] = useState('');

    const unesiTermin = (e) => {
        e.preventDefault();

        // Provjeri da li su sva polja popunjena
        if (/*ime && prezime*/  datumRezervacije && vrijemeRezervacije && teren/*brojLjudi*/ && idKorisnika) {
            Axios.post('http://localhost:3001/rezervacijaTermina ', {
                // ime: ime,
                // prezime: prezime,
                kontakt: kontakt,
                datumRezervacije: datumRezervacije,
                vrijemeRezervacije: vrijemeRezervacije,
                teren: teren,
                idKorisnika: idKorisnika, // Dodaj idKorisnika u zahtjev
            })
                .then((response) => {
                    if (response.data.message) {
                        console.log(response.data);
                    } else {
                        console.log(response.data);
                    }
                    // Prikazivanje prozora s porukom
                   alert('Vaša rezervacija je uspješno unesena.');

                    // Resetiranje inputa
                    //setIme('');
                    //setPrezime('');
                    setKontakt('');
                    setDatumRezervacije('');
                    setVrijemeRezervacije('');
                    setTeren(''); 
                    
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setErrorMessage('Sva polja moraju biti popunjena!'); // Postavi grešku ako nisu sva polja popunjena
        }
    };

    return (
        <div>
            <nav className="navigation-bar">
                <div className="nav-left">
                    <Link
                        to="/rezervacijaTermina"
                        className={location.pathname === '/rezervacijaTermina' ? 'active' : ''}
                    >
                        Rezerviraj termin
                    </Link>

                    <Link
                        to="/prikazRezervacija"
                        className={location.pathname === '/izracunPotrosnje' ? 'active' : ''}
                    >
                        Prikaz prošlih rezervacija
                    </Link>

                    <Link
                        to="/informacijeRacuna"
                        className={location.pathname === '/informacijeRacuna' ? 'active' : ''}
                    >
                        Informacije o računu
                    </Link>
                </div>
                <div className="nav-right">
                    <Link to="/">Odjava</Link>
                </div>
            </nav>
            <div className="rezervacije-form-container">
                <h2 className="header">Rezerviraj svoj termin!</h2>
                <form className="rezervacije-form" onSubmit={unesiTermin}>
                    
                {/* <label htmlFor="ime">Unesite svoje ime</label>
                    <input
                        value={ime}
                        onChange={(e) => setIme(e.target.value)}
                        type="ime"
                        id="ime"
                        name="ime"
                    />
                    
                    <label htmlFor="prezime">Unesite svoje prezime</label>
                    <input
                        value={prezime}
                        onChange={(e) => setPrezime(e.target.value)}
                        type="prezime"
                        id="prezime"
                        name="prezime"
                    /> */}


                    <label htmlFor="kontakt">Unesite kontakt podatke (mail ili mobitel)</label>
                    <input
                        value={kontakt}
                        onChange={(e) => setKontakt(e.target.value)}
                        type="kontakt"
                        id="kontakt"
                        name="kontakt"
                    />

                    <label htmlFor="datumRezervacije">Odaberite datum rezervacije</label>
                    <input
                        value={datumRezervacije}
                        onChange={(e) => setDatumRezervacije(e.target.value)}
                        type="date"
                        id="datumRezervacije"
                        name="datumRezervacije"
                    />

                    <label htmlFor="vrijeme rezervacije">Unesite vrijeme rezervacije</label>
                    <input
                        value={vrijemeRezervacije}
                        name="vrijemeRezervacije"
                        onChange={(e) => setVrijemeRezervacije(e.target.value)}
                        id="vrijemeRezervacije"
                    />

<label htmlFor="teren">Odaberite vrstu terena</label>
                    <select
                        value={teren}
                        onChange={(e) => setTeren(e.target.value)}
                        id="teren"
                        name="teren"
                    >
                        <option value="">Odaberite teren</option>
                        <option value="1">Unutarnji</option>
                        <option value="2">Vanjski</option>
                    </select>

                    {errorMessage && <h1 style={{ color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{errorMessage}</h1>}
                    
                    <button className="gumb" type="submit">
                        Rezerviraj
                    </button>
                </form>
            </div>
        </div>
    );
};


export default Rezervacija_termina;
