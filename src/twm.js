var apiKey = '14f81e903289e7ded4a6f1a19ecb68c0';
var timeKey = 'Z9JZCBN7MQS7';

export function getWeather(data, call) {
    let returnData = [];

    var type = call || 'zip';


    $.ajax({
        async: false,
        type: 'GET',
        url: `https://api.openweathermap.org/data/2.5/weather?${type}=${data}&APPID=${apiKey}&units=metric`,
        success: function (data) {
            returnData = data;
        },
        error: function () { 
            returnData = [];
        }
    }); 
    return returnData;
}

 

export function getDataFor5Days(data, call) {
    var returnedArr = [];
    
    var type = call || 'zip';

    $.ajax({
        async: false,
        type: 'GET',
        url: `https://api.openweathermap.org/data/2.5/forecast?${type}=${data}&APPID=${apiKey}&units=metric`,
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

var count = 0;

export function getSecondaryTimes() {
    var returnedData = []; 

    var arr = ['America/Dominica', 'Europe/Paris'];

    arr.forEach(e => {
        $.ajax({ 
            async: false,
            type: 'GET',
            url: `http://api.timezonedb.com/v2/get-time-zone?key=${timeKey}&format=json&by=zone&zone=${e}`,
            success: function (data) { 
                returnedData.push(data); 
            },
            error: function () {
                console.log("Something went wrong");  
            }
        });
    })

// console.log(returnedData)

    return returnedData;
}

 


