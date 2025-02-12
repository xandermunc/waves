$$
\left( \sum_{n=1}^{N} A \sin(f_n \theta+\phi), B \cos(f_v \theta) \right) \theta \in [0, λ]
$$
$$
B = A \cdot N
$$
$$
f_n = \frac{a_n}{b_n} 
$$

$$
f_{v_{standard}} = \frac{b^*-1}{b^*}
$$

test the wavelength against non-fifth-having chords. see if product does something more accurate. 

$$
L_b = \text{LCM}\{ b_n \} \\[10pt]
P_b = \prod_{n=1}^{N} b_n \\[10pt]
S_P= \sum_{n=1}^{N} \frac{P_b}{b_n} \\
$$

$$
λ = 2L_bπ
$$

<!-- $$
M_b = \max_{n=1}^{N} b_n
$$ -->

<!-- $$ 
b_{n^*} \quad \text{where } n^* = \arg\max_{n=1}^{N} f_n
$$

$$
n^* = \arg\min_{n=1}^{N} \{ a_n, b_n \}
$$ -->

Full Equation
$$
\left( \sum_{n=1}^{N} A \sin(\frac{a_n}{b_n} \theta+\phi), A \cdot N \cos(\frac{\prod_{n=1}^{N} b_n-\left(N-1\right)}{\prod_{n=1}^{N} b_n}  \theta) \right) 
$$

<!-- $$
L_b \neq P_b \Rightarrow \\
\forall n, \quad \neg (L_b = P_b) \Rightarrow 
$$ -->

$$
L_b \neq P_b \Rightarrow \\[10pt]
f_v = |\frac{P_b-S_P}{P_b}| \\[10pt]
$$

$$
L_b = P_b \Rightarrow \\[10pt]
f_v = |\frac{P_b-S_P-1}{P_b}| \\[10pt]
$$