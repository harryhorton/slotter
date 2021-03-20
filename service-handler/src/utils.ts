import {
  RuntimeService,
  Service,
  ServiceContext,
  ServiceLifeCylceHook,
  ServiceMethods,
} from "./types";

export const createServiceType = <
  State extends Service["state"],
  Config extends Service["config"],
  InstanceVariables extends Service["instanceVariables"],
  Methods extends ServiceMethods<State, Config, InstanceVariables>,
  ServiceType extends string
>(service: {
  serviceType: ServiceType;
  state?: State;
  config?: Config;
  methods?: Methods;
  instanceVariables?: InstanceVariables;
  onStart?: ServiceLifeCylceHook<State, Config, InstanceVariables>;
  beforeStop?: ServiceLifeCylceHook<State, Config, InstanceVariables>;
  onStop?: ServiceLifeCylceHook<State, Config, InstanceVariables>;
}) => ({
  config: {} as Config,
  methods: {} as Methods,
  state: {} as State,
  instanceVariables: {} as InstanceVariables,
  onStart: () => {},
  beforeStop: () => {},
  onStop: () => {},
  ...service,
});

export const createRuntimeService = <T extends Service<any>>(
  service: T,
  getContext: () => ServiceContext<
    T["state"],
    T["config"],
    T["instanceVariables"]
  >
): RuntimeService<T> => {
  return {
    ...service,
    methods: Object.keys(service.methods).reduce((prev, key) => {
      prev[key] = (...args: any[]) =>
        service.methods[key](getContext(), ...args);
      return prev;
    }, {} as any),
  };
};
