import { ReactNode } from 'react';

export default function Container({
  screen = 'md',
  children,
}: {
  screen?: string;
  children: ReactNode;
}) {
  const sizes: Record<string, string> = {
    md: 'max-w-screen-md',
    xl: 'max-w-screen-xl',
  };

  return <div className={`${sizes[screen]} px-4 py-8 mx-auto`}>{children}</div>;
}
