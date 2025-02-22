export default function getRandomInt() {
  const MAX_INT32 = 2_147_483_647
  return Math.floor(Math.random() * MAX_INT32)
}
