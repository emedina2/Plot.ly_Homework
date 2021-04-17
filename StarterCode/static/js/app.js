//set up variables for locations on page
var barChart = d3.select("#bar");
var gaugePlot = d3.select("#gauge");
var bubblePlot = d3.select("#bubble");
var dropdown = d3.select("select");
var sampleMetadata = d3.select("#sample-metadata");
var selection = dropdown.property("value");

var metadata;
var samples;
var index;

//import json file
var data = d3.json("./data/samples.json")

//add unpack function
function unpack(rows, index) {
    return rows.map(function(row) {
    return row[index];
    });
    }

 //get index
function getIndex(selected){
    data.then(function(results) {
        var named = results.names
        index = named.indexOf(selected)
        console.log(selected)
        console.log(index)
        return index
    })
};


//Detect dropdown change
function optionChanged(dropdownSelection){
    dropdown.on("onchange", updatePage(dropdownSelection))
};

//Grab values for bar chart
function getBar(selectedIndex){
    data.then(function(sampledata) {
        var sampleSamples = sampledata.samples
        var expanddata = Object.entries(sampleSamples)
        var values = unpack(expanddata,1)
        var filteredSample = values[selectedIndex]
        console.log(filteredSample)
        var sampleValues = filteredSample.sample_values
        var otuIDs = filteredSample.otu_ids
        var otuLabels = filteredSample.otu_labels
        console.log(sampleValues)
        console.log(otuIDs)
        console.log(otuLabels)
        })   
}

getBar(1)

//initialize page function
function init() {
    data.then(function(samples) {
        Object.entries(samples.names).forEach(function([key, value]) {
        var options = dropdown.append("option")
        .attr('value', value)
        options.text(value)
     }) 
    })
    updatePage(940)
    };

//Update page data
function updatePage(sampleNumber){
    data.then(function(sampledata) {
        var filtered = sampledata.metadata.filter(d => d.id === parseInt(sampleNumber))
        var datavalues = Object.values(filtered)
        const filteredData = datavalues[0]
        //console.log(filteredData)
        sampleMetadata.html("")
        for (const[key,value] of Object.entries(filteredData)) {
            sampleMetadata.append("p").text(key + ' : ' + value)
            //console.log(`${key} : ${value}`)
        }
    })
    var sampleIndex = getIndex(sampleNumber)
    getBar(sampleIndex)
    console.log(samplenumber)
    };

    init();
