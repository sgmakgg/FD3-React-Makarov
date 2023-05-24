import React, {Fragment} from 'react';

let rainbowFrame = (colors, component) => {
    let rainbowHeart = component;
    for (const color of colors) {
        rainbowHeart = <div style={{borderColor:`${color}`,
            borderStyle:`solid`,
            borderWidth:`10px`}}>
            {rainbowHeart}
        </div>
    }
    return rainbowHeart;
}
// function rainbowFrameMaker(colors) {
//     return function(Component) {
//         return props => (
//             <Fragment>
//                 {rainbowFrame(colors, <Component {...props}/>)}
//             </Fragment>
//         );
//     };
// }

let rainbowFrameMaker = colors => Component => props =>
    <Fragment>
        {rainbowFrame(colors, <Component {...props}/>)}
    </Fragment>

export {rainbowFrameMaker};