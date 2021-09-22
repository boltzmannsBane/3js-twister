import glsl from "babel-plugin-glsl/macro";

export const vertex = glsl`
varying vec3 vNormal;
  
uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;

#pragma glslify: pnoise = require(glsl-noise/periodic/3d)

void main() {
  float t = uTime * uSpeed;
  float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;

  vec3 pos = position + (normal * distortion);
  
  vNormal = normal;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
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
