import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next'
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
    params: { postId: postId.toString() },
  }))

  return { paths, fallback: 'blocking' }
}

export default PostPage
