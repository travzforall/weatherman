import "./scss/main.scss";
// import 'jquery';

let locate_user;



$(document).ready(() => {
    locate_user = $('#locate-user');
    let user_form, user;
 
    user_form = $('#user-form');
    user_form.submit(event => {
        // event.preventDefault();
        user = $('#user');
        const validated = validateInput(user);

        if (validated) {
            console.log("Data sent to server, then JSON recieved")
        } else {
            const user = $("#user");
            // $("#locate-user").tooltip('show');
        }

    }); 

    changeBackground();
});






function addEventListener(element, fn) { 
    $(element).click(fn);
}



function changeBackground(type) {
    let body = $('body');
    console.log(locate_user)
    if (type === undefined) {


    }
}

function validateInput(inputField) {
    var sd = 4;
    console.log(sd);
    console.log($(inputField).val());
    return false;
}