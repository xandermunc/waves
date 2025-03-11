import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 1, 1000)
y = np.sin(2 * np.pi * x)

plt.figure(figsize=(5, 5))
plt.ylim(-2, 2)
plt.plot(x, y, label="sin(2πx)", color="#09f", linewidth=4)
plt.xlabel("x")
plt.ylabel("y")
plt.title("Wave Function")
plt.legend()
plt.grid()

plt.savefig("sine_wave.pdf", format="pdf", bbox_inches="tight")
