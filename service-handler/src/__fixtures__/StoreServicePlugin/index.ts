import { createRuntimeService, createServiceType } from "../../utils";

export const storeService = createServiceType({
  serviceType: "store",
  config: {},
  state: {
    value: null as string | null,
  },
  methods: {
    get({ state }) {
      return state.value;
    },
    set: ({ setState }, value: string) => setState({ value }),
  },
});

export const runtimeService = createRuntimeService(storeService, () => {
  const { methods, ...context } = storeService;
  return { ...context, setState: () => context.state };
});

runtimeService.methods.get();
runtimeService.methods.set("newValue");
