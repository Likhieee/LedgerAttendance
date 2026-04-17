require("dotenv").config();
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

async function getContract() {
    const signer = await provider.getSigner();

    // ✅ Minimal ABI (only what we need)
    const abi = [
        "function markAttendance(string srn, string studentName, string subject, string session, string date, bool present)"
    ];

    return new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        abi,
        signer
    );
}

// ✅ FIXED FUNCTION
async function markOnBlockchain(data) {
    const contract = await getContract();

    const tx = await contract.markAttendance(
        data.srn,
        data.studentName,
        data.subject,
        data.session,
        data.date,
        data.present
    );

    await tx.wait();

    return tx.hash;
}

module.exports = { markOnBlockchain };