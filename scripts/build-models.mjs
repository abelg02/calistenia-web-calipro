// Builds the SAMPLE 3D merch models (procedural, no external assets) into public/models/*.glb.
// They are placeholders until the real merch products and their 3D models exist.
// Run: node scripts/build-models.mjs
import { writeFileSync, readFileSync } from "node:fs";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// GLTFExporter uses the browser FileReader to pack the binary buffer.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => { this.result = buf; this.onloadend?.(); this.onload?.({ target: this }); });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = `data:${blob.type || "application/octet-stream"};base64,${Buffer.from(buf).toString("base64")}`;
      this.onloadend?.(); this.onload?.({ target: this });
    });
  }
};

const font = new FontLoader().parse(
  JSON.parse(readFileSync(new URL("./fonts/helvetiker_bold.typeface.json", import.meta.url), "utf8")),
);

// Brand materials: powder-coated black steel, brushed gold, rubber.
const steel = new THREE.MeshStandardMaterial({ name: "powder-black", color: 0x17171a, metalness: 0.6, roughness: 0.45 });
const gold = new THREE.MeshStandardMaterial({ name: "brushed-gold", color: 0xc8a04a, metalness: 1, roughness: 0.3 });
const rubber = new THREE.MeshStandardMaterial({ name: "rubber", color: 0x0c0c0d, metalness: 0, roughness: 0.9 });
const grip = new THREE.MeshStandardMaterial({ name: "grip", color: 0x232326, metalness: 0.1, roughness: 0.85 });

function tube(points, radius, material) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), false, "catmullrom", 0.05);
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 96, radius, 24, false), material);
}

function cyl(r, h, material, pos, rot = [0, 0, 0]) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 32), material);
  m.position.set(...pos);
  m.rotation.set(...rot);
  return m;
}

function text(str, size, material) {
  const g = new TextGeometry(str, { font, size, depth: size * 0.18, curveSegments: 6, bevelEnabled: false });
  g.center();
  return new THREE.Mesh(g, material);
}

// One parallette: U-shaped tube (legs + grip bar) standing on two T-feet.
function parallette(x) {
  const g = new THREE.Group();
  const W = 0.5, H = 0.3, R = 0.017;
  g.add(tube([[-W / 2, 0.02, 0], [-W / 2, H - 0.05, 0], [-W / 2 + 0.05, H, 0], [W / 2 - 0.05, H, 0], [W / 2, H - 0.05, 0], [W / 2, 0.02, 0]], R, steel));
  // grip sleeve + gold rings
  g.add(cyl(R * 1.25, 0.26, grip, [0, H, 0], [0, 0, Math.PI / 2]));
  for (const gx of [-0.135, 0.135]) g.add(cyl(R * 1.4, 0.012, gold, [gx, H, 0], [0, 0, Math.PI / 2]));
  // feet
  for (const fx of [-W / 2, W / 2]) {
    g.add(cyl(R, 0.26, steel, [fx, 0.02, 0], [Math.PI / 2, 0, 0]));
    for (const fz of [-0.13, 0.13]) g.add(cyl(R * 1.35, 0.03, rubber, [fx, 0.02, fz], [Math.PI / 2, 0, 0]));
  }
  // gold wordmark running up the front of the right leg
  const label = text("CALIPRO", 0.014, gold);
  label.rotation.z = Math.PI / 2;
  label.position.set(W / 2, 0.14, R + 0.001);
  g.add(label);
  g.position.x = x;
  return g;
}

function parallettes() {
  const scene = new THREE.Scene();
  const root = new THREE.Group();
  root.name = "calipro-parallettes-sample";
  root.add(parallette(-0.001));
  const second = parallette(0);
  second.position.set(0, 0, -0.34);
  root.add(second);
  root.position.z = 0.17;
  scene.add(root);
  return scene;
}

// Lathe-profile bottle with gold cap and band.
function bottle() {
  const scene = new THREE.Scene();
  const root = new THREE.Group();
  root.name = "calipro-bottle-sample";
  const profile = [
    [0, 0], [0.036, 0], [0.04, 0.006], [0.041, 0.02], [0.041, 0.19], [0.039, 0.205],
    [0.03, 0.222], [0.021, 0.232], [0.02, 0.24], [0, 0.24],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  root.add(new THREE.Mesh(new THREE.LatheGeometry(profile, 96), steel));
  root.add(cyl(0.0215, 0.028, gold, [0, 0.254, 0]));
  root.add(cyl(0.012, 0.012, gold, [0, 0.274, 0]));
  root.add(cyl(0.0415, 0.012, gold, [0, 0.05, 0]));
  root.add(cyl(0.0415, 0.004, gold, [0, 0.07, 0]));
  // vertical gold wordmark
  const label = text("CALIPRO", 0.016, gold);
  label.rotation.z = Math.PI / 2;
  label.position.set(0, 0.135, 0.041);
  root.add(label);
  scene.add(root);
  return scene;
}

async function exportGlb(scene, file) {
  const glb = await new GLTFExporter().parseAsync(scene, { binary: true });
  writeFileSync(file, Buffer.from(glb));
  console.log(`${file} ${(glb.byteLength / 1024).toFixed(0)}KB`);
}

await exportGlb(parallettes(), "public/models/paralelas-muestra.glb");
await exportGlb(bottle(), "public/models/bidon-muestra.glb");
