import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Transaction,
} from "@solana/web3.js";
import { AnchorProvider, web3 } from "@project-serum/anchor";
import idl from "./contracts/guessify_on_solana.json";
import { BN } from "@project-serum/anchor";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";

const programID = new PublicKey("fKQFUXR89GD7Y7VPL3HJsQxFPJDXud1HW53rWJ6xfMJ");
const network = clusterApiUrl("devnet");
const connection = new Connection(network, "confirmed");

const getProvider = () => {
  const provider = window.solana;
  return new AnchorProvider(connection, provider, {
    preflightCommitment: "confirmed",
  });
};

const program = new Program(idl, programID, getProvider());

export const createUser = async (userPubKey) => {
  try {
    const userPublicKey = new PublicKey(userPubKey); // Kullanıcının Solana cüzdan public key'i
    const userAccountID = web3.Keypair.generate(); // Yeni bir Keypair oluşturulur

    const tx = await program.rpc.createUser(userPublicKey, {
      accounts: {
        userAccount: userAccountID.publicKey.toString(), // Yeni oluşturulan kullanıcı hesabı
        user: getProvider().wallet.publicKey.toString(), // İşlemi başlatan kullanıcı cüzdanı
        systemProgram: web3.SystemProgram.programId, // System Program'ın ID'si
      },
      signers: [userPublicKey], // İşlemi imzalamak için gerekli olan Keypair
    });

    console.log("Kullanıcı başarıyla oluşturuldu, tx:", tx);
    return tx;
  } catch (e) {
    console.error("createUser hatası:", e);
  }
};

export const getUserWallet = async () => {
  try {
    return getProvider().wallet.publicKey.toString();
  } catch (e) {
    console.error(e);
  }
};

export const getPostDetails = async (postId) => {
  try {
    const postPublicKey = new PublicKey(postId);
    return await program.account.post.fetch(postPublicKey);
  } catch (e) {
    console.error("getPostDetails hatası:", e);
  }
};

export const getAllPosts = async () => {
  try {
    let res = await program.account.post.all();
    return res;
  } catch (e) {
    console.error("getPostDetails hatası:", e);
  }
};

export const createPost = async (content, betAmount, dueDate) => {
  try {
    const post = web3.Keypair.generate();
    const betAmountBN = new BN(betAmount);
    // JavaScript tarihini saniyeye çevir ve BN nesnesine dönüştür
    const dueDateBN = new BN(Math.floor(new Date(dueDate).getTime() / 1000));
    const participation = web3.Keypair.generate(); // participationAccount için yeni bir keypair oluştur
    const tx = await program.rpc.createPost(content, betAmountBN, dueDateBN, {
      accounts: {
        postAccount: post.publicKey,
        author: getProvider().wallet.publicKey,
        participationAccount: participation.publicKey, // participationAccount'u hesaplara ekleyin
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [getProvider().wallet.publicKey.toString], // Hem post hem de participation keypairs'leri signers'a ekleyin
    });
    console.log("Post başarıyla oluşturuldu, tx:", tx);
    return tx;
  } catch (e) {
    console.error("createPost hatası:", e);
  }
};
