import type { Component } from '@/components/base/component';

const MAX_ROTATION = 10;
const HALF = 2;

export const addHoverAnimation = (target: Component): void => {
  const node = target.node;
  let animationFrameId: number | null = null;

  node.addEventListener('mousemove', (event) => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / HALF;
      const centerY = rect.height / HALF;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const rotateX = -(percentY * MAX_ROTATION);
      const rotateY = percentX * MAX_ROTATION;

      node.style.transition = 'transform 0.1s ease-out';
      node.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      animationFrameId = null;
    });
  });

  node.addEventListener('mouseleave', () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    node.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    node.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
  });
};
