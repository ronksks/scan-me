import React, { useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

function App() {
  const [scannedData, setScannedData] = useState("");

  const handleScanSuccess = (decodedText, decodedResult) => {
    setScannedData(decodedText);
    Html5Qrcode.stop().then((ignore) => {
      document.getElementById("html5-qrcode-reader").style.display = "none";
    });
    console.log(decodedText);
  };

  const handleScanFailure = (errorMessage) => {
    console.error(errorMessage);
  };

  const handleScanClick = () => {
    const html5QrCode = new Html5Qrcode("html5-qrcode-reader", true);
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      // Use only the back camera
      facingMode: { exact: "environment" },
    };
    html5QrCode.start(config, handleScanSuccess, handleScanFailure);
  };

  return (
    <div>
      <button onClick={handleScanClick}>Scan Barcode</button>
      {scannedData && <p>Scanned Data: {scannedData}</p>}
      <div id="html5-qrcode-reader"></div>
    </div>
  );
}

export default App;
