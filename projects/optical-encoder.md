---
layout: 'base.njk'
title: 'DIY Rotary Optical Encoder'
tags: 'projects'
description: 'A deep dive into building a high-resolution optical encoder from scratch using an Arduino and salvaged parts for precise motor control.'
date: '2025-08-27'
---

<!-- Intro Paragraph -->

<p class="text-xl text-slate-600 leading-relaxed">
  For many robotics projects, knowing a motor's exact position is critical.
  Commercial encoders can be costly, so I set out to build my own
  high-resolution optical encoder using simple components and an Arduino to get
  precise feedback on a DC motor's position and speed.
</p>

<!-- Featured Image -->

<figure class="mt-8">
  <img
    src="https://www.google.com/search?q=https://placehold.co/800x450/e2e8f0/334155%3Ftext%3DFinished%2BProject%2BPhoto"
    alt="DIY Optical Encoder"
    class="rounded-lg shadow-lg w-full"
  />
  <figcaption class="text-center text-sm text-slate-500 mt-3">
    The completed optical encoder mounted on a test rig.
  </figcaption>
</figure>

<!-- Section: Key Features -->

<div class="mt-12">
  <h2 class="text-3xl font-bold text-slate-900 tracking-tight">
    Key Features & Specifications
  </h2>
  <p class="mt-4 text-lg text-slate-600">
    Here's a quick rundown of the project's technical details.
  </p>
  <ul class="mt-6 list-disc list-inside space-y-2 text-lg text-slate-700">
    <li><strong>Resolution:</strong> 100 pulses per revolution (PPR)</li>
    <li>
      <strong>Sensing Method:</strong> Quadrature encoding with two infrared
      (IR) sensors
    </li>
    <li><strong>Microcontroller:</strong> Arduino Uno</li>
    <li>
      <strong>Output:</strong> Serial data providing real-time position and
      direction
    </li>
    <li>
      <strong>Key Components:</strong> TCRT5000 IR sensors, salvaged encoder
      disk, 5V DC motor
    </li>
  </ul>
</div>

<hr class="my-12 border-slate-200" />

<!-- Section: Build Process -->

<div>
  <h2 class="text-3xl font-bold text-slate-900 tracking-tight">
    The Build Process
  </h2>
  <p class="mt-4 text-lg text-slate-600">
    The core of this project is a slotted wheel (the encoder disk) that spins
    with the motor shaft. As the wheel spins, the slots alternately block and
    pass light from an IR LED to a phototransistor, creating a sequence of
    electrical pulses.
  </p>
  <figure class="mt-8">
    <img
      src="https://www.google.com/search?q=https://placehold.co/800x450/e2e8f0/334155%3Ftext%3DBuild%2BProcess%2BPhoto"
      alt="Encoder disk and sensors"
      class="rounded-lg shadow-lg w-full"
    />
    <figcaption class="text-center text-sm text-slate-500 mt-3">
      Close-up of the salvaged encoder disk and the TCRT5000 sensor alignment.
    </figcaption>
  </figure>
  <p class="mt-8 text-lg text-slate-600">
    By using two sensors slightly offset from each other (Channels A and B), I
    can not only count the pulses to measure speed but also determine the
    direction of rotation by seeing which channel's pulse comes first.
  </p>
</div>

<hr class="my-12 border-slate-200" />

<!-- Section: Code -->

<div>
  <h2 class="text-3xl font-bold text-slate-900 tracking-tight">
    Code & Schematics
  </h2>
  <p class="mt-4 text-lg text-slate-600">
    The logic is handled by the Arduino. I wrote a small program that uses
    pin-change interrupts to monitor channels A and B. This ensures no pulses
    are missed, even at high speeds.
  </p>

```cpp
// Define pins for Encoder channels A and B
const int channelA_pin = 2;
const int channelB_pin = 3;

// Variable to store the motor's position
volatile long position_counter = 0;
volatile byte channelA_state;
volatile byte channelB_state;

void setup() {
Serial.begin(9600);

pinMode(channelA_pin, INPUT_PULLUP);
pinMode(channelB_pin, INPUT_PULLUP);

// Attach interrupts to both pins, calling on any state change
attachInterrupt(digitalPinToInterrupt(channelA_pin), handleEncode, CHANGE);
attachInterrupt(digitalPinToInterrupt(channelB_pin), handleEncode, CHANGE);
}

void loop() {
Serial.print("Motor Position: ");
Serial.println(position_counter);
delay(100);
}

void handleEncode() {
// Read the current state of the pins
channelA_state = digitalRead(channelA_pin);
channelB_state = digitalRead(channelB_pin);

// A simple but effective logic for direction
if (channelA_state == channelB_state) {
position_counter++;
} else {
position_counter--;
}
}
```

</div>

<hr class="my-12 border-slate-200" />

<!-- Section: Conclusion -->

<div>
  <h2 class="text-3xl font-bold text-slate-900 tracking-tight">
    Challenges & Conclusion
  </h2>
  <p class="mt-4 text-lg text-slate-600">
    This was a successful proof-of-concept! The encoder is surprisingly accurate
    for being made from salvaged parts. The biggest challenge was aligning the
    IR sensors perfectly with the slots on the disk.
  </p>
  <p class="mt-4 text-lg text-slate-600">
    The next step is to integrate this into a proper PID control loop to command
    the motor to move to and hold specific angular positions. I also plan on
    designing a small PCB to make the sensor mounting more rigid and reliable.
  </p>
</div>
