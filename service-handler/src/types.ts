type AnyRecord = any;

export type ServiceContext<
  State extends AnyRecord = AnyRecord,
  Config extends AnyRecord = AnyRecord
> = {
  state: State;
  config: Config;
  id?: string;
  serviceType: string;
  setState: (state: State) => State;
};

export interface ServiceMethods<
  State extends AnyRecord = AnyRecord,
  Config extends AnyRecord = AnyRecord
> {
  [key: string]: (
    context: ServiceContext<State, Config>,
    ...args: any[]
  ) => any;
}

export interface Service<
  State extends AnyRecord = AnyRecord,
  Config extends AnyRecord = AnyRecord
> {
  id?: string;
  serviceType: string;
  config: Config;
  state: State;
  methods: ServiceMethods<State, Config>;
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
