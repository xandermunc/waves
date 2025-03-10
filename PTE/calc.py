from svgpathtools import svg2paths
import xml.etree.ElementTree as ET

def get_area_of_rectangle(rect):
    width = float(rect.attrib['width'])
    height = float(rect.attrib['height'])
    return width * height

def get_area_of_path(path):
    points = []
    for command in path:
        if command.__class__.__name__ == 'Line':
            points.append((command.start.real, command.start.imag))
            points.append((command.end.real, command.end.imag))
    area = 0
    n = len(points)
    for i in range(n):
        j = (i + 1) % n
        area += points[i][0] * points[j][1]
        area -= points[j][0] * points[i][1]
    return abs(area) / 2

def calculate_white_shape_percentage(svg_file):
    paths, attributes = svg2paths(svg_file)
    tree = ET.parse(svg_file)
    root = tree.getroot()
    black_rectangle = root.find('.//{http://www.w3.org/2000/svg}rect')
    white_path = root.find('.//{http://www.w3.org/2000/svg}path')
    if black_rectangle is None or white_path is None:
        raise ValueError("SVG must contain one black rectangle and one white path.")
    black_area = get_area_of_rectangle(black_rectangle)
    white_area = get_area_of_path(paths[0])
    percentage = (white_area / black_area) * 100
    return percentage

svg_file = 'testP3.svg'
try:
    percentage = calculate_white_shape_percentage(svg_file)
    print(f"The white shape takes up {percentage:.2f}% of the black rectangle.")
except Exception as e:
    print(f"Error: {e}")
