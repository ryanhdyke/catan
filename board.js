class Board {
    constructor() {
        this.tiles = []
        //to choose resources and numbers for a tile, pick a num between 1-19 for each resource and num and if already chosen, repick
        //so for loop for each resource type and num, not for each tile
        // let resourcesChosen = [0, 0, 0, 0, 0, 0] //wood x4, brick x3, sheep x4, rock x3, wheat x4, desert x1
        // let numsChosen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //2, 3, 4, 5, 6, 8, 9, 10, 11, 12
        let availableNums = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12]
        let tilesFilled = []

        this.players = [new Player("orange"), new Player("blue"), new Player("white")]

        // this.numSettlements = 5
        // this.numCities = 4
        // this.numRoads = 15

        // this.orangeBuildings = []
        // this.orangeResources = [0, 0, 0, 0, 0] //wood, brick, wheat, sheep, rock
        // this.orangeVP = 0

        // this.blueBuildings = []
        // this.blueResources = [0, 0, 0, 0, 0] //wood, brick, wheat, sheep, rock
        // this.blueVP = 0

        for (let i = 0; i < this.players.length; i++) {
            this.players[i].addBuildings()
        }

        // this.allEdges = []

        //wood
        for (let i = 0; i < 4; i++) {
            let tileNum = Math.floor(Math.random() * 19) + 1
            while (tilesFilled.includes(tileNum)) {
                tileNum = Math.floor(Math.random() * 19) + 1
            }
            // print("Tile number: ", tileNum)

            let numIndex = Math.floor(Math.random() * availableNums.length)
            let numForTile = availableNums[numIndex]
            availableNums.splice(numIndex, 1)

            // print("Resource num of tile: ", numForTile)

            // let num = Math.floor(Math.random() * 20) + 1
            this.tiles.push(new Tile(tileNum, "wood", numForTile))
            tilesFilled.push(tileNum)
        }

        //brick
        for (let i = 0; i < 3; i++) {
            let tileNum = Math.floor(Math.random() * 19) + 1
            while (tilesFilled.includes(tileNum)) {
                tileNum = Math.floor(Math.random() * 19) + 1
            }
            // print("Tile number: ", tileNum)

            let numIndex = Math.floor(Math.random() * availableNums.length)
            let numForTile = availableNums[numIndex]
            availableNums.splice(numIndex, 1)

            // print("Resource num of tile: ", numForTile)

            // let num = Math.floor(Math.random() * 20) + 1
            this.tiles.push(new Tile(tileNum, "brick", numForTile))
            tilesFilled.push(tileNum)
        }

        //sheep
        for (let i = 0; i < 4; i++) {
            let tileNum = Math.floor(Math.random() * 19) + 1
            while (tilesFilled.includes(tileNum)) {
                tileNum = Math.floor(Math.random() * 19) + 1
            }
            // print("Tile number: ", tileNum)

            let numIndex = Math.floor(Math.random() * availableNums.length)
            let numForTile = availableNums[numIndex]
            availableNums.splice(numIndex, 1)

            // print("Resource num of tile: ", numForTile)

            // let num = Math.floor(Math.random() * 20) + 1
            this.tiles.push(new Tile(tileNum, "sheep", numForTile))
            tilesFilled.push(tileNum)
        }

        //rock
        for (let i = 0; i < 3; i++) {
            let tileNum = Math.floor(Math.random() * 19) + 1
            while (tilesFilled.includes(tileNum)) {
                tileNum = Math.floor(Math.random() * 19) + 1
            }
            // print("Tile number: ", tileNum)

            let numIndex = Math.floor(Math.random() * availableNums.length)
            let numForTile = availableNums[numIndex]
            availableNums.splice(numIndex, 1)

            // print("Resource num of tile: ", numForTile)

            // let num = Math.floor(Math.random() * 20) + 1
            this.tiles.push(new Tile(tileNum, "rock", numForTile))
            tilesFilled.push(tileNum)
        }

        //wheat
        for (let i = 0; i < 4; i++) {
            let tileNum = Math.floor(Math.random() * 19) + 1
            while (tilesFilled.includes(tileNum)) {
                tileNum = Math.floor(Math.random() * 19) + 1
            }
            // print("Tile number: ", tileNum)

            let numIndex = Math.floor(Math.random() * availableNums.length)
            let numForTile = availableNums[numIndex]
            availableNums.splice(numIndex, 1)

            // print("Resource num of tile: ", numForTile)

            // let num = Math.floor(Math.random() * 20) + 1
            this.tiles.push(new Tile(tileNum, "wheat", numForTile))
            tilesFilled.push(tileNum)
        }

        for (let i = 1; i <= 19; i++) {
            if (!tilesFilled.includes(i)) {
                this.tiles.push(new Tile(i, "desert", 0))
            }
        }

    }

    showBuildings() {
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i]
            for (let j = 0; j < player.buildings.length; j++) {
                player.buildings[j].show()
            }
        }
    }

    showTiles() {
        for (let i = 0; i < 19; i++) {
            this.tiles[i].displayTile()
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // showPoints() { //54 total points
    //     stroke('purple');
    //     // strokeWeight(10);
    //     rectMode(CENTER)
    //     fill('purple')
    //     for (let i = 0; i < allEdges.length; i++) {
    //         // point(allPoints[i][0], allPoints[i][1])
    //         // print("DFSDFSDF")
    //         rect(allEdges[i][0], allEdges[i][1], 26, 26)
    //     }
    //     stroke(0)
    //     strokeWeight(1)
    //     rectMode(CORNER)
    // }

    getTileAt(centerX, centerY) {
        for (let i = 0; i < 19; i++) {
            if (this.tiles[i].centerX === centerX && this.tiles[i].centerY === centerY) {
              // print("got tile at (x, y): (", this.tiles[i].column, ", ", this.tiles[i].row, ")")
              return this.tiles[i]
            }
          }
          // print("couldnt get tile")
          return null
    }

    getBuildingAt(x, y) {
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i]
            for (let j = 0; j < player.buildings.length; j++) {
                if (similarPoints(player.buildings[j].x, player.buildings[j].y, x, y, 20)) {
                    // print("got a building")
                    return player.buildings[j]
                }
            }
        }
        // print("Getting a building")
        // for (let i = 0; i < this.orangeBuildings.length; i++) {
        //     if (similarPoints(this.orangeBuildings[i].x, this.orangeBuildings[i].y, x, y, 20)) {
        //         // print("got a building")
        //         return this.orangeBuildings[i]
        //     }
        // }

        return null
    }


    viableSettlementSpot(x, y) {
        //need to make it so a road has to be one spot away
        if (isStartingPhase) {
            //any spot is viable
            for (let j = 0; j < this.players.length; j++) {
                let player = this.players[j]
                for (let i = 0; i < player.buildings.length; i++) {
                    let currBuilding = player.buildings[i]
                    //currBuilding is cycling through all buildingds that are placed
                    if (currBuilding.piece == "road" || !currBuilding.isPlaced) {
                        continue
                    }
                    let dist = Math.sqrt(Math.pow(currBuilding.x - x, 2) + Math.pow(currBuilding.y - y, 2))
                    
                    if (dist < 90) {
                        return false
                    }
                }
            }
            
            return true
        }
        else { //not starting phase
            //settlement must be on a road
            let nearRoad = false
            for (let j = 0; j < this.players.length; j++) {
                let player = this.players[j]
                for (let i = 0; i < player.buildings.length; i++) {
                    let currBuilding = player.buildings[i]
                    if (!currBuilding.isPlaced) {
                        continue
                    }
                    let dist = Math.sqrt(Math.pow(currBuilding.x - x, 2) + Math.pow(currBuilding.y - y, 2))
                    //it is near a road
                    if (currBuilding.piece == "road" && player.color == whoseTurn && dist < 50) {
                        nearRoad = true
                    }
                    
                    //another building is too close
                    if (dist < 90 && currBuilding.piece !== "road") {
                        return false
                    }
                }
                if (nearRoad) {
                    return true
                }
            }
            
            
            return false
        }
    }

    viableCitySpot(x, y) {
        // print("Team color v5: ", currPlayer.color)

        // // print("Curr player cities: ", currPlayer.numCities)
        // if (currPlayer === null) {
        //     print("SDFSDFSDFSDFSDF")
        // }
        // print("Currplayer isnt null")
        //any spot is viable
        for (let j = 0; j < this.players.length; j++) {
            let player = this.players[j]
            for (let i = 0; i < player.buildings.length; i++) {
                let currBuilding = player.buildings[i]
                if (!currBuilding.isPlaced) {
                    continue
                }
                //currBuilding is cycling through all buildings that are placed
    
                //if currBuilding is similar to x, y and is a settlement
                if (currBuilding.piece == "settlement" && player.color == whoseTurn &&
                    similarPoints(currBuilding.x, currBuilding.y, x, y, 10)) {

                    return true
                }
            }
        }
        
        return false
    }

    viableRoadSpot(x, y) {
        for (let j = 0; j < this.players.length; j++) {
            let player = this.players[j]
            for (let i = 0; i < player.buildings.length; i++) {
                let currBuilding = player.buildings[i]
                let dist = Math.sqrt(Math.pow(currBuilding.x - x, 2) + Math.pow(currBuilding.y - y, 2))
                if (dist < 85 && player.color == whoseTurn) {
                    return true
                }
            }
        }
        
        return false
    }

    placeSettlement(userX, userY, player) {
        for (let i = 0; i < allPoints.length; i++) {
            if (similarPoints(allPoints[i][0], allPoints[i][1], userX, userY, 15)) {
    
                //can afford building when not starting phase, or is starting phase
              
                if (this.viableSettlementSpot(allPoints[i][0], allPoints[i][1]) && 
                    ((player.enoughForBuilding("settlement") && !isStartingPhase) || isStartingPhase)) {
    
                    buildingHeld.x = allPoints[i][0] - 2
                    buildingHeld.y = allPoints[i][1] - 2
                    player.numSettlements -= 1
                    player.vp += 1
        
                    if (!isStartingPhase) {
                        player.payForBuilding("settlement")
                    }
    
                    let touchingTiles = buildingHeld.findTouchingTiles(this)
                    for (let i = 0; i < touchingTiles.length; i++) {
                        //touchingTiles[i] stores tile position numbers
        
                        touchingTiles[i].buildings.push(buildingHeld)
                    }
                  
                    buildingHeld.isPlaced = true
                    buildingHeld = null
        
                    //add it to the touching tiles
                    
        
                    return true
                }
                else {
                    return false
                }
            }
        }
        return false
    }

    placeCity(userX, userY, player) {
        for (let i = 0; i < allPoints.length; i++) {
            if (similarPoints(allPoints[i][0], allPoints[i][1], userX, userY, 15) && player.enoughForBuilding("city")) {
                if (this.viableCitySpot(allPoints[i][0], allPoints[i][1])) {
    
                    buildingHeld.x = allPoints[i][0] + 10
                    buildingHeld.y = allPoints[i][1] - 10
                    player.numCities -= 1
                    player.vp += 1
        
                    player.payForBuilding("city")
        
                    // let replacedSettlement = board.getBuildingAt(allPoints[i][0], allPoints[i][1])
        
                    let touchingTiles = buildingHeld.findTouchingTiles(board)
                    for (let i = 0; i < touchingTiles.length; i++) {
                        //touchingTiles[i] stores tile position numbers
                        
                        touchingTiles[i].buildings.push(buildingHeld)
            
                        // touchingTiles[i].buildings.indexOf()
                        // touchingTiles[i].buildings.splice()
        
                    }
                    
                    buildingHeld.isPlaced = true
                    buildingHeld = null
        
                    //need to also remove the settlement here and return it to the default position
                    let replacedSettlement = this.getBuildingAt(allPoints[i][0], allPoints[i][1])
                    replacedSettlement.x = player.defaultSettlementPos[0]
                    replacedSettlement.y = player.defaultSettlementPos[1]
                    replacedSettlement.isPlaced = false
                    player.numSettlements += 1
                    
        
                    return true
                }
                else {
                    return false
                }
            }
        }
        return false
    }

    placeRoad(userX, userY, player) {
        //needs to have return at end of it
        //checks to see if you can place in on sides instead of corners
        //maybe get a list of sides (similar to allPoints list) and do something similar to building1BlockAway
        //except if a corner is <80 pixels away from a current one, add [edgeCenterX, edgeCenterY, angleForRoad]
        for (let i = 0; i < allEdges.length; i++) {
            if (similarPoints(allEdges[i][0], allEdges[i][1], userX, userY, 15) && 
                ((player.enoughForBuilding("road") && !isStartingPhase) || isStartingPhase)) {
                //if the adjacent point is occupied, you cant place there
                //might be able to do by distance
                //one side is ~75 pixels
                if (this.viableRoadSpot(allEdges[i][0], allEdges[i][1])) {
                    //for up road, x + 3, y - 4
                    //for vert road, x + 7

                    if (allEdges[i][2] === "vert") {
                        buildingHeld.x = allEdges[i][0] + 7
                        buildingHeld.y = allEdges[i][1]
                    }
                    else if (allEdges[i][2] === "up") {
                        if (buildingHeld.color == "orange") {
                            buildingHeld.pic = images[13]
                        }
                        else if (buildingHeld.color == "blue") {
                            buildingHeld.pic = images[16]
                        }
                        else {
                            buildingHeld.pic = images[19]
                        }
                        
                        buildingHeld.x = allEdges[i][0] - 1
                        buildingHeld.y = allEdges[i][1] - 2
                    }
                    else { //down
                        if (buildingHeld.color == "orange") {
                            buildingHeld.pic = images[14]
                        }
                        else if (buildingHeld.color == "blue") {
                            buildingHeld.pic = images[17]
                        }
                        else {
                            buildingHeld.pic = images[20]
                        }

                        buildingHeld.x = allEdges[i][0] + 1
                        buildingHeld.y = allEdges[i][1] - 2
                    }

                    // buildingHeld.x = allEdges[i][0] + 3
                    // buildingHeld.y = allEdges[i][1] - 4
                    player.numRoads -= 1

                    if (!isStartingPhase) {
                        player.payForBuilding("road")
                    }
                    
                    buildingHeld.isPlaced = true
                    buildingHeld = null
                    return true
                }
                else {
                    return false
                }
            }
        }
        return false
    }


    getResourcesFromRoll(diceRoll) {
        //for each tile,
        //get each building on the tile,
        //get the color of the building
        //add the resource to that player
        for (let i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].number === diceRoll && !this.tiles[i].hasRobber) {

                for (let j = 0; j < this.tiles[i].buildings.length; j++) {
                    let currBuilding = this.tiles[i].buildings[j]
                    if (!currBuilding.isPlaced) {
                        break
                    }

                    if (currBuilding.color == "orange") {
                        if (this.tiles[i].resource == "wood") {
                            this.players[0].resources[0] += this.tiles[i].buildings[j].resourcesGathered
                        }
                        else if (this.tiles[i].resource == "brick") {
                            this.players[0].resources[1] += this.tiles[i].buildings[j].resourcesGathered
                        }
                        else if (this.tiles[i].resource == "wheat") {
                            this.players[0].resources[2] += this.tiles[i].buildings[j].resourcesGathered
                        }
                        else if (this.tiles[i].resource == "sheep") {
                            this.players[0].resources[3] += this.tiles[i].buildings[j].resourcesGathered
                        }
                        else if (this.tiles[i].resource == "rock") {
                            this.players[0].resources[4] += this.tiles[i].buildings[j].resourcesGathered
                        }
                    }
                    else if (currBuilding.color == "blue") {
                        if (this.tiles[i].resource == "wood") {
                            this.players[1].resources[0] += this.tiles[i].buildings[j].resourcesGathered
                        }
                        else if (this.tiles[i].resource == "brick") {
                            this.players[1].resources[1] += this.tiles[i].buildings[j].resourcesGathered
                        }
                        else if (this.tiles[i].resource == "wheat") {
                            this.players[1].resources[2] += this.tiles[i].buildings[j].resourcesGathered
                        }
                        else if (this.tiles[i].resource == "sheep") {
                            this.players[1].resources[3] += this.tiles[i].buildings[j].resourcesGathered
                        }
                        else if (this.tiles[i].resource == "rock") {
                            this.players[1].resources[4] += this.tiles[i].buildings[j].resourcesGathered
                        }
                    }
                    else if (currBuilding.color == "white") {
                        if (this.tiles[i].resource == "wood") {
                            this.players[2].resources[0] += this.tiles[i].buildings[j].resourcesGathered
                        }
                        else if (this.tiles[i].resource == "brick") {
                            this.players[2].resources[1] += this.tiles[i].buildings[j].resourcesGathered
                        }
                        else if (this.tiles[i].resource == "wheat") {
                            this.players[2].resources[2] += this.tiles[i].buildings[j].resourcesGathered
                        }
                        else if (this.tiles[i].resource == "sheep") {
                            this.players[2].resources[3] += this.tiles[i].buildings[j].resourcesGathered
                        }
                        else if (this.tiles[i].resource == "rock") {
                            this.players[2].resources[4] += this.tiles[i].buildings[j].resourcesGathered
                        }
                    }
                    
                }
            }
        }
    }

    getRobberLocation() {
        for (let i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].hasRobber) {
                return this.tiles[i]
            }
        }
    }

    moveRobber(userX, userY, player) {
        let prevTile = this.getRobberLocation()

        //adds the robber to the new tile
        //also need to make sure it cannot be placed on the previous location
        for (let i = 0; i < this.tiles.length; i++) {
            let newTile = this.tiles[i]
            if (similarPoints(newTile.centerX, newTile.centerY, userX, userY, 20) &&
                newTile.resource != "desert" && newTile.position != prevTile.position) {

                prevTile.hasRobber = false
                newTile.hasRobber = true
                robberPos[0] = newTile.centerX
                robberPos[1] = newTile.centerY
                movingRobber = false
                return
            }
        }
        return
    }

    findLongestRoad(player) {
        let placedRoads = player.getPlacedRoads()
        if (placedRoads < 5) {
            return
        }

        let roadChain = []
        for (let i = 0; i < placedRoads.length - 1; i++) {
            let firstRoad = placedRoads[i]
            for (let j = i + 1; j < placedRoads.length; j++) {
                let secondRoad = placedRoads[j]
                let dist = Math.sqrt(Math.pow(firstRoad.x - secondRoad.x, 2) + Math.pow(firstRoad.y - secondRoad.y, 2))
                if (dist < 85) {
                    roadChain.push(firstRoad)
                    roadChain.push(secondRoad)
                }
            }
        }
    }

    findPath(placedRoads, i) {
        // let roadChain = []
        // for (; i < placedRoads.length - 1; i++) {
        //     let firstRoad = placedRoads[i]
        //     for (let j = i + 1; j < placedRoads.length; j++) {
        //         let secondRoad = placedRoads[j]
        //         let dist = Math.sqrt(Math.pow(firstRoad.x - secondRoad.x, 2) + Math.pow(firstRoad.y - secondRoad.y, 2))
        //         if (dist < 85) {
        //             roadChain.push(firstRoad)
        //             roadChain.push(secondRoad)

        //             this.findPath(placedRoads, j)
        //         }
        //     }
        // }
        // return roadChain
    }
}

