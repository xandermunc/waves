
i1 <- 1
i2 <- 6/5
i3 <- 3/2
i4 <- 9/5
i5 <- (9*2)/8

pdf("curve.pdf")
n <- 1
t <- seq(0, 2 * n * pi, length.out = 4000)
w <- 10 / n
x <- sin(i1 * t)
y <- n * cos(t)
plot(x, y,
    type = "l", bty = "n", col = "#000", lwd = w, xlab = "", ylab = "",
    main = "", xlim = c(-n, n), ylim = c(-n, n), asp = 1, axes = FALSE
)
dev.off()

pdf("curve2.pdf")
n <- 2
t <- seq(0, 2 * n * pi, length.out = 4000)
w <- 10 / n
x <- sin(i1 * t) + sin(i3 * t)
y <- n * cos(t)
plot(x, y,
    type = "l", bty = "n", col = "#000", lwd = w, xlab = "", ylab = "",
    main = "", xlim = c(-n, n), ylim = c(-n, n), asp = 1, axes = FALSE
)
dev.off()

pdf("curve3.pdf")
n <- 3
t <- seq(0, 10 * n * pi, length.out = 4000)
w <- 10 / n
x <- sin(i1 * t) + sin(i2 * t) + sin(i3 * t)
y <- n * cos(t)
plot(x, y,
    type = "l", bty = "n", col = "#000", lwd = w, xlab = "", ylab = "",
    main = "", xlim = c(-n, n), ylim = c(-n, n), asp = 1, axes = FALSE
)
dev.off()

pdf("curve4.pdf")
n <- 4
t <- seq(0, 8 * n * pi, length.out = 4000)
w <- 10 / n
x <- sin(i1 * t) + sin(i2 * t) + sin(i3 * t) + sin(i4 * t)
y <- n * cos(t)
plot(x, y,
    type = "l", bty = "n", col = "#000", lwd = w, xlab = "", ylab = "",
    main = "", xlim = c(-n, n), ylim = c(-n, n), asp = 1, axes = FALSE
)
dev.off()

pdf("curve5.pdf")
n <- 5
t <- seq(0, 40 * n * pi, length.out = 40000)
w <- 10 / n
x <- sin(i1 * t) + sin(i2 * t) + sin(i3 * t) + sin(i4 * t) + sin(i5 * t)
y <- n * cos(t)
plot(x, y,
    type = "l", bty = "n", col = "#000", lwd = w, xlab = "", ylab = "",
    main = "", xlim = c(-n, n), ylim = c(-n, n), asp = 1, axes = FALSE
)
dev.off()
