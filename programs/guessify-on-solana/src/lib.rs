use anchor_lang::prelude::*;
declare_id!("E8izq3XUK9HGB4NQkz8n6mDvQTBoNTW3yg8Ft1XwxBuV");

#[program]
pub mod guessify_on_solana {
    use super::*;

    pub fn create_user(ctx: Context<CreateUser>, user_pubkey: Pubkey) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        user_account.user_pubkey = user_pubkey;
        Ok(())
    }

    pub fn create_post(
        ctx: Context<CreatePost>,
        content: String,
        bet_amount: u64,
        due_date: i64,
    ) -> Result<()> {
        let post_account = &mut ctx.accounts.post_account;
        post_account.author = *ctx.accounts.author.key;
        post_account.content = content;
        post_account.bet_amount = bet_amount;
        post_account.due_date = due_date;
        post_account.finished = false;

        let clock = Clock::get().unwrap();
        post_account.publish_date = clock.unix_timestamp;

        let participation_account = &mut ctx.accounts.participation_account;
        participation_account.user_pubkey = *ctx.accounts.author.to_account_info().key;
        participation_account.post_pubkey = *ctx.accounts.post_account.to_account_info().key;
        participation_account.bet_amount = bet_amount;
        participation_account.vote = true;

        Ok(())
    }

    pub fn participate_post(
        ctx: Context<ParticipatePost>,
        bet_amount: u64,
        vote: bool,
    ) -> Result<()> {
        let participation_account = &mut ctx.accounts.participation_account;
        participation_account.user_pubkey = *ctx.accounts.participant.to_account_info().key;
        participation_account.post_pubkey = *ctx.accounts.post.to_account_info().key;
        participation_account.bet_amount = bet_amount;
        participation_account.vote = vote;
        Ok(())
    }

}

/////////////////////////////////////////////////////////////////////
///////////////////////////// USER //////////////////////////////////
/////////////////////////////////////////////////////////////////////

#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(init, payer = user, space = 8 + 32)]
    pub user_account: Account<'info, User>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct User {
    pub user_pubkey: Pubkey,
}

//////////////////////////////////////////////////////////////////////
///////////////////////////// POST  //////////////////////////////////
//////////////////////////////////////////////////////////////////////

#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(init, payer = author, space = 2000)]
    pub post_account: Account<'info, Post>,
    #[account(mut)]
    pub author: Signer<'info>,

    #[account(init, payer = author, space = 2000)]
    pub participation_account: Account<'info, Participation>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Post {
    pub author: Pubkey,
    pub content: String,
    pub bet_amount: u64,
    pub due_date: i64,
    pub publish_date: i64,
    pub finished: bool,
}

//////////////////////////////////////////////////////////////////////
/////////////////////// PARTICIPATION  ///////////////////////////////
//////////////////////////////////////////////////////////////////////

#[derive(Accounts)]
pub struct ParticipatePost<'info> {
    #[account(init, payer = participant, space = 2000)]
    pub participation_account: Account<'info, Participation>,
    #[account(mut)]
    pub participant: Signer<'info>,
    
    #[account(mut)]
    pub post: Account<'info, Post>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Participation {
    pub user_pubkey: Pubkey, 
    pub post_pubkey: Pubkey,
    pub bet_amount: u64,
    pub vote: bool,
}

/////////////////////////////////////////////////////////////////////
/////////////////////////// ERRORS //////////////////////////////////
/////////////////////////////////////////////////////////////////////

#[error_code]
pub enum CustomError {
    #[msg("The specified post does not exist.")]
    PostNotFound,
}
