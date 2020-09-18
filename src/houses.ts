import { NumberType } from './number-type.enum';

export class Houses {
  private readonly odd: { min: number; max: number }[] = [];
  private readonly even: { min: number; max: number }[] = [];

  private houses: Set<string> = new Set<string>();

  public setNewHouse(house: string, type?: NumberType): void {
    if (house.includes('+')) {
      const num = +(house.replace('+', ''));
      if (isNaN(num)) {
        throw new Error('Incorrect value');
      }

      if (type) {
        if (type === NumberType.Even) {
          this.even.push({ min: num, max: Infinity });
        } else {
          this.odd.push({ min: num, max: Infinity });
        }
      } else {
        if (num % 2 == 0) {
          this.even.push({ min: num, max: Infinity });
        } else {
          this.odd.push({ min: num, max: Infinity });
        }
      }

    } else if (house.includes('-')) {
      const numbers = house.split('-');
      if (numbers.length !== 2) {
        throw new Error('Incorrect value');
      }

      const min = +numbers[0];
      const max = +numbers[1];

      if (isNaN(min) || isNaN(max)) {
        throw new Error('Incorrect value');
      }

      if (max < min) {
        throw new Error('Incorrect range');
      }

      if (type) {
        if (type === NumberType.Even) {
          this.even.push({ min, max });
        } else {
          this.odd.push({ min, max });
        }
      } else {
        this.odd.push({ min, max });
        this.even.push({ min, max });
      }
    } else {
      const num = +(house);
      if (isNaN(num)) {
        this.houses.add(house);
      } else {
        if (num % 2 == 0) {
          for (const val of this.even) {
            if (val.min <= num && val.max >= num) {
              return;
            }
          }

          this.even.push({ min: num, max: num });
        } else {
          for (const val of this.odd) {
            if (val.min <= num && val.max >= num) {
              return;
            }
          }

          this.odd.push({ min: num, max: num });
        }
      }
    }
  }

  public isInclude(house: string): boolean {
    if (this.houses.has(house)) {
      return true;
    }

    const num = +(house);
    if (isNaN(num)) {
      return false;
    }

    if (num % 2 == 0) {
      for (const val of this.even) {
        if (val.min <= num && val.max >= num) {
          return true;
        }
      }
    } else {
      for (const val of this.odd) {
        if (val.min <= num && val.max >= num) {
          return true;
        }
      }
    }

    return false;
  }
}
