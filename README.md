# FIT3077 Project - Nine Men's Morris
The Nine Men Morris (9MM) is an ancient strategy board game played by two players. Each player will have nine men (points) to place on a board of 3 concentric squares connected by lines. Each square will have eight placeable positions thus adding up to 24 points on the board.

Chosen advanced requirement:\
"A single player may play against the computer, where the computer will randomly play a move among all of the currently valid moves for the computer, or any other set of heuristics of your choice."

## Team Members
Harry (Quoc) - hhan0014@student.monash.edu\
Arthur (Jer) - jlin0074@student.monash.edu\
Liangdi - lwan0141@student.monash.edu

See [Contribution Log](https://git.infotech.monash.edu/fit3077-s1-2023/CL_Thursday4pm_Team4/project/-/wikis/Contribution-Log)

## How to run
Make sure you have [node](https://nodejs.org/) installed.
1. clone repository
2. open terminal
3. cd into "\project\frontend"
4. run "npm install" command (install dependencies)
5. run "npm run build" command (generate "executables")
6. run "npm run preview" command (run/serve "executables")
7. ctrl + click on link to "http://localhost:4173/" in the terminal or open manually in browser
8. play the game

Link to [video demonstration](https://youtu.be/eDFIpEemS2E).

## How to play
(for current implementation - sprint 2)
1. Click on a position on the board to place a piece.
2. Once you have no pieces left, click on a piece that has empty positions adjacent to it. This will select that piece and it will have a green shadow. The valid moves will be highlighted, and click one of those positions to move the piece there. Otherwise, click on the same piece to deselect it.
