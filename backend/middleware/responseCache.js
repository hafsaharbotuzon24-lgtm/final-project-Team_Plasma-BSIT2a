const DEFAULT_TTL_MS = 30 * 1000;
const MAX_CACHE_ENTRIES = 500;

const cacheStore = new Map();

function buildCacheKey(req) {
  const authHeader = String(req.headers.authorization || '');
  const authToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : '';
  const identityKey = authToken || req.player?.id || 'guest';
  return `${req.method}:${req.originalUrl}:u=${identityKey}`;
}

function pruneExpiredEntries(now) {
  for (const [key, value] of cacheStore.entries()) {
    if (value.expiresAt <= now) {
      cacheStore.delete(key);
    }
  }
}

function pruneOverflowEntries() {
  if (cacheStore.size <= MAX_CACHE_ENTRIES) return;
  const overflow = cacheStore.size - MAX_CACHE_ENTRIES;
  const oldestKeys = cacheStore.keys();
  for (let i = 0; i < overflow; i += 1) {
    const next = oldestKeys.next();
    if (next.done) break;
    cacheStore.delete(next.value);
  }
}

function responseCache(ttlSeconds = 30) {
  const ttlMs = Number.isFinite(ttlSeconds) && ttlSeconds > 0
    ? ttlSeconds * 1000
    : DEFAULT_TTL_MS;

  return (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const shouldBypass =
      String(req.query?.cache || '').toLowerCase() === 'false' ||
      req.headers['cache-control'] === 'no-cache';

    if (shouldBypass) {
      return next();
    }

    const now = Date.now();
    pruneExpiredEntries(now);

    const key = buildCacheKey(req);
    const cached = cacheStore.get(key);

    if (cached && cached.expiresAt > now) {
      res.set('X-Cache', 'HIT');
      return res.status(cached.status).json(cached.payload);
    }

    const originalJson = res.json.bind(res);
    res.json = (payload) => {
      cacheStore.set(key, {
        status: res.statusCode,
        payload,
        expiresAt: Date.now() + ttlMs,
      });
      pruneOverflowEntries();
      res.set('X-Cache', 'MISS');
      return originalJson(payload);
    };

    return next();
  };
}

module.exports = responseCache;
