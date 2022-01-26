import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Moralis from 'moralis'

const serverUrl = 'https://zypbvrbwqkqp.usemoralis.com:2053/server'
const appId = 'N8D4NjBe7sq4R691w27ZhGz0BeQXnHBREC2CfBIM'
Moralis.start({ serverUrl, appId })

const Home: NextPage = () => {
  const [nfts, setNfts] = useState<any>()

  const login = async () => {
    let user: any = Moralis.User.current()
    if (!user) {
      user = await Moralis.authenticate({
        signingMessage: 'Log in using Moralis',
      })
        .then((user: any) => {
          console.log('logged in user:', user)
          console.log(user.get('ethAddress'))
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  }

  const fetchUserNFTs = async () => {
    const options: any = {
      chain: 'rinkeby',
      address: '0x3eb9c5B92Cb655f2769b5718D33f72E23B807D24',
    }
    const nfts = await Moralis.Web3API.account.getNFTs(options)
    setNfts(nfts)
    console.log('fetched nfts')
  }

  const parseNFTData = async () => {
    if (nfts) {
      nfts.result.map(async (nft: any) => {
        const data = nft.token_uri
        const json = Buffer.from(data.substring(29), 'base64').toString()
        const result = JSON.parse(json)
        console.log(result)
      })
    }
  }

  useEffect(() => {
    login()
    fetchUserNFTs()
  }, [])

  return (
    <div className="flex justify-center">
      <button onClick={parseNFTData}>fetch metadata</button>
    </div>
  )
}

export default Home
