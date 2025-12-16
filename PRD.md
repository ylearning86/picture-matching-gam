# Planning Guide

A colorful memory card matching game designed for children, featuring beloved characters and items from popular franchises like Pokémon and Minecraft.

**Experience Qualities**: 
1. **Playful** - Bright, cheerful visuals with satisfying card flip animations that make every interaction feel magical
2. **Rewarding** - Celebratory feedback when matches are found, with encouraging messages to keep kids engaged
3. **Accessible** - Simple, intuitive gameplay that children can understand immediately without instructions

**Complexity Level**: Light Application (multiple features with basic state)
- This is a single-view game with interactive card flipping, match detection, score tracking, and restart functionality - perfect for a focused gaming experience

## Essential Features

### Card Grid Display
- **Functionality**: Displays a grid of face-down cards that can be flipped to reveal images
- **Purpose**: Provides the main game interface where children interact with cards
- **Trigger**: Game loads automatically with cards face-down
- **Progression**: Page loads → Cards arranged in grid → Cards are face-down and ready to flip
- **Success criteria**: All cards render in an organized grid, evenly spaced and clearly interactive

### Card Flipping Mechanism
- **Functionality**: Allows players to click/tap cards to flip them and reveal the hidden image
- **Purpose**: Core interaction that lets children explore and find matching pairs
- **Trigger**: User clicks/taps on a face-down card
- **Progression**: Click card → Card flips with animation → Image revealed → Wait for second card selection
- **Success criteria**: Cards flip smoothly, only two cards can be flipped at once, matched cards stay face-up

### Match Detection
- **Functionality**: Compares two flipped cards and determines if they match
- **Purpose**: Game logic that rewards correct pairings and handles incorrect attempts
- **Trigger**: Second card is flipped
- **Progression**: Second card flipped → System compares images → Match: cards stay up + celebration → No match: cards flip back after delay
- **Success criteria**: Matching pairs remain visible, non-matching pairs flip back after 1 second

### Score and Move Tracking
- **Functionality**: Tracks number of moves (pairs flipped) and matched pairs found
- **Purpose**: Provides progress feedback and sense of achievement
- **Trigger**: Updates automatically as game progresses
- **Progression**: Game start → Counters at zero → Each flip pair increments moves → Each match increments score
- **Success criteria**: Counters display accurately and update in real-time

### Game Completion
- **Functionality**: Detects when all pairs are matched and celebrates victory
- **Purpose**: Provides satisfying conclusion and encourages replay
- **Trigger**: Last pair is successfully matched
- **Progression**: Final match made → Victory animation/message → Display final stats → Show restart button
- **Success criteria**: Clear victory state with encouraging message and easy restart option

### Game Reset
- **Functionality**: Reshuffles cards and resets all game state
- **Purpose**: Allows children to play again with a fresh challenge
- **Trigger**: User clicks restart button
- **Progression**: Click restart → Cards shuffle → Scores reset → Cards flip face-down → Game ready
- **Success criteria**: Complete reset with new random card positions

## Edge Case Handling
- **Rapid Clicking**: Prevent clicking more than 2 cards at once or clicking the same card twice
- **Mid-Game Restart**: Allow restart at any time without breaking game state
- **Animation Interruption**: Ensure cards can't be clicked while flip animations are in progress
- **All Matches Found**: Properly detect game completion when final pair is matched

## Design Direction
The design should evoke feelings of joy, excitement, and gentle focus - creating a welcoming space where children feel encouraged to explore and succeed. The visual style should be vibrant and playful, with smooth animations that provide delightful feedback for every action.

## Color Selection
A cheerful, high-energy palette inspired by children's toys and games, with strong contrast for accessibility.

- **Primary Color**: Vibrant purple `oklch(0.55 0.25 300)` - Communicates magic and playfulness, perfect for interactive elements
- **Secondary Colors**: 
  - Bright cyan `oklch(0.75 0.15 210)` for secondary actions and accents
  - Sunny yellow `oklch(0.85 0.18 90)` for highlights and success states
- **Accent Color**: Hot pink `oklch(0.65 0.24 350)` - High-energy attention grabber for buttons and celebration moments
- **Foreground/Background Pairings**: 
  - Background (Soft lavender `oklch(0.95 0.05 300)`): Purple text `oklch(0.35 0.15 300)` - Ratio 7.2:1 ✓
  - Primary (Purple `oklch(0.55 0.25 300)`): White text `oklch(1 0 0)` - Ratio 6.8:1 ✓
  - Accent (Hot Pink `oklch(0.65 0.24 350)`): White text `oklch(1 0 0)` - Ratio 5.1:1 ✓

## Font Selection
Typography should feel friendly, approachable, and easy to read - characteristics that make children comfortable and excited to engage with the game. Using **Fredoka** for its rounded, playful letterforms that children find inviting, paired with **Inter** for smaller UI text.

- **Typographic Hierarchy**: 
  - H1 (Game Title): Fredoka Bold/36px/tight letter spacing
  - H2 (Victory Message): Fredoka SemiBold/28px/normal
  - Stats Display: Inter SemiBold/18px/wide letter spacing
  - Button Text: Fredoka Medium/16px/normal

## Animations
Animations should bring moments of delight while serving clear functional purposes. Card flips will use smooth 3D transforms to feel tactile and satisfying. Matched pairs will pulse gently to celebrate success. Victory state will include confetti-like celebration. All animations will be quick (200-400ms) to maintain engagement without causing delays.

## Component Selection
- **Components**: 
  - Custom Card component with 3D flip animation (no direct Shadcn equivalent)
  - Button (Shadcn) for restart action with hover scale effect
  - Card (Shadcn) as container for game stats display
  - Badge (Shadcn) for displaying moves and matches count
- **Customizations**: 
  - Custom card grid layout with CSS Grid for responsive arrangement
  - Custom card component with perspective 3D flip using CSS transforms
  - Emoji-based card images for lightweight, colorful, kid-friendly visuals
- **States**: 
  - Cards: face-down (default), flipping, face-up, matched (locked), disabled (during comparison)
  - Buttons: default with gradient background, hover with scale and brightness boost, active with slight press
  - Victory overlay: hidden (default), visible with scale-up entrance animation
- **Icon Selection**: 
  - ArrowClockwise for restart button (playful restart action)
  - Trophy/Confetti emoji for victory celebration
  - Star emoji for decorative accents
- **Spacing**: 
  - Card grid: gap-4 (16px) for comfortable spacing between cards
  - Stats container: p-6 for generous padding
  - Page margins: px-4 md:px-8 for responsive edge spacing
- **Mobile**: 
  - Cards scale down on mobile (smaller grid cells)
  - 4x3 grid on desktop becomes 3x4 on mobile for better fit
  - Stats stack vertically on mobile, horizontal on desktop
  - Touch-friendly card sizes (minimum 80px tap target)
