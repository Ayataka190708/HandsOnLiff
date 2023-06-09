import { useEffect, useState } from "react";
import liff from "@line/liff";
import { LiffMockPlugin } from '@line/liff-mock';

import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {

   
    const isDev = process.env.NODE_ENV === "development"

    liff.use(new LiffMockPlugin())

    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
        withLoginOnExternalBrowser: true,
        //@ts-ignore
        mock:isDev
      })
      .then(async () => {
        if (!liff.isInClient()) liff.login();
        const profile = await liff.getProfile();
        setMessage(`Hello, ${profile.displayName}!`);
      })
      .catch((e: Error) => {
        setMessage('LIFF init failed.');
        setError(`${e}`);
      });
  });

  return (
    <div className="App">
      <h1>create-liff-app</h1>
      {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      <a
        href="https://developers.line.biz/ja/docs/liff/"
        target="_blank"
        rel="noreferrer"
      >
        LIFF Documentation
      </a>
    </div>
  );
}

export default App;
