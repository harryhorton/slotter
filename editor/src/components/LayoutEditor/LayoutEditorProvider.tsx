import {
  ComponentInstance,
  ComponentInstanceWithoutId,
  LayoutInstance,
} from "@slotter/types";
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { v1 as uuid } from "uuid";
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
        component: ComponentInstanceWithoutId;
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
    component: ComponentInstanceWithoutId;
    index?: number;
  }) => void;
  updateComponent: (component: ComponentInstance) => void;
  deleteComponent: (componentId: string) => void;
  moveComponent: (payload: {
    parentId: string;
    componentId: ComponentInstance;
    index: number;
  }) => void;
  getComponentById: (id: string) => ComponentInstance | undefined;
  getComponentsById: (ids: string[]) => ComponentInstance[];
}

const getComponentById = (id: string, components: ComponentInstance[]) => {
  return components.find((comp) => comp.id === id);
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
  getComponentById: () => {
    return undefined;
  },
  getComponentsById: () => [],
});

const replaceComponent = (
  component: ComponentInstance,
  components: ComponentInstance[]
): ComponentInstance[] => {
  return components.map((currentComponent) => {
    if (currentComponent.id === component.id) return component;

    return currentComponent;
  });
};

const addComponent = ({
  component,
  index,
  components,
}: {
  component: ComponentInstanceWithoutId;
  index?: number;
  components: ComponentInstance[];
}) => {
  const newComponent: ComponentInstance = {
    id: uuid(),
    ...component,
  };

  if (component.parentId === "root") {
    return components.concat(newComponent);
  }

  const parent = getComponentById(component.parentId, components);
  if (!parent) throw new Error("Unable to find component");
  parent.children.splice(
    index ?? parent.children.length === 0 ? 0 : parent.children.length,
    0,
    newComponent.id
  );

  const componentsWithUpdatedParent = replaceComponent(
    { ...parent, children: [...parent.children] },
    components
  );

  console.log(componentsWithUpdatedParent);

  return componentsWithUpdatedParent.concat(newComponent);
};

const deleteComponent = (id: string, components: ComponentInstance[]) => {
  return components
    .filter((currentComponent) => {
      // Delete component
      // delete component's children
      return currentComponent?.parentId !== id && currentComponent?.id !== id;
    })
    .map((currentComponent) => {
      // Delete as child reference
      if (currentComponent.children.includes(id)) {
        return {
          ...currentComponent,
          children: currentComponent.children.filter(
            (childId) => childId !== id
          ),
        };
      }

      return currentComponent;
    });
};

const getComponentsById = (ids: string[], components: ComponentInstance[]) =>
  ids
    .map((id) => getComponentById(id, components))
    .filter(Boolean) as ComponentInstance[];

const LayoutReducer = (state: LayoutState, action: LayoutAction) => {
  switch (action.type) {
    case LayoutActionType.SELECT_COMPONENT:
      return { ...state, selectedComponent: action.payload };

    case LayoutActionType.DESELECT_ALL_COMPONENTS:
      return { ...state, selectedComponent: null };

    case LayoutActionType.ADD_COMPONENT:
      const newLayout = {
        ...state.layout,
        components: addComponent({
          ...action.payload,
          components: state.layout.components,
        }),
      };
      return {
        ...state,
        layout: newLayout,
      };

    case LayoutActionType.UPDATE_COMPONENT:
      const layout = {
        ...state.layout,
        components: replaceComponent(action.payload, state.layout.components),
      };
      return { ...state, layout };

    case LayoutActionType.DELETE_COMPONENT:
      return {
        ...state,
        layout: {
          ...state.layout,
          components: deleteComponent(action.payload, state.layout.components),
        },
      };

    // case LayoutActionType.MOVE_COMPONENT:
    //   return { ...state, selectedComponent: action.payload };

    default:
      return state;
  }
};

export const LayoutEditorProvider: FC<{ initialLayout: LayoutInstance }> = ({
  children,
  initialLayout,
}) => {
  const [{ layout, selectedComponent }, dispatch] = useReducer(LayoutReducer, {
    selectedComponent: null,
    layout: initialLayout,
  });

  const context: LayoutEditorContext = useMemo(
    () => ({
      layout,
      selectedComponent,
      selectComponent: (componentId) => {
        dispatch({
          type: LayoutActionType.SELECT_COMPONENT,
          payload: componentId,
        });
      },
      deselectAllComponents: () => {
        dispatch({
          type: LayoutActionType.DESELECT_ALL_COMPONENTS,
        });
      },
      addComponent: (payload) => {
        dispatch({
          type: LayoutActionType.ADD_COMPONENT,
          payload,
        });
      },
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
      getComponentById: (id: string) => getComponentById(id, layout.components),
      getComponentsById: (ids: string[]) =>
        getComponentsById(ids, layout.components),
    }),
    [layout, selectedComponent, dispatch]
  );
  return (
    <layoutEditorContext.Provider value={context}>
      {children}
    </layoutEditorContext.Provider>
  );
};

export const useLayoutEditor = () => {
  return useContext(layoutEditorContext);
};
