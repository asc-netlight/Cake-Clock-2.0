import CakeClockComponent from "../components/CakeClockComponent/CakeClockComponent"
import { GetStaticProps, NextPage } from "next";

type Props = {
  buildTime: number;
};

const IndexPage: NextPage<Props> = ({ buildTime }) => {
  return <CakeClockComponent />;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      buildTime: Date.now()
    }
  };
};

export default IndexPage;
