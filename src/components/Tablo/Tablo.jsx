import TimerInput from '../TimerInput/TimerInput'
import * as s from './Tablo.module.css'

const Tablo = ({select})=>{
    return <div className={s.tablo}>
        <div className={s.tablo2}>
        <TimerInput select={select}/>
        </div>
    </div>
}


export default Tablo