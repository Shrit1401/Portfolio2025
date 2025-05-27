"use client";

import React, { ReactElement, ReactNode } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import { Revealer } from "../../components/Revealer";
import ResearchText from "@/app/components/research/ResearchText";
import Footer from "@/app/components/Footer";
import ResearchSense from "@/app/components/research/ResearchSense";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/vs2015.css";

type CalloutType = "note" | "warning" | "tip";

export default function ResearchPage() {
  const params = useParams();
  const slug = params.slug as string;

  // This would typically fetch the markdown content based on the slug
  const markdownContent = `
# Understanding Neural Networks

> [!note]
> This is a comprehensive guide to understanding neural networks and their applications in modern AI.

## Introduction
Neural networks are a fundamental concept in modern artificial intelligence. They are inspired by the human brain's structure and function, consisting of interconnected nodes (neurons) that process and transmit information.

## Key Concepts

### 1. Neurons
Neurons are the basic building blocks of neural networks. They receive inputs, process them, and produce outputs.

\`\`\`python
class Neuron:
    def __init__(self, weights, bias):
        self.weights = weights
        self.bias = bias
    
    def activate(self, inputs):
        return sum(w * x for w, x in zip(self.weights, inputs)) + self.bias
\`\`\`

### 2. Weights
Weights determine the strength of connections between neurons.

| Weight Type | Description |
|------------|-------------|
| Positive   | Excitatory connection |
| Negative   | Inhibitory connection |
| Zero       | No connection |

### 3. Activation Functions
Activation functions introduce non-linearity into the network.

\`\`\`python
def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def relu(x):
    return max(0, x)
\`\`\`

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

\`\`\`python
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
\`\`\`

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
`;

  return (
    <div className="relative w-full home">
      <Revealer />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <ResearchText
          title={"How do ppl work??"}
          time={"10min read"}
          date={"2025-01-01"}
          img="https://sdmntprwestus2.oaiusercontent.com/files/00000000-5108-61f8-a39a-514b008cabec/raw?se=2025-05-27T09%3A27%3A26Z&sp=r&sv=2024-08-04&sr=b&scid=f9e71290-2353-5b61-bc86-1ffb660fe796&skoid=c953efd6-2ae8-41b4-a6d6-34b1475ac07c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-26T10%3A34%3A10Z&ske=2025-05-27T10%3A34%3A10Z&sks=b&skv=2024-08-04&sig=9QAQXFVccsKcQZSpWgonlJDiyHjO8PqKWfMMfK0rjRU%3D"
        />
      </div>
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="prose lg:prose-xl mx-auto prose-pre:bg-transparent prose-pre:m-0 prose-pre:p-0 ">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSlug, rehypeHighlight]}
            components={{
              // Style callouts
              blockquote: ({ children, ...props }) => {
                const content = React.Children.toArray(children);
                const firstChild = content[0] as ReactElement<{
                  children: string;
                }>;
                if (
                  React.isValidElement(firstChild) &&
                  typeof firstChild.props.children === "string" &&
                  firstChild.props.children.includes("[!")
                ) {
                  const type = firstChild.props.children.match(
                    /\[!(.*?)\]/
                  )?.[1] as CalloutType;
                  const message = firstChild.props.children
                    .replace(/\[!.*?\]/, "")
                    .trim();

                  const bgColor =
                    {
                      note: "bg-blue-100 border-blue-500",
                      warning: "bg-yellow-100 border-yellow-500",
                      tip: "bg-green-100 border-green-500",
                    }[type] || "bg-gray-100 border-gray-500";

                  return (
                    <div
                      className={`p-4 my-4 rounded-lg border-l-4 ${bgColor}`}
                    >
                      <div className="font-bold mb-2">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </div>
                      <div>{message}</div>
                    </div>
                  );
                }
                return (
                  <blockquote
                    className="border-l-4 border-gray-300 pl-4 italic"
                    {...props}
                  >
                    {children}
                  </blockquote>
                );
              },
              // Make all links open in new tab
              a: ({ href, children, ...props }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                  {...props}
                >
                  {children}
                </a>
              ),
              // Style code blocks
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <div className="relative">
                    <div className="absolute right-2 top-2 text-xs text-gray-400">
                      {match[1]}
                    </div>
                    <pre
                      className={`${className} bg-transparent m-0 p-0 rounded-lg overflow-x-auto`}
                    >
                      <code className="bg-transparent m-0 p-0" {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <code className="bg-gray-100 rounded px-1 py-0.5" {...props}>
                    {children}
                  </code>
                );
              },
              // Style task lists
              input: ({ type, checked, ...props }) => {
                if (type === "checkbox") {
                  return (
                    <input
                      type="checkbox"
                      checked={checked}
                      readOnly
                      className="h-4 w-4 mr-2"
                      {...props}
                    />
                  );
                }
                return <input type={type} {...props} />;
              },
              // Style footnotes
              sup: ({ children, ...props }) => {
                if (typeof children === "string") {
                  const id = children.match(/\[(.*?)\]/)?.[1];
                  if (id) {
                    return (
                      <sup className="text-sm text-gray-600">
                        <a
                          href={`#footnote-${id}`}
                          className="no-underline hover:underline"
                        >
                          [{id}]
                        </a>
                      </sup>
                    );
                  }
                }
                return <sup {...props}>{children}</sup>;
              },
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </article>
      </main>

      <ResearchSense />

      <Footer />
    </div>
  );
}
