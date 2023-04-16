import React, { useState } from "react";
// To use Html5QrcodeScanner (more info below)
import { Html5QrcodeScanner } from "html5-qrcode";

// To use Html5Qrcode (more info below)
import { Html5Qrcode } from "html5-qrcode";
function App() {
  const [scannedData, setScannedData] = useState("");

  function handleScanClick() {
    // This method will trigger user permissions
    Html5Qrcode.getCameras()
      .then((devices) => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
          console.log("entered if (devices && devices.length)");
          var cameraId = devices[0].id;
          // .. use this to start scanning.
          const html5QrCode = new Html5Qrcode("reader");
          const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            /* handle success */
            setScannedData(decodedText);
            console.log(scannedData);
          };
          const config = { fps: 10, qrbox: { width: 250, height: 250 } };

          // ************  Back Camera hardcoded
          html5QrCode.start(
            { facingMode: "environment" },
            config,
            qrCodeSuccessCallback
          );

          // ************  Back Camera
          html5QrCode.start(
            { deviceId: { exact: cameraId } },
            config,
            qrCodeSuccessCallback
          );

          // *** front camera
          // html5QrCode.start(
          //   { facingMode: "user" },
          //   config,
          //   qrCodeSuccessCallback
          // );

          html5QrCode
            .stop()
            .then((ignore) => {
              // QR Code scanning is stopped.
            })
            .catch((err) => {
              // Stop failed, handle it.
            });
        }
      })
      .catch((err) => {
        // handle err
      });
  }

  return (
    <div>
      <button onClick={handleScanClick}>Scan Barcode</button>
      {scannedData && <p>Scanned Data: {scannedData}</p>}
      <div id="html5-qrcode-scanner"></div>
      {/* <div id="reader"></div> */}
    </div>
  );
}

export default App;

//********* this works so far ************ */

// import React, { useState } from "react";
// // To use Html5QrcodeScanner (more info below)
// import { Html5QrcodeScanner } from "html5-qrcode";

// // To use Html5Qrcode (more info below)
// import { Html5Qrcode } from "html5-qrcode";
// function App() {
//   const [scannedData, setScannedData] = useState("");

//   const handleScanSuccess = (decodedText) => {
//     setScannedData(decodedText);
//     // Html5QrcodeScanner.clear();
//     console.log("Scanned Data:", decodedText);
//   };

//   const handleScanFailure = (errorMessage) => {
//     console.error(errorMessage);
//   };

//   const handleScanClick = async () => {
//     try {
//       // const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       const html5QrCodeScanner = new Html5QrcodeScanner(
//         "html5-qrcode-scanner",
//         {
//           fps: 10,
//           qrbox: { width: 250, height: 250 },
//           constraints: { facingMode: "environment" },
//         },
//         /* verbose= */ false
//       );
//       html5QrCodeScanner.render(handleScanSuccess, handleScanFailure);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleScanClick}>Scan Barcode</button>
//       {scannedData && <p>Scanned Data: {scannedData}</p>}
//       <div id="html5-qrcode-scanner"></div>
//       {/* <div id="reader"></div> */}
//     </div>
//   );
// }

// export default App;
