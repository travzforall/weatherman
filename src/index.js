import "./scss/main.scss";
import { getWeather, getDataFor5Days, filterItems, getRandomQuote, getSecondaryTimes } from './twm';
import { format } from "url";



let locate_user;
let search;



$(document).ready(() => {
    printSecondary(getSecondaryTimes());
    loadRandomQuote();
    print5DayForcast(getDataFor5Days(13122));
    setData(getWeather(13122));

    locate_user = $('#locate-user');
    search = $('#search-form');

    let user_form, user;

    user_form = $('#user-form');
    $(user_form).submit(event => {
        // event.preventDefault();
        user = $('#user');
        const validated = validateInput(user);

        if (validated) {
            console.log("Data sent to server, then JSON recieved")
        } else {
            const user = $("#user");

        }
    });



    $(search).submit(event => {
        event.preventDefault();
        var searchItem = $("#user-input").val();
        if (!isNaN(searchItem)) {
            var data = getWeather(searchItem);
            print5DayForcast(getDataFor5Days(searchItem));
            setData(data);

        } else {
            searchItem = $("#ID").val();
            var data = getWeather(searchItem, 'id');
            print5DayForcast(getDataFor5Days(searchItem, 'id'));
            setData(data);
        }
    });

    $("#user-input").keyup(() => {
        if (isNaN($("#user-input").val())) {
            if ($("#user-input")[0].selectionEnd >= 2) {
                showCityResults(filterItems($("#user-input").val()))
                var resultWindow = $("#cityResults");
                $(resultWindow).addClass("shown");
            }
        }
    });



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

function showCityResults(data) {
    var resultWindow = $("#cityResults");
    var results = $("#results");
    $(results).empty();
    $(results).append(getFormattedList(data));
    $(".city").each((index, element) => {
        $(element).click(e => {
            populateForm($(element));
            $(results).empty();
            $(resultWindow).removeClass("shown");
            $(resultWindow).addClass("hidden");
        })
    })
}

function getFormattedList(data) {
    var myList = "";
    data.forEach(e => {
        myList += `<li class="city" data-id="${e.id}"  data-name="${e.name}" data-code="${e.country}" > ${e.name},  ${e.country} </li>`
    });
    return myList;
}

function populateForm(city) {
    $("#user-input").val(`${city.data("name")}, ${city.data("code")}`);
    $("#ID").val(`${city.data("id")}`);
}

function setData(data) {

    let image = $("#one-image");
    let location = $("#location");
    let desc = $("#description");
    let min_temp = $("#min-temp");
    let max_temp = $("#max-temp");
    let humid = $("#humidity");
    let time = $("#time-stamp");

    var arr = [location, desc, min_temp, max_temp, humid, time];

    arr.forEach(e => {
        $(e).empty();
    });

    var d = new Date();

    $(image).attr("src", `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    $(location).html(`${data.name}, ${data.sys.country}`);
    $(desc).html(`${data.weather[0].main}`);
    $(min_temp).html(`${data.main.temp_min} \xB0C`);
    $(max_temp).html(`${data.main.temp_max} \xB0C`);
    $(humid).html(`${data.main.humidity}%`);
    $(time).html(`${d.getHours() % 12}:${d.getMinutes()} ` + getFrame(d.getHours()));



}

function getFrame(number) {
    return number < 12 ? 'AM' : 'PM';
}


function loadRandomQuote() {
    var quotePlace = $("#quote");
    var quote = getRandomQuote();
    $(quotePlace).html(`${quote.quote} <p>~ ${quote.author} </p>`)
}

function print5DayForcast(arr) {
    var days = $(".day");

    $(days).each((index, e) => {
        $(e).empty();
        $(e).append(formatData(arr[index]))
    })
}

function formatData(element) {
    return (`
    <h5 class="header">${(new Date(element.dt_txt.slice(0, 10)).toDateString()).substring(4)}</h5>
    <img src="http://openweathermap.org/img/w/${element.weather[0].icon}.png" alt="Image" class="five">
    <p id="temp-day1">${element.weather[0].main}</p>
    `);
}

function printSecondary(data) {

    var country0 = $('#country0');
    var country1 = $('#country1');
    var country2 = $('#country2');
    var country = $('.country');
    $(country).empty();

    $(country0).append(
        `<h4>China, CN</h4>
            <hr>
            <div class="time-zone">
              <img src="${getRandomWeather()}" alt="Image" id="day-image5">
              <p>${formatDate(new Date(data[0].formatted), true)}</p>           
              </div>`
    );

    $(country1).append(
        `<h4>${data[0].countryName}, ${data[0].countryCode} </h4>
            <hr>
            <div class="time-zone">
              <img src="${getRandomWeather()}" alt="Image" id="day-image5">
              <p>${formatDate(new Date(data[0].formatted), false)}</p>           
              </div>`
    );


    
    $(country2).append(
        `<h4>${data[1].countryName}, ${data[1].countryCode} </h4>
            <hr>
            <div class="time-zone">
              <img src="${getRandomWeather()}" alt="Image" id="day-image5">
         <p>${formatDate(new Date(data[1].formatted), false)}</p>           
              </div>`
    );

 
}
 

function getRandomWeather() {
    var arr = [
        'http://openweathermap.org/img/w/02n.png',
        'http://openweathermap.org/img/w/01n.png',
        'http://openweathermap.org/img/w/03n.png',
        'http://openweathermap.org/img/w/04n.png',
    ];
    var num = Math.floor(Math.random() * arr.length);
    return arr[num];
}


function formatDate(myDate, opposite) {
    var type = myDate.getHours() < 12? 'AM': 'PM';
    var day =  `${(myDate).getHours()%12}:${(myDate).getMinutes()} ${type}`;
    if (opposite) {
        type = myDate.getHours() > 12? 'AM': 'PM';
        day =  `${(myDate).getHours()%12}:${(myDate).getMinutes()} ${type}`;
    }
    return day;
}
