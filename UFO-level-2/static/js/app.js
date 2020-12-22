// from data.js
var tableData = data;

// Get tags
var tableBodyTag = d3.select('#ufo-table').select('tbody');
var dateInput = d3.select('#datetime');
var cityInput = d3.select('#city');
var stateInput = d3.select('#state');
var countryInput = d3.select('#country');
var shapeInput = d3.select('#shape');

// Get keys from data
var dataKeys = Object.keys(data[0]);

// Handle date input
function changeFormInput(event) {
    var dateString =  dateInput.property('value');
    var city =  cityInput.property('value');
    var state =  stateInput.property('value');
    var country =  countryInput.property('value');
    var shape =  shapeInput.property('value');
    fillTable(dateString, city, state, country, shape);
}

// Fill table
function fillTable(dateString, city, state, country, shape) {
    // Remove existing table body
    tableBodyTag.html("");
    // Filter table to get post later than datestring
    if (isValidDate(dateString)) {
        // filter table to date if date is valid
        var formattedTableData = tableData.filter(filterByDate.bind(this, dateString));
    } else {
        // Do not filter table is date is not valid
        var formattedTableData = tableData;
    }

    if (city && city != "") {
        // filter table to date if date is valid
        var formattedTableData = formattedTableData.filter(filterByCity.bind(this, city));
    }

    if (state && state != "") {
        // filter table to date if date is valid
        var formattedTableData = formattedTableData.filter(filterByState.bind(this, state));
    }

    if (country && country != "") {
        // filter table to date if date is valid
        var formattedTableData = formattedTableData.filter(filterByCountry.bind(this, country));
    }

    if (shape && shape != "") {
        // filter table to date if date is valid
        var formattedTableData = formattedTableData.filter(filterByShape.bind(this, shape));
    }

    // Populate table
    formattedTableData.forEach(element => {
        // Append row
        var row = tableBodyTag.append('tr');

        // Append cells to rows
        dataKeys.forEach(key => {
            // Add values to row
            var cell = row.append('td');
            cell.text(element[key]);
        });
    });
}

// Filter table by date
function filterByDate(dateString, tableDatum) {
    // Get input date obj
    var inputDateStamp = stringToDate(dateString).getTime();

    // Get data date objs
    var datetimeStamp = stringToDate(tableDatum.datetime).getTime();

    // Convert data dateStrings to dateObjs
    return datetimeStamp == inputDateStamp;   
}

// Filter Table by city
function filterByCity(city, tableDatum) {
    return city.toLowerCase() == tableDatum.city.toLowerCase();   
}

// Filter Table by state
function filterByState(state, tableDatum) {
    return state.toLowerCase() == tableDatum.state.toLowerCase();   
}

// Filter Table by country
function filterByCountry(country, tableDatum) {
    return country.toLowerCase() == tableDatum.country.toLowerCase();   
}

// Filter Table by shape
function filterByShape(shape, tableDatum) {
    return shape.toLowerCase() == tableDatum.shape.toLowerCase();   
}

// String to Date
function stringToDate(dateString){
    // Get day, month, year of dateString
    var [month, day, year] = dateString.split("/");
    month -= 1;

    // Make dateObj and return
    var dateObj = new Date();
    dateObj.setFullYear(year);
    dateObj.setMonth(month);
    dateObj.setDate(day);
    
    return dateObj;
}

function isValidDate(dateString) {
    if (dateString == null || dateString == "") {
        // Date is not valid if null of empty string
        return false;
    } else if (typeof dateString == 'string') {
        // Test string to find if it's a date
        var temp = dateString.split('/');
        var d = new Date(temp[1] + '/' + temp[0] + '/' + temp[2]);
        isDate = d && (d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[0]) && d.getFullYear() == Number(temp[2])
        if(!(isDate)){
            // Alert user if string is not a valid date
            alert('Enter a valid date in MM/DD/YYYY format.')
        }
        return isDate;
    } else {
        // Date is not valid if not a string
        return false;
    }
}

//fill initial table
if (dateInput.value == null && cityInput.value == null && stateInput.value == null && countryInput.value == null && shapeInput.value == null) {
    console.log('initial fill')
    fillTable(null, null, null, null, null);
}

// Fill table on date input change
dateInput.on('change', changeFormInput);
cityInput.on('change', changeFormInput);
stateInput.on('change', changeFormInput);
countryInput.on('change', changeFormInput);
shapeInput.on('change', changeFormInput);