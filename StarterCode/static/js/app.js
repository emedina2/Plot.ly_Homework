//set up variables for locations on page
var barChart = d3.select("#bar");
var gaugePlot = d3.select("#gauge");
var bubblePlot = d3.select("#bubble");
var dropdown = d3.select("select");

//var sample = dropdown.node().value
var data = d3.json("./data/samples.json")
var sample = "956"
//add unpack function
function unpack(rows, index) {
    return rows.map(function(row) {
    return row[index];
    });
    }

//initialize page function
function init() {
data.then(function(nameDropdown) {
    Object.entries(nameDropdown.names).forEach(function([key, value]) {
    var options = dropdown.append("option")
    options.text(value)
    })
    
})
};
//create function & variables for data
var names;
var metadata;
var samples;
function getTableData(sample){
data
.then(function(data) {
     names = data.names;
     metadata = data.metadata;
     samples = data.samples;
     console.log(names)
     console.log(metadata)
     console.log(samples)
     if (names.indexOf(sample) !== -1){
         var indexValue = names.indexOf(sample)
         console.log(indexValue)
         console.log(metadata[indexValue])
     }
})
}

getTableData(sample)
init();

    


