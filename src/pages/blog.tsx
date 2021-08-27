import { GetStaticPropsResult } from 'next'
import React from "react"
import safeJsonStringify from 'safe-json-stringify'
import { sleep } from '../utils/async'

interface Props {
  title: string
  posts: Post[]
}

interface StaticProps {
  title: string
  posts: []
}

class Post {
  constructor(title: string) {
    this.title = title
  }

  title: string
}

const Blog: React.FC<Props> = (props: Props) => {
  const { posts } = props;
  return (
    <>
      <ul>
        {props.title}
        {posts.map((post, index) => (
          <li key={index}>{index}. {post.title}</li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps = async(): Promise<GetStaticPropsResult<StaticProps>> => {
  // Call an external API (FAKE) endpoint to get posts
  await sleep(10);
  const posts: Post[] = [
    new Post('Next Generation'),
    new Post('Next JS'),
  ]
  
  const stringifiedData = safeJsonStringify(posts)
  const data = JSON.parse(stringifiedData)

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      title: '部落格 👊',
      posts: data,
    },
  }
}

export default Blog