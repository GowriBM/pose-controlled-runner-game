# Pose-Controlled Runner Game

## Project Overview

This project is a side-scrolling runner game where the player controls a character using body movements captured via a webcam and processed with MediaPipe Pose detection. The game requires the player to jump, duck, or sidestep to avoid obstacles based on their real-world actions.

## Key Features

- MediaPipe Pose detection for capturing player movements.
- Dynamic obstacles that require different actions (jump, duck, sidestep) to avoid.
- Increasing difficulty levels and game speed.
- Local high score tracking with user authentication.

## Technical Specifications

- **Electron**: For creating the desktop application.
- **MediaPipe**: For real-time pose detection using the webcam.
- **Phaser.js**: For rendering game graphics and managing game states.
- **SQLite**: For local database management (high scores, user settings).

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- Webcam connected to your computer.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GowriBM/pose-controlled-runner-game.git
   cd pose-controlled-runner-game
