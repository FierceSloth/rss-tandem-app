export function maskIp(ip: string): string {
  const octetRange = 2;
  return ip
    .split('.')
    .map((octet, index) => (index === 1 || index === octetRange ? octet.replaceAll(/\d/g, 'x') : octet))
    .join('.');
}
