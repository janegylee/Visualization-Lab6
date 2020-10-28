
export default function StackedAreaChart() {
    let margin = {
      top: 40,
      left: 60,
      right: 0,
      bottom: 60
    };
    let width = 800;
    let height = 400;
  
    // init axes variables to be updated in real time
    let x = d3.scaleTime();
    let y = d3.scaleLinear();
    let color = d3.scaleOrdinal(d3.schemeCategory10);
    let yAxis = d3.axisLeft().scale(y);
    let xAxis = d3.axisBottom().scale(x);
  
    let stack, stackedData, area, tooltip;
  
    // define reusable chart update function
   function chart(selection) {
          let innerWidth = width - margin.left - margin.right; // margin convention
          let innerHeight = height - margin.top - margin.bottom;
    
          let svg = d3
            .select(this)
            .selectAll("svg")
            .data([selection]);
    
          let svgEnter = svg.enter().append("svg");
          // Placeholder for visualization Elements
          let gEnter = svgEnter.append("g");
    
          // Axes placeholders
          gEnter.append("g").attr("class", "x-axis axis");
    
          gEnter.append("g").attr("class", "y-axis axis");
      
          // ------------------------------------------------
          svg
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "red");
    
          let g = svg
            .select("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("fill", "blue");
    
          // Create a stacked area chart
          var stack = d3.stack()
          .keys(["Agriculture", "Business services", "Construction", "Education and Health", "Finance", "Government", "Information", "Leisure and hospitality", "Manufacturing", "Mining and Extraction", "Other", "Self-employed", "Transportation and Utilities", "Wholesale and Retail Trade"])
          .order(d3.stackOrderNone)
          .offset(d3.stackOffsetNone);
    
          // Stack data
          stackedData = stack(selection);
    
          let x = d3.scaleTime();
          let y = d3.scaleLinear();
          let color = d3.scaleOrdinal(d3.schemeCategory10);
    
          x.range([0, width - margin.left - margin.right]).domain(
            d3.extent(selection, d => d.date)
          );
    
          y.range([height - margin.top - margin.bottom, 0]).domain([
            0,
            d3.max(stackedData, d => d3.max(d, d => d[1]))
          ]);
    
          color.domain(["Agriculture", "Business services", "Construction", "Education and Health", "Finance", "Government", "Information", "Leisure and hospitality", "Manufacturing", "Mining and Extraction", "Other", "Self-employed", "Transportation and Utilities", "Wholesale and Retail Trade"]);
    
          area = d3
            .area()
            .curve(d3.curveCardinal)
            .x(d => x(d.data.date))
            .y0(d => y(d[0]))
            .y1(d => y(d[1]));
    
          // Draw the layers
          let categories = g.selectAll(".area").data(stackedData);
    
          categories
            .enter()
            .append("path")
            .attr("class", "area")
            .merge(categories)
            .style("fill", function(d,i) {
              return color(i);
            }) // assign color
            .attr("d", d => area(d)); // delegate area path generation
    
          categories.exit().remove();
    
    
          // Call axis functions with the new domain
          g.select(".x-axis")
            .attr(
              "transform",
              "translate(0," + (height - margin.top - margin.bottom) + ")"
            )
            .call(xAxis);
          g.select(".y-axis").call(yAxis);
            
    }
  

    chart.width = function(value) {
      if (!arguments.length) return width;
      width = value;
      return chart;
    };
  
    chart.height = function(value) {
      if (!arguments.length) return height;
      height = value;
      return chart;
    };
    
    function handleClick(d, i) {
    return chart;
    }
  }
  