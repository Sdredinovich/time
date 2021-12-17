import * as s from './Menu.module.css'


const Menu =({select, setSelect})=>{



    return <div className={s.menu}>
        <div className={s.metkaSelect}></div>
        <div className={`${s.menu2} ${select===1&&s.selected1} ${select===2&&s.selected2} ${select===3&&s.selected3}`}>
        <div className={`${s.div1} ${s.divP}`}><p className={`${s.timerP} ${select===1&&s.selected}`} onClick={()=>{setSelect(1)}}>ТАЙМЕР</p></div>
        <div className={`${s.div2} ${s.divP}`}><p className={`${s.secondP} ${select===2&&s.selected}`} onClick={()=>{setSelect(2)}}>СЕКУНДОМЕР</p></div>
        <div className={`${s.div3} ${s.divP}`}><p className={`${s.clockP} ${select===3&&s.selected}`} onClick={()=>{setSelect(3)}}>ЧАСЫ</p></div>

        </div>




    </div>
}


export default Menu