beforeAll(async function () {
  const near = await nearlib.connect(nearConfig)
  window.accountId = nearConfig.contractName
  window.contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ['getGreeting'],
    changeMethods: [],
    sender: window.accountId
  })

  window.walletConnection = {
    requestSignIn() {
    },
    signOut() {
    },
    isSignedIn() {
      return true
    },
    getAccountId() {
      return window.accountId
    }
  }
})

test('getGreeting', async () => {
  const message = await window.contract.getGreeting({ accountId: window.accountId })
  expect(message).toEqual('Hello')
})
