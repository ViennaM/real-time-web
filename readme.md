# CodeCollab

A simple real time web app, where you can collaborate on HTML / CSS code. This project is based on socket.io.

![CodeCollab sceenshot](images/codecollab.gif)

Demo: [codecollaborate.herokuapp.com](https://codecollaborate.herokuapp.com/)


## Prerequisites
- Git
- Node
- NPM

## Set up
**1. Clone repository:**
```
git clone https://github.com/viennaM/real-time-web.git
```
**2. Get all dependencies:**
```json
{
"dependencies": {
    "express": "^4.16.3",
    "minify": "^3.0.5",
    "nunjucks": "^3.1.2",
    "request": "^2.85.0",
    "uglifycss": "^0.0.29",
    "socket.io": "^2.1.0",
    "browserify": "^16.2.0"
  }
} 
```
Run:
```
npm install
```

**3. Build and start server:**
```
npm start
```

**4. Open the app**

Navigate to [localhost:5000](localhost:5000) in your browser to see the app.

## To do
- [ ] Create rooms
- [ ] Add browser text editor


## License
GPL-3.0 © Vienna Meijer

