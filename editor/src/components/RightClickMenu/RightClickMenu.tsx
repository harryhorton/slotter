import {
  ComponentProps,
  ComponentType,
  ElementType,
  FC,
  JSXElementConstructor,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { ContextMenu, ContextMenuTrigger, hideMenu } from "react-contextmenu";
import { v1 } from "uuid";

type AnyComponentType = keyof JSX.IntrinsicElements | ComponentType<any>;

interface RightClickMenuProps {
  renderTrigger: (props: {
    onMouseOver: () => void;
    onMouseOut: () => void;
    onClick: () => void;
  }) => any;
  is?: AnyComponentType;
}

export const RightClickMenu: FC<RightClickMenuProps> = ({
  children,
  renderTrigger,
  is = "span",
  ...props
}) => {
  const [uuid, setuuid] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setuuid(v1());
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
    <As {...props}>
      {isShowing || !isHovering ? (
        renderTrigger({
          onClick: () => hideMenu(),
          onMouseOver: () => setIsHovering(true),
          onMouseOut: () => setIsHovering(false),
        })
      ) : (
        <ContextMenuTrigger id={uuid}>
          {renderTrigger({
            onClick: () => hideMenu(),
            onMouseOver: () => setIsHovering(true),
            onMouseOut: () => setIsHovering(false),
          })}
        </ContextMenuTrigger>
      )}
      <ContextMenu
        id={uuid}
        style={{ zIndex: 1000 }}
        onShow={() => setIsShowing(true)}
        onHide={() => setIsShowing(false)}
      >
        {children}
      </ContextMenu>
    </As>
  );
};
