import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BackgroundScene = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(devicePixelRatio);
    container.appendChild(renderer.domElement);

    const createRing = (radius: number, color: number, speed: number) => {
      const geometry = new THREE.TorusGeometry(radius, 0.01, 16, 100);
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2;
      return { mesh: ring, speed };
    };

    const rings = [
      createRing(2, 0x3b82f6, 0.01),
      createRing(2.5, 0x3b82f6, -0.015),
      createRing(3, 0x3b82f6, 0.005),
    ];

    rings.forEach((r) => scene.add(r.mesh));

    const coreGeom = new THREE.SphereGeometry(1, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.1,
      wireframe: true,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    scene.add(core);

    camera.position.z = 5;

    const resizeHandler = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', resizeHandler);

    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      rings.forEach((r) => {
        r.mesh.rotation.x += r.speed;
        r.mesh.rotation.y += r.speed * 0.5;
      });

      core.rotation.y += 0.005;
      core.rotation.x += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeHandler);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.clear();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none opacity-40" style={{ display: 'block' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default BackgroundScene;
