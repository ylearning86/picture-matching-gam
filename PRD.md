# Planning Guide

A colorful memory card matching game designed for children, featuring cute animals and fun emojis that kids love, with both relaxed and timed challenge modes.

**Experience Qualities**: 
1. **Playful** - Bright, cheerful visuals with satisfying card flip animations that make every interaction feel magical
2. **Rewarding** - Celebratory feedback when matches are found, with encouraging messages to keep kids engaged
3. **Exciting** - Optional speed challenge mode adds thrilling time pressure for competitive players

**Complexity Level**: Light Application (multiple features with basic state)
- This is a single-view game with interactive card flipping, match detection, score tracking, timer functionality, dual game modes, and restart functionality - perfect for a focused gaming experience with replayability

## Essential Features

### Game Mode Selection
- **Functionality**: Allows players to choose between Normal Mode (move-based scoring) and Speed Challenge (time-based racing)
- **Purpose**: Provides variety and different play styles - relaxed strategic play vs. fast-paced excitement
- **Trigger**: Player selects mode button before or during game
- **Progression**: Mode selection → Game resets with appropriate rules → UI updates to show relevant stats
- **Success criteria**: Mode switches cleanly, appropriate timer/move counter displays, records tracked separately

### Difficulty Level Selection
- **Functionality**: Players can choose Easy (4 pairs), Normal (6 pairs), or Hard (8 pairs)
- **Purpose**: Adjusts challenge level for different ages and skill levels
- **Trigger**: Player clicks difficulty button
- **Progression**: Difficulty selected → Cards reshuffle with new count → Timer adjusts for speed mode
- **Success criteria**: Card count changes correctly, appropriate time limits set, best scores tracked per difficulty

### Timer System (Speed Challenge Mode)
- **Functionality**: Countdown timer that tracks remaining seconds, starts on first card flip
- **Purpose**: Creates urgency and competitive challenge for speed-focused players
- **Trigger**: First card is flipped in speed challenge mode
- **Progression**: First flip → Timer starts counting down → Visual warning when low → Game over if time expires
- **Success criteria**: Timer counts accurately, pauses when game ends, shows clear visual warning below 10 seconds

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
- **Functionality**: Tracks number of moves (pairs flipped) in normal mode, or elapsed time in speed mode
- **Purpose**: Provides progress feedback and competitive metrics
- **Trigger**: Updates automatically as game progresses
- **Progression**: Game start → Counters initialize → Updates with each action → Final score displayed on completion
- **Success criteria**: Appropriate stats display for each mode, best records saved per difficulty and mode

### Game Completion
- **Functionality**: Detects when all pairs are matched and celebrates victory, or when time runs out in speed mode
- **Purpose**: Provides satisfying conclusion or dramatic failure moment
- **Trigger**: Last pair is successfully matched, or timer reaches zero
- **Progression**: Win condition → Victory/defeat animation → Display final stats → Show restart button → Update records if best
- **Success criteria**: Clear victory/defeat state with mode-appropriate message and easy restart option

### Game Reset
- **Functionality**: Reshuffles cards and resets all game state
- **Purpose**: Allows children to play again with a fresh challenge
- **Trigger**: User clicks restart button
- **Progression**: Click restart → Cards shuffle → Scores reset → Cards flip face-down → Game ready
- **Success criteria**: Complete reset with new random card positions

## Edge Case Handling
- **Rapid Clicking**: Prevent clicking more than 2 cards at once or clicking the same card twice
- **Mid-Game Restart**: Allow restart at any time without breaking game state, properly clearing timers
- **Animation Interruption**: Ensure cards can't be clicked while flip animations are in progress
- **Time Expiry**: Gracefully handle game over when timer reaches zero, disable further card flips
- **Mode Switching**: Properly reset game state when switching between normal and speed modes
- **All Matches Found**: Properly detect game completion when final pair is matched

## Design Direction
The design should evoke feelings of joy, excitement, and gentle focus - creating a welcoming space where children feel encouraged to explore and succeed. The visual style should be vibrant and playful, with smooth animations that provide delightful feedback for every action. Speed challenge mode adds visual urgency through timer animations and color changes.

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
Animations should bring moments of delight while serving clear functional purposes. Card flips will use smooth 3D transforms to feel tactile and satisfying. Matched pairs will pulse gently to celebrate success. Victory state will include confetti-like celebration. Timer warnings will pulse red when below 10 seconds. All animations will be quick (200-400ms) to maintain engagement without causing delays.

## Component Selection
- **Components**: 
  - Custom Card component with 3D flip animation (no direct Shadcn equivalent)
  - Button (Shadcn) for restart, mode selection, and difficulty buttons with hover scale effect
  - Card (Shadcn) as container for game stats and mode selection display
  - Badge (Shadcn) for displaying moves, time, matches count, and best records
- **Customizations**: 
  - Custom card grid layout with CSS Grid for responsive arrangement
  - Custom card component with perspective 3D flip using CSS transforms
  - Timer badge with conditional styling (pulse animation and red color when time is low)
  - Mode selection buttons with distinct visual styling for normal vs. speed modes
  - Emoji-based card images for lightweight, colorful, kid-friendly visuals
- **States**: 
  - Cards: face-down (default), flipping, face-up, matched (locked), disabled (during comparison or game over)
  - Timer: normal (default), warning (< 10 seconds with pulse), expired (game over)
  - Mode buttons: normal with gradient, speed with alternate gradient, unselected with outline
  - Buttons: default with gradient background, hover with scale and brightness boost, active with slight press
  - Victory overlay: hidden (default), visible with scale-up entrance animation
  - Game over overlay: hidden (default), visible when time expires
- **Icon Selection**: 
  - ArrowClockwise for restart button (playful restart action)
  - Trophy for normal mode and victory celebration
  - Lightning for speed challenge mode
  - Timer for countdown display
  - Star emoji for decorative accents
- **Spacing**: 
  - Card grid: gap-4 (16px) for comfortable spacing between cards
  - Stats container: p-6 for generous padding
  - Page margins: px-4 md:px-8 for responsive edge spacing
- **Mobile**: 
  - Cards scale down on mobile (smaller grid cells)
  - 4x3 grid on desktop becomes 3x4 on mobile for better fit
  - Stats stack vertically on mobile, horizontal on desktop
  - Mode and difficulty buttons wrap on smaller screens
  - Touch-friendly card sizes (minimum 80px tap target)
