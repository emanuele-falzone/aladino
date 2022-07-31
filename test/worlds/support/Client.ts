import { Vehicle } from "../../../src/domain/Vehicle";

export class Client {
    private vehicleList: Vehicle[] = [];
    private error? : Error;
    
    receiveVehicleList(vehicleList: Vehicle[]) {
        this.vehicleList = vehicleList
    }

    confirmVehicleListIsEmpty() {
        assert(this.vehicleList.length == 0, "The vehicle is not empty");
    }

    confirmVehicleListContains(name: string, plate: string) {
        let result = false;
        for (let vehicle of this.vehicleList)          {
            if (vehicle.name == name && vehicle.plate == plate) {
                result = true;
            }
        }
        assert(result, `The vehicle list does not contain the vehicle ${name} with plate ${plate}`)
    }

    confirmVehicleListSize(length: number) {
        assert(this.vehicleList.length == length, `The vechicle list is not ${length} long: ${this.vehicleList}`)
    }

    confirmError() {
        assert(!!this.error, "No error has been thrown")
    }

    confirmNoError() {
        assert(!this.error, "Error has been thrown")
    }

    receiveError(error: Error) {
        this.error = error;
    }
}

function assert(value: boolean, message: string) {
    if (!value) {
        throw new Error(message);
    }
}