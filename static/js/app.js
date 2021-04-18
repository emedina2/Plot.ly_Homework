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
    return rows.map(
        function(row) {
            return row[index];
        });
};

 //get index
function getIndex(selected, results){
        var named = results.names
        index = named.indexOf(selected)
        console.log(named)
        console.log(selected)
        console.log(index)
        return index
};


//Detect dropdown change
function optionChanged(dropdownSelection){
    dropdown.on("onchange", updatePage(dropdownSelection))
};

//Grab values for bar chart
function charts(selectedIndex){
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

        var top10_Values = sampleValues.slice(0,10)
        var top10_IDs = otuIDs.slice(0,10)
        top10_IDs.forEach((val,index)=> top10_IDs[index] = `OTU ${val}`)
        var top10_Labels = otuLabels.slice(0,10)
        //console.log(otuLabels)
        barChart.html("")
        bubblePlot.html("")
        var barTrace = [{
            x: top10_Values,
            y: top10_IDs,
            text: top10_Labels,
            type: "bar",
            orientation: 'h'
           
        }];
        var bubbleTrace = [{
            x: otuIDs,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: otuIDs
            }
        }]
        Plotly.newPlot("bar", barTrace)
        Plotly.newPlot("bubble", bubbleTrace, {xaxis: {title: "OTU ID"}})
        })   
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
    updatePage(940)
    charts(0)
    
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
        var sampleIndex = getIndex(sampleNumber, sampledata)
        charts(sampleIndex)
    })
   
};

init();
