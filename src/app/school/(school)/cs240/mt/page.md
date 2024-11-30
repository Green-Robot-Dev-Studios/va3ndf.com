---
title: Midterm Review
date: 2024-06-23
---

# Module 1

<img src="./assets/complexity.png" width="200px"/>
*Basically this, but more rigourous.*

## Order Notation
- $O$-notation: $f(x) \in O(g(x))$ if there exist constants $c > 0$ and $n_0 \geq 0$ such that $|f(x)| \leq c|g(x)|$ for all $x \geq n_0$.

For example, drag the $c$ slider until the black function ($c \cdot g(x)$) asymptotically outgrows the blue function ($f(x)$). Then find a constant $n_0$ where on the right of it, the black function is always larger than the blue one.

<Desmos cells={["f(x) = 2x^2+6", "g(x) = x^2", "x=n_0", "c g(x)", "c=5", "n_0=5"]} />

- $\Omega$-notation: $f(x) \in \Omega(g(x))$ if there exist 
