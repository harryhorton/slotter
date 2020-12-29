import { ComponentType, FC, useEffect, useRef, useState } from "react";
import { ContextMenu, ContextMenuTrigger, hideMenu } from "react-contextmenu";
import ReactDOM from "react-dom";
import { v1 } from "uuid";

type AnyComponentType = keyof JSX.IntrinsicElements | ComponentType<any>;

interface RightClickMenuProps {
  renderTrigger: (props: {
    onMouseOver: () => void;
    onMouseOut: () => void;
    onClick: () => void;
  }) => any;
  onShow?: () => void;
  is?: AnyComponentType;
  className?: string;
}

export const RightClickMenu: FC<RightClickMenuProps> = ({
  children,
  renderTrigger,
  is = "span",
  onShow,
  ...props
}) => {
  const [uuid, setuuid] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const contextMenuRootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setuuid(v1());

    const foundRoot = document.getElementById("context-menu-root");
    if (foundRoot) {
      contextMenuRootRef.current = foundRoot;
    } else {
      contextMenuRootRef.current = document.createElement("div");
      document.body.append(contextMenuRootRef.current);
      contextMenuRootRef.current.id = "context-menu-root";
    }
  }, [setuuid]);
  /**
   * TODO: component renderer currently has a working example.
   *
   * Turn that into something reusable in this component.
   *
   * Make sure context menu has super high z-index.
   */
  const As = is;

  return (
    <>
      {isShowing || !isHovering ? (
        renderTrigger({
          onClick: () => hideMenu(),
          onMouseOver: () => setIsHovering(true),
          onMouseOut: () => setIsHovering(false),
        })
      ) : (
        <ContextMenuTrigger id={uuid} {...props}>
          {renderTrigger({
            onClick: () => hideMenu(),
            onMouseOver: () => setIsHovering(true),
            onMouseOut: () => setIsHovering(false),
          })}
        </ContextMenuTrigger>
      )}
      {contextMenuRootRef.current &&
        ReactDOM.createPortal(
          <ContextMenu
            id={uuid}
            className="absolute"
            style={{ zIndex: 1000 }}
            onShow={() => {
              onShow && onShow();
              setIsShowing(true);
            }}
            onHide={() => setIsShowing(false)}
          >
            {children}
          </ContextMenu>,
          contextMenuRootRef.current
        )}
    </>
  );
};
