import { useState } from 'react';
import * as s from './App.module.css'
import Menu from './components/Menu/Menu';
import Tablo from './components/Tablo/Tablo';

function App() {
  const [select, setSelect] = useState(2)
  return (
    <div className={s.app}>
      <div className={s.content}>
      <Menu select={select} setSelect={setSelect}/>
      <Tablo select={select} />
      </div>
    </div>
  );
}

export default App;
