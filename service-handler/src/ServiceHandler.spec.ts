import { ServiceHandler } from "./ServiceHandler";
import { createServiceType } from "./utils";

export const storeService = createServiceType({
  serviceType: "store",
  config: {
    value1: true,
    value2: true,
  },
  state: {
    value: null as string | null,
  },
  methods: {
    get({ state, config }) {
      return state.value;
    },
    set: ({ setState }, value: string) => setState({ value }),
    getConfig({ config }) {
      return config;
    },
    getService: ({ serviceHandler }, id: string) =>
      serviceHandler.getService(id),
  },
});

type StoreService = typeof storeService;

describe("ServiceHandler", () => {
  it("should register service type", () => {
    const serviceHandler = new ServiceHandler();
    serviceHandler.registerServiceType(storeService);

    expect(
      serviceHandler.getServiceType(storeService.serviceType)
    ).toMatchObject(storeService);
  });

  it("should register instance config", () => {
    const serviceHandler = new ServiceHandler();
    serviceHandler.registerServiceType(storeService);

    const instanceConfig = {
      id: "store1",
      serviceType: "store",
      config: {},
    };

    serviceHandler.registerServiceInstanceConfig(instanceConfig);
    expect(
      serviceHandler.getServiceInstanceConfig(instanceConfig.id)
    ).toMatchObject(instanceConfig);
  });

  it("shouldn't initialize service immediately", () => {
    const serviceHandler = new ServiceHandler();
    serviceHandler.registerServiceType(storeService);

    serviceHandler.registerServiceInstanceConfig({
      id: "store1",
      serviceType: "store",
      config: {},
    });
    // serviceHandler.initializeService("store1");
    expect(() => serviceHandler.getService("store1")).toThrow();
  });

  it("should initialize service", () => {
    const serviceHandler = new ServiceHandler();
    serviceHandler.registerServiceType(storeService);

    serviceHandler.registerServiceInstanceConfig({
      id: "store1",
      serviceType: "store",
      config: {},
    });
    serviceHandler.initializeService("store1");

    const service1 = serviceHandler.getService<StoreService>("store1");

    expect(service1.serviceType).toBe("store");
  });

  it("should allow external method calls without context", () => {
    const serviceHandler = new ServiceHandler();
    serviceHandler.registerServiceType(storeService);

    serviceHandler.registerServiceInstanceConfig({
      id: "store1",
      serviceType: "store",
      config: {},
    });

    serviceHandler.initializeService("store1");

    const service1 = serviceHandler.getService<StoreService>("store1");

    expect(service1.methods.get()).toBe(null);
    service1.methods.set("value");
    expect(service1.methods.get()).toBe("value");
  });
  it("should get same instance of service by id, but not same object", () => {
    const serviceHandler = new ServiceHandler();
    serviceHandler.registerServiceType(storeService);

    serviceHandler.registerServiceInstanceConfig({
      id: "store1",
      serviceType: "store",
      config: {},
    });

    serviceHandler.initializeService("store1");

    const service1 = serviceHandler.getService<StoreService>("store1");
    const service1Again = serviceHandler.getService<StoreService>("store1");
    expect(service1).not.toBe(service1Again);

    expect(service1.methods.get()).toBe(null);
    expect(service1Again.methods.get()).toBe(null);
    service1.methods.set("value");
    expect(service1.methods.get()).toBe("value");
    expect(service1Again.methods.get()).toBe("value");
  });

  it("should allow separate instances of the same service", () => {
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

  it("should merge default and set configs", () => {
    const serviceHandler = new ServiceHandler();
    serviceHandler.registerServiceType(storeService);

    serviceHandler.registerServiceInstanceConfig({
      id: "store1",
      serviceType: "store",
      config: {
        value2: false,
      },
    });

    serviceHandler.initializeService("store1");

    const service1 = serviceHandler.getService<StoreService>("store1");

    expect(service1.methods.getConfig()).toMatchObject({
      value1: true,
      value2: false,
    });
  });

  it("should allow services to inject others", () => {
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

    expect(service1.methods.getService("store2").id).toBe("store2");
  });
  it("should have non-state instance variables", () => {
    const serviceHandler = new ServiceHandler();
    const testServiceType = createServiceType({
      serviceType: "test",
      instanceVariables: {
        value1: true,
        value2: true,
      },
      methods: {
        setInstanceVariables({ setInstanceVariables }) {
          setInstanceVariables({ value2: false });
        },
      },
    });
    serviceHandler.registerServiceType(testServiceType);

    serviceHandler.registerServiceInstanceConfig({
      id: "test",
      serviceType: "test",
    });

    serviceHandler.initializeService("test");

    const service = serviceHandler.getService<typeof testServiceType>("test");

    expect(service.instanceVariables).toMatchObject({
      value1: true,
      value2: true,
    });
    service.methods.setInstanceVariables();
    expect(service.instanceVariables).toMatchObject({
      value1: true,
      value2: false,
    });
  });

  it("should run lifecylce hooks", () => {
    const serviceHandler = new ServiceHandler();
    const testServiceType = createServiceType({
      serviceType: "test",
      instanceVariables: {
        didStart: false,
        beforeStop: false,
        didStop: false,
      },
      onStart: ({ setInstanceVariables }) =>
        setInstanceVariables({ didStart: true }),
      beforeStop: ({ setInstanceVariables }) =>
        setInstanceVariables({ beforeStop: true }),
      onStop: ({ setInstanceVariables }) =>
        setInstanceVariables({ didStop: true }),
    });
    serviceHandler.registerServiceType(testServiceType);

    serviceHandler.registerServiceInstanceConfig({
      id: "test",
      serviceType: "test",
    });

    serviceHandler.initializeService("test");

    const service = serviceHandler.getService<typeof testServiceType>("test");

    expect(service.instanceVariables).toMatchObject({
      value1: true,
      value2: true,
    });
    service.methods.setInstanceVariables();
    expect(service.instanceVariables).toMatchObject({
      value1: true,
      value2: false,
    });
  });
});
