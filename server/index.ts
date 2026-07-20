import cors from 'cors';
import express from 'express';
import { z } from 'zod';
import { createPublicLedgerRecord, hashPublicRecord } from '../lib/cipher';

const app = express();
const port = Number(process.env.PORT ?? 4000);

const forbiddenPrivateFields = [
  'credential',
  'document',
  'documentBytes',
  'metadata',
  'ownerSecret',
  'privateKey',
  'privateWitness',
  'rawCredential',
  'signature',
  'subject',
  'witnessNonce'
];

const publicRecordSchema = z
  .object({
    credentialHash: z.string().min(1),
    issuer: z.string().min(1),
    timestamp: z.string().min(1)
  })
  .strict();

app.use(cors());
app.use(express.json({ limit: '32kb' }));

app.get('/health', (_request, response) => {
  response.json({ ok: true, service: 'ciphernet-public-record-server', timestamp: new Date().toISOString() });
});

app.post('/api/public-record/hash', async (request, response) => {
  const receivedFields = Object.keys((request.body ?? {}) as Record<string, unknown>);
  const leakedField = receivedFields.find((field) => forbiddenPrivateFields.includes(field));

  if (leakedField) {
    response.status(400).json({ error: `Private field "${leakedField}" must never be sent to the backend.` });
    return;
  }

  const parsed = publicRecordSchema.safeParse(request.body);

  if (!parsed.success) {
    response.status(400).json({ error: 'Expected only credentialHash, issuer, and timestamp.' });
    return;
  }

  try {
    const publicRecord = createPublicLedgerRecord(parsed.data);
    response.json({ publicRecord, publicRecordHash: await hashPublicRecord(publicRecord) });
  } catch (error) {
    response.status(400).json({ error: error instanceof Error ? error.message : 'Invalid public record.' });
  }
});

app.listen(port, () => {
  process.stdout.write(`CipherNet public record server listening on http://localhost:${port}\n`);
});
