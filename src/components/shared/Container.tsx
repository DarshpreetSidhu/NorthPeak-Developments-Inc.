import type { ReactNode, ElementType } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function Container({ children, className = "", as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-[90rem] px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </Tag>
  );
}
