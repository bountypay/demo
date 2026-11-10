# tool

## About this repository

`tool` is a small build CLI written in TypeScript. This is the demo repository for [BountyPay](https://github.com/mohammedfirdouss/bountypay) (live at https://bountypay.onrender.com): issues here carry `bounty:<usd>` labels, and the bounties pay PayPal sandbox test money only. No real money changes hands.

## Usage

```sh
npm install && npm run build
tool build
```

`tool build` reads `tool.json` from the current directory and writes one file per target into `outDir`.
