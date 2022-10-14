
const UnconsciousEnergyToken = artifacts.require("UnconsciousEnergyToken");
//const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require('chai')
.use(require('chai-as-promised'))
.should()


contract('DecentralBank', ([owner, customer]) => {
    let unconsciousEnergyToken, decentralBank

    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        // Load Contracts
        
        unconsciousEnergyToken = await UnconsciousEnergyToken.new()
        decentralBank = await DecentralBank.new(unconsciousEnergyToken.address)

        // Transfer all tokens to DecentralBank (1 million)
        await unconsciousEnergyToken.transfer(decentralBank.address, tokens('1000000'))

        // Transfer 100 mock Tethers to Customer
        await unconsciousEnergyToken.transfer(customer, tokens('100'), {from: owner})
    })
    

    describe('Unconscious Energy Token Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await unconsciousEnergyToken.name()
            assert.equal(name, 'Unconscious Energy Token') 
        })
    })


    describe('Decentral Bank Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank') 
        })

        it('contract has tokens', async () => {
            let balance = await unconsciousEnergyToken.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })

    /*describe('Yield Farming', async () => {
        it('rewards tokens for staking', async () => {
            let result

            // Check Investor Balance
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance before staking')
            
            // Check Staking For Customer of 100 tokens
            await tether.approve(decentralBank.address, tokens('100'), {from: customer})
            await decentralBank.depositTokens(tokens('100'), {from: customer})

            // Check Updated Balance of Customer
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('0'), 'customer mock wallet balance after staking 100 tokens')     
            
            // Check Updated Balance of Decentral Bank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('100'), 'decentral bank mock wallet balance after staking from customer')     
            
            // Is Staking Update
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'true', 'customer is staking status after staking')

            // Issue Tokens
            await decentralBank.issueTokens({from: owner})

            // Ensure Only The Owner Can Issue Tokens
            await decentralBank.issueTokens({from: customer}).should.be.rejected;

            // Unstake Tokens
            await decentralBank.unstakeTokens({from: customer})

            // Check Unstaking Balances

            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance after unstaking')     
            
            // Check Updated Balance of Decentral Bank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('0'), 'decentral bank mock wallet balance after staking from customer')     
            
            // Is Staking Update
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'false', 'customer is no longer staking after unstaking')
        })
    })*/
    })
})