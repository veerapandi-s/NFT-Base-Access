const { ethers} = require('ethers');

const nftAddress = "0xE9f6e196485B5cD9fe2C96B230402613a6e8FA7c"; // Sample Deployed on Rinkeby
const ABI = require("../abi/erc721.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);
const contractEthers = new ethers.Contract(nftAddress, ABI, provider)

const nftContentDeliver = async (req, res) => {

    try {
        const { signature } = req.query;
        if (!signature) return res.status(400).send({ status: false, messgae: "No Signature Provided" });

        // Getting the Address from the signature
        const walletAddress = ethers.utils.verifyMessage("Token Id", req.query.signature);

        // Getting the balance of NFT
        var balance = Number(await contractEthers.balanceOf(walletAddress));

        // Based on Balance Access is provided
        if (balance > 0) return res.status(200).send(`Content is available for user. ${walletAddress}`)
        
        return res.status(200).send(`Content is not available for user. ${walletAddress}`)
    } catch (error) {
        res.status(400).send({
            status : false,
            messgae : "Something Went Wrong"
        })
    }

}

module.exports = {
    nftContentDeliver
}