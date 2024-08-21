import { derivePath } from "ed25519-hd-key";
import {generateMnemonic, mnemonicToSeedSync} from "bip39";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import * as ethers from "ethers";
const networks = {
    ethereum: "ethereum",
    solana: "solana",
}

export function getDerivationPath(network, walletNo){
    const type = {
        ethereum: 60,
        solana: 501,
    }
    return `m/44'/${type[network]}'/${walletNo}'/0'`
}

export function createAccount(mnomonic, network){
    const seed = mnemonicToSeedSync(mnomonic);
    return {
        seedPhrase: mnomonic,
        seed,
        wallets: [
            getWallet(network, seed, getDerivationPath(network, 0), 0)
        ],
        latestWalletNo: 0
    }
}


export function createWalletAndCloneAccount(account, network){
    const walletNo = account.walletNo;
    accountClone = _.cloneDeep(account);
    accountClone.walletNo++;
    accountClone.wallets.push(getWallet(network, account.seed, getDerivationPath(network, walletNo), walletNo));
    return accountClone;
}

// generate wallet from seed.
export function getWallet(network, seed, derivationPath, walletNo){
    if(network===networks.solana){
        const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        // in solana address and public keys are the same
                const wallet = {
            network, walletNo,
            privateKey: keypair.publicKey.toBase58(),
            address: keypair.publicKey.toBase58()
        }
        return wallet;
    } else if(network===networks.ethereum) {
        const hdNode = ethers.HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const secretKey = child.privateKey;
        const ethWallet = new ethers.Wallet(secretKey);
        const wallet = {
            network, walletNo,
            privateKey: ethWallet.privateKey,
            address: ethWallet.address
        }
        return wallet;
    }
}