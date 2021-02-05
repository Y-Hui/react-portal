import { createContext } from "react";

export type PortalMethods = {
  mount: (children: React.ReactNode) => number;
  update: (key: number, children: React.ReactNode) => void;
  unmount: (key: number) => void;
};

export const PortalContext = createContext<PortalMethods>(null as any);
