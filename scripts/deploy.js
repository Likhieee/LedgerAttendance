const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("\n Deploying ChainAttend Contract...\n");

  const [deployer] = await hre.ethers.getSigners();
  const balance = await hre.ethers.provider.getBalance(deployer.address);

  console.log("Network   :", hre.network.name);
  console.log("Deployer  :", deployer.address);
  console.log("Balance   :", hre.ethers.formatEther(balance), "ETH\n");

  if (balance === 0n) {
    console.error("ERROR: Wallet has 0 ETH!");
    console.error("Get free Sepolia ETH from: https://cloud.google.com/application/web3/faucet/ethereum/sepolia");
    process.exit(1);
  }

  const Attendance = await hre.ethers.getContractFactory("Attendance");
  const contract = await Attendance.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("Contract deployed at:", address);

  // Save to deployment.json
  const info = {
    network: hre.network.name,
    contractAddress: address,
    deployer: deployer.address,
    deployedAt: new Date().toISOString()
  };

  fs.writeFileSync("deployment.json", JSON.stringify(info, null, 2));
  console.log("\nSaved to deployment.json");

  // Save ABI for frontend
  const artifact = JSON.parse(
    fs.readFileSync(
      `artifacts/contracts/Attendance.sol/Attendance.json`,
      "utf8"
    )
  );
  fs.writeFileSync(
    "Attendance_ABI.json",
    JSON.stringify(artifact.abi, null, 2)
  );
  console.log("ABI saved to Attendance_ABI.json");

  if (hre.network.name === "sepolia") {
    console.log("\nView on Etherscan:");
    console.log("https://sepolia.etherscan.io/address/" + address);
  }

  console.log("\nDONE! Copy the contract address above into ChainAttend.html\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
