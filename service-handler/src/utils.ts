import {
  RuntimeService,
  Service,
  ServiceContext,
  ServiceMethods,
} from "./types";

export const createServiceType = <
  State extends Service["state"],
  Config extends Service["config"],
  Methods extends ServiceMethods<State, Config>,
  ServiceType extends string
>(service: {
  serviceType: ServiceType;
  state: State;
  config: Config;
  methods: Methods;
}) => ({
  ...service,
});

export const createRuntimeService = <T extends Service<any>>(
  service: T,
  getContext: () => ServiceContext<T["state"], T["config"]>
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
