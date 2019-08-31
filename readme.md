# Finger Counting App
This is a simple web page that uses transfer learning in Tensorflow.js to learn to distingish between 6 hand positions relating to:
- No fingers displayed
- 1 Finger displayed
- 2 Fingers displayed
- 3 Fingers displayed
- 4 Fingers displayed
- 5 Fingers displayed

The App allows you to present an image of a hand (via your webcam) and select the number of fingers displayed. Each seperate image presented is helps the app to learn the representation.

As the app learns, it will attempt to categorise newly presented images in real-time to determine the correct number of fingers.

The more distinct images it learns the more accurate it should be.

## Installing and Running
The app is constructed as a single HTML page and can be run from the local file system in a recent Chrome browser.

  _This has not been tested across different browsers_

The following instructions can be used to clone and run this application on your machine:
 
1. Clone the repo from Git `git clone https://github.com/BillMatthews/tensorflow-js-finger-counting-app.git` 
2. Open the `index.html` file in a Chrome browser
3. Allow the page to access your WebCam
4. Using your WebCam train the app to recognise you showing none, 1, 2, 3, 4 and 5 fingers (at least 1 for each category but more is better)
5. Once the app has learned a single category it begins to predict the number of fingers shown. If it is getting a particular class wrong, then train more isntances of that class.
 
## How it works
