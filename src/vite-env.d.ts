/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CURRENTCONFIGURATION: string;
  readonly VITE_GRAPHQLAPIENDPOINT: string;
  readonly VITE_APIBOOKENDPOINT: string;
  readonly VITE_APIPERSONENDPOINT: string;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
