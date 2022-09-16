// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../utils/queries'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "GET"){
 
    const {userId} = req.query
    const query = singleUserQuery(userId)
    const userVideosQuery = userCreatedPostsQuery(userId)
    const userLikedVideosQuery = userLikedPostsQuery(userId)
    const data = await client.fetch(query)
    const userVideos = await client.fetch(userVideosQuery)
    const userLikedVideos = await client.fetch(userLikedVideosQuery)

    res.status(200).json({user: data[0], userVideos, userLikedVideos})
  }
}
