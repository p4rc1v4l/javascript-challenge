// from data.js
var ufoReports = data;

var tbody = d3.select("#jsc-body-for-data");
var button = d3.select("#jsc-filter-button");
var form = d3.select("#jsc-form");

button.on("click", runEnter);
form.on("submit", runEnter);

ufoReports.map(report => {
    let tableRow = tbody.append('tr');
    Object.values(report).forEach(reportDetail => tableRow.append('td').text(reportDetail));
});

function runEnter() {
    d3.event.preventDefault();

    let dateElement = d3.select('#jsc-report-date');
    let reportDate = dateElement.property('value');

    let reportCityElement = d3.select('#jsc-report-city');
    let reportCity = reportCityElement.property('value');

    let reportStateElement = d3.select('#jsc-report-state');
    let reportState = reportStateElement.property('value');

    let reportCountryElement = d3.select('#jsc-report-country');
    let reportCountry = reportCountryElement.property('value');

    let reportShapeElement = d3.select('#jsc-report-shape');
    let reportShape = reportShapeElement.property('value');

    let reports = ufoReports;

    if (reportDate) {
        let dateForFilter = new Date(reportDate);
        dateForFilter.setHours(24);
        reports = reports.filter(report => new Date(report.datetime).getTime() === dateForFilter.getTime());
    }

    if (reportCity) {
        reports = reports.filter(report => report.city === reportCity);
    }

    if (reportState) {
        reports = reports.filter(report => report.state === reportState);
    }

    if (reportCountry) {
        reports = reports.filter(report => report.country === reportCountry);
    }

    if (reportShape) {
        reports = reports.filter(report => report.shape === reportShape);
    }

    console.log(`filtered reports # ${reports}`);

    tbody.html('');

    if (reports.length != 0) {
        reports.map(report => {
            console.log(`Reports to show: ${report}`);
            let tableRow = tbody.append('tr');
            Object.values(report).forEach(reportDetail => tableRow.append('td').text(reportDetail));
        });

        d3.select("#jsc-empty-list").text("");

        dateElement.property('value', '');
        reportCityElement.property('value', '');
        reportStateElement.property('value', '');
        reportCountryElement.property('value', '');
        reportShapeElement.property('value', '');
    }
    else {
        dateElement.property('value', '');
        reportCityElement.property('value', '');
        reportStateElement.property('value', '');
        reportCountryElement.property('value', '');
        reportShapeElement.property('value', '');
        d3.select("#jsc-empty-list").text("No reports find.");
    }
}