import React, { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  const [scannedData, setScannedData] = useState("");

  const handleScanSuccess = (decodedText) => {
    setScannedData(decodedText);
    Html5QrcodeScanner.clear();
    console.log("Scanned Data:", decodedText);
  };

  const handleScanFailure = (errorMessage) => {
    console.error(errorMessage);
  };

  const handleScanClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const html5QrCodeScanner = new Html5QrcodeScanner(
        "html5-qrcode-scanner",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          constraints: { facingMode: "environment" },
        },
        /* verbose= */ false
      );
      html5QrCodeScanner.render(handleScanSuccess, handleScanFailure);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleScanClick}>Scan Barcode</button>
      {scannedData && <p>Scanned Data: {scannedData}</p>}
      <div id="html5-qrcode-scanner"></div>
    </div>
  );
}

export default App;
