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

  // TODO BUG: actions 触发无限递归
  useEffect(() => {
    if (currentKey.current !== -1) {
      console.log("update");
      actions.update(currentKey.current, children);
    }
  }, [children]);

  return null;
};

export default PortalForward;
