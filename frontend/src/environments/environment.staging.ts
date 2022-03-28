export const environment = {
    production: false,
    preProduction: false,
    staging: true,
    apiUrl: "http://slnxtest01:5020/api/",
    apiInterfaceUrl: "http://slnxtest01:5021/interfaces/",
    serialApiUrl: "http://localhost:8080/serialapi/",
    apiIpad: "http://ipadwebservices/empleadosws/ServiceSvc.svc/",
    version: `${require('../../package.json').version}-sta`
};
