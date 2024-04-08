import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { GuessifyOnSolana } from "../target/types/guessify_on_solana";
import { expect } from "chai";

describe("guessify", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  //Creating a new program object
  const program = anchor.workspace
    .GuessifyOnSolana as Program<GuessifyOnSolana>;

  // Create a new user account

  /* before(async () => {
    let token_airdrop = await program.provider.connection.requestAirdrop(
      user.publicKey,
      anchor.web3.LAMPORTS_PER_SOL
    );

    const latestBlockHash =
      await program.provider.connection.getLatestBlockhash();
    await program.provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: token_airdrop,
    });
  }); */

  it("create user!", async () => {
    const user = anchor.web3.Keypair.generate();
    const tx = await program.methods
      .createUser(user.publicKey)
      .accounts({
        userAccount: user.publicKey,
        user: user.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([user])
      .rpc();

    console.log("=> Create user transaction signature : ", tx);

    const account = await program.account.user.fetch(user.publicKey); // Data address'ini çekiyoruz
    expect(account.userPubkey.equals(user.publicKey)).to.be.true;
    console.log(
      "=> User account is successfully created with pubkey: ",
      user.publicKey.toBase58()
    );
  });

  /* it("Creates a post", async () => {
    const post = anchor.web3.Keypair.generate(); // Yeni bir post hesabı için Keypair oluşturun
    const content = "Future Prediction";
    const betAmount = new anchor.BN(1);
    const dueDate = new anchor.BN(Date.now() / 1000 + 24 * 60 * 60);

    const tx = await program.methods
      .createPost(content, betAmount, dueDate)
      .accounts({
        postAccount: post.publicKey,
        author: user.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([user, post]) // Post hesabı yeni oluşturuluyor, bu yüzden burada sadece user (author) imzalıyor
      .rpc();

    console.log("=> Create post transaction signature: ", tx);

    // Postun başarıyla oluşturulduğunu doğrulayın
    const postAccount = await program.account.post.fetch(post.publicKey);
    expect(postAccount.author.equals(user.publicKey)).to.be.true;
    console.log(
      "=> Post is successfully created with content: ",
      postAccount.content
    );
  }); */
  /* 
  it("Creates a post", async () => {
    const user = anchor.web3.Keypair.generate();
    const post = anchor.web3.Keypair.generate();
    const content = "Future Prediction";
    const betAmount = new anchor.BN(100); // Bet amount as BN
    const dueDate = new anchor.BN(Date.now() / 1000 + 24 * 60 * 60); // Due date 1 day from now

    const posttx = await program.methods
      .createPost(content, betAmount, dueDate)
      .accounts({
        postAccount: post.publicKey,
        author: user.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([user])
      .rpc();

    console.log("Create post transaction signature", posttx);
  }); */

  /* it("Participates in a post", async () => {
    const participant = anchor.web3.Keypair.generate();
    const postPubkey = new anchor.web3.PublicKey("Here_your_post_public_key"); // Replace with actual post public key
    const betAmount = new anchor.BN(50); // Bet amount as BN
    const vote = true;

    const tx = await program.rpc.participatePost(betAmount, vote, {
      accounts: {
        participationAccount: participant.publicKey,
        post: postPubkey,
        participant: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [participant],
    });
    console.log("Participate in post transaction signature", tx);
  }); */
});

/* import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { GuessifyOnSolana } from "../target/types/guessify_on_solana";

describe("guessify-on-solana", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .GuessifyOnSolana as Program<GuessifyOnSolana>;

  it("Is initialized!", async () => {});
});
 */
