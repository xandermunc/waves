i1 <- 1
i2 <- 2
i3 <- 45/32
# i4 <- 3/2
# i5 <- (9*2)/8
v <- 1

pdf("pd.pdf")
n <- 3
t <- seq(0, 40 * n * pi, length.out = 40000)
w <- 10 / n
x <- sin(i1 * t) + sin(i2 * t) + sin(i3 * t)
y <- n * cos(v * t)
plot(x, y,
    type = "l", bty = "n", col = "#fff", lwd = w, xlab = "", ylab = "",
    main = "", xlim = c(-n, n), ylim = c(-n, n), asp = 1, axes = FALSE
)
dev.off()
