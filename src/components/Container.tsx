import { ReactNode } from 'react';

export default function Container({
  screen = 'md',
  children,
}: {
  screen?: string;
  children: ReactNode;
}) {
  return (
    <div className={`max-w-screen-${screen} px-4 py-8 mx-auto`}>{children}</div>
  );
}
