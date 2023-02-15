// console.log("linked");

// set constants for frame
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 20, right: 20, top: 20, buttom: 20}

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.buttom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

var dataset = [[1, 2], [2, 4], [6, 2], [9, 9]]

const FRAME = d3.select("#left")
				.append("svg")
				.attr("class", "frame")
				.attr("height", FRAME_HEIGHT)
				.attr("width", FRAME_WIDTH);


// find max X and max Y
const MAX_X = d3.max(dataset, (d) => { return d[0]; }); 
const MAX_Y = d3.max(dataset, (d) => { return d[1]; }); 
console.log("Max x: " +MAX_X); 
console.log("Max y: " +MAX_Y); 

// define scale functions that maps our data values 
// (domain) to pixel values (range)
const X_SCALE = d3.scaleLinear() // linear scale because we have 
                              // linear data 
                  .domain([0, (MAX_X + 1)]) // add some padding  
                  .range([0, VIS_WIDTH]);

const Y_SCALE = d3.scaleLinear() // linear scale because we have 
                              // linear data 
                  .domain([0, (MAX_Y + 1)]) // add some padding  
                  .range([0, VIS_HEIGHT]); 


console.log("Input: 9, X_SCALE output: " + X_SCALE(9));

// x axis
FRAME.append("line")
	.style("stroke", "black")
    .style("stroke-width", 4)
    .attr("x1", MARGINS.left)
    .attr("y1", FRAME_HEIGHT - MARGINS.buttom)
    .attr("x2", FRAME_WIDTH - MARGINS.right)
    .attr("y2", FRAME_HEIGHT - MARGINS.buttom);

// y axis
FRAME.append("line")
	.style("stroke", "black")
    .style("stroke-width", 4)
    .attr("x1", MARGINS.left)
    .attr("y1", MARGINS.top)
    .attr("x2", MARGINS.left)
    .attr("y2", FRAME_HEIGHT - MARGINS.buttom);

// plot points
FRAME.selectAll("points")  
    .data(dataset)  
    .enter()       
    .append("circle")  
      .attr("cx", (d) => { return (X_SCALE(d[0]) + MARGINS.left); }) 
      .attr("cy", (d) => { return (VIS_HEIGHT - Y_SCALE(d[1]) + MARGINS.top); }) 
      .attr("r", 20)
      .attr("class", "point")
      .attr("type", "button")
      .attr("id", "submitBorder");


// function for adding a border
function submitBorderClicked() {
	// grab id for each point, submitBorder
	let border = document.getElementById("submitBorder");

	border.classList.add("addBorder");
}

// adding an event listener for function above
document.getElementById("submitBorder").addEventListener("click", submitBorderClicked);


// update the HTML on the page when submit
function updateEntry() {
    let current = document.getElementById("updatePos").innerHTML;

    let x_val = document.querySelector("#x_pos").value;
    let y_val = document.querySelector("#y_pos").value;

    let newPos = "(" + x_val + ", " + y_val + ")";

    document.getElementById("updatePos").innerHTML = newPos;

    let x_val_int = parseInt(x_val);
    let y_val_int = parseInt(y_val);
    let newPos_int = [[x_val_int, y_val_int]];


	// plot points
	FRAME.selectAll("points")  
	    .data(newPos_int)  
	    .enter()       
	    .append("circle")  
	      .attr("cx", (d) => { return (X_SCALE(d[0]) + MARGINS.left); }) 
	      .attr("cy", (d) => { return (VIS_HEIGHT - Y_SCALE(d[1]) + MARGINS.top); }) 
	      .attr("r", 20)
	      .attr("class", "point")
	      .attr("type", "button")
	      .attr("id", "submitBorder");
  }