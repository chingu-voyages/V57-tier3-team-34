import SideBar from "../../../components/party/dashboard/SideBar";

const Dashboard = () => {
  return (
    <div className="flex w-full">
      <div className="w-96 bg-gray-200/15 h-screen">
        <SideBar />
      </div>
      <div className="w-full">Mainboard</div>
    </div>
  );
};

export default Dashboard;
