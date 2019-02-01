///////////////////////////////
// MAM: Fetch messages to Public Stream
///////////////////////////////

const Mam = require('@iota/mam')
const { trytesToAscii } = require('@iota/converter')

// Initialize MAM State - PUBLIC
Mam.init('https://nodes.devnet.thetangle.org:443')

if (!process.argv[2]) return console.log('No Address!')

// Display coordinate data on our screen when we receive it
const showData = raw => {
  const data = trytesToAscii(raw)
  console.log(data)
}

const readMam = async root => {
  try {
    await Mam.fetch(root, 'public', null, showData)
  } catch (e) {
    console.log(e)
  }
}

// const readMam = async root => {
//   try {
//     // Fetch a single tx
//     const data = await Mam.fetchSingle(root, 'public')
//     // Console long that Data
//     showData(data.payload)
//     // Set that as the latest address
//     latestAddress = data.payload
//     // Self invoke the function again
//     readMam(data.nextRoot)
//   } catch (e) {
//     return console.log('Reached end of stream')
//   }
// }

let active = false
let latestAddress = process.argv[2]

setInterval(async () => {
  if (active) return
  active = true
  await readMam(latestAddress)
  active = false
}, 5000)
