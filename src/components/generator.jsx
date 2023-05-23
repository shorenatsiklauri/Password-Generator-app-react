import React, { useState, useEffect } from 'react';
import './generator.css';
import copyimg from '../assets/icon-copy.svg';

function PassGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(10);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState('Too Weak');
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
        setPasswordStrength('Too Weak');
        setSmallBoxColors(['red', 'white', 'white', 'white']);
        break;
      case 2:
        setPasswordStrength('Weak');
        setSmallBoxColors(['Orange', 'Orange', 'white', 'white']);
        break;
      case 3:
        setPasswordStrength('Medium');
        setSmallBoxColors(['yellow', 'yellow', 'yellow', 'white']);
        break;
      case 4:
        setPasswordStrength('Strong');
        setSmallBoxColors(['green', 'green', 'green', 'green']);
        break;
      default:
        setPasswordStrength('Too Weak');
        setSmallBoxColors(['red', 'white', 'white', 'white']);
    }
  }, [uppercase, lowercase, numbers, symbols]);

  return (

    <div>
     
    <div className='card'>

      <div className="paswordspace"><span id="output">{password}    </span> 
      <div className='copied' > { handleCopyClick ? 'copied' : ''} </div>



      <button onClick={handleCopyButtonClick} >
      <img src={copyimg}  alt="Copy Icon" /></button>

 
     </div>
      <div className="boxforparamentrs">
        <div className='boxforlengthoutput'>
          <p>Character Length:</p>
          <span className='autputnumber' >{length}</span>
          
        </div>
        <input
          type="range"
          min="1"
          max="10"
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
          <label htmlFor="uppercase">Uppercase</label>
        </div>
        <div className='boxesforchoice'>
          <input
            type="checkbox"
            id="lowercase"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className='smallticks'
          />
          <label htmlFor="lowercase">Include Lowercase Letters</label>
        </div>
        <div className='boxesforchoice'>
          <input
            type="checkbox"
            id="numbers"
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
            className='smallticks'
          />
          <label htmlFor="numbers">Include Numbers</label>
        </div>
        <div className='boxesforchoice'>
          <input
            type="checkbox"
            id="symbols"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
            className='smallticks'
          />
          <label htmlFor="symbols">Include Symbols</label>
        </div>
        <div className='STRENGTH'>STRENGTH
        <span id='output'>
              {passwordStrength}
              {smallBoxColors.map((color, index) => (
                <div key={index} className={`smallbox ${color}`}></div>
              ))}
            </span>
        
        </div>
        <button className='generatebutton' onClick={generatePassword}>Generate</button>
      </div>
    </div>
    </div>
  );
}

export default PassGenerator;