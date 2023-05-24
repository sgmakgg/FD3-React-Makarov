import React, {Fragment} from 'react';

let rainbowFrame = (colors, WrappedComponent) => {
    let rainbowHeart = WrappedComponent;
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