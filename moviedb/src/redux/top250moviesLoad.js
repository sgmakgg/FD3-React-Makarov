import {updateData, updateLoadStatus} from "./top250moviesSlice";

let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

export async function top250moviesLoad(dispatch) {
    try {
        dispatch( updateLoadStatus({state:1,error:null}) );
        const response=await fetch('https://imdb-api.com/en/API/Top250Movies/k_ckcqw367', requestOptions);
        if ( response.ok ) {
            const data=await response.json();
            dispatch( updateLoadStatus({state:2,error:null}) );
            dispatch( updateData(data) );
        }
        else {
            dispatch( updateLoadStatus({state:3,error:"HTTP error "+response.status}) );
        }
    }
    catch ( err ) {
        dispatch( updateLoadStatus({state:3,error:err.message}) );
    }
}
