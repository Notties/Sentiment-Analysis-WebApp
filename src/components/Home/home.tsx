import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Progress,
  Row,
  Space,
  Tag,
  message,
} from "antd";
import type { NextPage } from "next";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import useStore from "@/src/store/useStore";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { TextArea } = Input;
  const [loading, setLoading] = useState(true);
  const [userId, setuserId] = useState("");
  const [dataSentiment, setDataSentiment] = useState<any>({ data: "" });
  const [form] = Form.useForm();
  const { data: session } = useSession();

  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 1000);
  };

  async function GetUserId() {
    const res = await fetch("/api/userId", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(session?.user?.email as string),
    });
    const userId = await res.json();
    setuserId(userId.userId);
    return userId.userId;
  }

  const sendAPI = async () => {
    console.log("form ", form.getFieldValue([]).Text.toString());
    try {
      message.loading("Analyzing...");
      setLoading(false);
      const res = await fetch("https://c2b8-2403-6200-88a2-e015-6d9c-5547-3578-4d12.ngrok-free.app/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: form.getFieldValue([]).Text.toString() }),
      });
      const result = await res.json();
      console.log("result", result);
      message.destroy();
      message.success("Analyzer success!");
      setLoading(true);
      setDataSentiment(result);
    } catch (error) {
      message.destroy();
      message.error("Analyzer error!");
      setLoading(true);
      console.error(error);
    }
  };

  const onFinish = () => {
    sendAPI();
  };

  const onFinishFailed = () => {
    message.warning("Please fill out Text");
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
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  name="Text"
                  rules={[
                    { required: true, message: "Please fill out Text!" },
                    {
                      type: "string",
                    },
                  ]}
                >
                  <TextArea
                    name="Text"
                    placeholder="Type something :)"
                    allowClear
                    style={{ height: 150, resize: "none" }}
                    maxLength={500}
                    showCount
                  />
                </Form.Item>
                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      loading={!loading}
                      onClick={() => enterLoading(0)}
                      htmlType="submit"
                      style={{
                        background: "#1890ff",
                        borderColor: "#1890ff",
                      }}
                      size="large"
                    >
                      Analyzer
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} md={{ offset: "0", span: "10" }}>
            <Card title="Results" bordered={false} className="m-3">
              {!loading ? (
                <>
                  <Skeleton loading={!loading} active></Skeleton>
                </>
              ) : (
                <>
                  <div>
                    <Row justify={"space-between"}>
                      <p
                        className={`font-semibold ${
                          !dataSentiment.data.sentiment
                            ? "text-blue-400"
                            : dataSentiment.data.sentiment === "neutral"
                            ? "text-blue-400"
                            : dataSentiment.data.sentiment === "negative"
                            ? "text-red-400"
                            : "text-green-600"
                        }`}
                      >
                        {!dataSentiment.data.sentiment
                          ? "🤨 Neutral"
                          : dataSentiment.data.sentiment === "neutral"
                          ? "🤨 Neutral"
                          : dataSentiment.data.sentiment === "negative"
                          ? "☹️ Negative"
                          : "😄 Positive"}
                      </p>
                      <Space size={[0, 8]} wrap>
                        <Tag
                          color={
                            !dataSentiment.data.sentiment
                              ? "blue"
                              : dataSentiment.data.sentiment === "neutral"
                              ? "blue"
                              : dataSentiment.data.sentiment === "negative"
                              ? "red"
                              : "green"
                          }
                        >
                          {dataSentiment.data.percentage
                            ? dataSentiment.data.percentage
                            : 50}
                          %
                        </Tag>
                      </Space>
                      <Progress
                        percent={
                          dataSentiment.data.percentage
                            ? dataSentiment.data.percentage
                            : 50
                        }
                        status={
                          !dataSentiment.data.sentiment
                            ? "normal"
                            : dataSentiment.data.sentiment === "neutral"
                            ? "normal"
                            : dataSentiment.data.sentiment === "negative"
                            ? "exception"
                            : "success"
                        }
                        showInfo={false}
                      />
                    </Row>
                  </div>
                  {/* <Divider style={{ margin: "23px 0px" }} />
                  <Row justify={"space-between"}>
                    <p className="font-semibold text-gray-500 ">Intent</p>
                    <Space size={[0, 8]} wrap>
                      <Tag color="magenta">Request</Tag>
                      <Tag color="red">Sentiment</Tag>
                      <Tag color="volcano">Question</Tag>
                    </Space>
                  </Row>
                  <Divider style={{ margin: "23px 0px" }} /> */}
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
