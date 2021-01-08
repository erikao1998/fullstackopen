const x = 1
let y = 5
const t = [1, 2, 3]

const t2 = t.concat(5)

const m1 = t.map(value => value * 2)

const [first, ...rest] = t2

const olio = {
  name: 'Erika',
  age: 22,
  education: 'fil.yo'
}
olio.home = 'Espoo'

const sum = (p1, p2) => {
  return p1 + p2
}
const square = p => p * p

const object3 = {
  name: {
    first: 'Juha',
    last: 'Tauriainen',
  },
  grades: [2, 3, 5, 3],
  department: 'TKTL',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}

console.log('funktion summa', sum(1, 5))
console.log('p:n neliöjuuri on: ', square(4))
console.log(object3.parts[0].exercises, object3.parts[1].exercises, object3.parts[2].exercises)

console.log(first)
console.log(rest)
