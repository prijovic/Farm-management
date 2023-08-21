export class JWT {
    constructor(
        public UserId: string,
        public email: string,
        public exp: number
    ) {
    }
}
