# Deployment Notes

CipherNet is ready to connect to Midnight preview or preprod.

## Steps

- Run `npm run compile:managed` after the Midnight toolchain is available.
- Replace the tracked managed manifest with actual generated contract artifacts.
- Set `MIDNIGHT_NETWORK`, `MIDNIGHT_CONTRACT_ADDRESS`, and RPC URLs in `.env.local`.
- Verify the contract and frontend locally before publishing.
- Deploy the frontend to your preferred hosting platform.

## Goal

The submission is designed to prove the confidential credential model first, then expand once the Midnight deployment path is confirmed.
