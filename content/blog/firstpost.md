---
title: "DIY Rotary Optical Encoder for Motor Control"
description: "Building a simple, high-resolution optical encoder from scratch to get precise feedback on a DC motor's position and speed."
date: "2025-08-26"
tags:
  - "electronics"
  - "diy"
  - "encoder"
  - "motor control"
  - "arduino"
---

### The Challenge: Knowing Your Motor's Position

For many of my robotics and automation projects, controlling a simple DC motor's speed is easy, but knowing its exact position or how far it has rotated is much harder. Commercial rotary encoders can be expensive, so I decided to build my own high-resolution optical encoder using simple components.

### How It Works

The core of the project is a slotted wheel (the **encoder disk**) that spins with the motor shaft. On either side of the disk, there is an infrared (IR) LED and a phototransistor. As the wheel spins, the slots alternately block and pass the light, creating a sequence of electrical pulses.

By using **two sensors** slightly offset from each other (often called channels A and B), we can not only count the pulses to measure speed and distance but also determine the direction of rotation by seeing which sensor's pulse comes first. This technique is known as **quadrature encoding**.

### Parts & Build

The build was straightforward. I salvaged a transparent encoder disk from an old ball mouse and mounted it to the motor's shaft. I then positioned two IR emitter/detector pairs to read the tracks on the disk.

**Key Components:**

- **Microcontroller:** An Arduino Uno to process the signals.
- **Encoder Disk:** A 100-slot disk from an old printer.
- **Sensors:** Two TCRT5000 infrared reflective sensors.
- **Motor:** A standard 5V DC hobby motor.

The sensors were wired up to the Arduino's interrupt pins to ensure no pulses were missed, even at high speeds.

![A photo of the finished encoder mounted on a breadboard with the motor.](/img/encoder-build-placeholder.jpg)
_A placeholder caption: The final setup with the encoder disk mounted on the motor and wired to the breadboard._

### The Code

The logic is handled by the Arduino. I wrote a small program that uses pin-change interrupts to monitor channels A and B. When a pulse is detected on one channel, the code checks the state of the other channel to determine if the motor is spinning clockwise or counter-clockwise and increments or decrements a position counter accordingly.

```cpp
// --- Placeholder Arduino Code ---

// Define pins for Encoder channels A and B
const int channelA_pin = 2;
const int channelB_pin = 3;

// Variable to store the motor's position
volatile long position_counter = 0;

void setup() {
  Serial.begin(9600);

  // Set pins as inputs
  pinMode(channelA_pin, INPUT_PULLUP);
  pinMode(channelB_pin, INPUT_PULLUP);

  // Attach interrupts to both pins
  attachInterrupt(digitalPinToInterrupt(channelA_pin), handleEncode, CHANGE);
  attachInterrupt(digitalPinToInterrupt(channelB_pin), handleEncode, CHANGE);
}

void loop() {
  // The main loop can be used for other tasks.
  // For this demo, we'll just print the position.
  Serial.print("Motor Position: ");
  Serial.println(position_counter);
  delay(100);
}

void handleEncode() {
  // This is a simplified quadrature logic placeholder
  // A real implementation would be more robust here
  // to handle direction and prevent miscounts.
  if (digitalRead(channelA_pin) == digitalRead(channelB_pin)) {
    position_counter++;
  } else {
    position_counter--;
  }
}
```
