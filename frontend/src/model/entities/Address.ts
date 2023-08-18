export class Address {
    constructor(
        public country: string,
        public place: string,
        public postalCode: string,
        public street: string,
        public number: string,
    ) {
    }

    public toString() {
        return this.street + " " + this.number + ", " + this.place + ", " + this.postalCode + ", " + this.country;
    }
}
