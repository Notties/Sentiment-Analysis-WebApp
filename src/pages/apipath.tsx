import {
  Button,
  Card,
  Space,
  Tooltip,
  message,
  Tag,
  Typography,
  Divider,
  Layout,
  Affix,
} from "antd";
import { CopyTwoTone } from "@ant-design/icons";

const AboutPage = () => {
  const { Text, Title } = Typography;

  const predict = `{
    "text": "สวัสดี"
}`;

  const predictObject = `{
    "data": [
        {
            "Text": "ดีมากๆเลย สินค้านี้ไปหาซื้อกันได้นะ"
        },
        {
            "Text": "เสียดายเงินมาก"
        },
        {
            "Text": "สินค้านี้เหมือนจะดีนะ"
        }
    ]
}`;

  const Respredict = `{
    "status": "success",
    "data": {
        "sentiment": "neutral",
        "percentage": "56"
    }
}`;

  const RespredictObject = `{
    "status": "success",
    "data": [
        {
            "Text": "ดีมากๆเลย สินค้านี้ไปหาซื้อกันได้นะ",
            "Sentiment": "positive",
            "Percentage": "78"
        },
        {
            "Text": "เสียดายเงินมาก",
            "Sentiment": "negative",
            "Percentage": "98"
        },
        {
            "Text": "สินค้านี้เหมือนจะดีนะ",
            "Sentiment": "neutral",
            "Percentage": "63"
        }
    ]
}`;

  const handleCopy = () => {
    // Copy the source code to the clipboard
    navigator.clipboard.writeText(predict);
    message.success("Code copied to clipboard");
  };

  const handleCopyObject = () => {
    // Copy the source code to the clipboard
    navigator.clipboard.writeText(predictObject);
    message.success("Code copied to clipboard");
  };

  const title1 = (
    <>
      <Tag color={"green"}>POST</Tag> <span>http://127.0.0.1:8000/predict</span>
    </>
  );

  const title2 = (
    <>
      <Tag color={"green"}>POST</Tag>{" "}
      <span>http://127.0.0.1:8000/predictObject</span>
    </>
  );

  return (
    <>
      <div className="bg-[#F0F2F5] max-h-full">
        <Space
          direction="vertical"
          style={{ display: "flex", justifyContent: "center" }}
          align="center"
          wrap
        >
          <p
            className="text-[25px] self-center font-semibold whitespace-nowrap 
            bg-gradient-to-r from-blue-400 to-pink-400 inline-block text-transparent bg-clip-text text-center"
          >
            Sentiment Analysis Restful API
            <br />
            power by FastAPI
          </p>
          <Affix offsetTop={10}>
            <Card
              bordered={false}
              size="small"
              className="text-center sm:w-[500px] w-[350px]"
            >
              <p
                className="text-[16px] self-center font-semibold whitespace-nowrap 
            bg-gradient-to-r from-blue-400 to-pink-400 inline-block text-transparent bg-clip-text text-center"
              >
                Prediction Text
              </p>
            </Card>
          </Affix>
          <Card
            className="sm:w-[500px] w-[350px]"
            bordered={false}
            size="small"
            title={title1}
          >
            <Tag color={"default"} style={{ marginBottom: 5 }}>
              body -{">"} raw -{">"} json
            </Tag>
            <pre
              style={{ marginBottom: 0 }}
              className="bg-[#F9FAFC] rounded-lg px-5 pt-3 pb-3"
            >
              <code>{predict}</code>
            </pre>
            <Tooltip placement="top" title={"Copy"}>
              <Button
                type="dashed"
                onClick={handleCopy}
                style={{
                  position: "absolute",
                  top: 83,
                  right: 19,
                  paddingBottom: 10,
                  width: 28,
                  height: 28,
                }}
                size="small"
              >
                <CopyTwoTone />
              </Button>
            </Tooltip>
            <Tag color={"magenta"} style={{ marginTop: 5, marginBottom: 5 }}>
              Respone
            </Tag>
            <pre
              style={{ marginBottom: 0 }}
              className="bg-[#F9FAFC] rounded-lg px-5 pt-3 pb-3"
            >
              <code>{Respredict}</code>
            </pre>
          </Card>
          <Affix offsetTop={10}>
            <Card
              className="text-center sm:w-[500px] w-[350px]"
              bordered={false}
              size="small"
            >
              <p
                className="text-[16px] self-center font-semibold whitespace-nowrap 
            bg-gradient-to-r from-blue-400 to-pink-400 inline-block text-transparent bg-clip-text text-center"
              >
                Prediction Object
              </p>
            </Card>
          </Affix>
          <Card
            className="sm:w-[500px] w-[350px]"
            bordered={false}
            size="small"
            title={title2}
          >
            <Tag color={"default"} style={{ marginBottom: 5 }}>
              body -{">"} raw -{">"} json
            </Tag>
            <pre
              style={{ marginBottom: 0 }}
              className="bg-[#F9FAFC] rounded-lg px-5 pt-3 pb-3"
            >
              <code>{predictObject}</code>
            </pre>
            <Tooltip placement="top" title={"Copy"}>
              <Button
                type="dashed"
                onClick={handleCopyObject}
                style={{
                  position: "absolute",
                  top: 83,
                  right: 19,
                  paddingBottom: 10,
                  width: 28,
                  height: 28,
                }}
                size="small"
              >
                <CopyTwoTone />
              </Button>
            </Tooltip>
            <Tag color={"magenta"} style={{ marginTop: 5, marginBottom: 5 }}>
              Respone
            </Tag>
            <pre
              style={{ marginBottom: 0 }}
              className="bg-[#F9FAFC] rounded-lg px-5 pt-3 pb-3"
            >
              <code>{RespredictObject}</code>
            </pre>
          </Card>
        </Space>
      </div>
    </>
  );
};

export default AboutPage;
