import React, { PropsWithChildren, ReactElement, useContext } from "react";
import { PortalContext } from "./context";
import PortalForward from "./portal-forward";
import PortalHost, { PortalHostComponent } from "./portal-host";

export interface PortalProps {}

export type PortalComponent<P = {}> = {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  Host: PortalHostComponent;
};

const Portal: PortalComponent<PortalProps> = (props) => {
  const { children } = props;
  const actions = useContext(PortalContext)

  return (
    <PortalForward actions={actions}>{children}</PortalForward>
  );
};

Portal.Host = PortalHost;

export default Portal;
