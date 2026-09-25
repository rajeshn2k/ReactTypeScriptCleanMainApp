/*PORT - is configured in vite.config.ts (default 4000)*/
export const Environments = {
  NODE_ENV: import.meta.env.MODE,
  PORT: 4000, // Vite port configured in vite.config.ts
  currentConfiguration: import.meta.env.VITE_CURRENTCONFIGURATION ? import.meta.env.VITE_CURRENTCONFIGURATION : "",
  
  apiBookEndPoint: import.meta.env.VITE_APIBOOKENDPOINT ? import.meta.env.VITE_APIBOOKENDPOINT : "",
  apiPersonEndPoint: import.meta.env.VITE_APIPERSONENDPOINT ? import.meta.env.VITE_APIPERSONENDPOINT : "",
};
