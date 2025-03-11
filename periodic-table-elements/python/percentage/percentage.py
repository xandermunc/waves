import pandas as pd
import svgwrite
import random

def random_color():
    return f'rgb({random.randint(0,255)},{random.randint(0,255)},{random.randint(0,255)})'

data = pd.read_csv("Percentage_of_the_Universe.csv")
percentages = data["PERCENTAGE"].tolist()

total_width = 7200 * 4
total_height = 5400 * 4

dwg = svgwrite.Drawing("output.svg", profile="tiny", size=(total_width, total_height))

y_position = 0
for percentage in percentages:
    height = (percentage / 100) * total_height
    dwg.add(dwg.rect(insert=(0, y_position), size=(total_width, height), fill=random_color()))
    y_position += height

dwg.save()
print("SVG file created successfully as output.svg.")