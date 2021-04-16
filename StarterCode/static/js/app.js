//set up variables for locations on page
var barChart = d3.select("#bar");
var gaugePlot = d3.select("#gauge");
var bubblePlot = d3.select("#bubble");
var dropdown = d3.select("select");
var sampleMetadata = d3.select("#sample-metadata");
var selection;

//var sample = dropdown.node().value
var data = d3.json("./data/samples.json")
var sample = "956"
//add unpack function
function unpack(rows, index) {
    return rows.map(function(row) {
    return row[index];
    });
    }

//Detect dropdown change
dropdown.on("onchange",function(){
    console.log(this)
} )

//initialize page function
function init() {
    data.then(function(nameDropdown) {
        Object.entries(nameDropdown.names).forEach(function([key, value]) {
        var options = dropdown.append("option")
        .attr('value', value)
        options.text(value)
        })
       
    })
    };

//filter data based on dropdown selection
function filterData(metadata) {
    metadata.id === sample
   console.log(metadata)
    
}
//append data to metadata box
function addMetadata([key, value]) {
    var metadataContent = sampleMetadata.append("p")
    metadataContent.text(`${key} : ${value}`)
    console.log(key, value)
    console.log(sample)
}


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

//getTableData(sample)
init();
testData(data)



    


