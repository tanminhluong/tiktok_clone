import type { NextPage } from 'next'
import axios from "axios";
import { IVideo } from '../types';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';
import { BASE_URL } from '../utils';

interface IProps {
  videos: IVideo[]
}

const Home = ({videos} : IProps) => {

  console.log(videos)
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
         videos.map((video: IVideo) => (
          <VideoCard post={video} key={video._id}/>
         ))
      ) : (
        <NoResults text={'No video'} />
      )}
    </div>
  )
}

export const getServerSideProps = async ({query: {topic}} : {query: {topic : string}}) => {

  let res = null;
  if(topic){
    res = await axios.get(`${BASE_URL}/api/discover/${topic}`)
  } else {

    res = await axios.get(`${BASE_URL}/api/post`)
  }

  return {
    props: {
      videos: res.data
    }
  }
}

export default Home
