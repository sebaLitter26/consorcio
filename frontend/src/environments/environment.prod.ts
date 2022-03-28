export const environment = {
  production: true,
  preProduction: false,
  staging: false,
  apiUrl: "http://slnxdock01:5020/api/",
  apiInterfaceUrl: "http://slnxdock01:5021/interfaces/",
  serialApiUrl: "http://localhost:8080/serialapi/",
  apiIpad: "http://ipadwebservices/empleadosws/ServiceSvc.svc/",
  version: `${require('../../package.json').version}`
};
