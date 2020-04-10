
class Cache {
  constructor() {
    this.cacheMap = {}
    this.user = null
    this.currentUser = null
    this.currencies = null
    this.FContainer={}
  }
  
  setMapData(key, val) {
    this.cacheMap[key] = val
  }

  getMapData(key) {
    return this.cacheMap[key]
  }

  removeMapData(key) {
    if (this.cacheMap[key])
      delete this.cacheMap[key]
  }

  resetMap() {
    this.cacheMap = {}
  }
}

export default new Cache();
