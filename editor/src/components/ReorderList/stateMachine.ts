import { assign, Machine } from "xstate";

//@ts-ignore
if (module.hot) {
  //@ts-ignore
  module.hot.dispose(() => {
    window.location.reload();
  });
}

export interface ReorderMachineStateSchema {
  states: {
    idle: {};
    dragging: {};
    hoveringDropzone: {};
    dropped: {};
  };
}

export enum DropPosition {
  top = "top",
  inside = "inside",
  bottom = "bottom",
}

export type ReorderMachineEvent<T extends any = any> =
  | { type: "BEGIN_DRAG"; payload: { dragItem: T } }
  | { type: "DRAG" }
  | {
      type: "HOVER";
      payload: {
        dropTarget: T;
        dropPosition: DropPosition;
      };
    }
  | { type: "DROP" }
  | { type: "IDLE" };

export interface ReorderMachineContext<T extends any = any> {
  dragItem: T | null;
  dropTarget: T | null;
  dropPosition: DropPosition | null;
}

export const reorderMachine = Machine<
  ReorderMachineContext,
  ReorderMachineStateSchema,
  ReorderMachineEvent
>(
  {
    id: "dnd",
    initial: "idle",
    context: {
      dragItem: null,
      dropTarget: null,
      dropPosition: null,
    },
    states: {
      idle: {
        entry: "clearContext",
        on: {
          BEGIN_DRAG: {
            target: "dragging",
          },
        },
      },

      dragging: {
        entry: ["assignDragItemToContext", "clearHoverStates"],
        on: {
          DROP: "dropped",
          HOVER: "hoveringDropzone",
        },
      },

      hoveringDropzone: {
        entry: assign((context, event) => {
          if (event.type !== "HOVER") return context;
          return {
            ...context,
            ...event.payload,
          };
        }),
        on: {
          HOVER: "hoveringDropzone",
          DROP: {
            target: "dropped",
          },
          DRAG: {
            target: "dragging",
            actions: ["clearHoverStates"],
          },
        },
      },
      dropped: {
        always: ["idle"],
      },
    },
  },
  {
    actions: {
      clearContext: assign((context, event) => ({
        dragItem: null,
        dropTarget: null,
        dropPosition: null,
      })),
      clearHoverStates: assign((context, event) => ({
        ...context,
        dropTarget: null,
        dropPosition: null,
      })),
      assignDragItemToContext: assign((context, event) => ({
        ...context,
        ...(event.type === "BEGIN_DRAG" && {
          dragItem: event.payload.dragItem,
        }),
      })),
    },
  }
);
