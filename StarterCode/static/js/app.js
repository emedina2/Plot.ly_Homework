//set up variables for plot locations on page
var barChart = d3.select("#bar");
var gaugePlot = d3.select("#gauge");
var bubblePlot = d3.select("#bubble");
var dropdown = d3.select("#sample-metadata");
var sample = dropdown.node().value

//add unpack function
function unpack(rows, index) {
    return rows.map(function(row) {
    return row[index];
    });
    }
//create function & variables for data

function getTableData(sample){
d3.json("./data/samples.json")
.then(function(data) {
     var names = data.names;
     var metadata = data.metadata;
     var samples = data.samples;
     console.log(names)
     console.log(metadata)
     console.log(samples)
})
}

getTableData(940)

    


