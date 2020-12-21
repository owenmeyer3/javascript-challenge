// from data.js
var tableData = data;

// Get tags
var tableBodyTag = d3.select('#ufo-table').select('tbody');
var input = d3.select('#datetime');

// Get keys from data
var dataKeys = Object.keys(data[0]);

// Handle date input
function changeDatetimeInput(event) {
    var dateString =  d3.event.target.value;
    fillTable(dateString);
}

// Fill table
function fillTable(dateString) {
    // Remove existing table body
    tableBodyTag.html("");
    // Filter table to get post later than datestring
    if (isValidDate(dateString)) {
        // filter table to date if date is valid
        var filteredTableData = tableData.filter(filterByDate.bind(this, dateString));
    } else {
        // Do not filter table is date is not valid
        var filteredTableData = tableData;
    }

    // Populate table
    filteredTableData.forEach(element => {
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

// Filter Table
function filterByDate(dateString, tableDatum) {
    // Get input date obj
    var inputDateStamp = stringToDate(dateString).getTime();

    // Get data date objs
    var datetimeStamp = stringToDate(tableDatum.datetime).getTime();

    // Convert data dateStrings to dateObjs
    return datetimeStamp == inputDateStamp;   
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
if (input.value == null) {
    fillTable(null);
}
// Fill table on date input change
input.on('change', changeDatetimeInput);