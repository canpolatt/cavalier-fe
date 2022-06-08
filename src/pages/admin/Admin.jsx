import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import { getMessage } from "../../api/messageApi";
import { getChartIncome } from "../../api/chartApi";

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [chartIncome, setChartIncome] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMessage(), getChartIncome()])
      .then((res) => {
        setMessages(res[0]);
        setChartIncome(res[1]);
        setLoading(false);
      })
      .catch((e) => console.log(e.message));
  }, []);

  return (

    <div className="home">

      <div className="homeContainer">
 
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order"/>
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart
            title="Last 6 Months (Revenue)"
            aspect={2 / 1}
            chartIncome={chartIncome}
          />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table
            messages={messages}
            loading={loading}
            chartIncome={chartIncome}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
