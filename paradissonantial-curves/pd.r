pdf("1-10-6.pdf") 
t <- seq(0, 2 * pi, length.out = 1000)
phi <- 0
x <- sin(t + phi) + sin(10 * t + phi)
y <- 2 * cos(6 * t)
plot(x, y,
  type = "l", bty = "n", col = "#09f", lwd = 2, xlab = "x", ylab = "y",
  main = "1:10:6", xlim = c(-2, 2), ylim = c(-2, 2), asp = 1
)
dev.off()

library(magick)
phi_values <- seq(0, 2 * pi, length.out = 100)
frames <- vector("list", length(phi_values))
for (i in seq_along(phi_values)) {
  phi <- phi_values[i]
  t <- seq(0, 2 * pi, length.out = 1000)
  x <- sin(t + phi) + sin(10 * t + phi)
  y <- 2 * cos(6 * t)
  png(filename = paste0("frame_", i, ".png"), width = 1200, height = 1200)
  plot(x, y,
       type = "l", bty = "n", col = "#09f", lwd = 4, xlab = "x", ylab = "y",
       main = "1:10:6",
       xlim = c(-2, 2), ylim = c(-2, 2), asp = 1)
  dev.off()
  frames[[i]] <- image_read(paste0("frame_", i, ".png"))
}
animation <- image_animate(image_join(frames), fps = 25)
image_write(animation, "phi_animation_high_quality.gif")
file.remove(paste0("frame_", seq_along(phi_values), ".png"))

install.packages("rgl", type = "source")

library(rgl)
delta <- pi / 2
t <- seq(0, 4 * pi, length.out = 1000)
x <- sin(t) + sin(10 * t)
z <- cos(t) + cos(10 * t)
y <- 2 * cos(6 * t)
rgl.clear()
open3d()
tube <- cylinder3d(cbind(x, y, z), radius = 0.05, sides = 100)
shade3d(tube, col = "blue")
writeOBJ("curve.obj")

library(rgl)
delta <- pi / 2
t <- seq(0, 4 * pi, length.out = 1000)
x <- sin(t) + sin(9 * t)
z <- cos(t) + cos(9 * t)
y <- 2 * cos(6 * t)
rgl.clear()
open3d()
tube <- cylinder3d(cbind(x, y, z), radius = 0.05, sides = 100)
shade3d(tube, col = "blue")
writeOBJ("curve.obj")