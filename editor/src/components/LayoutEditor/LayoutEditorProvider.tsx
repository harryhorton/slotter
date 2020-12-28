import { ComponentInstance, LayoutInstance } from "@slotter/types";
import { createContext, FC, useContext, useReducer } from "react";
import { sampleLayout } from "./__fixtures__";

enum LayoutActionType {
  SELECT_COMPONENT = "SELECT_COMPONENT",
  DESELECT_ALL_COMPONENTS = "DESELECT_ALL_COMPONENTS",
  ADD_COMPONENT = "ADD_COMPONENT",
  UPDATE_COMPONENT = "UPDATE_COMPONENT",
  DELETE_COMPONENT = "DELETE_COMPONENT",
  MOVE_COMPONENT = "MOVE_COMPONENT",
}

type LayoutAction =
  | {
      type: LayoutActionType.SELECT_COMPONENT;
      payload: string;
    }
  | {
      type: LayoutActionType.DESELECT_ALL_COMPONENTS;
    }
  | {
      type: LayoutActionType.ADD_COMPONENT;
      payload: {
        parentId: string;
        component: ComponentInstance;
        index?: number;
      };
    }
  | {
      type: LayoutActionType.UPDATE_COMPONENT;
      payload: ComponentInstance;
    }
  | {
      type: LayoutActionType.DELETE_COMPONENT;
      payload: string;
    }
  | {
      type: LayoutActionType.MOVE_COMPONENT;
      payload: {
        parentId: string;
        componentId: ComponentInstance;
        index: number;
      };
    };

interface LayoutState {
  selectedComponent: string | null;
  layout: LayoutInstance;
}

interface LayoutEditorContext extends LayoutState {
  selectComponent: (componentId: string) => void;
  deselectAllComponents: () => void;
  addComponent: (payload: {
    parentId: string;
    component: ComponentInstance;
    index?: number;
  }) => void;
  updateComponent: (component: ComponentInstance) => void;
  deleteComponent: (componentId: string) => void;
  moveComponent: (payload: {
    parentId: string;
    componentId: ComponentInstance;
    index: number;
  }) => void;
}

export const getComponentById = (
  components: ComponentInstance[],
  id: string
): ComponentInstance | false => {
  for (const component of components) {
    const isComponent = component.id === id;
    if (isComponent) {
      return component;
    }

    if (component.children) {
      const foundComponent = getComponentById(component.children, id) || false;
      if (foundComponent) {
        return foundComponent;
      }
    }
  }
  return false;
};

const layoutEditorContext = createContext<LayoutEditorContext>({
  layout: sampleLayout,
  selectedComponent: null,
  selectComponent: () => {},
  deselectAllComponents: () => {},
  addComponent: () => {},
  updateComponent: () => {},
  deleteComponent: () => {},
  moveComponent: () => {},
});

const replaceComponent = (
  components: ComponentInstance[],
  component: ComponentInstance
): ComponentInstance[] => {
  return components.map((currentComponent) => {
    if (currentComponent.id === component.id) return component;

    if (currentComponent.children) {
      return {
        ...currentComponent,
        children: replaceComponent(currentComponent.children, component),
      };
    }
    return currentComponent;
  });
};

export const LayoutEditorProvider: FC<{ initialLayout: LayoutInstance }> = ({
  children,
  initialLayout,
}) => {
  const [{ layout, selectedComponent }, dispatch] = useReducer(
    (state: LayoutState, action: LayoutAction) => {
      switch (action.type) {
        case LayoutActionType.SELECT_COMPONENT:
          return { ...state, selectedComponent: action.payload };

        case LayoutActionType.DESELECT_ALL_COMPONENTS:
          return { ...state, selectedComponent: null };

        case LayoutActionType.ADD_COMPONENT:
          const parent = getComponentById(
            state.layout.components,
            action.payload.parentId
          );

          if (!parent) throw new Error("Unable to find component");

          const layoutWithNewComponent = {
            ...state.layout,
            components: replaceComponent(state.layout.components, {
              ...parent,
              children: parent.children?.concat(action.payload.component) ?? [
                action.payload.component,
              ],
            }),
          };

          return { ...state, layout: layoutWithNewComponent };

        case LayoutActionType.UPDATE_COMPONENT:
          const layout = {
            ...state.layout,
            components: replaceComponent(
              state.layout.components,
              action.payload
            ),
          };
          return { ...state, layout };

        // case LayoutActionType.DELETE_COMPONENT:
        //   return { ...state, selectedComponent: action.payload };

        // case LayoutActionType.MOVE_COMPONENT:
        //   return { ...state, selectedComponent: action.payload };

        default:
          return state;
      }
    },
    {
      selectedComponent: null,
      layout: initialLayout,
    }
  );

  return (
    <layoutEditorContext.Provider
      value={{
        layout,
        selectedComponent,
        selectComponent: (componentId) =>
          dispatch({
            type: LayoutActionType.SELECT_COMPONENT,
            payload: componentId,
          }),
        deselectAllComponents: () =>
          dispatch({
            type: LayoutActionType.DESELECT_ALL_COMPONENTS,
          }),
        addComponent: (payload) =>
          dispatch({
            type: LayoutActionType.ADD_COMPONENT,
            payload,
          }),
        updateComponent: (component) =>
          dispatch({
            type: LayoutActionType.UPDATE_COMPONENT,
            payload: component,
          }),
        deleteComponent: (componentId) =>
          dispatch({
            type: LayoutActionType.DELETE_COMPONENT,
            payload: componentId,
          }),
        moveComponent: (payload) =>
          dispatch({
            type: LayoutActionType.MOVE_COMPONENT,
            payload,
          }),
      }}
    >
      {children}
    </layoutEditorContext.Provider>
  );
};

export const useLayoutEditor = () => {
  return useContext(layoutEditorContext);
};
