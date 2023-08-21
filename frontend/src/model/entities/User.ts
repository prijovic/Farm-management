import {Address} from "./Address";

export default class User {
    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public birthDate: Date,
        public email: string,
        public farmName: string,
        public address: Address
    ) {
    }
}
