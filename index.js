let net;
const webcamElement = document.getElementById('webcam');
const classifier = knnClassifier.create();
const classes = ['No Fingers', '1 Finger', '2 Fingers', '3 Fingers', '4 Fingers', '5 Fingers'];
let userFacing = true;

async function startupWebcam() {
  return new Promise((resolve, reject) => {
    const navigatorAny = navigator;
    let opts = {
      audio: false,
      video: { facingMode: 'user' }
    };
    navigator.getUserMedia = navigatorAny.getUserMedia ||
      navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
      navigatorAny.msGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia(opts,
        stream => {
          webcamElement.srcObject = stream;
          webcamElement.addEventListener('loadeddata', () => resolve(), false);
        },
        error => reject());
    } else {
      reject();
    }
  });
}

async function load_model() {
  loaderElement = document.getElementById('loader');
  //webcamElement.style.display = 'none';
  //loaderElement.style.display = 'block';
  console.log('Loading MobileNet...');


  // Load the model
  net = await mobilenet.load();
  console.log("MobileNet loaded successfully");
  //loaderElement.style.display = 'none';
  loaderElement.remove();
  //webcamElement.style.display = 'block';
}
async function app() {
  await load_model();
  await startupWebcam();
  const addExample = classId => {
    console.log('Adding image for class ' + classes[classId]);
    const activation = net.infer(webcamElement, 'conv_preds');

    // pass the intermediate activation to classifer
    classifier.addExample(activation, classId);
    console.log("Num categories captured: " + classifier.getNumClasses());
  };


  // When clicking a button, add an example of that class
  // When clicking a button, add an example for that class.
  document.getElementById('class-0').addEventListener('click', () => addExample(0));
  document.getElementById('class-1').addEventListener('click', () => addExample(1));
  document.getElementById('class-2').addEventListener('click', () => addExample(2));
  document.getElementById('class-3').addEventListener('click', () => addExample(3));
  document.getElementById('class-4').addEventListener('click', () => addExample(4));
  document.getElementById('class-5').addEventListener('click', () => addExample(5));



  while (true) {
    if (classifier.getNumClasses() > 0) {
      consoleElement = document.getElementById('console');
      consoleElement.hidden = false;
      const activation = net.infer(webcamElement, 'conv_preds');
      // get the most likely
      const result = await classifier.predictClass(activation);
      const predClass = classes[result.classIndex];
      const predConf = result.confidences[result.classIndex].toFixed(3);


      const message = predConf >= 0.6 ? "I'm sure that is" : "Not certain, might be";

      consoleElement.innerHTML = `<p>${message} <strong>${predClass}</strong> (Confidence: ${predConf})</p>`;

    }
    // Wait for next frame
    await tf.nextFrame();
  }
}

app();
