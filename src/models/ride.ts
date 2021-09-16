export default class Ride {
    rideId: number;

    driverName: string;

    driverVehicle: string;

    createdAt: string;

    constructor(rideId: number, driverName: string, driverVehicle: string, createdAt: string) {
      this.rideId = rideId;
      this.driverName = driverName;
      this.driverVehicle = driverVehicle;
      this.createdAt = createdAt;
    }
}
