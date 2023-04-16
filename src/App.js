import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  const [scannedData, setScannedData] = useState("");
  const [scannerVisible, setScannerVisible] = useState(false);

  const handleScanSuccess = (decodedText) => {
    setScannedData(decodedText);
    setScannerVisible(false);
  };

  const handleScanFailure = (errorMessage) => {
    console.error(errorMessage);
  };

  const handleScanClick = () => {
    setScannerVisible(true);
  };

  useEffect(() => {
    let html5QrCodeScanner;
    if (scannerVisible) {
      html5QrCodeScanner = new Html5QrcodeScanner(
        "html5-qrcode-scanner",
        { fps: 10, qrbox: { width: 250, height: 250 } }
        /* useBackCamera: true by default */
      );
      html5QrCodeScanner.render(handleScanSuccess, handleScanFailure);
    }
    return () => {
      if (html5QrCodeScanner) {
        html5QrCodeScanner.stop();
      }
    };
  }, [scannerVisible]);

  return (
    <div>
      <button onClick={handleScanClick}>Scan Barcode</button>
      {scannedData && <p>Scanned Data: {scannedData}</p>}
      {scannerVisible && <div id="html5-qrcode-scanner"></div>}
    </div>
  );
}

export default App;
