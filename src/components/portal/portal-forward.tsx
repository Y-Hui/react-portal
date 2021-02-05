import React, { useEffect, useRef } from "react";
import { useMount, useUnmount } from "ahooks";
import { PortalMethods } from "./context";

export interface PortalForwardProps {
  actions: PortalMethods;
}

const PortalForward: React.FC<PortalForwardProps> = (props) => {
  const { actions, children } = props;

  const currentKey = useRef(-1);

  useMount(() => {
    if (actions) {
      currentKey.current = actions.mount(children);
    }
  });

  useUnmount(() => {
    actions.unmount(currentKey.current);
  });

  useEffect(() => {
    if (currentKey.current !== -1) {
      actions.update(currentKey.current, children);
    }
  }, [children, actions]);

  return null;
};

export default PortalForward;
