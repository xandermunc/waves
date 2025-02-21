wavelength_nm <- 656 # Wavelength in nanometers
wavelength_m <- wavelength_nm * 1e-9 # Convert to meters
frequency <- 3e8 / wavelength_m # Frequency (speed of light / wavelength)
time <- seq(0, 3e-14, by = 1e-16) # Time range in seconds
electric_field <- sin(2 * pi * frequency * time)
plot(time, electric_field, type = "l", col = "#FF6666", lwd = 2,
     main = "Waveform of Light at 656 nm",
     xlab = "Time (s)", ylab = "Electric Field Amplitude")


wavelength <- seq(400, 700, by = 1)
intensity <- exp(-((wavelength - 656)^2) / (2 * 10^2)) 
plot(wavelength, intensity, type = "l", col = "blue", lwd = 2,
     main = "Hydrogen H-alpha Line (656 nm)",
     xlab = "Wavelength (nm)", ylab = "Relative Intensity")
abline(v = 656, col = "#FF6666", lty = 2)
legend("topleft", legend = "656 nm", col = "#FF6666", pch = 15)
