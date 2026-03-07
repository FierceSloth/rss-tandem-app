import { messages } from '@common/constants/messages';

export function createSvgComponent(rawSvg: string): SVGSVGElement {
  const parser = new DOMParser();

  const htmlDocument = parser.parseFromString(rawSvg, 'text/html');
  const svgNode = htmlDocument.querySelector('svg');

  if (!svgNode) {
    throw new Error(messages.errors.svgNotFound);
  }

  const maliciousScripts = svgNode.querySelectorAll('script');
  maliciousScripts.forEach((script) => script.remove());

  return svgNode;
}
