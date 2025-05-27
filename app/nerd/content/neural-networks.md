# Understanding Neural Networks

> [!note]
> This is a comprehensive guide to understanding neural networks and their applications in modern AI.

## Introduction

Neural networks are a fundamental concept in modern artificial intelligence. They are inspired by the human brain's structure and function, consisting of interconnected nodes (neurons) that process and transmit information.

## Key Concepts

### 1. Neurons

Neurons are the basic building blocks of neural networks. They receive inputs, process them, and produce outputs.

```python
class Neuron:
    def __init__(self, weights, bias):
        self.weights = weights
        self.bias = bias

    def activate(self, inputs):
        return sum(w * x for w, x in zip(self.weights, inputs)) + self.bias
```

### 2. Weights

Weights determine the strength of connections between neurons.

| Weight Type | Description           |
| ----------- | --------------------- |
| Positive    | Excitatory connection |
| Negative    | Inhibitory connection |
| Zero        | No connection         |

### 3. Activation Functions

Activation functions introduce non-linearity into the network.

```python
def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def relu(x):
    return max(0, x)
```

## Applications

### Image Recognition

- Convolutional Neural Networks (CNNs)
- Object Detection
- Image Classification

### Natural Language Processing

- Recurrent Neural Networks (RNNs)
- Transformers
- BERT Models

### Autonomous Systems

- Reinforcement Learning
- Deep Q-Networks
- Policy Gradients

## Code Example: Simple Neural Network

```python
import numpy as np

class SimpleNeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size):
        self.weights1 = np.random.randn(input_size, hidden_size)
        self.weights2 = np.random.randn(hidden_size, output_size)

    def forward(self, X):
        self.hidden = np.dot(X, self.weights1)
        self.hidden_activation = self.sigmoid(self.hidden)
        self.output = np.dot(self.hidden_activation, self.weights2)
        return self.sigmoid(self.output)
```

## Important Notes

> [!warning]
> Always normalize your input data before training neural networks.

> [!tip]
> Use batch normalization to improve training stability.

## Mathematical Formulas

The forward propagation can be represented as:

$$
h = \sigma(W_1x + b_1)
$$

$$
y = \sigma(W_2h + b_2)
$$

## References

1. [Deep Learning Book](https://www.deeplearningbook.org/)
2. [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/)

## Task List

- [x] Implement basic neural network
- [ ] Add backpropagation
- [ ] Test with MNIST dataset
- [ ] Optimize hyperparameters

## Footnotes

[^1]: This is a footnote reference
[^2]: Another footnote reference
[^1]: First footnote content
[^2]: Second footnote content
