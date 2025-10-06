import results from "../../data/results.json";
import { useState } from "react";

// interface CustomStyle extends React.CSSProperties {
// 	"--tab-color"?: string;
// 	"--tab-bg"?: string;
// }

const resultsForPresident = results?.data.President.sort(
  (a, b) => b.votes - a.votes
);

const resultsForAmbassador = results?.data.Ambassador.sort(
  (a, b) => b.votes - a.votes
);

const resultsForPrimeMinister = results?.data["Prime Minister"].sort(
  (a, b) => b.votes - a.votes
);

const Results = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="text-black p-5">
      <div className="rounded-lg bg-gray-300 text-center py-10">
        <h1 className="text-4xl font-bold">Election 2026 - Results</h1>
      </div>

      <div className="tabs tabs-box bg-gray-600 rounded-lg mt-5 p-5">
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          style={{ color: isChecked ? "#000000" : "#ffffff" }}
          onChange={(e) => {
            console.log("Changed");
            setIsChecked(e.target.checked);
          }}
          aria-label="President"
          defaultChecked
        />
        <div className="tab-content mt-5">
          {resultsForPresident.map((candidate, index) => (
            <div
              key={index}
              className={`border border-black rounded-lg p-5 bg-white ${
                index !== resultsForPresident.length - 1 && "mb-3"
              }`}
            >
              <div className="flex items-center">
                <div className="w-10 h-10">
                  <img
                    src={candidate?.partyBanner ?? undefined}
                    alt=""
                    className=""
                  />
                </div>
                <h1 className="ml-5 text-2xl">{candidate?.partyName}</h1>
              </div>

              <div className="flex items-center mt-5">
                <div className="w-10 h-10">
                  <img
                    src={candidate?.candidateImage}
                    alt=""
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <p className="ml-5">{candidate?.candidateName}</p>
              </div>

              <p className="text-right">
                {candidate?.votes} {candidate?.votes === 1 ? "vote" : "votes"}
              </p>
            </div>
          ))}
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          // style={{ color: isChecked ? "#000000" : "#ffffff" }}
          // onChange={(e) => setIsChecked(e.target.checked)}
          aria-label="Ambassador"
        />
        <div className="tab-content mt-5">
          {resultsForAmbassador.map((candidate, index) => (
            <div
              key={index}
              className={`border border-black rounded-lg p-5 bg-white ${
                index !== resultsForAmbassador.length - 1 && "mb-3"
              }`}
            >
              <div className="flex items-center">
                <div className="w-10 h-10">
                  <img
                    src={candidate?.partyBanner ?? undefined}
                    alt=""
                    className=""
                  />
                </div>
                <h1 className="ml-5 text-2xl">{candidate?.partyName}</h1>
              </div>

              <div className="flex items-center mt-5">
                <div className="w-10 h-10">
                  <img
                    src={candidate?.candidateImage}
                    alt=""
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <p className="ml-5">{candidate?.candidateName}</p>
              </div>

              <p className="text-right">
                {candidate?.votes} {candidate?.votes === 1 ? "vote" : "votes"}
              </p>
            </div>
          ))}
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          // style={{ color: isChecked ? "#000000" : "#ffffff" }}
          // onChange={(e) => setIsChecked(e.target.checked)}
          className="tab"
          aria-label="Prime Minister"
        />
        <div className="tab-content mt-5">
          {resultsForPrimeMinister.map((candidate, index) => (
            <div
              key={index}
              className={`border border-black rounded-lg p-5 bg-white ${
                index !== resultsForPrimeMinister.length - 1 && "mb-3"
              }`}
            >
              <div className="flex items-center">
                <div className="w-10 h-10">
                  <img
                    src={candidate?.partyBanner ?? undefined}
                    alt=""
                    className=""
                  />
                </div>
                <h1 className="ml-5 text-2xl">{candidate?.partyName}</h1>
              </div>

              <div className="flex items-center mt-5">
                <div className="w-10 h-10">
                  <img
                    src={candidate?.candidateImage}
                    alt=""
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <p className="ml-5">{candidate?.candidateName}</p>
              </div>

              <p className="text-right">
                {candidate?.votes} {candidate?.votes === 1 ? "vote" : "votes"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
