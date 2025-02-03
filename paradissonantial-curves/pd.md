# Paradissonantial Curves 
MFSMSPC-FA, PD Curves, or "Hanging Curves"

Parametric curves are mathematical equations where the coordinates of points on the curve are expressed as functions of parameters. These parameters are independent variables that determine the shape of the curve. Two dimensional parametric curves are made from two equations, one for the x-axis, and one for the y-axis. While three dimensional curves are also configured with an equation for the z-axis. 

The simplest parametric ratio relationship is 1:1 and will create a circle. 
(cos(t),sin(t))

lissajous curves use sin,sin instead of cos,sin or sin,cos (?)

2nd lowest relationship 1:2
x = sin(t+ϕ)
y = sin(2t)
(sin(t+ϕ),sin(2t)) (for the crown to be upright when one of the 2 frequencies is 1 the higher frequency must be on the y value)
if you animate the phi variable the crown will appear to spin in 3d. this is because parametric curves, and lissajous curves, can be represented in 3d space. 

x = sin(t+ϕ)    (stays the same)
y = cos(t+ϕ)    (cos of x)
z = sin(2t)     (y)
(sin(t+ϕ),cos(t+ϕ),sin(2t))
if z becomes cos of itself the curve aligns with the axis and become symmetrical down the y axis 
(sin(t+ϕ),cos(t+ϕ),cos(2t))
this is more apparent with a ratio of 1:3 and 1:4 (where 1:3 is originally symmetrical along the x axis)

if a third independent variable with a unique frequency is added in 3d it will create a knot rather than a crown. 
(sin(t),cos(2t),cos(3t)) 1:2:3
here the z must be cos as sin will create an incomplete and non-closing curve. 
the y view is s1:c3 (x/z)
the x view is c2:c3 (y/z)
the z view is s1:c2 (x/y)
meaning that if we were to turn it into a crown by making sx=cy the view for x and z would change while y stays the same.
(sin(2t),cos(2t),cos(3t)) 2:2:3
the y view is s2:c3 (x/z)
the x view is c2:c3 (y/z)
the z view is s2:c2 (x/y)

this is easier illustrated when the x and y are different but the x and z are equal, as it will create circles from some perspectives. 
(sin(t),cos(2t),cos(t)) 1:2:1
the y view is s1:c1 (x/z) (a circle)
the x view is c2:c1 (y/z) 
the z view is s1:c2 (x/y)

this ratio of 1:2:1 can be represented another way. starting in 2d, we must add a third variable to our lissajous curve. we do this by creating a superposition for our x equation. 
(sin(t)+sin(2t),2cos(t)) (the amplitude must be doubled to match the bounding box ratio (fixed amplitude))
this is the first paradissonantial curve, the "necklace" (if x were sin(t)+sin(t) the ratio would be 1:1)
this curve can be thought of as two superpositions against each other with a ratio of 1:2::1:1 
as lissajous curves create a superposition this curve can be thought of as a parametric curve of superpositions or a superposition of lissajous curves. however as the rules on when to use cos instead of sine differ it is stronger to think about it as the former. 
(this curve is another example of why cos for y is prefered, if it were x is it just a slanted versioin prior to the superposition of x)

the curves that create this parametric curve of superpositions can be seen by replacing the opposite sides equation with t. 
(sin(t)+sin(2t),t)
(t,2cos(t))
or simply by plotting 
x=sin(t)+sin(2t)
y=2cos(t)
and the parametric equations that make this curve can be dissected as well.
(sin(2t),cos(t)) 
(sin(t),cos(t)) 
in the actual curve, (sin(t)+sin(2t),2cos(t)), it does not matter if x1 or x2 has the higher frequency. 

this curve can be represented in 3d by the same practice as before: z=y and y=cx.
(sin(t)+sin(2t),cos(t)+cos(2t),2cos(t))
the y view is s1s2:c1c1 (x/z) 
the x view is c1c2:c1c1 (y/z) 
the z view is s1s2:c1c2 (x/y)

/////////////////////////////

take (sin(t),cos(2t)) 1:2
and convert it to 3d (sin(t),cos(t),cos(2t)) 1:1:2
and insert a unique frequency for y (creating a knot)
(sin(t),cos(3t),cos(2t)) 1:3:2
view this shape from 45 degrees on the x axis
how can we create a curve with that 45 degree shape as the y view
take (sin(t),cos(3t),cos(2t)) and squash it into 2d on the x axis 
(sin(t)+cos(3t),2cos(2t)) s1c3:c2c2
then convert that to 3d
(sin(t)+cos(3t),cos(t)+sin(3t),2cos(2t)) 

take (sin(t),cos(2t)) 1:2
and convert it to 3d (sin(t),cos(t),cos(2t)) 1:1:2
and insert a unique frequency for y (creating a knot)
(sin(t),cos(3t),cos(2t)) 1:3:2
view this shape from 45 degrees on the y axis (up to z looking downward)
how can we create a curve with that 45 degree shape as the y view
take (sin(t),cos(3t),cos(2t)) and squash it into 2d on the y axis 
(2sin(t),cos(3t)+cos(2t)) s1s1:c3c2
then convert that to 3d
(2sin(t),2cos(t),cos(3t)+cos(2t))

//////////////////////

NOTES
the x and y cannot both be sin as it will make a stretched flat shape therefore y must be cos
the z must be cos as it creates symmetry across the y axis and some curves may not close as sin (odd:even:odd)
therefor the best results are seen with sin:cos:cos. this will create the "hanging" effect.
if z isnt 1 cosine it will skew (no longer hanging)
if 1:2:1 (1st and 3rd are equal) lissajous slanted from side 

/////////////////////

major 3rd 5:4 = 5/4 -> f & 5/4f
perfect 5th 3:2 = 3/2 -> f & 3/2f
(sin(⍵t),cos(⍵t))
⍵ = 2πf

(sin(2πt)+sin((5/4)πt),cos(2πt)+cos((3/2)πt))
(sin(2πt)+sin((3/2)πt),cos(2πt)+cos((5/4)πt))

(sin(2πt)+sin((5/4)2πt),cos(2πt)+cos((5/4)2πt),cos(2πt)+cos((3/2)πt))
the y view is s1s5/4:c1c3/2 (x/z) (s3/c5)
the x view is c1c5/4:c1c3/2 (y/z) (c3/c5)
the z view is s1s5/4:c1c5/4 (x/y) (s3/c3)

(sin2πt,sin((5/4)πt),sin((3/2)πt))