import { HouseParser } from './house-parser';

function main() {
  const houses = ['7/1', '9', '17', '15а', '100', '30', '999'];

  const houseParser1 = new HouseParser('7/1, 11, 17, 17/1, 17/2, 8/2, 15, 15/1, 15а');

  console.log('1');
  for (const val of houses) {
    const isInclude = houseParser1.isHouseIncluded(val);
    console.log(`${val}: ${isInclude}`);
  }

  const houseParser2 = new HouseParser('12, 22, 36, 42, 45, 100-106');

  console.log('2');
  for (const val of houses) {
    const isInclude = houseParser2.isHouseIncluded(val);
    console.log(`${val}: ${isInclude}`);
  }

  const houseParser3 = new HouseParser('четные2-28нечетные1-21');

  console.log('3');
  for (const val of houses) {
    const isInclude = houseParser3.isHouseIncluded(val);
    console.log(`${val}: ${isInclude}`);
  }

  const houseParser4 = new HouseParser('нечетные 11+, четные 42+');

  console.log('4');
  for (const val of houses) {
    const isInclude = houseParser4.isHouseIncluded(val);
    console.log(`${val}: ${isInclude}`);
  }

  const houseParser5 = new HouseParser('четные 2-28; нечетные 1-21');

  console.log('5');
  for (const val of houses) {
    const isInclude = houseParser5.isHouseIncluded(val);
    console.log(`${val}: ${isInclude}`);
  }

  const houseParser6 = new HouseParser('четные с 20 и вся улица до конца');

  console.log('6');
  for (const val of houses) {
    const isInclude = houseParser6.isHouseIncluded(val);
    console.log(`${val}: ${isInclude}`);
  }
}

main();
