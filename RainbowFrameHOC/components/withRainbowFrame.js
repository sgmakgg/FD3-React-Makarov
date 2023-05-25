import React, {Fragment} from 'react';

let rainbowFrame = (colors, JSXCode) => {
    let rainbowHeart = JSXCode;
    for (const color of colors) {
        rainbowHeart = <div style={{borderColor:`${color}`,
            borderStyle:`solid`,
            borderWidth:`10px`}}>
            {rainbowHeart}
        </div>
    }
    return rainbowHeart;
}
// function withRainbowFrame(colors) {
//     return function(Component) {
//         return props => (
//             <Fragment>
//                 {rainbowFrame(colors, <Component {...props}/>)}
//             </Fragment>
//         );
//     };
// }

let withRainbowFrame = colors => Component => props =>
    <Fragment>
        {rainbowFrame(colors, <Component {...props}/>)}
    </Fragment>

export {withRainbowFrame};