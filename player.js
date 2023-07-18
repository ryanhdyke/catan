class Player {
    constructor(color) {
        this.color = color
        
        this.buildings = []
        this.numSettlements = 1
        this.numCities = 0
        this.numRoads = 1

        this.resources = [0, 0, 0, 0, 0] //wood, brick, wheat, sheep, rock
        this.vp = 0

        if (color == "orange") {
            this.defaultSettlementPos = [52, 61]
            this.defaultCityPos = [129, 63]
            this.defaultRoadPos = [195, 68]
        }
        else if (color == "blue") { 
            this.defaultSettlementPos = [52, 631]
            this.defaultCityPos = [129, 633]
            this.defaultRoadPos = [195, 638]
        }
        else { //white
            this.defaultSettlementPos = [canvasWidth - 30 - 210 + 22, 61]
            this.defaultCityPos = [canvasWidth - 30 - 210 + 99, 63]
            this.defaultRoadPos = [canvasWidth - 30 - 210 + 165, 68]
        }
        
        
    }

    addBuildings() {
        this.buildings.push(new Building("settlement", this))
        this.buildings.push(new Building("road", this))
        // this.buildings.push(new Building("settlement", this))
        // this.buildings.push(new Building("settlement", this))
        // this.buildings.push(new Building("settlement", this))
        // this.buildings.push(new Building("settlement", this))
        // this.buildings.push(new Building("settlement", this))

        // this.buildings.push(new Building("city", this))
        // this.buildings.push(new Building("city", this))
        // this.buildings.push(new Building("city", this))
        // this.buildings.push(new Building("city", this))

        // for (let i = 0; i < 15; i++) {
        //     this.buildings.push(new Building("road", this))
        // }
    }

    enoughForBuilding(buildingName) {
        // let player = getPlayerByColor(playerColor)
        if (buildingName == "settlement" && this.resources[0] >= 1 && 
        this.resources[1] >= 1 && this.resources[2] >= 1 && this.resources[3] >= 1) {
            
            return true
        }
        else if (buildingName == "city" && this.resources[2] >= 2 && this.resources[4] >= 3) {
            return true
        }
        else if (buildingName == "road" && this.resources[0] >= 1 && this.resources[1] >= 1) {
            return true
        }
      
        return false
    }

    payForBuilding(buildingName) {
        if (buildingName == "settlement") {
            this.resources[0] -= 1
            this.resources[1] -= 1
            this.resources[2] -= 1
            this.resources[3] -= 1
            return
        }
        else if (buildingName == "city") {
            this.resources[2] -= 2
            this.resources[4] -= 3
            return
        }
        else if (buildingName == "road") {
            this.resources[0] -= 1
            this.resources[1] -= 1
            return
        }
    }

    getPlacedRoads() {
        let placedRoads = []
        for (let i = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].piece == "road" && buildings[i].isPlaced) {
                placedRoads.push(this.buildings[i])
            }
        }
        return placedRoads
    }

    // getNonplacedBuilding(building) {
    //     // return this.buildings[0]
    //     for (let i = 0; i < this.buildings.length; i++) {
    //         if (!this.buildings[i].isPlaced && this.buildings[i].piece == building) {
    //             print("got non placed building")
    //             return this.buildings[i]
    //         }
    //     }
    //     return null
    // }
}