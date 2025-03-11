import csv
import svgwrite
from decimal import Decimal

csv_file_path = "Percentage_of_the_Universe.csv"
svg_file_path = "percentage_of_the_universe.svg"

dwg = svgwrite.Drawing(svg_file_path, profile="tiny")

with open(csv_file_path, newline="") as csvfile:
    reader = csv.DictReader(csvfile)
    y_position = 20
    for row in reader:
        element_name = row["NAME"]
        percentage = Decimal(row["PERCENTAGE"]).normalize()
        percentage_str = format(percentage, "f").rstrip("0").rstrip(".")

        dwg.add(dwg.text(element_name, insert=(10, y_position), fill="black"))
        dwg.add(dwg.text(f"{percentage_str}%", insert=(150, y_position), fill="black"))

        y_position += 20

dwg.save()
