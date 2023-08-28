import { Location } from "./Location";

export class Parcel {
  constructor(
    public id: string,
    public creationDate: string,
    public lastEditDate: string,
    public name: string,
    public number: number,
    public size: number,
    public polygon: Location[],
    public plannedOperations: number,
    public inProgressOperations: number,
    public finishedOperations: number,
  ) {}

  public static sortPolygon(polygon: Location[]) {
    polygon.sort((a, b) => a.index - b.index);
  }
}
