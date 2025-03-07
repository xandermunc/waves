library(ggplot2)

a0 <- 1

R_1s <- function(r) {
    2 * exp(-r / a0)
}
R_2s <- function(r) {
    (1 / sqrt(2)) * (1 - r / (2 * a0)) * exp(-r / (2 * a0))
}
R_3s <- function(r) {
    (2 / (81 * sqrt(3))) * (27 - 18 * r / a0 + 2 * (r / a0)^2) * exp(-r / (3 * a0))
}

P_r <- function(R_func, r) {
    R_func(r)^2 * r^2
}

r_values <- seq(0, 30, by = 0.01)
data <- data.frame(
    r = rep(r_values, 3),
    P = c(P_r(R_1s, r_values), P_r(R_2s, r_values), P_r(R_3s, r_values)),
    Orbital = factor(rep(c("1s", "2s", "3s"), each = length(r_values)))
)

ggplot(data, aes(x = r, y = P, color = Orbital)) +
    geom_line(size = 1) +
    labs(
        title = "Radial Probability Density for Hydrogen Atom",
        x = "Distance from Nucleus (r/a0)",
        y = "Probability Density |Ψ|²",
        color = "Orbital"
    ) +
    scale_x_continuous(limits = c(0, 30)) +
    scale_y_continuous(limits = c(0, 0.6)) +
    theme_minimal()
