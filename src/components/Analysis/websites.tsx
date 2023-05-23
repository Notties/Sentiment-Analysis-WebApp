import { CompassTwoTone, LinkOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Layout,
  Progress,
  Row,
  Space,
  Table,
  Tag,
  message,
  theme,
} from "antd";
import React, { useState } from "react";

const { Content, Footer } = Layout;

const websites = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [dataAPI, setdataAPI] = useState<any>([]);
  const [dataresult, setdataresult] = useState<any>([]);
  const [positivePercentage, setpositivePercentage] = useState<any>(0);
  const [neutralPercentage, setneutralPercentage] = useState<any>(0);
  const [negativePercentage, setnegativePercentage] = useState<any>(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [done, setdone] = useState(false);
  const textArray: { Text: string }[] = [];
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

  const calculate: any = () => {
    let total: any;
    let positiveCount = 0;
    let neutralCount = 0;
    let negativeCount = 0;
    if (dataresult && dataresult.data) {
      total = dataresult.data.length;
      dataresult.data.forEach((item: any, index: any) => {
        if (item.Sentiment === "positive") {
          positiveCount++;
        } else if (item.Sentiment === "neutral") {
          neutralCount++;
        } else if (item.Sentiment === "negative") {
          negativeCount++;
        }
      });
      setpositivePercentage(((positiveCount / total) * 100).toFixed(0));
      setneutralPercentage(((neutralCount / total) * 100).toFixed(0));
      setnegativePercentage(((negativeCount / total) * 100).toFixed(0));
    } else {
      setpositivePercentage(0);
      setneutralPercentage(0);
      setnegativePercentage(0);
    }
  };

  const renderSentiment = (value: string) => {
    let color = "";
    let sentiment = "";
    if (value === "positive") {
      sentiment = "Positive";
      color = "green";
    } else if (value === "negative") {
      sentiment = "Negative";
      color = "red";
    } else if (value === "neutral") {
      sentiment = "Neutral";
      color = "blue";
    }
    return <span style={{ color }}>{sentiment}</span>;
  };

  const sendAPIGetComment = async () => {
    console.log("form ", form.getFieldValue([]).Text.toString());
    try {
      message.loading("Fetching comments...", 90000);
      const res = await fetch("http://127.0.0.1:8000/scrapeComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: form.getFieldValue([]).Text.toString() }),
      });
      const result = await res.json();
      console.log("result", result);
      message.success("Fetching success!");
      message.destroy();
      const transformedData = await setdataApiToObject(result.data);
      setdataAPI(transformedData);
      setdone(true);
    } catch (error) {
      message.destroy();
      message.error("Fetching error!");
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (done) {
      sendAPI();
    }
  }, [done]);

  React.useEffect(() => {
    calculate()
  }, [dataresult && dataresult.data])

  const sendAPI = async () => {
    await dataAPI.forEach((item: any) => {
      if (item.Text) {
        textArray.push({ Text: item.Text });
      }
    });
    try {
      message.loading("Analyzing...", 10000);
      const res = await fetch("http://127.0.0.1:8000/predictObject/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: textArray }),
      });
      const result = await res.json();
      console.log("result", result);
      message.destroy();
      message.success("Analyzer success!");
      setdataresult(result);
    } catch (error) {
      message.destroy();
      message.error("Analyzer error!");
      console.error(error);
    }
  };

  const setdataApiToObject = (result: any) => {
    const transformedData = result.map((text: any) => ({ Text: text }));
    return transformedData;
  };

  console.log("dataAPI", dataAPI);

  const onFinish = () => {
    sendAPIGetComment();
  };

  const onFinishFailed = () => {
    message.warning("Please fill out URL");
  };

  return (
    <>
      <Layout style={{ backgroundColor: "#F0F2F5" }}>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Space
            direction="horizontal"
            size="middle"
            style={{ display: "flex", justifyContent: "end" }}
            align="center"
          >
            <Form.Item
              name="Text"
              rules={[
                { required: true, message: "Please fill out URL!" },
                {
                  type: "string",
                },
              ]}
            >
              <Input
                style={{ width: "100%", marginLeft: 16 }}
                size="large"
                addonBefore="URL"
                placeholder="https://"
                className="mt-5 flex"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                loading={!loadings}
                onClick={() => enterLoading(0)}
                htmlType="submit"
                style={{
                  background: "#1890ff",
                  borderColor: "#1890ff",
                  marginTop: 20,
                  marginRight: 16,
                  marginLeft: 16,
                }}
                size="large"
              >
                Fetching
              </Button>
            </Form.Item>
          </Space>
        </Form>

        <Content
          style={{
            margin: "24px 16px 0",
            background: colorBgContainer,
            borderRadius: "7px",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {!dataresult.data ? (
              <>
                <Table
                  style={{
                    height: "100vh",
                    left: 0,
                    top: 0,
                    position: "sticky",
                    bottom: 0,
                    background: colorBgContainer,
                  }}
                  columns={[
                    {
                      title: "Text",
                      dataIndex: "Text",
                      key: "Text",
                      width: "50%",
                    },
                    {
                      title: "Sentiment",
                      dataIndex: "Sentiment",
                      key: "Sentiment",
                      width: "25%",
                      render: renderSentiment, // Apply custom render function
                    },
                    {
                      title: "Percentage",
                      dataIndex: "Percentage",
                      key: "Percentage",
                      width: "25%",
                    },
                  ]}
                  dataSource={[]}
                  pagination={{
                    defaultCurrent: 1,
                    pageSizeOptions: [10, 50, 100],
                  }}
                  scroll={{ y: 540 }}
                />
              </>
            ) : (
              <>
                <div>
                  <Row justify={"space-between"}>
                    <p className={"font-semibold text-green-600"}>Positive</p>
                    <Space size={[0, 8]} wrap>
                      <Tag color={"green"}>{positivePercentage}%</Tag>
                    </Space>
                    <Progress
                      percent={positivePercentage}
                      status="success"
                      showInfo={false}
                    />
                  </Row>
                </div>
                <div>
                  <Row justify={"space-between"}>
                    <p className={"font-semibold text-blue-400"}>Neutral</p>
                    <Space size={[0, 8]} wrap>
                      <Tag color={"blue"}>{neutralPercentage}%</Tag>
                    </Space>
                    <Progress
                      percent={neutralPercentage}
                      status="normal"
                      showInfo={false}
                    />
                  </Row>
                </div>
                <div>
                  <Row justify={"space-between"}>
                    <p className={"font-semibold text-red-400"}>Negative</p>
                    <Space size={[0, 8]} wrap>
                      <Tag color={"red"}>{negativePercentage}%</Tag>
                    </Space>
                    <Progress
                      percent={negativePercentage}
                      status="exception"
                      showInfo={false}
                    />
                  </Row>
                </div>
                <Table
                  columns={[
                    {
                      title: "Text",
                      dataIndex: "Text",
                      key: "Text",
                      width: "50%",
                    },
                    {
                      title: "Sentiment",
                      dataIndex: "Sentiment",
                      key: "Sentiment",
                      width: "25%",
                      render: renderSentiment, // Apply custom render function
                    },
                    {
                      title: "Percentage",
                      dataIndex: "Percentage",
                      key: "Percentage",
                      width: "25%",
                    },
                  ]}
                  dataSource={dataresult.data}
                  pagination={{
                    defaultCurrent: 1,
                    pageSizeOptions: [10, 50, 100],
                  }}
                  scroll={{ y: 540 }}
                />
              </>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
};

export default websites;
