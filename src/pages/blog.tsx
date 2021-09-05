import { GetStaticProps, GetStaticPropsResult } from 'next'
import React from "react"
import safeJsonStringify from 'safe-json-stringify'
import { Post } from '../models/post'
import { sleep } from '../utils/async'

interface Props {
  title: string
  posts: Post[]
}

interface StaticProps {
  title: string
  posts: []
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

export const getStaticProps: GetStaticProps = async(context): Promise<GetStaticPropsResult<StaticProps>> => {
  // Call an external API (FAKE) endpoint to get posts
  await sleep(10)
  const posts: Post[] = [
    new Post(1, 'Next Generation'),
    new Post(2, 'Next JS'),
  ]
  
  const stringifiedData = safeJsonStringify(posts)
  const data = JSON.parse(stringifiedData)

  if (posts.length === 0) {
    return {
      notFound: true,
    }
  }

  if (posts.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      title: '部落格 👊',
      posts: data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

export default Blog
