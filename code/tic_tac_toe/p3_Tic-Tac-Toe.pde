// Serena Roderick
// Assignment 2: Interactive Toy Code
// ARTG2260: Programming Basics
// March 2, 2021


int[][] board = new int[3][3];

// Height and width of window
int height = 700;
int width = 700;

//Line var
int lineW = 10;
int lineL = 360;



// Color variables
color white = color(255, 255, 255);
color black = color(0, 0, 0);
color bg = color(30, 35, 74);
color player = color(52, 201, 235);
color ai = color(255, 133, 208);
boolean started = false;
boolean gameOver = false;
String endText = "YOU WON!";


// Setus method
void setup() {
  // Size of window (x, y)
  size(700, 700);
  background(bg);
  endText = "";
  fill(white);
  textSize(30);
  text("TIC-TAC-TOE", width/2 - 100, height/10);
}


// Draw method, called each second
void draw() {

  // Player Won
  if (winner() == 1) {
    gameOver = true;
    endText = "YOU WIN!";
    fill(white);
    textSize(30);
    text(endText, width/2 - 100, height/8 + 40);
  } // Player Lost
  else if (winner() == 2) {
    gameOver = true;
    endText = "YOU LOSE!";
    fill(white);
    textSize(30);
    text(endText, width/2 - 100, height/8 + 40);
  } // Game Tied
  else if (gameOver) {
    fill(white);
    textSize(30);
    text(endText, width/2 - 100, height/8 + 40);
  }

  // Start Button Clicked
  if (started) {
    fill(white);
    noStroke();
    rect((5*width)/12, height/4, lineW, lineL);
    rect((7*width)/12, height/4, lineW, lineL);
    rect(width/4, (5*height)/12, lineL, lineW);
    rect(width/4, (7*height)/12, lineL, lineW);
    fill(white);
    rect(width/2 - 75, (7*height)/8, 150, 50);
    fill(bg);
    textSize(30);
    text("RESET", width/2 - 40, (7*height)/8 + 40);
  } // Reset Button Clicked
  else if (gameOver) {
    fill(white);
    textSize(30);
    text(endText, width/2 - 100, height/8 + 40);
    rect(width/2 - 75, (7*height)/8, 150, 50);
    fill(bg);
    textSize(30);
    text("START", width/2 - 40, (7*height)/8 + 40);
  } // Start Screen
  else {
    fill(white);
    textSize(30);
    rect(width/2 - 75, (7*height)/8, 150, 50);
    fill(bg);
    text("START", width/2 - 40, (7*height)/8 + 40);
  }
}

// If mouse click event occurs
void mouseClicked() {
  int x = -1;
  int y = -1;

  // Mouse clicked within button bounds
  if (mouseX > 275 && mouseX < 425) {
    if (mouseY > 611 && mouseY < 662) {
      if (started) {
        println("reset");
        board = new int[3][3];
        started = false;
        gameOver = false;
        setup();
        redraw();
      } else {
        println("started");
        started = true;
      }
    }
  } 

  // mouse x coordinate falls within board bounds
  if (mouseX > 175 && mouseX < 295) {
    x = 0;
  } else if (mouseX < 415) {
    x = 1;
  } else if (mouseX < 535) {
    x = 2;
  }

  // mouse y coordinate falls within board bounds
  if (mouseY > 175 && mouseY < 295) {
    y = 0;
  } else if (mouseY < 415) {
    y = 1;
  } else if (mouseY < 535) {
    y = 2;
  }

  // if no UI elements were clicked
  if (x != -1 && y != -1 && started) {
    if (board[x][y] == 1 || board[x][y] == 2) {
    } // Game board cell clicked
    else {
      board[x][y] = 1;
      makeMove(x, y, board);
    }
  }
}

int aiX;
int aiY;

// Main method
void makeMove(int x, int y, int[][] board) {

  // Player Move
  int pSize = 60;
  fill(player);
  int posX = (235 + (120 * x)) - (pSize/2);
  int posY = (235 + (120 * y)) - (pSize/2);
  rect(posX, posY, pSize, pSize);
  board[x][y] = 1;

  // Checks if game board has empty cells
  int takenSpots = 0;
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      if (board[i][j] == 1 || board[i][j] == 2) {
        takenSpots++;
        print(board[i][j] + ", ");
      }
    }
  }

  // If all cells are taken
  if (takenSpots == 9) {
    println(takenSpots);
    gameOver = true;
    endText = "TIE!";
    board = new int[3][3];
    fill(white);
    textSize(30);
  } // Some cells are available in game board
  else {
    println(takenSpots);
    aiTurn(board);
    fill(ai);
    int AIposX = (245 + (120 * aiX)) - (pSize/4);
    int AIposY = (245 + (120 * aiY)) - (pSize/4); 
    board[aiX][aiY] = 2;
    circle(AIposX, AIposY, pSize);
  }
}

// Makes turn for AI player
void aiTurn(int[][] board) {
  // AI Move
  aiX = floor(random(0, 2.9));
  aiY = floor(random(0, 2.9));
  while (board[aiX][aiY] == 1 || board[aiX][aiY] == 2) {
    aiX = floor(random(0, 2.9));
    aiY = floor(random(0, 2.9));
  }
}

int winner() {
  // Diagonal top left to bottom right
  if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
    gameOver = true;
    return board[0][0];
  }
  // Diagonal bottom left to top right
  if (board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
    gameOver = true;
    return board[0][2];
  }
  // Top row win
  if (board[0][0] == board[0][1] && board[0][0] == board[0][2]) {
    gameOver = true;
    return board[0][0];
  }
  // Middle row win
  if (board[1][0] == board[1][1] && board[1][0] == board[1][2]) {
    gameOver = true;
    return board[1][0];
  }
  // Bottom row win
  if (board[2][0] == board[2][1] && board[2][0] == board[2][2]) {
    gameOver = true;
    return board[2][0];
  }
  // First column win
  if (board[0][0] == board[1][0] && board[0][0] == board[2][0]) {
    gameOver = true;
    return board[0][0];
  }
  // Second column win
  if (board[0][1] == board[1][1] && board[0][1] == board[2][1]) {
    gameOver = true;
    return board[0][1];
  }
  // third column win
  if (board[0][2] == board[1][2] && board[0][2] == board[2][2]) {
    gameOver = true;
    return board[0][2];
  }
  return -1;
}
