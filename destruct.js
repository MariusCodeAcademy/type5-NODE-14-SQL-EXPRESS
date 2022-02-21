const myArr = ['james', 'Blue', 15];

// destrukturizacija masyvo
const [pirma, antra, trecia] = myArr;

// const pirma = myArr['pirma']

console.log('pirma, antra, trecia ===', pirma, antra, trecia);

const user = {
  name: 'mike',
  age: 50,
};
// destrukturizacija objekto
const { name, age } = user;
