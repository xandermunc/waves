library(ggplot2)

bohr_model_hydrogen <- function() {
    r_n <- c(0.529, 4 * 0.529, 9 * 0.529)
    theta <- seq(0, 2 * pi, length.out = 100)

    plot(NA,
        xlim = c(-15 / 2, 15 / 2), ylim = c(0, 0.6),
        xlab = "X (Å)", ylab = "Y (Å)",
        main = "Bohr Model of Hydrogen", asp = 1
    )

    points(0, 0, col = "red", pch = 16, cex = 1)

    for (r in r_n) {
        lines(r * cos(theta), r * sin(theta), col = "blue")
    }
}

bohr_model_hydrogen()
