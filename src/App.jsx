import './App.css'
import React, { useState } from 'react';
import PassGenerator from "./components/generator";


function App() {


  return (
    <div>


      <header>
        <h1>Password Generator</h1>
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