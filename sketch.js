var tileRadius = 75
var board;
var canvasWidth = 1300
var canvasHeight = 700

var buildingHeld = null

var robberPos;
var movingRobber = false

var longestRoad = [0, ""]

var allPoints = []
var allEdges = []

var isStartingPhase = true
var startingPhaseRound = 1
var diceTotal = 0
var whoseTurn = "orange"
var startingNewTurn = true

var endTurnButton;
// var rollDiceButton;

var requestTradeButton;
var tradeWithBankButton;

var isTrading = false
var trader1 = ["", 0, 0, 0, 0, 0]
var trader2 = ["", 0, 0, 0, 0, 0]

var tradeWoodp1Button;

// var pickupSettlementOrange;
// var pickupCityOrange;
// var pickupRoadOrange;

var images = []

function setup() {
  var cnv = createCanvas(canvasWidth, canvasHeight);
  var x = (windowWidth - width) / 2;
  var y = ((windowHeight - height) / 2) + 20;
  cnv.position(x, y);

  imageMode(CENTER)

  images.push(loadImage('images/wood.png')) //0
  images.push(loadImage('images/brick.png')) //1
  images.push(loadImage('images/wheat.png')) //2
  images.push(loadImage('images/sheep.png')) //3
  images.push(loadImage('images/rock.png')) //4
  images.push(loadImage('images/robber.png')) //5

  images.push(loadImage('images/orangesettlement.png')) //6
  images.push(loadImage('images/bluesettlement.png')) //7
  images.push(loadImage('images/whitesettlement.png')) //8

  images.push(loadImage('images/orangecity.png')) //9
  images.push(loadImage('images/bluecity.png')) //10
  images.push(loadImage('images/whitecity.png')) //11

  images.push(loadImage('images/orangeroadvert.png')) //12
  images.push(loadImage('images/orangeroadup.png')) //13
  images.push(loadImage('images/orangeroaddown.png')) //14

  images.push(loadImage('images/blueroadvert.png')) //15
  images.push(loadImage('images/blueroadup.png')) //16
  images.push(loadImage('images/blueroaddown.png')) //17

  images.push(loadImage('images/whiteroadvert.png')) //18
  images.push(loadImage('images/whiteroadup.png')) //19
  images.push(loadImage('images/whiteroaddown.png')) //20

  

  board = new Board()

  //add end turn button
  endTurnButton = createButton("END TURN")
  endTurnButton.position(1200, 600)
  endTurnButton.mouseClicked(changeTurn)

  requestTradeButton = createButton("Request Trade")
  requestTradeButton.position(1100, 500)
  requestTradeButton.mouseClicked(requestTrade)

  tradeWithBankButton = createButton("Bank")
  tradeWithBankButton.position(1100, 450)
  tradeWithBankButton.mouseClicked(tradeWithBank)
  tradeWithBankButton.hide()

  tradeWoodp1Button = createButton("wood")
  tradeWoodp1Button.position(1100, 450)
  tradeWoodp1Button.mouseClicked(addWoodToTrade)
  // tradeWoodp1Button.hide()

  // rollDiceButton = createButton("Roll dice")
  // rollDiceButton.position(1025, 625)
  // rollDiceButton.mouseClicked(diceRoll)

  // //add orange buy building buttons
  // pickupSettlementOrange = createButton("Place settlement")
  // // pickupSettlementOrange.position(board.players[0].defaultSettlementPos[0], board.players[0].defaultSettlementPos[1] + 30)
  // pickupSettlementOrange.position(100, 100)

  // pickupSettlementOrange.mouseClicked(pickupSettlement)
  // function() { pickupSettlement("orange")}

  // textAlign(CENTER)
}

function draw() {
  background(235, 84, 70);

  //draw water around board
  fill(3, 207, 252)
  strokeWeight(8)
  stroke(209, 158, 4)
  beginShape()

  for (let a = 0; a < TAU; a += TAU / 6) {
    var x = (canvasWidth / 2) + 425 * cos(a)
    var y = (canvasHeight / 2) + 400 * sin(a)    
    vertex(x, y)
  }

  endShape(CLOSE)

  //showing each players HUD
  showOrangeDisplay()
  showBlueDisplay()
  showWhiteDisplay()  

  //creating the board
  makeGrid()
  board.showTiles()

  //draw robber
  if (movingRobber) {
    image(images[5], mouseX, mouseY, 75, 75)
  }
  else {
    image(images[5], robberPos[0], robberPos[1], 75, 75)
  }

  //displaying buildings
  board.showBuildings()
  
  //finding the edges
  if (allEdges.length === 0) {
    findAllEdges()
  }

  //draw dice
  if (!isStartingPhase) {
    if (startingNewTurn) {
      fill(252, 248, 3)
    }
    else {
      fill(255)
    }
    stroke(0)
    rect(1000, 600, 50, 50)
  
    textAlign(CENTER)
    fill(0)
    text(str(diceTotal), 1025, 625)
  }
  

  //is starting phase message and showing end turn button
  textSize(16)
  strokeWeight(0)
  if (isStartingPhase) {
    text("STARTING PHASE", 1150, 625)
    endTurnButton.hide()
    requestTradeButton.hide()
  }
  else {
    endTurnButton.show()
    requestTradeButton.show()
  }

  //////////////////////////////////////////////////////////////
  // text(str(startingNewTurn), 1150, 650)

  //whose turn message
  textSize(16)
  strokeWeight(0)
  text(str(whoseTurn), 1150, 595)
  

  //showing trade platforms
  // if (isTrading) {
    //showTradingPlatforms()
  //}
  showTradingPlatforms()
  

  //checking for game win
  let winner = checkForWin()
  if (winner !== null) {
    text(str(winner.color + "won"), 1150, 625)
  }
  // print(whoseTurn)
}

function makeGrid() {
  for (let i = -2; i <= 2; i++) {
    drawHexagon(tileRadius * 1.74 * i + (canvasWidth / 2), (canvasHeight / 2), tileRadius)
  }

  drawHexagon(tileRadius * -0.87 + (canvasWidth / 2), tileRadius * -1.5 + (canvasHeight / 2), tileRadius)
  drawHexagon(tileRadius * 0.87 + (canvasWidth / 2), tileRadius * -1.5 + (canvasHeight / 2), tileRadius)
  drawHexagon(tileRadius * -2.61 + (canvasWidth / 2), tileRadius * -1.5 + (canvasHeight / 2), tileRadius)
  drawHexagon(tileRadius * 2.61 + (canvasWidth / 2), tileRadius * -1.5 + (canvasHeight / 2), tileRadius)

  drawHexagon(tileRadius * -0.87 + (canvasWidth / 2), tileRadius * 1.5 + (canvasHeight / 2), tileRadius)
  drawHexagon(tileRadius * 0.87 + (canvasWidth / 2), tileRadius * 1.5 + (canvasHeight / 2), tileRadius)
  drawHexagon(tileRadius * -2.61 + (canvasWidth / 2), tileRadius * 1.5 + (canvasHeight / 2), tileRadius)
  drawHexagon(tileRadius * 2.61 + (canvasWidth / 2), tileRadius * 1.5 + (canvasHeight / 2), tileRadius)

  for (let i = -1; i <= 1; i++) {
    drawHexagon(tileRadius * 1.74 * i + (canvasWidth / 2), tileRadius * 3 + (canvasHeight / 2), tileRadius)
  }

  for (let i = -1; i <= 1; i++) {
    drawHexagon(tileRadius * 1.74 * i + (canvasWidth / 2), tileRadius * -3 + (canvasHeight / 2), tileRadius)
  }
  
}

function drawHexagon(centerX, centerY, radius) {
  let currTile = board.getTileAt(centerX, centerY)

  // print("Current tile: ", currTile.position)

  if (currTile.resource == "wood") {
    fill(6, 97, 41)
  }
  else if (currTile.resource == "brick") {
    fill(158, 29, 3)
  }
  else if (currTile.resource == "sheep") {
    fill(130, 232, 93)
  }
  else if (currTile.resource === "rock") {
    fill(148, 147, 145)
  }
  else if (currTile.resource === "wheat") {
    fill(245, 241, 44)
  }
  else if (currTile.resource === "desert") {
    fill(250, 209, 127)
  }
  else {
    fill(255)
  }
  stroke(0)
  // fill(6, 97, 41)
  beginShape()

  for (let a = 0; a < TAU; a += TAU / 6) {
    var x = centerX + radius * sin(a)
    var y = centerY + radius * cos(a)

    //add each point to a list of points
    let point = [x, y]

    if (!pointInArray(allPoints, x, y)) {
      allPoints.push(point)
    }
    
    vertex(x, y)
  }

  endShape(CLOSE)

  fill(0)
}

function showOrangeDisplay() {

  //box for buildings
  stroke(0)
  fill(222)
  strokeWeight(2)

  rect(30, 30, 210, 70, 10)

  //show num of each building type left
  fill(0)
  textSize(16)
  strokeWeight(0)

  if (board.players[0].numSettlements !== 0) {
    text(str("x" + board.players[0].numSettlements), 80, 65)
  }
  if (board.players[0].numCities !== 0) {
    text(str("x" + board.players[0].numCities), 160, 65)
  }
  if (board.players[0].numRoads !== 0) {
    text(str("x" + board.players[0].numRoads), 215, 65)
  }

  //resources and vp counter
  strokeWeight(2)
  stroke(255)

  showOrangeResources()
  let vpText = "VP: " + board.players[0].vp
  text(vpText, 300, 65)
}

function showBlueDisplay() {

  //box for buildings
  stroke(0)
  fill(222)
  strokeWeight(2)

  rect(30, canvasHeight - 100, 210, 70, 10)

  //show num of each building type left
  fill(0)
  textSize(16)
  strokeWeight(0)

  if (board.players[1].numSettlements !== 0) {
    text(str("x" + board.players[1].numSettlements), 80, 635)
  }
  if (board.players[1].numCities !== 0) {
    text(str("x" + board.players[1].numCities), 160, 635)
  }
  if (board.players[1].numRoads !== 0) {
    text(str("x" + board.players[1].numRoads), 215, 635)
  }

  //resources and vp counter
  strokeWeight(2)
  stroke(255)

  showBlueResources()
  let vpText = "VP: " + board.players[1].vp
  text(vpText, 300, 635)
}

function showWhiteDisplay() {

  //box for buildings
  stroke(0)
  fill(222)
  strokeWeight(2)

  rect(canvasWidth - 30 - 210, 30, 210, 70, 10)

  //show num of each building type left
  fill(0)
  textSize(16)
  strokeWeight(0)

  if (board.players[2].numSettlements !== 0) {
    text(str("x" + board.players[2].numSettlements), canvasWidth - 30 - 210 + 50, 65)
  }
  if (board.players[2].numCities !== 0) {
    text(str("x" + board.players[2].numCities), canvasWidth - 30 - 210 + 130, 65)
  }
  if (board.players[2].numRoads !== 0) {
    text(str("x" + board.players[2].numRoads), canvasWidth - 30 - 210 + 185, 65)
  }

  //resources and vp counter
  strokeWeight(2)
  stroke(255)

  showWhiteResources()
  let vpText = "VP: " + board.players[2].vp
  text(vpText, canvasWidth - 300, 65)
}

function showOrangeResources() {
  textSize(32)
  strokeWeight(1)

  //wood
  image(images[0], 55, 135, 50, 50)
  if (buildingHeld === null || isStartingPhase || buildingHeld.piece == "city" || buildingHeld.color != "orange") {
    text(str(board.players[0].resources[0]), 85, 135)
  }
  else if (!isStartingPhase && (buildingHeld.piece == "settlement" || buildingHeld.piece == "road")) {
    fill(255, 0, 0)
    text(str(board.players[0].resources[0] - 1), 85, 135)
    fill(0)
  }
  

  //brick
  image(images[1], 125, 132, 50, 50)
  if (buildingHeld === null || isStartingPhase || buildingHeld.piece == "city" || buildingHeld.color != "orange") {
    text(str(board.players[0].resources[1]), 155, 135)
  }
  else if (!isStartingPhase && (buildingHeld.piece == "settlement" || buildingHeld.piece == "road")) {
    fill(255, 0, 0)
    text(str(board.players[0].resources[1] - 1), 155, 135)
    fill(0)
  }

  //wheat
  image(images[2], 195, 137, 60, 60)
  if (buildingHeld === null || isStartingPhase || buildingHeld.piece == "road" || buildingHeld.color != "orange") {
    text(str(board.players[0].resources[2]), 220, 135)
  }
  else if (!isStartingPhase && buildingHeld.piece == "settlement") {
    fill(255, 0, 0)
    text(str(board.players[0].resources[2] - 1), 220, 135)
    fill(0)
  }
  else if (buildingHeld.piece == "city") {
    fill(255, 0, 0)
    text(str(board.players[0].resources[2] - 2), 220, 135)
    fill(0)
  }
  

  //sheep
  image(images[3], 85, 170, 50, 50)
  if (buildingHeld === null || isStartingPhase || buildingHeld.piece != "settlement" || buildingHeld.color != "orange") {
    text(str(board.players[0].resources[3]), 115, 172)
  }
  else if (!isStartingPhase && buildingHeld.piece == "settlement") {
    fill(255, 0, 0)
    text(str(board.players[0].resources[3] - 1), 115, 172)
    fill(0)
  }
  

  //rock
  image(images[4], 165, 155, 50, 50)
  if (buildingHeld === null || buildingHeld.piece != "city" || buildingHeld.color != "orange") {
    text(str(board.players[0].resources[4]), 195, 172)
  }
  else if (buildingHeld.piece == "city") {
    fill(255, 0, 0)
    text(str(board.players[0].resources[4] - 3), 195, 172)
    fill(0)
  }
}

function showBlueResources() {
  textSize(32)
  strokeWeight(1)

  //wood
  image(images[0], 55, 565, 50, 50)
  if (buildingHeld === null || isStartingPhase || buildingHeld.piece == "city" || buildingHeld.color != "blue") {
    text(str(board.players[1].resources[0]), 85, 565)
  }
  else if (!isStartingPhase && (buildingHeld.piece == "settlement" || buildingHeld.piece == "road")) {
    fill(255, 0, 0)
    text(str(board.players[1].resources[0] - 1), 85, 565)
    fill(0)
  }
  

  //brick
  image(images[1], 125, 562, 50, 50)
  if (buildingHeld === null || isStartingPhase || buildingHeld.piece == "city" || buildingHeld.color != "blue") {
    text(str(board.players[1].resources[1]), 155, 562)
  }
  else if (!isStartingPhase && (buildingHeld.piece == "settlement" || buildingHeld.piece == "road")) {
    fill(255, 0, 0)
    text(str(board.players[1].resources[1] - 1), 155, 562)
    fill(0)
  }

  //wheat
  image(images[2], 195, 564, 60, 60)
  if (buildingHeld === null || isStartingPhase || buildingHeld.piece == "road" || buildingHeld.color != "blue") {
    text(str(board.players[1].resources[2]), 220, 564)
  }
  else if (!isStartingPhase && buildingHeld.piece == "settlement") {
    fill(255, 0, 0)
    text(str(board.players[1].resources[2] - 1), 220, 564)
    fill(0)
  }
  else if (buildingHeld.piece == "city") {
    fill(255, 0, 0)
    text(str(board.players[1].resources[2] - 2), 220, 564)
    fill(0)
  }
  

  //sheep
  image(images[3], 85, 520, 50, 50)
  if (buildingHeld === null || isStartingPhase || buildingHeld.piece != "settlement" || buildingHeld.color != "blue") {
    text(str(board.players[1].resources[3]), 115, 522)
  }
  else if (!isStartingPhase && buildingHeld.piece == "settlement") {
    fill(255, 0, 0)
    text(str(board.players[1].resources[3] - 1), 115, 522)
    fill(0)
  }
  

  //rock
  image(images[4], 165, 505, 50, 50)
  if (buildingHeld === null || buildingHeld.piece != "city" || buildingHeld.color != "blue") {
    text(str(board.players[1].resources[4]), 195, 522)
  }
  else if (buildingHeld.piece == "city") {
    fill(255, 0, 0)
    text(str(board.players[1].resources[4] - 3), 195, 522)
    fill(0)
  }
}

function showWhiteResources() {
  textSize(32)
  strokeWeight(1)

  //wood
  image(images[0], canvasWidth - 30 - 210 + 25, 135, 50, 50)
  if (buildingHeld === null || isStartingPhase || buildingHeld.piece == "city" || buildingHeld.color != "white") {
    text(str(board.players[2].resources[0]), canvasWidth - 30 - 210 + 25 + 30, 135)
  }
  else if (!isStartingPhase && (buildingHeld.piece == "settlement" || buildingHeld.piece == "road")) {
    fill(255, 0, 0)
    text(str(board.players[2].resources[0] - 1), canvasWidth - 30 - 210 + 25 + 30, 135)
    fill(0)
  }
  

  //brick
  image(images[1], canvasWidth - 30 - 210 + 25 + 70, 132, 50, 50)
  if (buildingHeld === null || isStartingPhase || buildingHeld.piece == "city" || buildingHeld.color != "white") {
    text(str(board.players[2].resources[1]), canvasWidth - 30 - 210 + 25 + 70 + 30, 135)
  }
  else if (!isStartingPhase && (buildingHeld.piece == "settlement" || buildingHeld.piece == "road")) {
    fill(255, 0, 0)
    text(str(board.players[2].resources[1] - 1), canvasWidth - 30 - 210 + 25 + 70 + 30, 135)
    fill(0)
  }

  //wheat
  image(images[2], canvasWidth - 30 - 210 + 25 + 70 + 70, 137, 60, 60)
  if (buildingHeld === null || isStartingPhase || buildingHeld.piece == "road" || buildingHeld.color != "white") {
    text(str(board.players[2].resources[2]), canvasWidth - 30 - 210 + 25 + 70 + 70 + 25, 135)
  }
  else if (!isStartingPhase && buildingHeld.piece == "settlement") {
    fill(255, 0, 0)
    text(str(board.players[2].resources[2] - 1), canvasWidth - 30 - 210 + 25 + 70 + 70 + 25, 135)
    fill(0)
  }
  else if (buildingHeld.piece == "city") {
    fill(255, 0, 0)
    text(str(board.players[2].resources[2] - 2), canvasWidth - 30 - 210 + 25 + 70 + 70 + 25, 135)
    fill(0)
  }
  

  //sheep
  image(images[3], canvasWidth - 30 - 210 + 55, 170, 50, 50)
  if (buildingHeld === null || isStartingPhase || buildingHeld.piece != "settlement" || buildingHeld.color != "white") {
    text(str(board.players[2].resources[3]), canvasWidth - 30 - 210 + 55 + 30, 172)
  }
  else if (!isStartingPhase && buildingHeld.piece == "settlement") {
    fill(255, 0, 0)
    text(str(board.players[2].resources[3] - 1), canvasWidth - 30 - 210 + 55 + 30, 172)
    fill(0)
  }
  

  //rock
  image(images[4], canvasWidth - 30 - 210 + 135, 155, 50, 50)
  if (buildingHeld === null || buildingHeld.piece != "city" || buildingHeld.color != "white") {
    text(str(board.players[2].resources[4]), canvasWidth - 30 - 210 + 135 + 30, 172)
  }
  else if (buildingHeld.piece == "city") {
    fill(255, 0, 0)
    text(str(board.players[2].resources[4] - 3), canvasWidth - 30 - 210 + 135 + 30, 172)
    fill(0)
  }
}

function showTradingPlatforms() {
  stroke(0)
  fill(222)
  strokeWeight(2)

  rect(30, (canvasHeight / 2) - 75, 175, 150, 10)
  rect(canvasWidth - 30 - 175, (canvasHeight / 2) - 75, 175, 150, 10)

  //show the resources and amount offered for trade
  fill(255)
  textSize(32)
  strokeWeight(3)
  stroke(0)

  //wood 1
  image(images[0], 55, (canvasHeight / 2) - 50, 50, 50)
  text(str(trader1[1]), 80, (canvasHeight / 2) - 51)

  //brick 1
  image(images[1], 145, (canvasHeight / 2) - 50, 50, 50)
  text(str(trader1[2]), 175, (canvasHeight / 2) - 51)

  //wheat 1
  image(images[2], 55, (canvasHeight / 2), 50, 50)
  text(str(trader1[3]), 80, (canvasHeight / 2))

  //sheep 1
  image(images[3], 145, (canvasHeight / 2), 50, 50)
  text(str(trader1[4]), 175, (canvasHeight / 2))

  //rock 1
  image(images[4], 100, (canvasHeight / 2) + 30, 50, 50)
  text(str(trader1[5]), 130, (canvasHeight / 2) + 45)

  /////////////////////////////////

  //wood 2
  image(images[0], canvasWidth - 30 - 175 + 25, (canvasHeight / 2) - 50, 50, 50)
  text(str(trader2[1]), canvasWidth - 30 - 175 + 50, (canvasHeight / 2) - 51)

  //brick 2
  image(images[1], canvasWidth - 30 - 175 + 115, (canvasHeight / 2) - 50, 50, 50)
  text(str(trader2[2]), canvasWidth - 30 - 175 + 145, (canvasHeight / 2) - 51)

  //wheat 2
  image(images[2], canvasWidth - 30 - 175 + 25, (canvasHeight / 2), 50, 50)
  text(str(trader2[3]), canvasWidth - 30 - 175 + 50, (canvasHeight / 2))

  //sheep 2
  image(images[3], canvasWidth - 30 - 175 + 115, (canvasHeight / 2), 50, 50)
  text(str(trader2[4]), canvasWidth - 30 - 175 + 145, (canvasHeight / 2))

  //rock 2
  image(images[4], canvasWidth - 30 - 175 + 115 - 45, (canvasHeight / 2) + 30, 50, 50)
  text(str(trader2[5]), canvasWidth - 30 - 175 + 115 - 15, (canvasHeight / 2) + 45)
}

function similarPoints(x1, y1, x2, y2, distance) {
  if (x1 < (x2 + distance) && x1 > (x2 - distance) && y1 < (y2 + distance) && y1 > (y2 - distance)) {
    return true
  }
  else {
    return false
  }
}

function pointInArray(arr, x, y) {
  if (arr.length === 0) {
    return false
  }
  for (let i = 0; i < arr.length; i++) {
    if (similarPoints(arr[i][0], arr[i][1], x, y, 5)) {
      return true
    }
  }
  return false
}

function getPlayerByColor(color) {
  // print("Getting player by color")
  for (let i = 0; i < board.players.length; i++) {
    if (board.players[i].color == color) {
      return board.players[i]
    }
  }
  // print("returning null player")
  return null
}

function mouseClicked() {
  if (movingRobber) {
    board.moveRobber(mouseX, mouseY, whoseTurn)
    return
  }

  //you click to roll the dice and start the next turn
  if (mouseX >= 1000 && mouseX <= 1050 && mouseY >= 600 && mouseY <= 650 && !isStartingPhase && startingNewTurn) {
    diceTotal = diceRoll()
    if (diceTotal === 7) {
      // board.moveRobber(mouseX, mouseY)
      movingRobber = true
      robberPos = [mouseX, mouseY]
    }
    else {
      board.getResourcesFromRoll(diceTotal)
    }

    startingNewTurn = false
    
    return
  }
  
  //either placing it on the board or back in its starting spot to drop it
  if (buildingHeld !== null) {

    let player = getPlayerByColor(whoseTurn)
    // print("player color: ", player.color)

    //placing a held building
    if (buildingHeld.piece == "settlement") {
      let tempBuilding = buildingHeld
      if (board.placeSettlement(mouseX, mouseY, player)) {
        // need to get resources without a diceroll
        // try using building.findTouchingTiles() maybe and just manually add one of each of those resources
        if (startingPhaseRound === 2) {
          let touchingTiles = tempBuilding.findTouchingTiles(board)
          for (let i = 0; i < touchingTiles.length; i++) {
            let currTile = touchingTiles[i]
            if (currTile.resource == "wood") {
              player.resources[0] += 1
            }
            else if (currTile.resource == "brick") {
              player.resources[1] += 1
            }
            else if (currTile.resource == "wheat") {
              player.resources[2] += 1
            }
            else if (currTile.resource == "sheep") {
              player.resources[3] += 1
            }
            else if (currTile.resource == "rock") {
              player.resources[4] += 1
            }
          }
        }
        stillStartingPhaseRound()
        return
      }
    }
    else if (buildingHeld.piece == "city") {
      if (board.placeCity(mouseX, mouseY, player)) {
        return
      }
    }
    else if (buildingHeld.piece == "road") {
      if (board.placeRoad(mouseX, mouseY, player)) {
        stillStartingPhaseRound()
        return
      }
    }

    //there is a building held and you dont click on a valid place to put it
    if (buildingHeld.piece == "settlement") {
      buildingHeld.x = player.defaultSettlementPos[0]
      buildingHeld.y = player.defaultSettlementPos[1]
    }
    if (buildingHeld.piece == "city") {
      buildingHeld.x = player.defaultCityPos[0]
      buildingHeld.y = player.defaultCityPos[1]
    }
    if (buildingHeld.piece == "road") {
      buildingHeld.x = player.defaultRoadPos[0]
      buildingHeld.y = player.defaultRoadPos[1]
    }
    buildingHeld = null
    return
  }

  // a building is not held and you click to pick up a building
  else if ((clickingOrangeBox(mouseX, mouseY) || clickingBlueBox(mouseX, mouseY) || clickingWhiteBox(mouseX, mouseY)) &&
           (isStartingPhase || !startingNewTurn)) {
    let currBuilding = board.getBuildingAt(mouseX, mouseY)
    if (currBuilding === null) {
      return
    }
    //if its the starting phase, you cant select a city
    //if its not the starting phase, you can select anhything
    if (!isStartingPhase) {
      buildingHeld = currBuilding
    }
    else if (isStartingPhase && currBuilding.piece !== "city") {
      buildingHeld = currBuilding
    }
    // buildingHeld = board.getBuildingAt(mouseX, mouseY)
  }

  //you are not holding a building and click not on a building in the inventory
  
}

function clickingOrangeBox(x, y) {
  if (whoseTurn != "orange") {
    return false
  }
  return (x >= 30 && x <= 240 && y >= 30 && y <= 100)
}

function clickingBlueBox(x, y) {
  if (whoseTurn != "blue") {
    return false
  }
  return (x >= 30 && x <= 240 && y >= canvasHeight - 100 && y <= canvasHeight - 30)
}

function clickingWhiteBox(x, y) {
  if (whoseTurn != "white") {
    return false
  }
  return (x >= (canvasWidth - 30 - 210) && x <= (canvasWidth - 30) && y >= 30 && y <= 100)
}

function stillStartingPhaseRound() {
  if (!isStartingPhase) {
    return
  }
  for (let i = 0; i < board.players.length; i++) {
    let player = board.players[i]
    // print("curr player: ", player.color)
    if (player.color == whoseTurn && player.numSettlements === 0 && player.numRoads === 0) {
      // print("changing turn")
      changeTurn()
    }
    // if (player.numSettlements != 0 || player.numRoads != 0) {
    //   return
    // }
  }
  for (let i = 0; i < board.players.length; i++) {
    let player = board.players[i]
    if (player.numSettlements != 0 || player.numRoads != 0) {
      return
    }
  }
  if (startingPhaseRound == 1) {
    startingPhase1to2()
  }
  else if (startingPhaseRound == 2) {
    exitStartingPhase()
  }
}

function startingPhase1to2() {
  //already have 1 settlement and 1 road
  //each player places them
  //add 1 settlement and 1 road to each player again
  //each player places them
  //exit starting phase
  if (startingPhaseRound != 1) {
    return
  }
  for (let i = 0; i < board.players.length; i++) {
    let player = board.players[i]
    player.buildings.push(new Building("settlement", player))
    player.buildings.push(new Building("road", player))
    player.numSettlements = 1
    player.numRoads = 1
  }
  

  startingPhaseRound = 2
}

function exitStartingPhase() {
  //set isStartingPhase to false
  //add the rest of the settlements (3) and roads (13) and all the cities (5)
  if (startingPhaseRound != 2) {
    return
  }
  startingPhaseRound = 3
  isStartingPhase = false
  for (let i = 0; i < board.players.length; i++) {
    let player = board.players[i]
    player.buildings.push(new Building("settlement", player))
    player.buildings.push(new Building("settlement", player))
    player.buildings.push(new Building("settlement", player))
    player.numSettlements = 3

    player.buildings.push(new Building("city", player))
    player.buildings.push(new Building("city", player))
    player.buildings.push(new Building("city", player))
    player.buildings.push(new Building("city", player))
    player.buildings.push(new Building("city", player))
    player.numCities = 5

    for (let j = 0; j < 13; j++) {
      player.buildings.push(new Building("road", player))
    }
    player.numRoads = 13
  }
}

function changeTurn() {
  if (startingNewTurn && !isStartingPhase) {
    return
  }
  if (whoseTurn == "orange") {
    // print("changing turn from orange to white")
    whoseTurn = "white"
  }
  else if (whoseTurn == "white") {
    // print("changing turn from white to blue")
    whoseTurn = "blue"
  }
  else if (whoseTurn == "blue") {
    // print("changing turn from blue to orange")
    whoseTurn = "orange"
  }
  startingNewTurn = true
}

function requestTrade() {
  //get player = whoseturn
  //let the player choose who they want to trade with, either of the other players or the "bank"
  //if trading with bank, player gives 4 or 3 or 2 of their resources (depending on ports) and gets 1 from bank
  //if trading with other player, each player offers resources and both accept or decline
  tradeWithBankButton.show()

  trader1[0] = whoseTurn
}

function tradeWithBank() {
  // print("trading with bank")
  //have a little trade box on left and right side. left is for the initiator and right for other trader (bank or other player)
  //when trading, player clicks on resource they want to give, then click on a resource in the bank section
  //after clicking on resource in bank section, trade is made
  isTrading = true
  trader2[0] = "bank"
}

function addWoodToTrade() {
  let currPlayer = getPlayerByColor(trader1[0])
  trader1[1] += 1
  //display the curr player as having 1 less wood, but dont actually subtract it
}

function findAllEdges() {
  // print(allPoints.length)
  for (let i = 0; i < allPoints.length - 1; i++) {
      let point1 = allPoints[i]
      for (let j = 1; j < allPoints.length; j++) {
          let point2 = allPoints[j]
          if (similarPoints(point1[0], point1[1], point2[0], point2[1], 2)) {
              //if they are the same point
              continue
          }
          // print("Point 1: (", point1[0], ", ", point1[1], ")")
          // print("Point 2: (", point2[0], ", ", point2[1], ")")
          // print("")
          let dist = Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2))
          if (dist < 85) {
          // if (similarPoints(point1[0], point1[1], point2[0], point2[1], 85)) {
              //they are points connected by an edge
              let centerX = (point2[0] - point1[0]) / 2
              let centerY = (point2[1] - point1[1]) / 2
              if (!pointInArray(allEdges, point1[0] + centerX, point1[1] + centerY)) {
                  // print("adding edge with center (", centerX, ", ", centerY, ")")
                  let angle = "down"

                  if (point2[0] <= point1[0] + 5 && point2[0] >= point1[0] - 5) {
                    angle = "vert"
                  }
                  else if ((point2[1] < point1[1] && point2[0] > point1[0]) || (point1[1] < point2[1] && point1[0] > point2[0])) {
                    angle = "up"
                  }
                  // else { // else if ((point2[1] > point1[1] && point2[0] > point1[0]) || (point1[1] > point2[1] && point1[0] > point2[0])) {
                  //   angle = "down"
                  // }
                  // else if ()

                  let currEdge = [point1[0] + centerX, point1[1] + centerY, angle] //[edgesCenterX, edgesCenterY, angle]
                  allEdges.push(currEdge)
              }
              
          }

      }
  }
}

function diceRoll() {
  let dice1 = floor(Math.random() * 6) + 1
  let dice2 = floor(Math.random() * 6) + 1

  return dice1 + dice2
}

function checkForWin() {
  for (let i = 0; i < board.players.length; i++) {
    if (board.players[i].vp >= 10) {
      return board.players[i]
    }
  }

  return null
}
