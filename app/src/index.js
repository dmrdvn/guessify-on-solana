import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/tailwind.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import Following from "./pages/home/following";

import { ModalProvider } from "@particle-network/connect-react-ui";
import { WalletEntryPosition } from "@particle-network/auth";
import { Solana } from "@particle-network/chains";
import { evmWallets, solanaWallets } from "@particle-network/connect";

import("buffer").then(({ Buffer }) => {
  window.Buffer = Buffer;
});

/* const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routes} />); */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ModalProvider
      options={{
        projectId: "295cf909-8f9e-4f5a-9b60-33af3a928bea",
        clientKey: "cQrYKzmnKTFFYxpERRRn0tjMiNndSVzjvhahdFKh",
        appId: "05518071-a6a3-4311-af65-b84463393fb1",
        chains: [Solana],
        particleWalletEntry: {
          //optional: particle wallet config
          displayWalletEntry: true, //display wallet button when connect particle success.
          defaultWalletEntryPosition: WalletEntryPosition.BR,
          supportChains: [Solana],
          customStyle: {}, //optional: custom wallet style
        },
        securityAccount: {
          //optional: particle security account config
          //prompt set payment password. 0: None, 1: Once(default), 2: Always
          promptSettingWhenSign: 1,
          //prompt set master password. 0: None(default), 1: Once, 2: Always
          promptMasterPasswordSettingWhenLogin: 1,
        },
        wallets: solanaWallets({
          projectId: "295cf909-8f9e-4f5a-9b60-33af3a928bea", //replace with walletconnect projectId
          showQrModal: false,
        }),
      }}
      theme={"dark"}
      language={"en"} //optional：localize, default en
      walletSort={["Wallet", "Particle Auth"]} //optional：walelt order
      particleAuthSort={[
        //optional：display particle auth items and order
        "google",
      ]}
    >
      <RouterProvider router={routes} />
    </ModalProvider>
  </React.StrictMode>
);
