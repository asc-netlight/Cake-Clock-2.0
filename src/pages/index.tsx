import DemoComponent from "components/DemoComponent/DemoComponent";
import { GetStaticProps, NextPage } from "next";

type Props = {
  buildTime: number;
};

const IndexPage: NextPage<Props> = ({ buildTime }) => {
  return <DemoComponent buildTime={buildTime} />;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      buildTime: Date.now()
    }
  };
};

export default IndexPage;
