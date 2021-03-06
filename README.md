<h1>Gaize</h1>

We at Gaize are committed to help our users in variety of fields using eye tracking techniques. By using various machine learning algorithms we came up with a solution to increase the efficiency of our users in daily activities. Our software can also be used in several other fields such as online examination, conducting research etc.

Currently, our website showcases the use of our software by giving the users points based on the efficiency of their driving. Firstly, the user needs to train the software by visiting the Train tab and following the instructions there. They can then check their driving efficiency in the Implementation tab.

In the Train tab, click on the nine points displayed on the page five times until their color turns yellow. This will calibrate your eyes and allow us to increase our accuracy. There should be a red dot on the screen that shows where your eyes are looking. You can also recalibrate your eyes by clicking the recalibrate button.
Once you're satisfied with your results, head on to the Implementation tab to check out one of the demo applications we created. You can use the video displayed currently or any other youtube video by entering its video id in the textbox provided. As soon as you start the video, a heatmap will be generated based on where you are looking on the screen. The video runs for one minute, at the end of which the website will display an alert box with the percentage of the time the user was looking at the video. You can also clear the heatmap at any point by going to the train tab and clicking on the clear heatmap button.

<h1>How we built it</h1>

We built Gaize by making an eye tracking algorithm using javascript. We combined various machine learning algorithms to track eye movements using Tensorflow.js. Our algorithm is capable of adapting to different users as it is calibrated before using. We created a web interface, to showcase a proof of concept, using HTML and javascript.

<h1>What's next for Gaize</h1>

Our website showcases one of many projects that Gaize can provide. On a broader scale, Gaize can be implemented in many fields. One of the most impactful one being "bias detection". Similar to our vehicle video, a video can be played and the "attention" of a user on the video subject could speak a lot about their biases. Other fields that we look forward to work is surveys. We can create better survey experiences with better results using the data of how much a user is paying attention while taking a survey. Apart from that, we think that customers are a huge part of what a company is and knowing what the customers like would benifit the company. Thus we propose to use this in webpages in order to summarize what the users are more likely to pay attention to. What products attract the customers. Next we think that due to the current pandemic, every student attends classes online and due to the lack of visual feedback for the instructor, Gaize would help the instructors know what grabs the attention of students the most. We think these are great potential projects on gaze detection technology - and our project suffices as a proof of concept for the same.

<h1>Usage</h1>

The user should first download or clone the repository using git clone. Then using a terminal, change the directory to the folder of the repository.
Then type the command **python3 -m http.server** to host on the web server. To access the website type **http://localhost:8000/** in your browser window.
