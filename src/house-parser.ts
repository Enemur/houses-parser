import { Houses } from './houses';
import { NumberType } from './number-type.enum';

export class HouseParser {
  private static patternForEven = /(четные)\s*(\d+-\d+|\d+\+|\d+)/i;
  private static patternForOdd = /(нечетные)\s*(\d+-\d+|\d+\+|\d+)/i;
  private static pattern = /(\d+-\d+|\d+\/\d+|\d+\+|\d+[а-я]+|\d+)/gi;
  private static pattern2 = /(нечетные|четные)\s*с\s*(\d+)\s*и\s*вся\s*улица\s*до\s*конца/i;

  private readonly houses: Houses = new Houses();

  constructor(
    private readonly source: string,
  ) {

    this.parse(source);
  }

  public isHouseIncluded(houseNumber: string): boolean {
    return this.houses.isInclude(houseNumber);
  }

  // region Private Methods

  private parse(source: string): void {
    const mathForPatter2 = source.match(HouseParser.pattern2);
    if (mathForPatter2 && mathForPatter2.length > 0) {
      const parityStr = mathForPatter2[1];
      const value = mathForPatter2[2];

      const parity = parityStr === 'четные' ? NumberType.Even : NumberType.Odd;
      this.houses.setNewHouse(`${value}+`, parity);
    }

    const tmpOdd = source.match(HouseParser.patternForOdd);
    if (tmpOdd && tmpOdd.length > 0) {
      const findStr = tmpOdd.shift();

      for (const val of tmpOdd) {
        this.houses.setNewHouse(val, NumberType.Odd);
      }

      source = source.replace(findStr!, '');
    }

    const tmpEven = source.match(HouseParser.patternForEven);
    if (tmpEven && tmpEven.length > 0) {
      const findStr = tmpEven.shift();

      for (const val of tmpEven) {
        this.houses.setNewHouse(val, NumberType.Even);
      }

      source = source.replace(findStr!, '');
    }

    const tmp = source.match(HouseParser.pattern);

    if (tmp) {
      for (const val of tmp) {
        this.houses.setNewHouse(val);
      }
    }
  }

  // endregion
}
