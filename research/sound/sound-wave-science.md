# Wave Science Research 

## Sound Wave Function and Logic 

The wave function for a musical note can be described mathematically as a simple *sinusoidal* wave. It should be represented as a pure tone (a sine wave) and not the timbre of the instrument playing it. 

### Equation

$ y(t) = A\sin(⍵t+ϕ) \\$
where $ \omega = 2πf $

- $A$ = Amplitude (volume of the wave)
- $⍵$ = Angular frequency (frequency in radians per second) 
- $f$ = Frequency in hertz (Hz)
- $t$ = Time in seconds 
- $ϕ$ = Phase, representing the initial angle of the wave at t=0

### Example for Middle C (261.63Hz)

$ y(t) = Asin(2π261.63t+ϕ) $

### Real-World Timbre 

Real-world instruments, such as a piano, don't produce pure sine waves. They create a sound made from the fundamental frequency and that frequency's harmonics (from the *overtone series*). To model that sound the function would have to include those harmonics. 

$ y(t) = ∑_{n=1}^{N}A_n\sin(\omega_nt+\phi_n) $

- $N$ = The number of harmonics (overtones)
- $A_n$ = The amplitude of each harmonic n
- $⍵_n$ = The angular frequency of each harmonic, defined as $⍵_n=2πf_n$ (where $f_n$ is the frequency of the $n$-th harmonic)
- $t$ = Time in seconds 
- $ϕ_n$ = The phase of each harmonic at t=0

