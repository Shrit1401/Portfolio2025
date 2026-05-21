"use client";

import React, { ReactElement } from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";

type CalloutType = "note" | "warning" | "tip";

export const remarkPlugins = [remarkGfm, remarkMath];
export const rehypePlugins = [rehypeRaw, rehypeSlug, rehypeHighlight, rehypeKatex];

export function buildMarkdownComponents(onImageClick?: (src: string) => void) {
  return {
    blockquote: ({
      children,
      ...props
    }: React.ComponentPropsWithoutRef<"blockquote">) => {
      const content = React.Children.toArray(children);
      const firstChild = content[0] as ReactElement<{ children: string }>;
      if (
        React.isValidElement(firstChild) &&
        typeof firstChild.props.children === "string" &&
        firstChild.props.children.includes("[!")
      ) {
        const type = firstChild.props.children.match(
          /\[!(.*?)\]/,
        )?.[1] as CalloutType;
        const message = firstChild.props.children
          .replace(/\[!.*?\]/, "")
          .trim();

        const bgColor =
          {
            note: "bg-blue-50 border-blue-300",
            warning: "bg-amber-50 border-amber-300",
            tip: "bg-emerald-50 border-emerald-300",
          }[type] || "bg-neutral-50 border-neutral-300";

        return (
          <div
            className={`my-6 rounded-md border-l-[3px] px-4 py-3 ${bgColor}`}
          >
            <div className="mb-1 text-sm font-semibold">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
            <div className="text-sm text-neutral-700">{message}</div>
          </div>
        );
      }
      return (
        <blockquote
          className="border-l-2 border-neutral-300 pl-4 italic text-neutral-700"
          {...props}
        >
          {children}
        </blockquote>
      );
    },
    a: ({
      href,
      children,
      ...props
    }: React.ComponentPropsWithoutRef<"a">) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline-offset-2 hover:underline"
        {...props}
      >
        {children}
      </a>
    ),
    img: ({ src, alt, ...props }: React.ComponentPropsWithoutRef<"img">) => (
      <img
        src={src}
        alt={alt || ""}
        className={onImageClick ? "cursor-zoom-in" : ""}
        onClick={onImageClick && typeof src === "string" ? () => onImageClick(src) : undefined}
        {...props}
      />
    ),
    code: ({
      className,
      children,
      ...props
    }: React.ComponentPropsWithoutRef<"code">) => {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <div className="relative">
          <div className="absolute right-2 top-2 text-xs text-neutral-500">
            {match[1]}
          </div>
          <pre
            className={`${className} bg-transparent m-0 p-0 rounded-lg overflow-x-auto whitespace-pre-wrap break-words`}
          >
            <code className="bg-transparent m-0 p-0 whitespace-pre-wrap break-words" {...props}>
              {children}
            </code>
          </pre>
        </div>
      ) : (
        <code
          className="rounded bg-neutral-100 px-1 py-0.5 text-[0.9em]"
          {...props}
        >
          {children}
        </code>
      );
    },
    input: ({
      type,
      checked,
      ...props
    }: React.ComponentPropsWithoutRef<"input">) => {
      if (type === "checkbox") {
        return (
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className="mr-2 h-4 w-4"
            {...props}
          />
        );
      }
      return <input type={type} {...props} />;
    },
    sup: ({
      children,
      ...props
    }: React.ComponentPropsWithoutRef<"sup">) => {
      if (typeof children === "string") {
        const id = children.match(/\[(.*?)\]/)?.[1];
        if (id) {
          return (
            <sup className="text-sm text-neutral-600">
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
  };
}

export const proseClasses =
  "prose prose-neutral mx-auto max-w-3xl prose-headings:scroll-mt-20 prose-headings:font-semibold prose-p:text-[1.02rem] prose-p:leading-8 prose-li:text-[1.01rem] prose-li:leading-8 prose-hr:border-neutral-200 prose-strong:font-semibold prose-a:no-underline hover:prose-a:underline prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0 prose-code:before:content-none prose-code:after:content-none lg:prose-lg";
