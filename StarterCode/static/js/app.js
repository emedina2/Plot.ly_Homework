//set up ables for plot locations on page
var barChart = d3.select("#bar");
var gaugePlot = d3.select("#gauge");
var bubblePlot = d3.select("#bubble");
var dropdown = d3.select("#sample-metadata");
//var sample = dropdown.node().value
var sample = "940"
//add unpack function
function unpack(rows, index) {
    return rows.map(function(row) {
    return row[index];
    });
    }
//create function & variables for data
var names;
var metadata;
var samples;
function getTableData(sample){
d3.json("./data/samples.json")
.then(function(data) {
     names = data.names;
     metadata = data.metadata;
     samples = data.samples;
    //  console.log(names)
    //  console.log(metadata)
    //  console.log(samples)
     if (names.indexOf(sample) !== -1){
         console.log(samples[sample.index]);
         names = 
     }
})
}

getTableData(sample)

    


