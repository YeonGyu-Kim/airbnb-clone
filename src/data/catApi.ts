export async function getCat() {
  return await fetch('https://meowfacts.herokuapp.com')
    .then((res) => res.json())
    .then((data) => data?.data[0]);
}
