# HGV - Lotus

## Experimental Drafting Options for Ability Draft Lobbies

**Host Choice**

- Hero Grid
  - Filter
  - Image Grid
  - Option for ImageType: Profile, Banner, Icon
  - Selection Collection
  - OnSelected Event
  - OnRejected Event
- Additional Options
  - Shuffle Events
  - Time Events
- Roster
  - Radiant / Dir / Extra slots
  - Drop and Drag bettween slots
  - Reset Command / OnReset Event
  - Copy Command
  - Start Command

**Balanced Draft**

- Switchs
  - Randomize Section
  - Filters Section
  - Balance Section
  - Order Section
  - Generate Command
- Additional Options
  - Shuffle Events
  - Time Events
- Roster
  - Radiant / Dir / Extra slots
  - Drop and Drag bettween slots
  - Reset Command / OnReset Event
  - Copy Command
  - Start Command

**Single Draft**

Pages

- Lobby
  - Lobby Client
  - List Lobbies
    - Join Lobby Command
    - Persona
  - Create Lobby
    - Draft Details
      - Blind vs Open
      - Heroes Selection
- Draft
  - Game Client
  - Leave Match Command
  - Phases
    - Ready
    - Pick
  - If Host
    - Copy Command

## Split Game Client and Server

NPM Packages hosted on Github

- Create Project 'Ballista' for variants [AP,SD,HD,CD,CC] that require turns phases.
- Move Server code into 'Aquila'
