/* eslint-disable no-console */
const { performance } = require('perf_hooks');

const BASE_URL = process.env.BENCH_BASE_URL || 'http://127.0.0.1:5000';
const ITERATIONS = Number(process.env.BENCH_ITERATIONS || 40);
const WARMUP = Number(process.env.BENCH_WARMUP || 8);
const TOKEN = process.env.BENCH_BEARER_TOKEN || '';

const endpointList = (process.env.BENCH_ENDPOINTS || '/api')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

function percentile(numbers, p) {
  if (!numbers.length) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}

async function requestWithTiming(endpoint) {
  const headers = {};
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const started = performance.now();
  const response = await fetch(`${BASE_URL}${endpoint}`, { headers });
  const elapsed = performance.now() - started;

  return {
    status: response.status,
    elapsed,
    cache: response.headers.get('x-cache') || 'N/A',
    serverTiming: response.headers.get('x-response-time') || 'N/A',
  };
}

async function benchmarkEndpoint(endpoint) {
  for (let i = 0; i < WARMUP; i += 1) {
    await requestWithTiming(endpoint);
  }

  const timings = [];
  let statusCode = 0;
  let cacheHits = 0;
  let cacheMisses = 0;
  let sampleResponseTimeHeader = 'N/A';

  for (let i = 0; i < ITERATIONS; i += 1) {
    const result = await requestWithTiming(endpoint);
    statusCode = result.status;
    sampleResponseTimeHeader = result.serverTiming;
    timings.push(result.elapsed);
    if (result.cache === 'HIT') cacheHits += 1;
    if (result.cache === 'MISS') cacheMisses += 1;
  }

  const total = timings.reduce((sum, value) => sum + value, 0);
  const avg = total / timings.length;

  return {
    endpoint,
    statusCode,
    averageMs: Number(avg.toFixed(2)),
    p95Ms: Number(percentile(timings, 95).toFixed(2)),
    minMs: Number(Math.min(...timings).toFixed(2)),
    maxMs: Number(Math.max(...timings).toFixed(2)),
    cacheHits,
    cacheMisses,
    responseTimeHeaderSample: sampleResponseTimeHeader,
  };
}

async function main() {
  console.log(`Benchmark base URL: ${BASE_URL}`);
  console.log(`Iterations: ${ITERATIONS}, Warmup: ${WARMUP}`);
  console.log(`Endpoints: ${endpointList.join(', ')}`);
  console.log('---');

  for (const endpoint of endpointList) {
    // eslint-disable-next-line no-await-in-loop
    const report = await benchmarkEndpoint(endpoint);
    console.log(JSON.stringify(report, null, 2));
  }
}

main().catch((error) => {
  console.error('Benchmark failed:', error.message);
  process.exit(1);
});
