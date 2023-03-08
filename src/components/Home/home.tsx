import { Button, Card, Col, Divider, Progress, Row, Space, Tag } from "antd";
import type { NextPage } from "next";
import { Typography, Input } from "antd";
import { useEffect, useState } from "react";
import { Avatar, Skeleton, Switch } from "antd";

const { Meta } = Card;

const Home: NextPage = () => {
  const { Title } = Typography;
  const { TextArea } = Input;

  const [loading, setLoading] = useState(true);

  // const onSubmit = () => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 500);
  // };
  const onSubmit = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  };

  return (
    <>
      <div className="bg-[#F0F2F5]">
        <Row>
          <Col xs={24} md={{ offset: "2", span: "10" }}>
            <Card
              title="Text Sentiment Analyzer"
              bordered={false}
              className="m-3"
            >
              <TextArea
                placeholder="Type something :)"
                allowClear
                style={{ height: 150, resize: "none" }}
                maxLength={255}
                showCount
              />
              <button
                className="flex sm:inline-flex justify-center items-center 
                bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring 
                ring-blue-300 text-white text-center rounded-md outline-none 
                transition duration-200 px-5 py-2 mt-5"
                onClick={onSubmit}
              >
                Analyzer
              </button>
            </Card>
          </Col>

          <Col xs={24} md={{ offset: "0", span: "10" }}>
            <Card title="Results" bordered={false} className="m-3">
              {!loading ? (
                <>
                  <Skeleton loading={!loading} active>
                  </Skeleton>
                </>
              ) : (
                <>
                  <div>
                    <Row justify={"space-between"}>
                      <p className="font-semibold text-gray-500 ">Positive</p>
                      <Space size={[0, 8]} wrap>
                        <Tag color="green">73%</Tag>
                      </Space>
                      <Progress
                        percent={73}
                        status="success"
                        showInfo={false}
                      />
                    </Row>
                  </div>
                  <Divider style={{ margin: "23px 0px" }} />
                  <Row justify={"space-between"}>
                    <p className="font-semibold text-gray-500 ">Intent</p>
                    <Space size={[0, 8]} wrap>
                      <Tag color="magenta">Request</Tag>
                      <Tag color="red">Sentiment</Tag>
                      <Tag color="volcano">Question</Tag>
                    </Space>
                  </Row>
                  <Divider style={{ margin: "23px 0px" }} />
                </>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
