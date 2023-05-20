import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import useStore from "../store/useStore";
import { Table } from "antd";

interface DataItem {
  id: string;
  userId: string;
  filename: string;
  text: string;
  sentiment: string;
  percentage: string;
}

const AboutPage = () => {
  const { data: session } = useSession();
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setloading] = useState(true);
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserID = async () => {
      if (session && session.user && session.user.email) {
        const email = {
          email: session.user.email,
        };

        const res = await fetch("/api/userId", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(email),
        });

        const data = await res.json();
        setUserID(data.userId);
        console.log("userID: ", data.userId);
      }
    };

    fetchUserID();
    
    return () => {
      // Cleanup code (if any)
    };
  }, [session]);

  useEffect(() => {
    let interval: any;
    if (userID) {
      interval = setInterval(fetchObjectCSVData, 3000);
    }
    return () => {
      clearInterval(interval); // Cleanup the interval when the component unmounts
    };
  }, [userID]);

  const fetchObjectCSVData = async () => {
    try {
      const res = await fetch(`/api/objectcsv?userId=${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await res.json();
      console.log("jsonData", jsonData);
      setData(jsonData);
      setloading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetDataClick = () => {
    fetchObjectCSVData();
  };

  useEffect(() => {
    console.log("data:", data);
  }, [data]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Filename",
      dataIndex: "filename",
      key: "filename",
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Sentiment",
      dataIndex: "sentiment",
      key: "sentiment",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
    },
  ];

  return (
    <>
      <button
        className="flex sm:inline-flex justify-center items-center 
          bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring 
          ring-blue-300 text-white text-center rounded-md outline-none 
          transition duration-200 px-5 py-2 mt-5"
        onClick={handleGetDataClick}
      >
        Get data
      </button>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          defaultCurrent: 1,
          pageSizeOptions: [10, 50, 100],
        }}
        loading={loading}
        scroll={{ y: 540 }}
      />
    </>
  );
};

export default AboutPage;
