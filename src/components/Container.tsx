import { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-screen-md px-4 py-8 mx-auto">{children}</div>;
}
