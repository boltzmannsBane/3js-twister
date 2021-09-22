import glsl from "babel-plugin-glsl/macro";
import * as THREE from "three";

const settings = {
  speed: 0.2,
  density: 1.5,
  strength: 0.2,
};

export const uniforms = {
  uTime: { value: 0 },
  uSpeed: { value: settings.speed },
  uNoiseDensity: { value: settings.density },
  uNoiseStrength: { value: settings.strength },
};

export const vertex = glsl`
varying vec3 vNormal;

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;

#pragma glslify: pnoise = require(glsl-noise/periodic/3d)

void main() {
  float t = uTime * uSpeed;
  // You can also use classic perlin noise or simplex noise,
  // I'm using its periodic variant out of curiosity
  float distortion = pnoise((normal + t), vec3(10.0) * uNoiseDensity) * uNoiseStrength;

  // Disturb each vertex along the direction of its normal
  vec3 pos = position + (normal * distortion);

  vNormal = normal;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragment = glsl`
varying vec3 vNormal;
  
uniform float uTime;

void main() {
  vec3 color = vec3(1.0);
  
  gl_FragColor = vec4(vNormal, 1.0);
}  
  `;
