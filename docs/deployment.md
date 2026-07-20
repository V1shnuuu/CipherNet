# Deployment Notes

CipherNet is ready to connect to Midnight preview or preprod.

## Local Checklist

1. Run `npm install`.
2. Run `npm run compile:managed` to regenerate the managed manifest and the circuit/key placeholders.
3. Run `npm test` and `npm run build` before you package the submission.
4. Set `MIDNIGHT_NETWORK`, `MIDNIGHT_CONTRACT_ADDRESS`, and any RPC credentials in `.env.local`.

## Preview or Preprod

1. Publish the Midnight contract package.
2. Capture the deployed contract address from the preview or preprod deployment.
3. Run `npm run deploy:preview` and confirm the address appears in the output.
4. Deploy the frontend and point it at the deployed contract address.

## Evidence to Capture

- A successful compact compile output listing the circuits.
- A deployment log or screen capture showing the contract address.
- A live frontend screenshot connected to the preview or preprod contract.

## Goal

The submission is designed to prove the confidential credential model first, then expand once the Midnight deployment path is confirmed.
