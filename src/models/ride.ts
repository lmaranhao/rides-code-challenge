export default class Ride {
    rideId: string;

    driverName: string;

    driverVehicle: string;

    createdAt: string;

    constructor(rideId: string, driverName: string, driverVehicle: string, createdAt: string) {
      this.rideId = rideId;
      this.driverName = driverName;
      this.driverVehicle = driverVehicle;
      this.createdAt = createdAt;
    }
}
