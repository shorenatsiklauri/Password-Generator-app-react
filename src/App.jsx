import './App.css'
import React, { useState, useTransition } from 'react';
import PassGenerator from "./components/generator";
import i18n from "i18next";
import common_eng from "./eng.json";
import common_geo from "./geo.json";
import { initReactI18next, useTranslation } from "react-i18next";
import i18next from 'i18next';


i18n.use(initReactI18next).init({
  lng: "eng",
  debug: true,
  resources: {
    eng: { translation: common_eng },
    geo: { translation: common_geo }
  }
});



function App() {

  const { t } = useTranslation();
  const change = (evenet) => {

    i18next.changeLanguage(event.target.value);
  }
 

  return (
    <div>


      <header>
        <h1> {t("great")}</h1>

        <select name="language" id="language" onChange={change} style={{ background:"black" , color: "white", border:"none", marginLeft:"20px"}} >
        <option value="eng">Eng</option>
        <option value="geo">Geo</option>
      </select>

      </header>
      <main>
        <div className='card'>
       
          <PassGenerator />
    
               </div>
      </main>
    </div>
  );
}

export default App;