<img src="https://github.com/utk-cs/2019fall_scarlet-witch/blob/master/auto_hue/src/assets/gradient_single.png" width="200">

# Auto-Hue 

> An electron app for controlling Phillips Hue lights

## Requirements

- Node Package Manager - This is installed with [Node.js](https://nodejs.org/en/download/ "Node.js Download")
- [Git](https://git-scm.com/downloads "Git Download") - Source control for version management


## Installation

**1)** Clone the repository to your local machine
```bash
git clone https://github.com/utk-cs/2019fall_scarlet-witch.git
```

**2)** Install project dependencies
```npm
npm install
```

**3)** Run the app
```npm
npm run electron:serve
```

## Getting Started

When loading up AutoHue for the first time you will be prompted through a set up process. This step by step formula is pretty straightforward, but it requires you to have **physically** touch your Hue Bridge. This is the only way to initially connect your bridge to AutoHue.

_Note: If you do not have an internet connection, you will need the IP address of your bridge._

## Light Show

One of the main capabilities of AutoHue is its ability to change your Hue lights according to the music being played within the application. As of right now support is only available for local files on the machine, but future iterations look to include Spotify web player for improved UX. 

Currently the process is as easy as uploading .mp3 files to the AutoHue app and pressing play. If the track's bpm has not been analyzed by AutoHue beforehand, it will prompt you to analyze the file before continuing. 

Users can also auto play and shuffle their library. In these modes only analyzed songs will be played.


## Build a Schedule

* This section will describe how to create a schedule and the various schedules available  
*** 

**1)** Give the new schedule a name and write a description to be used by both Auto Hue and the Hue API     
 ![Media1](https://user-images.githubusercontent.com/33168761/68898398-5a516e00-06fd-11ea-8431-25d5a5e61674.gif)
 
***

**2)** Select a time option from the choices **_Weekly_**, **_Timer_**, and **_Future_**  
![Schedule_Step_2a](https://user-images.githubusercontent.com/33168761/68904628-67298e00-070c-11ea-8adc-36edbb4e17d2.png)
    
**2a)** The weekly option allows for a schedule to repeat on the selected days every week  
  
![week](https://user-images.githubusercontent.com/33168761/68906926-f0908e80-0713-11ea-9387-10612660f3eb.gif)  
  
**2b)** The timer option allows for one time schedule to occur "XX:XX:XX" in the future  
  
![timer](https://user-images.githubusercontent.com/33168761/68906928-f2f2e880-0713-11ea-8c5e-aaadb83a0682.gif)  
    
**2c)** The future option allows for a scheduled event to occur on a specific day at a specific time
  
![future](https://user-images.githubusercontent.com/33168761/68906931-f5edd900-0713-11ea-9849-97164781da56.gif)  
  
***  
  
**3)** Next choose the action that will occur when the schedule occurs. 
* The options are to power on/off, and if on add a colorloop effect or choose a color from the picker
![schedule3](https://user-images.githubusercontent.com/33168761/68906493-6b58aa00-0712-11ea-95e0-531adfd5f0a9.gif)  
  
***

**4)** Finally, choose a group for the schedule to act on and finish the creation process
![schedule4](https://user-images.githubusercontent.com/33168761/68906494-6e539a80-0712-11ea-97a9-3c19f86e0b41.gif)
  



