class Tile {
  constructor(positionNumber, resource, number) {
    //also save the sides of the hexagon, maybe by using the "radius" of the hexagon to get each side
    this.position = positionNumber
    this.resource = resource
    this.number = number
    this.buildings = []

    switch (this.position) {
      case 1:
        this.centerX = tileRadius * 1.74 * -1 + (canvasWidth / 2)
        this.centerY = tileRadius * -3 + (canvasHeight / 2)
        break;
      case 2:
        this.centerX = (canvasWidth / 2)
        this.centerY = tileRadius * -3 + (canvasHeight / 2)
        break;
      case 3:
        this.centerX = tileRadius * 1.74 + (canvasWidth / 2)
        this.centerY = tileRadius * -3 + (canvasHeight / 2)
        break;
      case 4:
        this.centerX = tileRadius * -2.61 + (canvasWidth / 2)
        this.centerY = tileRadius * -1.5 + (canvasHeight / 2)
        break;
      case 5:
        this.centerX = tileRadius * -0.87 + (canvasWidth / 2)
        this.centerY = tileRadius * -1.5 + (canvasHeight / 2)
        break;
      case 6:
        this.centerX = tileRadius * 0.87 + (canvasWidth / 2)
        this.centerY = tileRadius * -1.5 + (canvasHeight / 2)
        break;
      case 7:
        this.centerX = tileRadius * 2.61 + (canvasWidth / 2)
        this.centerY = tileRadius * -1.5 + (canvasHeight / 2)
        break;
      case 8:
        this.centerX = tileRadius * 1.74 * -2 + (canvasWidth / 2)
        this.centerY = (canvasHeight / 2)
        break;
      case 9:
        this.centerX = tileRadius * 1.74 * -1 + (canvasWidth / 2)
        this.centerY = (canvasHeight / 2)
        break;
      case 10:
        this.centerX = (canvasWidth / 2)
        this.centerY = (canvasHeight / 2)
        break;
      case 11:
        this.centerX = tileRadius * 1.74 * 1 + (canvasWidth / 2)
        this.centerY = (canvasHeight / 2)
        break;
      case 12:
        this.centerX = tileRadius * 1.74 * 2 + (canvasWidth / 2)
        this.centerY = (canvasHeight / 2)
        break;
      case 13:
        this.centerX = tileRadius * -2.61 + (canvasWidth / 2)
        this.centerY = tileRadius * 1.5 + (canvasHeight / 2)
        break;
      case 14:
        this.centerX = tileRadius * -0.87 + (canvasWidth / 2)
        this.centerY = tileRadius * 1.5 + (canvasHeight / 2)
        break;
      case 15:
        this.centerX = tileRadius * 0.87 + (canvasWidth / 2)
        this.centerY = tileRadius * 1.5 + (canvasHeight / 2)
        break;
      case 16:
        this.centerX = tileRadius * 2.61 + (canvasWidth / 2)
        this.centerY = tileRadius * 1.5 + (canvasHeight / 2)
        break;
      case 17:
        this.centerX = tileRadius * 1.74 * -1 + (canvasWidth / 2)
        this.centerY = tileRadius * 3 + (canvasHeight / 2)
        break;
      case 18:
        this.centerX = (canvasWidth / 2)
        this.centerY = tileRadius * 3 + (canvasHeight / 2)
        break;
      case 19:
        this.centerX = tileRadius * 1.74 + (canvasWidth / 2)
        this.centerY = tileRadius * 3 + (canvasHeight / 2)
        break;
      default:
      // code block
    }

    if (this.resource == "desert") {
      this.hasRobber = true
      robberPos = [this.centerX, this.centerY]
    }
    else {
      this.hasRobber = false
    }
  }

  displayTile() {
    textAlign(CENTER, CENTER)
    textFont('Helvetica')
    textSize(48)
    strokeWeight(2)
    stroke(255)

    let s = str(this.number)
    if (this.number === 0) {
      s = ""
    }
    if (this.number === 6 || this.number === 8) {
      fill(255, 0, 0)
    }
    else {
      fill(0)
    }
    text(s, this.centerX, this.centerY)
  }

  // findTouchingBuildings(allBuildings) {
  //   for (let i = 0; i < allBuildings.length; i++) {
  //     if (allBuildings.piece == "road") {
  //       continue
  //     }
  //     let dist = Math.sqrt(Math.pow(allBuildings[i].x - this.centerX, 2) + Math.pow(allBuildings[i].y - this.centerY, 2))
  //     if (dist < 85) {
  //       this.buildings.push(allBuildings[i])
  //     }
  //   }
  // }
}

