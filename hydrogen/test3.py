# Hydrogen Atom - Wavefunction and Electron Density Visualization

# Sebastian Mag | August 2023
# https://github.com/ssebastianmag/hydrogen-wavefunctions

# Modeling and visualization of hydrogen atom wavefunctions
# and electron probability density.

from scipy.constants import physical_constants
import matplotlib.pyplot as plt
import scipy.special as sp
import seaborn as sns
import numpy as np


def radial_function(n, l, r, a0):
    """ Compute the normalized radial part of the wavefunction using
    Laguerre polynomials and an exponential decay factor.
    """
    laguerre = sp.genlaguerre(n - l - 1, 2 * l + 1)
    p = 2 * r / (n * a0)

    constant_factor = np.sqrt(
        ((2 / n * a0) ** 3 * (sp.factorial(n - l - 1))) /
        (2 * n * (sp.factorial(n + l)))
    )
    return constant_factor * np.exp(-p / 2) * (p ** l) * laguerre(p)


def angular_function(m, l, theta, phi):
    """ Compute the normalized angular part of the wavefunction using
    Legendre polynomials and a phase-shifting exponential factor.
    """
    legendre = sp.lpmv(m, l, np.cos(theta))

    constant_factor = ((-1) ** m) * np.sqrt(
        ((2 * l + 1) * sp.factorial(l - np.abs(m))) /
        (4 * np.pi * sp.factorial(l + np.abs(m)))
    )
    return constant_factor * legendre * np.real(np.exp(1.j * m * phi))


def compute_wavefunction(n, l, m, a0_scale_factor):
    """ Compute the normalized wavefunction as a product
    of its radial and angular components.
    """
    a0 = a0_scale_factor * physical_constants['Bohr radius'][0] * 1e+12
    grid_extent = 480
    grid_resolution = 680
    z = x = np.linspace(-grid_extent, grid_extent, grid_resolution)
    z, x = np.meshgrid(z, x)

    eps = np.finfo(float).eps
    psi = radial_function(n, l, np.sqrt((x ** 2 + z ** 2)), a0) * angular_function(m, l, np.arctan(x / (z + eps)), 0)
    return psi


def compute_probability_density(psi):
    """ Compute the probability density of a given wavefunction.
    """
    return np.abs(psi) ** 2


def plot_wf_probability_density(n, l, m, a0_scale_factor):
    """ Plot the probability density of the hydrogen
    atom's wavefunction for a given quantum state (n,l,m).
    """
    if not isinstance(n, int) or n < 1:
        raise ValueError('n should be an integer satisfying the condition: n >= 1')
    if not isinstance(l, int) or not (0 <= l < n):
        raise ValueError('l should be an integer satisfying the condition: 0 <= l < n')
    if not isinstance(m, int) or not (-l <= m <= l):
        raise ValueError('m should be an integer satisfying the condition: -l <= m <= l')

    plt.rcParams['font.family'] = 'STIXGeneral'
    plt.rcParams['mathtext.fontset'] = 'stix'
    plt.rcParams['xtick.major.width'] = 4
    plt.rcParams['ytick.major.width'] = 4
    plt.rcParams['xtick.major.size'] = 15
    plt.rcParams['ytick.major.size'] = 15
    plt.rcParams['xtick.labelsize'] = 30
    plt.rcParams['ytick.labelsize'] = 30
    plt.rcParams['axes.linewidth'] = 4

    fig, ax = plt.subplots(figsize=(8, 8))  # Adjust figure size for better aspect ratio
    plt.subplots_adjust(top=0.9)

    psi = compute_wavefunction(n, l, m, a0_scale_factor)
    prob_density = compute_probability_density(psi)

    # Use contours to visualize the probability density
    contour = ax.contour(np.sqrt(prob_density).T, levels=10, cmap='Greys', linewidths=2)

    cbar = plt.colorbar(contour, fraction=0.046, pad=0.03)
    cbar.set_ticks([])

    plt.rcParams['text.color'] = '#000'
    fig.patch.set_facecolor('#fff')
    cbar.outline.set_visible(False)
    ax.tick_params(axis='x', colors='#000')
    ax.tick_params(axis='y', colors='#000')
    for spine in ax.spines.values():
        spine.set_color('#000')

    # Display the n, l, m numbers
    ax.text(0, 0, r'${0}, {1}, {2}$'.format(n, l, m), color='#000', fontsize=24, ha='center')

    ax.set_xlim([-480, 480])  # Set x-axis limits
    ax.set_ylim([-480, 480])  # Set y-axis limits
    ax.set_aspect('equal')  # Set aspect ratio to be equal

    plt.savefig(f'({n},{l},{m})[dt].png')
    plt.show()


# - - - Example probability densities for various quantum states (n,l,m)
if __name__ == '__main__':
    plot_wf_probability_density(2, 0, 0, 1)
