import { IoInformationCircleOutline, IoPeople } from "react-icons/io5";
import Chart from "../../../components/party/dashboard/Chart";

const Overview: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:grid grid-cols-3 stats shadow">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <IoInformationCircleOutline size={40} />
          </div>
          <div className="stat-title">Your Candidates</div>
          <div className="stat-value">200</div>
          <div className="stat-desc">
            All Candidates in your political party
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IoPeople size={40} />
          </div>
          <div className="stat-title">Contestants</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc">All Contestants on the system</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Voters</div>
          <div className="stat-value">38000</div>
          <div className="stat-desc">Total Registered Voters</div>
        </div>
      </div>
      <div className="mt-10 p-5 background-white border border-gray-200 rounded-md shadow">
        <Chart />
      </div>
    </div>
  );
};

export default Overview;
