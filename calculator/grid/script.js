let t = 0; // Initialize the time variable

// Animate the graph by updating 't' continuously
const animateGraph = () => {
    t += 0.05; // Increment time (adjust for animation speed)
    plotGraph(); // Re-plot the graph with the updated 't'
    requestAnimationFrame(animateGraph); // Continue animation
};

// Plot functions with time-dependent variable 't'
const plotFunctions = (funcs, variables) => {
    const line = d3.line()
        .defined(d => isFinite(d.y) && !isNaN(d.y)) // Exclude invalid points
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

    g.selectAll(".function-line").remove(); // Clear previous plots

    funcs.forEach((func, index) => {
        const data = Array.from({ length: 201 }, (_, i) => {
            const x = xScale.domain()[0] + i * 0.1; // Generate x values
            return { x, y: func(x, { ...variables, t }) }; // Compute y values with 't'
        });

        g.append("path")
            .datum(data)
            .attr("class", "function-line")
            .attr("fill", "none")
            .attr("stroke", d3.schemeCategory10[index % 10])
            .attr("stroke-width", 2)
            .attr("d", line);
    });
};

// Parse and evaluate variables
const parseVariables = input => Object.fromEntries(
    input.split(',').map(v => v.trim().split('=').map(s => s.trim()))
);

// Plot graph
const plotGraph = () => {
    const variableDefs = parseVariables(document.getElementById("variable-input").value.trim());
    const funcs = document.getElementById("function-input").value.trim().split(',').map(f => {
        const expr = f.trim().substring(2); // Remove 'y='
        return (x, variables) => math.evaluate(expr, { ...variables, x });
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
animateGraph(); // Start the animation
