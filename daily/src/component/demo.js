
import { createStore } from 'redux';

function counter(state=0, action) {
    let {type} = action;

    switch (type) {
        case 'INCREMENT':
            return ++state;
        default:
            return state;
    }
}

let store = createStore(counter);

$(document).click(ev=>{
    store.dispatch({ type: 'INCREMENT' });
});

store.subscribe( ()=>{
    let state = store.getState();
    console.log(state);
} );
