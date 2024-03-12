use anchor_lang::prelude::*;
use anchor_lang::system_program;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("E8izq3XUK9HGB4NQkz8n6mDvQTBoNTW3yg8Ft1XwxBuV");

#[program]
mod guessify {
    use super::*;

    pub fn create_user(ctx: Context<CreateUser>) -> Result<()> {
        let user = &ctx.accounts.user;
        println!("User created: {:?}", user.wallet);
        
        Ok(())
    }

    pub fn create_post(
        ctx: Context<CreatePost>,
        post_author: Pubkey,
        content: String,
        timestamp: i64,
    ) -> Result<()> {
        let post = &mut ctx.accounts.post;
        post.author = post_author;
        post.content = content;
        post.timestamp = timestamp;
        post.finished = false;
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
    user: Account<'info, User>,
    pub system_program: AccountInfo<'info>,
}

#[account]
pub struct User {
    wallet: Pubkey,
    trust_point: u8,
    post_count: u8,
}

impl User {
    pub fn create_user(&mut self) {
        self.post_count = 0;
        self.trust_point = 0;
    }
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
    pub system_program: AccountInfo<'info>,
}

#[account]
pub struct Post {
    pub post_id: u32,
    pub author: Pubkey,
    pub content: String,
    pub timestamp: i64,
    pub finished: bool,
}

impl Post {
    pub fn create_post(&mut self) {
        self.finished = false;
        let clock = Clock::get().unwrap();
        self.timestamp = clock.unix_timestamp;
    }
}
