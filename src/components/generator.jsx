import React, { useState, useEffect } from 'react';
import './generator.css';
import copyimg from '../assets/icon-copy.svg';
import { initReactI18next, useTranslation } from "react-i18next";
import i18next from 'i18next';

function PassGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(10);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(false);
  const [smallBoxColors, setSmallBoxColors] = useState(['red', 'white', 'Orange', 'yellow']);
  const [handleCopyClick, setHandleCopyClick] = useState(false);
  
  
  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+{}:"<>?\\|[];\',./`~';

    let selectedChars = '';
    if (uppercase) selectedChars += uppercaseChars;
    if (lowercase) selectedChars += lowercaseChars;
    if (numbers) selectedChars += numberChars;
    if (symbols) selectedChars += symbolChars;

    const characters = selectedChars.split('');

    const generatedPassword = Array(length)
      .fill(0)
      .map(() => characters[Math.floor(Math.random() * characters.length)])
      .join('');

    setPassword(generatedPassword);
  };
  const handleCopyButtonClick = () => {
    const passwordToCopy = document.getElementById('output').textContent;
  
    navigator.clipboard.writeText(passwordToCopy).then(
      () => {
        setHandleCopyClick(true);
      },
      () => {
        setHandleCopyClick(false);
      }
    );
  };

  useEffect(() => {
    let strength = 0;
    if (uppercase) strength++;
    if (lowercase) strength++;
    if (numbers) strength++;
    if (symbols) strength++;
  
    switch (strength) {
      case 1:
        setPasswordStrength((t("TooWeak")));
        setSmallBoxColors(['red', 'white', 'white', 'white']);
        break;
      case 2:
        setPasswordStrength(t("Weak"));
        setSmallBoxColors(['Orange', 'Orange', 'white', 'white']);
        break;
      case 3:
        setPasswordStrength(t("Medium"));
        setSmallBoxColors(['yellow', 'yellow', 'yellow', 'white']);
        break;
      case 4:
        setPasswordStrength(t("Strong1"));
        setSmallBoxColors(['green', 'green', 'green', 'green']);
        break;
      default:
        setPasswordStrength('');
        setSmallBoxColors(['white', 'white','white','white']);
    }
  }, [uppercase, lowercase, numbers, symbols]);


  const { t } = useTranslation();
  const change = (evenet) => {

    i18next.changeLanguage(event.target.value);
  }


  return (

    <div>
     
    <div className='card'>

      <div className="paswordspace"><span id="output">{password}    </span> 
      <div className="copied">{handleCopyClick ? t("criteria8") : ''}</div>



      <button onClick={handleCopyButtonClick} >
      <img src={copyimg}  alt="Copy Icon" /></button>

 
     </div>
      <div className="boxforparamentrs">
        <div className='boxforlengthoutput'>
          <p>{t("criteria5")}</p>
          <span className='autputnumber' >{length}</span>
          
        </div>
        <input
          type="range"
          min="1"
          max="20"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className='CharacterLength'
        />
        <div className='boxesforchoice'>
          <input
            type="checkbox"
            id="uppercase"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className='smallticks'
          />
          <label htmlFor="uppercase">{t("criteria1")}</label>
        </div>
        <div className='boxesforchoice'>
          <input
            type="checkbox"
            id="lowercase"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className='smallticks'
          />
          <label htmlFor="lowercase">{t("criteria2")}</label>
        </div>
        <div className='boxesforchoice'>
          <input
            type="checkbox"
            id="numbers"
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
            className='smallticks'
          />
          <label htmlFor="numbers">{t("criteria3")}</label>
        </div>
        <div className='boxesforchoice'>
          <input
            type="checkbox"
            id="symbols"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
            className='smallticks'
          />
          <label htmlFor="symbols">{t("criteria4")}</label>
        </div>
        <div className='STRENGTH'>{t("criteria6")}
        <span id='output'>
              {passwordStrength}
              {smallBoxColors.map((color, index) => (
                <div key={index} className={`smallbox ${color}`}></div>
              ))}
            </span>
        
        </div>
        <button className='generatebutton' onClick={generatePassword}>{t("criteria7")}</button>
      </div>
    </div>
    </div>
  );
}

export default PassGenerator;