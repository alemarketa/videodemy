## RUN

server:  node src/server.js
app-frontend: npm start



![Edpuzzle Logo](https://edpuzzle.imgix.net/edpuzzle-logos/vertical-logo.png?w=300)

Hi Markéta! We're as excited as you are to start this code challenge and at the prospect of working together in the future. Before we get started, we want to communicate the following:

1. The code you create for this challenge will never be used by Edpuzzle under any circumstances.
2. The goal is to take a look at your fullstack developer skills when working on a "real life" problem. We don't expect 100% perfection but we are looking for very thoughtful iteration.
3. Remember that if the challenge goes well, there will be an opportunity to talk through about all your decisions, issues found, etc. with the other Edpuzzle team members. Writing those down as they happen is generally a good idea.
4. During the challenge you'll be assigned one or two mentors from the Edpuzzle team. This means that you can contact them via Slack to answer any question that you might have. We're looking for an excellent developer and an even better teammate.
5. If you think of anything we could improve in this challenge after you've completed it, we'd love to get your honest feedback.

# Code Challenge

## Description

Your challenge will be to build an app that can display a list of videos that contain embedded questions in them. The app must also be capable of playing any of these videos and pausing them once it's time to display a question. If you enjoy building this mini application, you'll definitely love working with us on the full Edpuzzle product!

## Instructions

You've been given this Github repository where you'll have to submit your work. We won't be checking commits as you're still working on the challenge so don't worry about pushing incomplete code to Github.

### Instructions: Backend

You can find the credentials to connect to a MongoDB database at the end of this README file. This database contains two collections:

1. A collection called **videos** that contains several interactive videos from YouTube. An interactive video is the combination of a YouTube video, see the videoId field, and several open questions at different times during the video. Each question has a foreign key "questionId". This is an example of the shape documents in this collection have:

```
Video Schema

{
	_id: ObjectId,
	videoId: String representing the id of a YouTube video,
	title: String,
	author: String,
	questions: [
		{
			time: Integer that represents the time in seconds where this question is located,
			questionId: ObjectId
		},
		...
	]
}
```

2. A collection called **questions** that contains documents, each representing a question. This is an example of the shape a question document has inside the database:

```
Question Schema

{
	_id: ObjectId,
	text: String that represents the text of the question
}
```

You'll have to create a backend REST API in [Node.js](https://nodejs.org/en/) and [Express.js](http://expressjs.com/) that has two routes:

1. A route that returns a list of all videos in the **videos** collection, with their questions from the **questions** collection populated on each of the videos. You're not required to implement pagination but feel free to do so if you prefer. This is an example of the shape of the response of this API route:

```
GET /<name-of-your-route>
Response Body:

{
	data: [
		{
			_id: '557580900f2b07e0c39d23az',
			videoId: 'xA34kfi',
			title: 'History of the Roman Empire',
			author: 'National Geographic',
			questions: [
				{
					_id: 823890ffdbn,
					time: 10,
					text: 'What language was spoken in the Roman Empire?'
				}
			]
		},
		{
			_id: '557580900f2b07e0c39d23a0',
			videoId: 'iQWvc6qhTds',
			title: 'Flipping the Classroom: Explained!',
			author: 'Edpuzzle',
			questions: [
				{
					_id: '56b9eb939b1b0aaf44f2147a',
					time: 101,
					text: 'How do you feel about flipping your classroom?'
				},
				{
					_id: '56b9eb939b1b0aaf44f2147t',
					time: 130,
					text: 'How many years has Edpuzzle been around so far?'
				}
			],
		}
	]
}
```

1. A route that returns a specific video from the **videos** collection with its questions populated. This is an example of the shape of the response of this API route:

```
GET /<name-of-your-route>
Response Body:

{
	data: {
		_id: '557580900f2b07e0c39d23a0',
		videoId: 'xA34kfi',
		title: 'History of the Roman Empire',
		author: 'National Geographic',
		questions: [
			{
				_id: '823890ffdbn',
				time: 10,
				text: 'What language was spoken in the Roman Empire?'
			}
		]
	}
}
```

### Instructions: Frontend

You'll build a frontend single page application with React. It will have 2 screens in 2 different routes/urls:

1. **Videos Screen** - A screen where the list of videos is shown. A video from the list can be clicked and a YouTube embedded player will appear without navigating to another screen. Below that video there will be a shareable link and button that allow navigation to a separate screen where the video player can be shown as a standalone element (see (2)). The following is an example of a wireframe that would accomplish this goal but you can modify it as you see fit.

![Videos Screen](images/videos-list.png)

2. **Video Player Screen** - A screen where the player is displayed without any other element around it and in a different url/route than the Videos Screen.

![Video Screen](images/video-player.png)

For the video player, you have to implement some code to open an alert when the video reaches a time where it contains a question. In the alert, show the text of the question.

### Instructions: Extra Credit

While this isn't necessary for a successful code challenge, we want to leave the possibility open for you to add some extra features to this application.

A very useful piece of information the current app is missing is displaying the duration of each video in the videos screen. This duration isn't stored in the database and has to be retrieved directly from the YouTube Data API.

To accomplish this goal, you'll have to create a third REST API route that retrieves the duration of a specific video from the YouTube Data API. From the frontend, you'll have to display this duration information for each video in the videos screen.

Instructions on how to configure the YouTube Data Api can be found in one of the sections below.

## Technology Requirements

### Backend

- **Required** - Node.js with Express.js
- **Required** - MongoDB
- **Optional** - Mongoose.js for database schemas

Feel free to use any other technologies that you need.

### Frontend

- **Required** - React.js
- **Required** - Routing library of your choice (React Router, Reach Router, Navi, etc.)
- **Optional** - State management libraries like Redux

Feel free to use any other technologies that you need.

### Database

- **MongoURI:** `mongodb://developer:edpuzzle@candidate.63.mongolayer.com:10327,candidate.64.mongolayer.com:10154/developer-test-marketa?replicaSet=set-56aa50c0ad4b0861c2000532`
- **Mongo Console:** `mongo c327.candidate.63.mongolayer.com:10327/developer-test-marketa -u developer -p edpuzzle`
- **User:** developer
- **Password:** edpuzzle

### YouTube Data API (only for the Extra Credit section)

In order to get data from the YouTube API from within the Node.js backend, you'll need to configure a "Service Account" first. You can find the documentation [here](https://developers.google.com/identity/toolkit/web/quickstart/nodejs#step_1_configure_the_google_identity_toolkit_api).

## Communication channels

An invitation to a private Slack channel will be sent to your email. You can use that channel to discuss anything related to the code challenge with your assigned mentor/s.

For questions or updates on your interview process, please use the same communication channel you were using before the code challenge.
