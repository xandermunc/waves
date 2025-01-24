const width = 600, height = 600;
const margin = { top: 20, right: 30, bottom: 50, left: 50 };
let innerWidth = width - margin.left - margin.right;
let innerHeight = height - margin.top - margin.bottom;

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

let xScale = d3.scaleLinear().domain([-10, 10]).range([0, innerWidth]);
let yScale = d3.scaleLinear().domain([-10, 10]).range([innerHeight, 0]);

let xAxis = d3.axisBottom(xScale).ticks(10);
let yAxis = d3.axisLeft(yScale).ticks(10);

const updateAxes = () => {
    g.selectAll(".x-axis").remove();
    g.selectAll(".y-axis").remove();

    g.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(xAxis);

    g.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);
};

const grid = g.append("g");

grid.selectAll(".horizontal-grid")
    .data(yScale.ticks(10))
    .enter().append("line")
    .attr("class", d => d === 0 ? "grid highlight" : "grid")
    .attr("x1", 0)
    .attr("x2", innerWidth)
    .attr("y1", d => yScale(d))
    .attr("y2", d => yScale(d));

grid.selectAll(".vertical-grid")
    .data(xScale.ticks(10))
    .enter().append("line")
    .attr("class", d => d === 0 ? "grid highlight" : "grid")
    .attr("y1", 0)
    .attr("y2", innerHeight)
    .attr("x1", d => xScale(d))
    .attr("x2", d => xScale(d));

const plotFunctions = (funcs, variables) => {
    const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

    g.selectAll(".function-line").remove();

    funcs.forEach((func, index) => {
        const data = [];
        for (let x = xScale.domain()[0]; x <= xScale.domain()[1]; x += 0.1) {
            const y = func(x, variables);
            data.push({ x, y });
        }

        g.append("path")
            .datum(data)
            .attr("class", "function-line")
            .attr("fill", "none")
            .attr("stroke", d3.schemeCategory10[index % 10])
            .attr("d", line);
    });
};

const parseVariables = (input) => {
    const vars = {};
    const assignments = input.split(',').map(v => v.trim());
    assignments.forEach(assignment => {
        const [key, value] = assignment.split('=').map(s => s.trim());
        if (key && value) {
            vars[key] = value;
        }
    });
    return vars;
};

const evaluateFunction = (expr, variables) => {
    const evaluatedVars = {};
    for (const [key, value] of Object.entries(variables)) {
        evaluatedVars[key] = math.evaluate(value, evaluatedVars);
    }
    return (x) => math.evaluate(expr, { ...evaluatedVars, x });
};

const setBounds = (bounds) => {
    const xMin = -xRange;
    const xMax = xRange;
    const yMin = -yRange;
    const yMax = yRange;

    xScale.domain([xMin, xMax]);
    yScale.domain([yMin, yMax]);
    updateAxes();
};

const plotGraph = () => {
    const boundsInput = document.getElementById("bounds-input").value.trim();
    const bounds = boundsInput.split(',').map(b => b.trim());

    if (bounds.length === 2) {
        setBounds(bounds);
    }

    const variableInput = document.getElementById("variable-input").value.trim();
    const variableDefs = parseVariables(variableInput);

    const functionInput = document.getElementById("function-input").value.trim();
    if (functionInput) {
        const funcs = functionInput.split(',').map(f => {
            const expr = f.trim().substring(2); 
            return evaluateFunction(expr, variableDefs);
        });
        plotFunctions(funcs, variableDefs);
    }
};

document.querySelectorAll("#bounds-input, #variable-input, #function-input").forEach(input => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            plotGraph();
        }
    });
});

updateAxes();
