require('dotenv').config();
const Web3 = require('web3')

const web3 = new Web3(process.env.RPC_PROVIDER)

const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(process.env.DISCORD_WEBHOOK);

const abis = require('./assets/abis.json')
const addresses = require('./assets/addresses.json')

var axios = require('axios');

var lastBlock = 0

var config = {
  method: 'get',
  url: `${process.env.ALEPH_ENDPOINT}/cache/get/${process.env.ALEPH_KEY}`
};


axios(config)
.then(function (response) {
    lastBlock = response.data
    if (!lastBlock) lastBlock = 0
    console.log(lastBlock)
})
.catch(function (error) {
  console.log(error);
});
  

async function tracer() {
    const JoeFactoryContract = new web3.eth.Contract(abis.JoeFactory, addresses.JoeFactory)
    
    await JoeFactoryContract.getPastEvents('PairCreated', { // Using an array means OR: e.g. 20 or 23
        fromBlock: parseInt(lastBlock),
        toBlock: 'latest'
    })
    .then( (events) => {
        events.forEach(async element => {
            console.log("enter")
            lastBlock = element.blockNumber
            console.log(element.blockNumber)

            const tokenA = new web3.eth.Contract(abis.ERC20, element.returnValues.token1)
            const tokenB = new web3.eth.Contract(abis.ERC20, element.returnValues.token0)

            const tokenAName = await tokenA.methods.name().call()
            const tokenBName = await tokenB.methods.name().call()
            const pairAddress = "https://snowtrace.io/address/" + element.returnValues.pair
            const tx = element.transactionHash

            const embed = new MessageBuilder()
            .setTitle('New Pair Created! 🚨')
            .setURL(pairAddress)
            .addField('TOKEN A', `${tokenAName}: ${element.returnValues.token1}`, true)
            .addField('TOKEN A', `${tokenBName}: ${element.returnValues.token0}`, true)
            .setColor('#00b0f4')
            .setDescription(`La pair c'est par ici ${pairAddress}`)
            .setFooter(`Transaction ${tx}`)
            hook.send(embed)

            // var setLastBlock = {
            //     method: 'get',
            //     url: `${process.env.ALEPH_ENDPOINT}/cache/set/${process.env.ALEPH_KEY}/${lastBlock}`
            // };

            // await axios(setLastBlock)
            // .then(function (response) {
            //     lastBlock = response.data
            // })
            // .catch(function (error) {
            //     console.log(error);
            // });
        });
    })
    
}

tracer()