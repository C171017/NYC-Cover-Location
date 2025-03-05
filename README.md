# NYC Album Cover Locations Map

## Overview
This interactive web application maps iconic album covers that were photographed in Manhattan. Users can explore the geographic connection between famous albums and New York City locations through an interactive map interface.

## Directory Structure
```
NYC-Cover-Location/
├── index.html
├── styles.css
├── script.js
├── images/
│   ├── map.jpg
│   ├── ramones.jpg
│   ├── physical-graffiti.jpg
│   └── [other album covers]
└── audio/
    ├── blitzkrieg.m4a
    ├── trampled.m4a
    └── [other audio files]
```

## Adding New Album Locations
To add a new album location to the map:
1. Add a new point element in the HTML with proper positioning
2. Include data-info attribute for the tooltip
3. Add data-content attribute with detailed HTML content
4. Place the corresponding album image in the images folder
5. Add the audio file in the audio folder