export default class Item {
    constructor(id,name,description,latitude,longitude,userId,timestamp,pictures,thumbnail,categories,pricePerDay,visible,groupId){
        this.id = id;
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.userId = userId;
        this.timestamp = timestamp;
        this.pictures = pictures;
        this.thumbnail = thumbnail;
        this.categories = categories;
        this.pricePerDay = pricePerDay;
        this.visible = visible;
        this.groupId = groupId;
    }
}