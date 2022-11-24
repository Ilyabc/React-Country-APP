import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import ListItems from "./components/ListItems";

const App = () => {

  const [data, setData] = useState([]);
  const [searchCountry ,setSearchCountry] = useState('')
  const [selectedCountryHolidays, setselectedCountryHolidays] = useState([]);
	const [sorting, setSorting] = useState(true);
  const [text, setText] = useState('')
  const [currentCountry, setCurrentCountry] = useState('')
  useEffect(() => {
    axios
      .get('https://date.nager.at/api/v3/AvailableCountries')
      .then((response) => {
        setData(response.data)
      })
      .catch(error => console.log("Axios error: ", error));
  }, []);

  const onCountryClick = (item) => {
    setCurrentCountry(item.name)
    axios
      .get(`https://date.nager.at/api/v3/NextPublicHolidays/${item.countryCode}`)
      .then((response) => {
        setselectedCountryHolidays(response.data)
      })
      .catch(error => console.log("Axios error: ", error));
  }
  const onInputChange = (text) => {
    setSearchCountry(text.target.value);
    setselectedCountryHolidays([]);
    setText(text.target.value)
  }
  return (
    <div className="container">
      <div className="body">
        <div className="search-area">
          <section className="search-field" >
          {/* <h1>{selectedCountryHolidays[0].localName}</h1> */}

            <label htmlFor="search">Search text</label>
            <input type="text" onChange={onInputChange} value={text}/>

            <button
              className="search-field__button"
              onClick={() => {setSorting(!sorting)}}> {sorting ? 'ASC' : 'DESC'}
            </button>

            <button
              onClick={() => {
              setSorting(true);
              setSearchCountry('');
              setselectedCountryHolidays([])
              setText('')
              setCurrentCountry('')
              }}
            >RESET</button>

          </section>
          <ListItems items={data} searchCountry={searchCountry} sorting={sorting} onCountryClick={onCountryClick} setCurrentCountry={setCurrentCountry}/>
        
        </div>

        <div className="info-area">
          {currentCountry ? <h1>Holidays in {currentCountry}</h1> : <h1>Click on country for more info</h1>} 
          {selectedCountryHolidays.map(e => {
           return (
            <div className='info-area__holiday'>
                <p className='info-area__date'>{e.date}</p>
                <p className='info-area__name'>{e.localName}</p>
            </div>
           )
          })}

        </div>
      </div>
      
    </div>
  );
}

export default App;
