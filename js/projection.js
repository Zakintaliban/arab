// Conic equal-area projection matching the one tools/build-geo.mjs used
// (d3-geo's geoConicEqualArea), so cities and landmarks given in lat/lon
// land exactly on the pre-projected map outlines.
const RAD = Math.PI / 180;

export function makeProjection({ parallels, rotate, center = [0, 0], scale, translate }) {
  const sy0 = Math.sin(parallels[0] * RAD);
  const n = (sy0 + Math.sin(parallels[1] * RAD)) / 2;
  const c = 1 + sy0 * (2 * n - sy0);
  const r0 = Math.sqrt(c) / n;
  const raw = (lambda, phi) => {
    const r = Math.sqrt(c - 2 * n * Math.sin(phi)) / n;
    return [r * Math.sin(lambda * n), r0 - r * Math.cos(lambda * n)];
  };
  const [cx, cy] = raw(center[0] * RAD, center[1] * RAD);
  return function project([lat, lon]) {
    let lambda = (lon + rotate[0]) * RAD;
    if (lambda > Math.PI) lambda -= 2 * Math.PI;
    else if (lambda < -Math.PI) lambda += 2 * Math.PI;
    const [x, y] = raw(lambda, lat * RAD);
    return [translate[0] + scale * (x - cx), translate[1] - scale * (y - cy)];
  };
}
