pdf("1-10-6.pdf") 
t <- seq(0, 2 * pi, length.out = 1000)
phi <- 0
x <- sin(t + phi) + sin(A * t + phi)
y <- 2 * cos(t)
A <- 1
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
image_write(animation, "phi_animation.gif")
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




library(magick)
A_values <- seq(3/2, 1, length.out = 20)
t <- seq(0, 2 * pi, length.out = 1000)
phi <- 0
images <- list()
for (A in A_values) {
  x <- sin(t + phi) + sin(A * t + phi)
  y <- 2 * cos(t)
    png_filename <- tempfile(fileext = ".png")
  png(png_filename)
  plot(x, y,
       type = "l", bty = "n", col = "#09f", lwd = 2,
       xlab = "x", ylab = "y", main = "1:10:6",
       xlim = c(-2, 2), ylim = c(-2, 2), asp = 1)
  dev.off()
    images[[length(images) + 1]] <- image_read(png_filename)
}
animation <- image_animate(image_join(images), fps = 10)
image_write(animation, "1-10-6.gif")


library(magick)
A_values <- seq(1, 3/2, length.out = 20)
start_length <- 2 * pi
end_length <- 4 * pi
phi <- 0
images <- list()
for (i in 1:length(A_values)) {
  current_length <- seq(start_length, end_length, length.out = length(A_values))[i]
  t_values <- seq(0, current_length, length.out = 1000)
  x <- sin(t_values + phi) + sin(A_values[i] * t_values + phi)
  y <- 2 * cos(t_values)
  png_filename <- tempfile(fileext = ".pdf")
  png(png_filename)
  plot(x, y,
       type = "l", bty = "n", col = "#09f", lwd = 2,
       xlab = "x", ylab = "y", main = "1:3/2",
       xlim = c(-2, 2), ylim = c(-2, 2), asp = 1)
  dev.off()
  images[[length(images) + 1]] <- image_read(png_filename)
}
animation <- image_animate(image_join(images), fps = 10)
image_write(animation, "1.gif")

n_frames <- 100
pdf("1-10-6.pdf")
for (i in seq(1, 3/2, length.out = n_frames)) {
  A <- i
  t <- seq(0, 2 * pi, length.out = 1000)
  phi <- 0
  x <- sin(t + phi) + sin(A * t + phi)
  y <- 2 * cos(t)
  plot(x, y,
       type = "l", bty = "n", col = "#09f", lwd = 2, xlab = "x", ylab = "y",
       main = paste("A =", round(A, 2)), 
       xlim = c(-2, 2), ylim = c(-2, 2), asp = 1
  )
  Sys.sleep(0.1) 
}
dev.off()

# n_frames <- 100
# start_length <- 2 * pi
# end_length <- 4 * pi
# pdf("1-10-6.pdf")
# for (i in seq(1, 3/2, length.out = n_frames)) {
#   f1 <- 1
#   f2 <- i
#   current_length <- seq(start_length, end_length, length.out = n_frames)[which(seq(1, 3/2, length.out = n_frames) == i)]
#   t <- seq(0, current_length, length.out = 1000)
#   phi <- 0
#   x <- sin(f1 * t + phi) + sin(f2 * t + phi)
#   y <- 2 * cos(t)
#   plot(x, y,
#     type = "l", bty = "n", col = "#09f", lwd = 2, xlab = "", ylab = "",
#     xlim = c(-2, 2), ylim = c(-2, 2), asp = 1,
#     xaxt = "n", yaxt = "n", axes = FALSE
#   )
#   Sys.sleep(0.1)
# }
# dev.off()

n_frames <- 100
start_length <- 20 * pi
end_length <- 16 * pi
f1_values <- seq(1, 1, length.out = n_frames)
f2_values <- seq(6/5, 5/4, length.out = n_frames)
f3_values <- seq(3/2, 3/2, length.out = n_frames)
f4_values <- seq(9/5, 15/8, length.out = n_frames)
fv_values <- seq(4/5, 3/4, length.out = n_frames)
A <- 4
pdf("1-10-6.pdf")
for (i in seq_len(n_frames)) {
  f1 <- f1_values[i]
  f2 <- f2_values[i]
  f3 <- f3_values[i]
  f4 <- f4_values[i]
  fv <- fv_values[i]
  current_length <- seq(start_length, end_length, length.out = n_frames)[i]
  t <- seq(0, current_length, length.out = 1000)
  phi <- 0
  x <- sin(f1 * t + phi) + sin(f2 * t + phi) + sin(f3 * t + phi) + sin(f4 * t + phi)
  y <- A * cos(fv * t)
  plot(x, y,
       type = "l", bty = "n", col = "#09f", lwd = 2, xlab = "", ylab = "",
       xlim = c(-A, A), ylim = c(-A, A), asp = 1,
       xaxt = "n", yaxt = "n", axes = FALSE
  )
  Sys.sleep(0.1)
}
dev.off()


library(magick)
n_frames <- 100
start_length <- 16 * pi
end_length <- 2 * pi
f1_values <- seq(1, 1, length.out = n_frames)
f2_values <- seq(5/4, 4/4, length.out = n_frames)
f3_values <- seq(3/2, 2/2, length.out = n_frames)
f4_values <- seq(15/8, 8/8, length.out = n_frames)
fv_values <- seq(3/4, 4/4, length.out = n_frames)
A_values <- seq(4, 4, length.out = n_frames)
B_values <- seq(1, 1, length.out = n_frames)
pdf("test.pdf")
for (i in seq_len(n_frames)) {
  f1 <- f1_values[i]
  f2 <- f2_values[i]
  f3 <- f3_values[i]
  f4 <- f4_values[i]
  fv <- fv_values[i]
  A <- A_values[i]
  B <- B_values[i]
  current_length <- seq(start_length, end_length, length.out = n_frames)[i]
  t <- seq(0, current_length, length.out = 1000)
  phi <- 0
  x <- B * sin(f1 * t + phi) + B * sin(f2 * t + phi) + B * sin(f3 * t + phi) + B * sin(f4 * t + phi)
  y <- A * cos(fv * t)
  plot(x, y,
       type = "l", bty = "n", col = "#09f", lwd = 2, xlab = "", ylab = "",
       xlim = c(-4, 4), ylim = c(-4, 4), asp = 1,
       xaxt = "n", yaxt = "n", axes = FALSE
  )
}
dev.off()
pdf_images <- image_read_pdf("test.pdf")
animation <- image_animate(pdf_images, fps = 50)
image_write(animation, "test.gif")