import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import { evaluateWorkflow } from './runtime.mjs'

const MAX_BODY_BYTES = 8 * 1024

function sendJson(response, status, body) {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'content-security-policy': "default-src 'none'",
    'x-content-type-options': 'nosniff',
  })
  response.end(JSON.stringify(body))
}

async function readJson(request) {
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (Buffer.byteLength(body) > MAX_BODY_BYTES) throw new RangeError('body_too_large')
  }
  try {
    return JSON.parse(body || '{}')
  } catch {
    throw new SyntaxError('invalid_json')
  }
}

export function createAppServer() {
  return createServer(async (request, response) => {
    const url = new URL(request.url ?? '/', 'http://localhost')

    if (request.method === 'GET' && (url.pathname === '/healthz' || url.pathname === '/readyz')) {
      sendJson(response, 200, { status: 'ok', sourceState: 'REHEARSAL' })
      return
    }

    if (request.method === 'POST' && url.pathname === '/api/v1/workflows/run') {
      if (!String(request.headers['content-type'] ?? '').toLowerCase().startsWith('application/json')) {
        sendJson(response, 415, { error: 'content_type_must_be_application_json' })
        return
      }
      try {
        sendJson(response, 200, evaluateWorkflow(await readJson(request)))
      } catch (error) {
        if (error instanceof RangeError) sendJson(response, 413, { error: 'body_too_large' })
        else if (error instanceof SyntaxError) sendJson(response, 400, { error: 'invalid_json' })
        else sendJson(response, 400, { error: 'unsupported_scenario' })
      }
      return
    }

    sendJson(response, 404, { error: 'not_found' })
  })
}

const isEntryPoint = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isEntryPoint) {
  const port = Number.parseInt(process.env.PORT ?? '8080', 10)
  createAppServer().listen(port, '0.0.0.0', () => {
    process.stdout.write(`Agentic AI 101 rehearsal service listening on ${port}\n`)
  })
}

