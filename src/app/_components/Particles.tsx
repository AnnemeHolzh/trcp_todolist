"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { ISourceOptions, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export default function ParticlesComponent() {
  // @ts-ignore - Known type mismatch between tsparticles versions
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        particles: {
          color: {
            value: ["#FF69B4", "#87CEEB", "#98FB98", "#DDA0DD"],
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}