// Dimensions and margins
const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;
const width = 600, height = 600;
const margin = { top: 20, right: 30, bottom: 50, left: 50 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Create SVG canvas
const svg = d3.select("svg").attr("width", width).attr("height", height);
const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

// Scales
const xScale = d3.scaleLinear().domain([-10, 10]).range([0, innerWidth]);
const yScale = d3.scaleLinear().domain([-10, 10]).range([innerHeight, 0]);

// Update axes
const updateAxes = () => {
    // g.selectAll(".axis").remove();
    g.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(10))
        .select(".domain").remove()
    g.selectAll(".x-axis .tick line").remove();
    g.append("g")
        .attr("class", "axis y-axis")
        .call(d3.axisLeft(yScale).ticks(10))
        .select(".domain").remove()
    g.selectAll(".y-axis .tick line").remove();
};

// Draw grid dots
const drawGridDots = () => {
    const dots = d3.cross(xScale.ticks(20), yScale.ticks(20));
    g.append("g").selectAll(".grid-dot")
        .data(dots)
        .enter().append("circle")
        .attr("class", "grid-dot")
        .attr("cx", ([x]) => xScale(x))
        .attr("cy", ([, y]) => yScale(y))
        .attr("r", 1).style("fill", "black");
};

// Add center lines
const addCenterLines = () => {
    g.append("line")
        .attr("class", "grid highlight")
        .attr("x1", 0)
        .attr("y1", yScale(0))
        .attr("x2", innerWidth)
        .attr("y2", yScale(0))
        .style("stroke", "black")
        .style("stroke-width", 2);

    g.append("line")
        .attr("class", "grid highlight")
        .attr("x1", xScale(0))
        .attr("y1", 0)
        .attr("x2", xScale(0))
        .attr("y2", innerHeight)
        .style("stroke", "black")
        .style("stroke-width", 2);
};

// Plot functions w/ animation
const plotFunctions = (funcs, variables) => {
    const line = d3.line().x(d => xScale(d.x)).y(d => yScale(d.y));
    g.selectAll(".function-line").remove();
    funcs.forEach(func => {
        const data = Array.from({ length: 201 }, (_, i) => {
            const x = xScale.domain()[0] + i * 0.1;
            return { x, y: func(x, variables) };
        });
        const path = g.append("path")
            .datum(data)
            .attr("class", "function-line")
            .attr("fill", "none")
            .attr("stroke", d3.schemeCategory10[funcs.indexOf(func) % 10])
            .attr("d", line);

        const totalLength = path.node().getTotalLength();

        path
            .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
    });
};

// Parse and evaluate variables
const parseVariables = input => Object.fromEntries(input.split(',').map(v => v.trim().split('=').map(s => s.trim())));

// Plot graph
const plotGraph = () => {
    const variableDefs = parseVariables(document.getElementById("variable-input").value.trim());
    const funcs = document.getElementById("function-input").value.trim().split(',').map(f => {
        const expr = f.trim().substring(2);
        return x => math.evaluate(expr, { ...variableDefs, x });
    });
    plotFunctions(funcs, variableDefs);
};

// Event listener for input fields
document.querySelectorAll("#variable-input, #function-input").forEach(input => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") plotGraph();
    });
});

// Initial axes and grid
updateAxes();
drawGridDots();
addCenterLines();
