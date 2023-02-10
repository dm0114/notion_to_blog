import Date from "@/Components/Date";
import Layout from "@/Components/Layout"
import { IHomeProps } from "..";
import { getAllPostIds, getPostData } from '../../../lib/posts';

interface IParams {
  id: string;
}

// #getStaticPaths #getStaticProps
// 정적 페이지를 동적 라우팅 -> props를 메인 컴포넌트에 내리기
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({params}: {params: IParams}) {
  console.log(params.id);
  
  const postData = await getPostData(params.id);
  console.log(postData);
  
  return {
    props: {
      postData,
    },
  };
}


const Post = ({postData}: {postData: IHomeProps}) => {
  console.log(postData);
  
  
  return (
    <Layout>
      <article>
        <h1>{postData.title}</h1>
        <br />
        {postData.id}
        <br />
        <Date dateString={postData.date as string}/>
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml as string }} />
      </article>
    </Layout>
  )
}

export default Post