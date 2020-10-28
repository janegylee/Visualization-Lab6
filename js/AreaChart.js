
export default function Timeline(){
    // default size
  let margin ={top: 0, right: 0, bottom: 30, left: 60};
  let width = 800;
  let height = 100;
  
  
  // Scales and axes
  let x = d3.scaleTime(),
    y = d3.scaleLinear(),
    xAxis = d3.axisBottom()
      .scale(x),
    area = d3.area(),
    brush = d3.brushX();
  
  function chart(selection){
    selection.each(function(data){
      let innerWidth = width  - margin.left - margin.right; // margin convention
      let innerHeight =  height - margin.top - margin.bottom;
  
      // Initialize svg only if there is no svg within
      let svg = d3.select(this).selectAll('svg')
      .data([d]);
  
      // Initialize the internal structure only once
      let svgEnter = svg.enter().append('svg');
      let gEnter = svgEnter.append('g');
  
      gEnter.append("path");// path container (order matters)
      gEnter.append("g").attr("class", "x-axis axis"); // x-axis container
      gEnter.append("g").attr("class", "x brush");// brush container
      
  
      // Update canvas sizes
      svg = svg.merge(svgEnter);
      svg.attr("width", width)
        .attr("height", height)
  
      let g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
      x.range([0, innerWidth])
      .domain(d3.extent(data, d=>d.date));
  
      y.range([innerHeight, 0])
        .domain([0, d3.max(data, d=>d3.max(d,d => d[1]))])
      
      // SVG area path generator
      var area = d3.area()
        .x(d=>xScale(d.data.date))
        .y0(d=>yScale(d[0]))
        .y1(d=>yScale(d[1]))
  
      // Draw area by using the path generator
      g.select('path')
        .datum(data)
        .join('path')
        .attr("fill", "#ccc")
        .attr("d", area);
  
    
  
      // Append x-axis
      g.select('.x-axis')
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(xAxis);
  
    });
  }
  
    // allow users to register for your custom events 
  
  function handleBrush(){
  }
  
  return chart;
  
  }
  