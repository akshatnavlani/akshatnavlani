---
title: "Learning React Native"
date: "2026-07-20"
excerpt: "Notes from crossing over from web React to React Native — the mental model shift from the DOM, picking Expo over the bare workflow, and what it actually takes to see your code running on a real phone."
tags: ["React Native", "Mobile", "Learning"]
---

I've spent the last few years building web apps with React, so I assumed picking up React Native would be a short weekend project — same component model, same hooks, just a different set of tags. That assumption lasted about an hour. The core mental model carries over, but almost everything underneath it is different, and most of the friction in learning React Native comes from unlearning DOM habits rather than learning JSX from scratch.

## There is no DOM

The biggest adjustment is realizing there's no `div`, no `span`, no CSS file, and no browser underneath any of it. Instead you compose primitives like `View`, `Text`, and `Image`, which map to actual native UI components on iOS and Android rather than to HTML elements. A few consequences fall out of that immediately:

- All text has to live inside a `Text` component — you can't drop a raw string inside a `View` the way you could inside a `div`.
- Styling uses a JavaScript object subset of CSS (via `StyleSheet.create`), so no cascading, no `:hover`, and layout is Flexbox by default rather than opt-in.
- There's no concept of a click event — everything is a touch, handled through components like `Pressable` or `TouchableOpacity`.

None of this is hard once it clicks, but it means you can't skim the React Native docs the way you'd skim a library's docs when you already know the platform. I started at the [official Getting Started guide](https://reactnative.dev/docs/getting-started), which was worth reading slowly rather than scanning.

## Expo vs. the bare workflow

The first real decision is Expo versus the bare React Native workflow. For years I'd heard "just use Expo," and after actually comparing the two, I understand why:

- **Expo** gives you a managed set of native modules (camera, notifications, file system, etc.), over-the-air updates, and a dev client that runs on your phone without needing Xcode or Android Studio installed locally. The [Expo docs](https://docs.expo.dev/) are also just better organized for a beginner than piecing together native setup by hand.
- **Bare workflow** (plain `react-native init`) gives you direct access to native project files, which matters once you need a native module Expo doesn't support or want tight control over build configuration.

I went with Expo to start. The [environment setup guide](https://reactnative.dev/docs/environment-setup) lays out both paths clearly, and for a learning project the ability to skip installing Xcode and Android Studio on day one is a big deal — you can be looking at a running app on your own phone within minutes via Expo Go.

## Navigation is a library, not a router

Coming from web, I expected routing to feel like Next.js or React Router — URLs, history, that kind of thing. React Native has no URL bar, so navigation is entirely library-driven. The most common choice is [React Navigation](https://reactnative.dev/docs/navigation), which models your app as a stack (or tabs, or drawer) of screens rather than routes:

```jsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

It's a genuinely different way to think about "pages" — screens are pushed and popped rather than navigated to by URL, and passing data between them happens through route params rather than query strings.

## Nothing beats a real device

Simulators and emulators are fine for layout work, but they lie to you about performance, and they can't tell you anything about touch feel, camera access, push notifications, or how your app behaves when the OS decides to background it. The moment I loaded a build onto my own phone with Expo Go, I found layout issues that looked perfect in the iOS simulator and a scroll performance problem that never showed up until I tested on a lower-end Android device.

My rule now: if a feature touches native hardware or gestures, it isn't done until it's been tested on a real device, ideally on both platforms.

## Where I'm headed next

The next things on my list are digging into native modules for the cases Expo doesn't cover, understanding how the new architecture (Fabric and TurboModules) changes the mental model again, and getting comfortable with over-the-air update workflows for shipping fixes without a full app store review cycle. The gap between "I can build a web app" and "I can build a mobile app" turned out to be smaller than I feared, but it's a real gap — and the fastest way through it was reading the official docs closely and shipping something onto my own phone as early as possible.
