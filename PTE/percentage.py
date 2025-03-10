import pandas as pd
import svgwrite

data = pd.read_csv("test.csv")
percentages = data["percentage"].tolist()

total_width = 200
total_height = 400

dwg = svgwrite.Drawing("output.svg", profile="tiny", size=(total_width, total_height))

y_position = 0
for percentage in percentages:
    height = (percentage / 100) * total_height
    dwg.add(dwg.rect(insert=(0, y_position), size=(total_width, height), fill="blue"))
    y_position += height

dwg.save()
print("SVG file created successfully as output.svg.")
