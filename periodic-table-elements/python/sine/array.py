import numpy as np
from numpy import random as rand

arr = np.array([[0, 1], [2, 3]])
r = rand.randint(2)
rgrid = rand.randint(100, size=(3, 5))

print(arr[0])
print(r)
print(rgrid)
