import { ServiceHandler } from "./ServiceHandler";
import { createServiceType } from "./utils";

export const storeService = createServiceType({
  serviceType: "store",
  config: {
    value: true,
  },
  state: {
    value: null as string | null,
  },
  methods: {
    get({ state, config }) {
      return state.value;
    },
    set: ({ setState }, value: string) => setState({ value }),
  },
});

type StoreService = typeof storeService;

describe("ServiceHandler", () => {
  it("should", () => {
    const serviceHandler = new ServiceHandler();

    serviceHandler.registerServiceType(storeService);

    serviceHandler.registerServiceInstanceConfig({
      id: "store1",
      serviceType: "store",
      config: {},
    });
    serviceHandler.registerServiceInstanceConfig({
      id: "store2",
      serviceType: "store",
      config: {},
    });

    serviceHandler.initializeService("store1");
    serviceHandler.initializeService("store2");

    const service1 = serviceHandler.getService<StoreService>("store1");
    const service1Again = serviceHandler.getService<StoreService>("store1");
    const service2 = serviceHandler.getService<StoreService>("store2");

    expect(service1.methods.get()).toBe(null);
    service1.methods.set("value");
    expect(service1.methods.get()).toBe("value");
    expect(service2.methods.get()).toBe(null);
    expect(service1Again.methods.get()).toBe("value");
  });
});
