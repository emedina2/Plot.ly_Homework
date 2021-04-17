//set up variables for locations on page
var barChart = d3.select("#bar");
var gaugePlot = d3.select("#gauge");
var bubblePlot = d3.select("#bubble");
var dropdown = d3.select("select");
var sampleMetadata = d3.select("#sample-metadata");
var selection = dropdown.property("value");


var names;
var metadata;
var samples;

//import json file
var data = d3.json("./data/samples.json")

//add unpack function
function unpack(rows, index) {
    return rows.map(function(row) {
    return row[index];
    });
    }

//Detect dropdown change
function optionChanged(dropdownSelection){
    dropdown.on("onchange", getMetadata(dropdownSelection))
};

//initialize page function
function init() {
    data.then(function(samples) {
        Object.entries(samples.names).forEach(function([key, value]) {
        var options = dropdown.append("option")
        .attr('value', value)
        options.text(value)
     }) 
       
    })
    getMetadata(940)
    };

//filter data based on dropdown selection
function filterData(metadata) {
    metadata.id === sample
    console.log(metadata)   
}
//append data to metadata box
function getMetadata(samplenumber){
    data.then(function(sampledata) {
        var filtered = sampledata.metadata.filter(d => d.id === parseInt(samplenumber))
        console.log(filtered)
        var datavalues = Object.values(filtered)
        var addData = sampleMetadata.append("p")
        const filteredData = datavalues[0]
        console.log(filteredData)
        for (const[key,value] of Object.entries(filteredData)) {
            sampleMetadata.append("p").text(key + ' : ' + value)
            console.log(`${key} : ${value}`)
        }
            })
    };




init();


      


    