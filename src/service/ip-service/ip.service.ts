import { fetchIpAddress } from '@/api/ip/ip.api';

export async function getIpAddress(): Promise<string> {
  const response = await fetchIpAddress();
  const data: { ip: string } = await response.json();
  return data.ip;
}
