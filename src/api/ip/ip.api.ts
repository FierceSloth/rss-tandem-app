const ipUrl = import.meta.env.VITE_IP_SERVICE_API;

export async function fetchIpAddress(): Promise<Response> {
  const response = await fetch(ipUrl);
  return response;
}
