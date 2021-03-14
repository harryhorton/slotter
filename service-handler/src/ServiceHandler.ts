// export interface ServiceType {
//   id: string;
// }

import { RuntimeService, Service, ServiceInstanceConfig } from "./types";
import { createRuntimeService } from "./utils";

// export interface ServiceInstance {
//   id: string;
//   serviceType: string;
//   config: Record<string, any>;
// }

// export interface Service extends ServiceInstance {}

/**
 *
 * Service
 * Service Instance
 *
 * Services can be class or object
 *
 *
 */

function cloneObject<T extends object>(obj: T): T {
  var clone: any = {};
  for (var i in obj) {
    if (typeof obj[i] == "object" && obj[i] != null)
      clone[i] = cloneObject(obj[i] as any);
    else clone[i] = obj[i];
  }
  return clone;
}

export class ServiceHandler {
  private serviceTypes: Service[] = [];
  private serviceInstanceConfigs: ServiceInstanceConfig[] = [];
  private services: Service[] = [];
  // private runtimes:

  registerServiceType(serviceType: Service) {
    if (this.getServiceType(serviceType.serviceType)) {
      throw new Error(
        `ServiceType with id ${serviceType.serviceType} has already been registered`
      );
    }

    this.serviceTypes = [...this.serviceTypes, serviceType];
  }
  registerServiceInstanceConfig(instanceConfig: ServiceInstanceConfig) {
    if (this.getServiceInstanceConfig(instanceConfig.id)) {
      throw new Error(
        `ServiceInstance with id ${instanceConfig.id} has already been registered`
      );
    }

    this.serviceInstanceConfigs = [
      ...this.serviceInstanceConfigs,
      instanceConfig,
    ];
  }

  // registerRuntime(id: string, runtime: Service){
  //   if(this)
  // };

  initializeService(instanceId: string) {
    const instance = this.getServiceInstanceConfig(instanceId);
    if (!instance) {
      throw new Error(
        `ServiceInstance with id ${instanceId} has not been registered`
      );
    }

    const serviceType = this.getServiceType(instance.serviceType);
    if (!serviceType) {
      throw new Error(
        `Service Type with id ${instance.serviceType} has not been registered`
      );
    }

    if (this._getService(instance.id)) {
      throw new Error(
        `Service with id ${instance.id} has already been registered`
      );
    }

    const newService = cloneObject(serviceType);
    newService.id = instance.id;
    newService.config = cloneObject(instance.config);

    this.services = [...this.services, newService];
  }

  getServiceType(service: string | Service) {
    let serviceId = typeof service === "string" ? service : service.serviceType;

    return this.serviceTypes.find((iter) => iter.serviceType === serviceId);
  }
  getServiceInstanceConfig(id: string) {
    return this.serviceInstanceConfigs.find((iter) => iter.id === id);
  }

  /**
   * ## Internal
   *
   * Gets a service without mutating method calls.
   * @deprecated
   */
  _getService<T extends Service = Service>(id: string): T | undefined {
    return this.services.find((iter) => iter.id === id) as T | undefined;
  }

  /**
   * Retrieves a service instance.
   *
   * This allows for getting a service for direct usage in code.
   *
   * Pass the service type as a generic to get full typing.
   * ```typescript
   * serviceHandler.getService<TheServiceType>('the_service_instance)id')
   * ```
   */
  getService<T extends Service = Service>(id: string): RuntimeService<T> {
    const service = this.services.find((iter) => iter.id === id);
    if (!service) throw new Error("service not found");

    const setServiceState = () => {
      const service = this.services.find((iter) => iter.id === id);
      if (!service) throw new Error("service not found");

      const { methods, ...context } = service;

      return {
        ...context,
        setState: (state: Partial<Service["state"]>) => {
          const service = this.services.find((iter) => iter.id === id);
          if (!service) throw new Error("service not found");

          Object.assign(service.state, { ...service.state, ...state });
          return service.state;
        },
      };
    };

    return createRuntimeService(service, setServiceState) as RuntimeService<T>;
  }
}
