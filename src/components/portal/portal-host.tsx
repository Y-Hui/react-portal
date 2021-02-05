import React, {
  ReactElement,
  PropsWithChildren,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from "react";
import { PortalContext } from "./context";

export type PortalHostComponent<P = {}> = {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
};

interface NodeItem {
  key: number;
  children: React.ReactNode;
}

function dispatchMount(key: number, node: NodeItem["children"]) {
  return { type: "mount", key, payload: node } as const;
}
function dispatchUpdate(key: number, node: NodeItem["children"]) {
  return { type: "update", key, payload: node } as const;
}
function dispatchUnmount(key: number) {
  return { type: "unmount", key } as const;
}

type Actions =
  | ReturnType<typeof dispatchMount>
  | ReturnType<typeof dispatchUpdate>
  | ReturnType<typeof dispatchUnmount>;

function actions(state: NodeItem[], action: Actions): NodeItem[] {
  switch (action.type) {
    case "mount":
      return [...state, { key: action.key, children: action.payload }];
    case "update":
      return state.map((item) => {
        if (item.key === action.key) {
          return { key: item.key, children: action.payload };
        }
        return item;
      });
    case "unmount":
      return state.filter((item) => item.key !== action.key);
    default:
      return state;
  }
}

const PortalHost: PortalHostComponent = (props) => {
  const { children } = props;

  const [nodes, dispatch] = useReducer(actions, []);

  const nextKey = useRef(10);

  useEffect(() => {
    const key = nextKey.current;
    const { length } = nodes;
    if (length < key) {
      nextKey.current = key + 1;
    } else {
      nextKey.current = length + 1;
    }
  }, [nodes]);

  const onMount = useCallback((node: NodeItem["children"]) => {
    dispatch(dispatchMount(nextKey.current, node));
    return nextKey.current;
  }, []);

  const onUpdate = useCallback((key: number, node: NodeItem["children"]) => {
    dispatch(dispatchUpdate(key, node));
  }, []);

  const onUnmount = useCallback((key: number) => {
    dispatch(dispatchUnmount(key));
  }, []);

  return (
    <PortalContext.Provider
      value={{ mount: onMount, update: onUpdate, unmount: onUnmount }}
    >
      {children}
      <div>
        {nodes.map(({ key, children: node }) => (
          <React.Fragment key={key}>{node}</React.Fragment>
        ))}
      </div>
    </PortalContext.Provider>
  );
};

export default PortalHost;
