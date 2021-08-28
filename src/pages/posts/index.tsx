import Link from 'next/link';

const PostList = () => {
  const postIds = [1,2,3];
  return (
    <ul>
      {postIds.map((e) => <li key={e}>
        <Link href={`/posts/${e}`}>
          <a>
            文章 (ID: {e})
          </a>
        </Link>
      </li>)}
    </ul>
  )
}

export default PostList;