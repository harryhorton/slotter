import { ServiceHandler } from "./ServiceHandler";

type AnyRecord = any;

export type ServiceContext<
  State extends AnyRecord = AnyRecord,
  Config extends AnyRecord = AnyRecord,
  InstanceVariables extends AnyRecord = AnyRecord
> = {
  state: State;
  config: Config;
  id?: string;
  serviceType: string;
  setState: (state: Partial<State>) => State;
  serviceHandler: ServiceHandler;
  instanceVariables: InstanceVariables;
  setInstanceVariables: (
    variables: Partial<InstanceVariables>
  ) => InstanceVariables;
};

export interface ServiceMethods<
  State extends AnyRecord = AnyRecord,
  Config extends AnyRecord = AnyRecord,
  InstanceVariables extends AnyRecord = AnyRecord
> {
  [key: string]: (
    context: ServiceContext<State, Config, InstanceVariables>,
    ...args: any[]
  ) => any;
}

export type ServiceLifeCylceHook<State, Config, InstanceVariables> = (
  context: ServiceContext<State, Config, InstanceVariables>
) => void;
export interface Service<
  State extends AnyRecord = AnyRecord,
  Config extends AnyRecord = AnyRecord,
  InstanceVariables extends AnyRecord = AnyRecord
> {
  id?: string;
  serviceType: string;
  config: Config;
  state: State;
  instanceVariables: InstanceVariables;
  methods: ServiceMethods<State, Config>;
  onStart: ServiceLifeCylceHook<State, Config, InstanceVariables>;
  beforeStop: ServiceLifeCylceHook<State, Config, InstanceVariables>;
  onStop: ServiceLifeCylceHook<State, Config, InstanceVariables>;
}

export type RuntimeServiceMethods<
  T extends Service<any>,
  Methods extends T["methods"] = T["methods"]
> = {
  [Prop in keyof Methods]: (
    ...args: Parameters<Methods[Prop]>[1] extends undefined
      ? []
      : [Parameters<Methods[Prop]>[1]]
  ) => ReturnType<Methods[Prop]>;
};

export type RuntimeService<T extends Service = Service> = Omit<T, "methods"> & {
  methods: RuntimeServiceMethods<T>;
};

export type ServiceInstanceConfig = {
  id: string;
  serviceType: string;
  config: any;
};
