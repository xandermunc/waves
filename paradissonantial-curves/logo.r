pdf("logo3.pdf")
phi <- (3/2) * pi
phi2 <- (1/2) * pi
a <- 1.5
w <- 40
x <- seq(-2, 2, length.out = 1000)
y <- a * sin((3/5) * pi * x + phi)
y2 <- a * sin((3/5) * pi * x + phi2) #2/5 3/5 4/5
y_offset <- 4
y_bottom <- min(y2)
y_top <- max(y + y_offset)
plot(x, y2, type = "l", col = "#000", lwd = w, xlab = "", ylab = "",
     main = "", bty = "n", xlim = c(-2, 2), ylim = c(-2, 6), axes = FALSE)
lines(x, y + y_offset, col = "#000", lwd = w)
segments(x0 = 0, y0 = y_bottom, x1 = 0, y1 = y_top, col = "#000", lwd = w)
dev.off()
