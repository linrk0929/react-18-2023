import { useEffect, useState } from 'react'
import { getChannelAPI  } from '@/apis/article'

function useChannel() { 


 const [channelList, setChannelList] = useState([])
  
  useEffect(() => { 
   const fetchchannels = async () => { 
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    fetchchannels()
  
  }, [])


    return (
        channelList
    )

}
export { useChannel}
