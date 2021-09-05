import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { useRouter } from 'next/router'
import React from "react"
import safeJsonStringify from 'safe-json-stringify'
import { Post } from '../../models/post'
import { sleep } from '../../utils/async'

type ContextParams = {
  postId: string;
};

type PageProps = {
  post: null | Post;
};


const PostPage: React.FC<PageProps> = (props: PageProps) => {
  const { post } = props;
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ul>
        {post?.id}. {post?.title ?? '-'}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, ContextParams> = async(context: GetStaticPropsContext) => {
  const { params } = context

  let postId: number = -1;
  if (typeof params?.postId == 'string') {
    postId = Number.parseInt(params.postId);
  }

  const post = await getPostByID({ postId });
  
  const stringifiedData = safeJsonStringify(post)
  const data = JSON.parse(stringifiedData)

  return {
    props: {
      post: data,
    },
  }
}

const getPostByID = async ({
  postId
}: {
  postId: number;
}): Promise<Post> => {
  return {
    id: postId,
    title: 'Hello',
  } as Post;
};

export const getStaticPaths: GetStaticPaths = async(_: GetStaticPathsContext) => {
  await sleep(10)
  const postsIds: number[] = [1,2,3]

  const paths = postsIds.map((postId) => ({
    // params 裡的 `postId` 會對應到 `[postId].tsx` 的 `[postId]`
    params: { postId: postId.toString() },
  }))

  return { 
    paths,
    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    fallback: 'blocking', 
  }
}

export default PostPage
