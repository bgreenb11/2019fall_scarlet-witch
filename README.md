<img src="https://github.com/utk-cs/2019fall_scarlet-witch/blob/master/auto_hue/src/assets/gradient_single.png" width="200">

# Auto-Hue 

> An electron app for controlling Phillips Hue lights

## Installation

1. Clone the repository to your local machine
```bash
git clone https://github.com/utk-cs/2019fall_scarlet-witch.git
```

2. Install project dependencies
```npm
npm install
```

3. Run the app
```npm
npm run electron:serve
```

## Getting Started

When loading up AutoHue for the first time you will be prompted through a set up process. This step by step formula is pretty straightforward, but it requires you to have **physically** touch your Hue Bridge. This is the only way to initially connect your bridge to AutoHue.

## Light Show

One of the main capabilities of AutoHue is its ability to change your Hue lights according to the music being played within the application. As of right now support is only available for local files on the machine, but future iterations look to include Spotify web player for improved UX. 

Currently the process is as easy as uploading .mp3 files to the AutoHue app and pressing play. If the track's bpm has not been analyzed by AutoHue beforehand, it will prompt you to analyze the file before continuing. 

Users can also auto play and shuffle their library. In these modes only analyzed songs will be played.
