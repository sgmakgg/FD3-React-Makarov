import './Controls.css';


const Controls = props =>{
    return(
            <div className='Controls'>
                <input type='checkbox'/>
                <input type='text'/>
                <input type='button' value='Reset'/>
            </div>
    );
}

export default Controls;