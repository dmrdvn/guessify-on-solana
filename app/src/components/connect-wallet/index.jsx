import React, { useState } from "react";

import "@particle-network/connect-react-ui/dist/index.css";
import { ConnectButton } from "@particle-network/connect-react-ui";

import { createUser, getUserWallet } from "../../solanaApi";

function ConnectWallet() {
  const [wallet, setWallet] = useState("");

  const fetchWalletAddress = async () => {
    const address = await getUserWallet();
    setWallet(address);
    console.log(address);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const tx = await createUser(wallet);
      console.log("User başarıyla oluşturuldu:", tx);
    } catch (error) {
      console.error("User oluşturulurken hata oluştu:", error);
    }
  };

  return (
    <div>
      <div className="flex gap-3">
        {/* <button onClick={handleCreateUser}>Create User</button> */}
        {/* <button onClick={fetchWalletAddress}>Cüzdan Adresimi Göster</button> */}

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
