# obj
install.packages("rgl", type = "source")

library(rgl)
a <- 6/5
b <- 7/5
c <- 5/3
t <- seq(0, 40 * pi, length.out = 100)
x <- sin(t) + sin(a * t) + sin(b * t) + sin(c * t)
z <- cos(t) + cos(a * t) + cos(b * t) + cos(c * t)
y <- 4 * cos(4/5 * t)
rgl.clear()
open3d()
tube <- cylinder3d(cbind(x, y, z), radius = 0.05, sides = 100)
shade3d(tube, col = "blue")
writeOBJ("curve.obj")
