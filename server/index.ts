import cors from 'cors';
import express from 'express';
import { hashCredential } from '../lib/cipher';

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_request, response) => {
  response.json({ ok: true, service: 'ciphernet-proof-server', timestamp: new Date().toISOString() });
});

app.post('/api/hash', async (request, response) => {
  const credential = request.body as {
    credentialType?: string;
    issuer?: string;
    subject?: string;
    issuedAt?: string;
    documentHash?: string;
  };

  if (!credential.credentialType || !credential.issuer || !credential.subject || !credential.issuedAt || !credential.documentHash) {
    response.status(400).json({ error: 'Missing credential fields.' });
    return;
  }

  const credentialHash = await hashCredential({
    credentialType: credential.credentialType,
    issuer: credential.issuer,
    subject: credential.subject,
    issuedAt: credential.issuedAt,
    documentHash: credential.documentHash
  });

  response.json({ credentialHash });
});

app.listen(port, () => {
  process.stdout.write(`CipherNet proof server listening on http://localhost:${port}\n`);
});
