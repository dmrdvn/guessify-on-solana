import React from "react";

import "@particle-network/connect-react-ui/dist/index.css";
import { ConnectButton } from "@particle-network/connect-react-ui";

function ConnectWallet() {
  return (
    <div>
      <div className="flex gap-3">
        <button className="justify-center items-center p-3 bg-[#eef3f41a] rounded-[0.375rem]">
          <a href="https://faucet.solana.com/" target="_blank">
            SOL Faucet
          </a>
        </button>

        <div className="flex gap-2 justify-center items-center p-3 bg-[#eef3f41a] rounded-[0.375rem]">
          <ConnectButton.Custom>
            {({
              account,
              openAccountModal,
              openConnectModal,
              accountLoading,
            }) => {
              return (
                <div>
                  <button onClick={openConnectModal} disabled={!!account}>
                    {account ? "" : "Connect"}
                  </button>

                  <button onClick={openAccountModal} disabled={!account}>
                    {account
                      ? account.slice(0, 4) + "..." + account.slice(-4)
                      : ""}
                  </button>
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </div>
  );
}

export default ConnectWallet;

/* 

<ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openConnectModal,
          openChainModal,
          accountLoading,
        }) => {
          return (
            <div>
              <button onClick={openConnectModal} disabled={!!account}>
                Open Connect
              </button>
              <br />
              <br />
              <button onClick={openAccountModal} disabled={!account}>
                Open Account
              </button>
             
              <div>
                <h3>account</h3>
                <p>{account}</p>
              </div>
            </div>
          );
        }}
      </ConnectButton.Custom>
*/
