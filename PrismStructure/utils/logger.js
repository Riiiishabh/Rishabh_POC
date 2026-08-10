const REDACTED_KEYS = /authorization|password|token|secret/i;

function redact(value) {
  if (Array.isArray(value)) {
    return value.map(redact);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        REDACTED_KEYS.test(key) ? '[REDACTED]' : redact(entry),
      ]),
    );
  }

  return value;
}

function write(level, message, context = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...redact(context),
  };

  console.log(JSON.stringify(payload));
}

module.exports = {
  error: (message, context) => write('error', message, context),
  info: (message, context) => write('info', message, context),
};
