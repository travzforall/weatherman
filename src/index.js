import "./scss/main.scss";

import img from './images/normal.jpg';
 


$(document).ready(() => {
    changeBackground();
});

function changeBackground(type) {
    let body = $('body');
    if (type === undefined) {
    console.log(type)

        // $(body).css({ "background-color": "url('../images/normal.jpg')"});
    }



}