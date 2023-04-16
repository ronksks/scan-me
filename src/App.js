import { Html5Qrcode } from "html5-qrcode";
import { useState } from "react";

function App() {
  const [scannedData, setScannedData] = useState("");
  const [cameras, setCameras] = useState([]);
  const [activeCamera, setActiveCamera] = useState(null);

  function handleScanClick() {
    // This method will trigger user permissions
    Html5Qrcode.getCameras()
      .then((devices) => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        setCameras(devices);

        if (devices && devices.length) {
          console.log("entered if (devices && devices.length)");
          var cameraId = devices[1].id;
          // .. use this to start scanning.
          const html5QrCode = new Html5Qrcode("reader");
          const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            /* handle success */
            setScannedData(decodedText);
            setActiveCamera(decodedResult.cameraId);
            console.log(scannedData);
            html5QrCode
              .stop()
              .then((ignore) => {
                // QR Code scanning is stopped.
              })
              .catch((err) => {
                // Stop failed, handle it.
              });
          };
          const config = { fps: 10, qrbox: { width: 250, height: 250 } };

          // ************  Back Camera hardcoded

          html5QrCode
            .start(
              { facingMode: { exact: "environment" } },
              config,
              qrCodeSuccessCallback
            )
            .then(cameras.push({ id: "10", labeL: "enviorment" }))
            .catch((err) => {
              // ************  Back Camera
              html5QrCode
                .start(
                  { deviceId: { exact: cameraId } },
                  config,
                  qrCodeSuccessCallback
                )
                .then(cameras.push({ id: "11", labeL: "rear_camera" }));
            });

          // // ************  Back Camera
          // html5QrCode.start(
          //   { deviceId: { exact: cameraId } },
          //   config,
          //   qrCodeSuccessCallback
          // );
        }
      })
      .catch((err) => {
        // if(err.text == "OverconstrainedError" )
        // handle err
      });
  }

  return (
    <div>
      <div>
        <button onClick={handleScanClick}>Scan Barcode</button>
        {scannedData && <p>Scanned Data: {scannedData}</p>}
        <div id="reader"></div>
      </div>
      <div>
        <p>
          Current Camera:{" "}
          {activeCamera
            ? cameras.find((camera) => camera.id === activeCamera)?.label ||
              "Unknown"
            : "None"}
        </p>
        <ul>
          {cameras.map((item) => {
            return <li>{item.label}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;

//********* this works so far ************ */

// import { Html5Qrcode } from "html5-qrcode";
// import { useState } from "react";

// function App() {
//   const [scannedData, setScannedData] = useState("");
//   const [cameras, setCameras] = useState([]);

//   function handleScanClick() {
//     // This method will trigger user permissions
//     Html5Qrcode.getCameras()
//       .then((devices) => {
//         /**
//          * devices would be an array of objects of type:
//          * { id: "id", label: "label" }
//          */
//         setCameras(devices);

//         if (devices && devices.length) {
//           console.log("entered if (devices && devices.length)");
//           var cameraId = devices[1].id;
//           // .. use this to start scanning.
//           const html5QrCode = new Html5Qrcode("reader");
//           const qrCodeSuccessCallback = (decodedText, decodedResult) => {
//             /* handle success */
//             setScannedData(decodedText);
//             console.log(scannedData);
//             html5QrCode
//               .stop()
//               .then((ignore) => {
//                 // QR Code scanning is stopped.
//               })
//               .catch((err) => {
//                 // Stop failed, handle it.
//               });
//           };
//           const config = { fps: 10, qrbox: { width: 250, height: 250 } };

//           // ************  Back Camera hardcoded

//           html5QrCode
//             .start(
//               { facingMode: { exact: "environment" } },
//               config,
//               qrCodeSuccessCallback
//             )
//             .then(cameras.push({ id: "10", labeL: "enviorment" }))
//             .catch((err) => {
//               // ************  Back Camera
//               html5QrCode
//                 .start(
//                   { deviceId: { exact: cameraId } },
//                   config,
//                   qrCodeSuccessCallback
//                 )
//                 .then(cameras.push({ id: "11", labeL: "rear_camera" }));
//             });

//           // // ************  Back Camera
//           // html5QrCode.start(
//           //   { deviceId: { exact: cameraId } },
//           //   config,
//           //   qrCodeSuccessCallback
//           // );
//         }
//       })
//       .catch((err) => {
//         // if(err.text == "OverconstrainedError" )
//         // handle err
//       });
//   }

//   return (
//     <div>
//       <div>
//         <button onClick={handleScanClick}>Scan Barcode</button>
//         {scannedData && <p>Scanned Data: {scannedData}</p>}
//         <div id="reader"></div>
//       </div>
//       <div>
//         <ul>
//           {cameras.map((item) => {
//             return <li>{item.label}</li>;
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;
