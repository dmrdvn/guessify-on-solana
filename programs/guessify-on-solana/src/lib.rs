use anchor_lang::prelude::*;
use anchor_lang::system_program;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("E8izq3XUK9HGB4NQkz8n6mDvQTBoNTW3yg8Ft1XwxBuV");

#[program]
mod guessify {
    use super::*;

   

    pub fn create_user(ctx: Context<CreateUser>, user_wallet: Pubkey) -> Result<()> {
        let user = &mut ctx.accounts.user;
        user.wallet = user_wallet; // Kullanıcı hesabı anahtarını kullanıcı cüzdanı anahtarı olarak ayarla
        println!("User created: {:?}", user.wallet);
        Ok(())
    }

    pub fn create_post(ctx: Context<CreatePost>, content: String) -> Result<()> {
        let post = &mut ctx.accounts.post;
        let user = &mut ctx.accounts.user;
        let author_key = *ctx.accounts.user.to_account_info().key;
        post.author = author_key;
        post.content = content;
        post.finished = true;

        let clock = Clock::get().unwrap();
        post.timestamp = clock.unix_timestamp;

        Ok(())
    }

    pub fn participate(ctx: Context<Participate>, post_public_key: Pubkey) -> Result<()> {
        let participant_to_post = &mut ctx.accounts.participant_to_post; //bir participant account oluştur
        participant_to_post.participant = *ctx.accounts.participant.to_account_info().key;
        participant_to_post.post_pubkey = post_public_key; // Post public key'i parametre olarak alınıyor

        Ok(())
    }





}
///////////////////////////////////////////////////////////////
////////////////////// USER ///////////////////////////////////
///////////////////////////////////////////////////////////////
#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(init, payer = signer, space = 1000)]
    pub user: Account<'info, User>,
    pub system_program: AccountInfo<'info>,
}

#[account]
pub struct User {
    wallet: Pubkey,
    
}



//////////////////////////////////////////////////////////////////////
////////////////////// CREATE POST  //////////////////////////////////
//////////////////////////////////////////////////////////////////////
#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(init, payer = signer, space = 1000)]
    pub post: Account<'info, Post>,

    #[account(mut)]
    pub user: Account<'info, User>, // Kullanıcı hesabını burada tanımlayın
    
    pub system_program: AccountInfo<'info>,
}

#[account]
pub struct Post {
    pub author: Pubkey,
    pub content: String,
    pub timestamp: i64,
    pub finished: bool,
}


//////////////////////////////////////////////////////////////////////
///////////////// PARTICIPATE POST  //////////////////////////////////
//////////////////////////////////////////////////////////////////////

#[derive(Accounts)]
pub struct Participate<'info> {
    #[account(mut)]
    pub participant: Signer<'info>, //Ödeyen

    #[account(mut)]
    pub post: Account<'info, Post>, //Post
    pub user: Account<'info, User>, //Katılımcı

    #[account(init, payer = participant, space = 1000)]
    pub participant_to_post: Account<'info, ParticipantToPost>,
    pub system_program: AccountInfo<'info>,
}

#[account]
pub struct ParticipantToPost {
    participant: Pubkey, //katılımcının pubkeyi
    post_pubkey: Pubkey, //postun pubkeyi
    /* bet_amount: u64,   */     //bet amount
}
