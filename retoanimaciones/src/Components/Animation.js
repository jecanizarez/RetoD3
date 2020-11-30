import React, { Component } from "react";
import * as d3 from "d3";

class Animation extends Component {
  componentDidMount() {
    const data = [
        { name: "Medellín", index2005: 3, index2006: 33 },
        { name: "Cali", index2005: 39, index2006: 45 },
        { name: "Bogotá", index2005: 7, index2006: 31 },
        { name: "Pereira", index2005: 35, index2006: 36 },
        { name: "Bucaramanga", index2005: 16, index2006: 23 },
        { name: "Cúcuta", index2005: 45, index2006: 45 },
        { name: "Armenia", index2005: 6, index2006: 16 }
    ];
    this.drawChart(data);
  }

  drawChart(data) {
    const canvas = d3.select(this.refs.canvas);
    const width = 700;
    const height = 500;
    const margin = { top:10, left:50, bottom: 40, right: 10};
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top -margin.bottom;
    
    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);
    
    let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
    const y = d3.scaleLinear() 
        .domain([0, 45])
        .range([iheight, 0]);
    
    const x = d3.scaleBand()
    .domain(data.map(d => d.name) ) 
    .range([0, iwidth])
    .padding(0.1); 
    
    const bars = g.selectAll("rect").data(data);
    
    bars.enter().append("rect")
    .attr("class", "bar")
    .style("fill", "steelblue")
    .attr("x", d => x(d.name))
    .attr("y", d => y(0))
    .attr("height", d => iheight - y(0))
    .attr("width", x.bandwidth())  

    svg.selectAll("rect")
    .transition()
    .duration(800)
    .attr("y", d => y(d.index2005))
    .attr("height",  d => iheight - y(d.index2005))
    .delay(function(d,i){return(i*100)});

    g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);  
    
    g.append("g")
    .classed("y--axis", true)
    .call(d3.axisLeft(y));

    d3.select("#b2005").on("click", function () {
        svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", d => y(d.index2005))
        .attr("height",  d => iheight - y(d.index2005))
        .delay(function(d,i){return(i*100)});
    });
    d3.select("#b2006").on("click", function () {
        svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", d => y(d.index2006))
        .attr("height",  d => iheight - y(d.index2006))
        .delay(function(d,i){return(i*100)});
    });
  }

  render() {
    return <div>
        <div ref = "canvas">
        </div>
        <button id = "b2005">2005</button>
        <button id = "b2006">2006</button>
    </div>;
  }
}

export default Animation;