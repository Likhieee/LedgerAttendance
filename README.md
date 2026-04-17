# ChainAttend - Blockchain Attendance System

## SETUP STEPS (do in order)

### 1. Open .env file and fill in your keys:
```
ALCHEMY_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_metamask_private_key
```

### 2. Open terminal in VS Code and run:
```
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

### 3. After deploying:
- A file called deployment.json will be created
- Copy the contractAddress from that file
- Open ChainAttend.html in browser
- Click Connect Wallet
- Paste the contract address when asked

## DONE! Your attendance is now on the blockchain!
