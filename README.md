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


## Build a Schedule

* This section will describe how to create a schedule and the various schedules available  
**1)** Give the new schedule a name and write a description to be used by both Auto Hue and the Hue API     
 ![Media1](https://user-images.githubusercontent.com/33168761/68898398-5a516e00-06fd-11ea-8431-25d5a5e61674.gif)

**2)** Select a time option from the choices **_Weekly_**, **_Timer_**, and **_Future_**  
![Schedule_Step_2a](https://user-images.githubusercontent.com/33168761/68904628-67298e00-070c-11ea-8adc-36edbb4e17d2.png)
    
**2a)** The weekly option allows for a schedule to repeat on the selected days every week  
  
![Schedule_Step_2b](https://user-images.githubusercontent.com/33168761/68904630-6abd1500-070c-11ea-9f84-e5a19345b572.png)
    
**2b)** The timer option allows for one time schedule to occur "XX:XX:XX" in the future  
  
![Schedule_Step_2c](https://user-images.githubusercontent.com/33168761/68904677-7577aa00-070c-11ea-9898-203ccfb5dddd.png)
    
**2c)** The future option allows for a scheduled event to occur on a specific day at a specific time
  
![Schedule_Step_2d](https://user-images.githubusercontent.com/33168761/68904683-790b3100-070c-11ea-9148-fe55c4d527cc.png)

***  
  
**3)** Next choose the action that will occur when the schedule occurs. 
* The options are to power on/off, and if on add a colorloop effect or choose a color from the picker
![Schedule_Step_3](https://user-images.githubusercontent.com/33168761/68904691-7b6d8b00-070c-11ea-99d3-b840f1ddd8af.png)

**4)** Finally, choose a group for the schedule to act on and finish the creation process
![Schedule_Step_4](https://user-images.githubusercontent.com/33168761/68904693-7d374e80-070c-11ea-82d2-b15c67f9caa5.png)




