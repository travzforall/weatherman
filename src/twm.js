var apiKey = '14f81e903289e7ded4a6f1a19ecb68c0';
var timeKey = 'Z9JZCBN7MQS7';

export function getWeather(zip) {
    let returnData = [];

    $.ajax({
        async: false,
        type: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&APPID=' + apiKey+"&units=metric",
        success: function (data) {
            returnData = data;
        },
        error: function () {
            console.log("h")
            returnData = [];
        }
    }); 
    return returnData;
}


export function getDataFor5Days(zip) {
    var returnedArr = [];

    $.ajax({
        async: false,
        type: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/forecast?zip=' + zip + ',us&APPID=' + apiKey,
        success: function (data) {
                returnedArr.push(data.list[2]);
                returnedArr.push(data.list[10])
                returnedArr.push(data.list[18])
                returnedArr.push(data.list[26])
                returnedArr.push(data.list[34]) 

        },
        error: function () {
            console.log("Error Finding Data!");
            $("#errorMessages").append('<li>No data was found for zip ' + zip + '</li>');

        }
    });

    return returnedArr;
}


let filteredCities;

export function filterItems(partial) {
    var returnedData = []; 
    $.ajax({
        async: false,
        type: 'GET',
        url: '../src/city.list.json',
        success: function (data) {
            partial = partial.toLowerCase();

            returnedData = data.filter(e => {
                if ((e.name.toLowerCase()).startsWith(partial)) {
                    return true;
                }
            })

        },
        error: function () {
            console.log("City not found");  
        }
    });

    return returnedData;
}


export function getRandomQuote() {
    var returnedData = []; 
    $.ajax({ 
        async: false,
        type: 'GET',
        url: '../src/quotes.json',
        success: function (data) {
            var num = Math.floor(Math.random() *data.length);

            returnedData = data[num]; 
        },
        error: function () {
            console.log("Something went wrong");  
        }
    });

    return returnedData;
}

 


