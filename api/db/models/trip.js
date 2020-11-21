const { tripRef } = require('../index');
const { Accessor } = require('./accessor');

module.exports = class Trip {
    static getTrip() {
        Accessor.getObject(tripRef, id, callback);
    }

    static getTripList() {
        Accessor.getObjectList(tripRef, ids, callback);
    }

    static addTrip() {
        Accessor.addObject(tripRef, json, callback);
    }

    static deleteTrip() {
        Accessor.deleteObject(tripRef, id, callback);
    }

    static updateTrip() {
        Accessor.updateObject(tripRef, json, callback);
    }

    static generateTripJSON(id, travelerId, name, lastUpdate, travelerIds,
                            destinationIds, itemIds, expenseIds, description,
                            itinerary, tripLeaders) {
        return  { id, travelerId, name, lastUpdate, travelerIds, destinationIds,
                  itemIds, expenseIds, description, itinerary, tripLeaders };
    }
}