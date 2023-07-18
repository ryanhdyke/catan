class Building {
    //5 settlements
    //4 cities
    //15 roads

    constructor(piece, player) {
        this.piece = piece
        this.color = player.color
        this.isPlaced = false
        // let player = getPlayerByColor(color)
        if (this.piece == "settlement") {
            this.vp = 1
            this.resourcesGathered = 1

            this.x = player.defaultSettlementPos[0]
            this.y = player.defaultSettlementPos[1]

            if (this.color == "orange") {
                this.pic = images[6]
            }
            else if (this.color == "blue") {
                this.pic = images[7]
            }
            else { //white
                this.pic = images[8]
            }
            
        }
        else if (this.piece == "city") {
            this.vp = 2
            this.resourcesGathered = 2
            this.x = player.defaultCityPos[0]
            this.y = player.defaultCityPos[1]
            
            if (this.color == "orange") {
                this.pic = images[9]
            }
            else if (this.color == "blue") {
                this.pic = images[10]
            }
            else { //white
                this.pic = images[11]
            }
        }
        else { //road
            this.v = 0
            this.resourcesGathered = 0
            this.x = player.defaultRoadPos[0]
            this.y = player.defaultRoadPos[1]

            if (this.color == "orange") {
                this.pic = images[12]
            }
            else if (this.color == "blue") {
                this.pic = images[15]
            }
            else { //white
                this.pic = images[18]
            }
        }

        // this.touchingTiles = 
    }

    show() {
        // if (buildingHeld !== null) {
        //     print("Building held: ", buildingHeld.piece, ", ", buildingHeld.color, ", ", buildingHeld.isPlaced, ", ", buildingHeld.vp, ", ", buildingHeld.resourcesGathered)
        //     print("building held cont: ", buildingHeld.x, ", ", buildingHeld.y)
        // }
        

        //buildingHeld.piece == this.piece && buildingHeld.color == this.color
        //buildingHeld === this
        if (buildingHeld === this) {
            if (this.piece == "city") {
                image(this.pic, mouseX + 10, mouseY - 10, 50, 50)
            }
            else if (this.piece == "road") {
                image(this.pic, mouseX + 7, mouseY, 50, 50)
            }
            else {
                image(this.pic, mouseX, mouseY, 50, 50)
            }
            
        }
        else {
            image(this.pic, this.x, this.y, 50, 50)
        }        
    }


    findTouchingTiles(board) {
        //find the closest 3 tiles (by its x and y location and the tiles center x and y)
        //if a tile is significantly further than the others (>25 pixels), remove it as the
        //building is on an edge
        
        // let smallestDist1 = 10000
        let closestTile = 0
        let touchingTiles = []

        for (let i = 0; i < board.tiles.length; i++) {
            //get the distance between the center of each tile and the x and y of the board
            let dist = Math.sqrt(Math.pow((this.x - board.tiles[i].centerX), 2) + Math.pow((this.y - board.tiles[i].centerY), 2))
            if (dist <= 100 && dist >= 60) {
                closestTile = board.tiles[i]
                touchingTiles.push(closestTile)
            }
            else if (dist <= 100 && dist >= 60) {
                closestTile = board.tiles[i]
                touchingTiles.push(closestTile)
            }
            else if (dist <= 100 && dist >= 60) {
                closestTile = board.tiles[i]
                touchingTiles.push(closestTile)
            }
            //removed .postion from closestTile
        }

        // touchingTiles.push(closestTile1, closestTile2, closestTile3)

        return touchingTiles
    }

}