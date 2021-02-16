import { TreeArrayItem } from "@slotter/types";
import { useMachine } from "@xstate/react";
import { createContext, PropsWithChildren } from "react";
import { Interpreter, State, Typestate } from "xstate";
import {
  DropPosition,
  reorderMachine,
  ReorderMachineContext,
  ReorderMachineEvent,
  ReorderMachineStateSchema
} from "./stateMachine";

/**
 * CONTEXT
 */
interface ReorderListContext<T extends TreeArrayItem = TreeArrayItem> {
  // had to build these up because sad
  state: State<
    ReorderMachineContext,
    ReorderMachineEvent,
    Typestate<ReorderMachineContext>
  >;
  send: Interpreter<
    ReorderMachineContext,
    ReorderMachineStateSchema,
    ReorderMachineEvent,
    Typestate<ReorderMachineContext>
  >["send"];
  service: Interpreter<
    ReorderMachineContext,
    ReorderMachineStateSchema,
    ReorderMachineEvent,
    Typestate<ReorderMachineContext>
  >;

  onOrderChange: <S extends TreeArrayItem = T>(args: {
    dragItem: S;
    dropTarget: S;
    dropPosition: DropPosition;
  }) => void;
  idKey: string;
}

export const reorderListContext = createContext<ReorderListContext>(
  //@ts-ignore because defaults are pointless ...and difficult.
  {}
);

export interface ReorderListProviderProps<
  T extends TreeArrayItem = TreeArrayItem
> {
  onOrderChange: ReorderListContext<T>["onOrderChange"];
  /**
   * The key of the items that's used as the id.
   */
  idKey: string;
}

export const ReorderListProvider = <T extends TreeArrayItem = TreeArrayItem>({
  onOrderChange,
  idKey,
  ...props
}: PropsWithChildren<ReorderListProviderProps<T>>) => {
  const [state, send, service] = useMachine(reorderMachine, {
    devTools: false,
  });

  return (
    <reorderListContext.Provider
      value={{ state, send, service, onOrderChange, idKey }}
      {...props}
    />
  );
};
