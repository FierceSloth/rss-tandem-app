interface ImportMetaEnvironment {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly BASE_URL: string;
  readonly VITE_IP_SERVICE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnvironment;
}
