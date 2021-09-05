import { GetServerSideProps } from 'next'
import Link from 'next/link';

const ProductList = (props: any) => {
  const { productIds } = props;
  return (
    <ul>
      {productIds.map((e: any) => <li key={e}>
        <Link href={`/products/${e}`}>
          <a>
            產品 (ID: {e})
          </a>
        </Link>
      </li>)}
    </ul>
  )
}

export const getServerSideProps: GetServerSideProps = async(context: any) => {
  return {
    // will be passed to the page component as props
    props: {
      productIds: [1, 2, 3, 4, 5],
    },
  }
}

export default ProductList;