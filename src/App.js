import React from "react";
import './index.css';
import Footer from './components/Footer'
import List from './components/List'

function App() {
  return (
    <React.Fragment>
      <div className='todoapp'>
        <List/>
      </div>
      <Footer/>
    </React.Fragment>

  );
}

export default App;
