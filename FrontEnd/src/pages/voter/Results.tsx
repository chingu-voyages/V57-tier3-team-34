import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type {
	ApiResponse,
	ElectionResultsDataType,
} from "../../types/ElectionResultsDataType";
import { generalServices } from "../../api/services/generalServices";

const Results = () => {
	const [activeTab, setActiveTab] = useState<string>("");
	const {
		isPending,
		error,
		data: results,
	} = useQuery<ApiResponse>({
		queryKey: ["electionResultsData"],
		queryFn: async () => await generalServices.getResults(),
	});

	const sortedResults = useMemo(() => {
		if (!results?.data) return {};

		setActiveTab(Object.keys(results.data)[0]);

		return Object.entries(results?.data as ElectionResultsDataType).reduce(
			(acc, [position, candidates]) => ({
				...acc,
				[position]: [...candidates].sort((a, b) => b.votes - a.votes),
			}),
			{} as ElectionResultsDataType,
		);
	}, [results]);

	if (isPending) return <p className="text-black">Loading...</p>;
	if (error)
		return <p className="text-black">An error has occured: {error.message}</p>;

	if (!Object.keys(sortedResults).length)
		return <p className="text-black">No data available</p>;

	return (
		<div className="text-black p-5">
			<div className="rounded-lg bg-gray-300 text-center py-20">
				<h1 className="text-4xl font-bold">Election 2026 - Results</h1>
			</div>

			<div className="tabs tabs-box bg-gray-600 rounded-lg mt-5 p-5">
				{/* GENERATE TABS DYNAMICALLY FROM `sortedResults` KEYS */}
				{Object.keys(sortedResults).map((position) => (
					<React.Fragment key={position}>
						<input
							type="radio"
							name="my_tabs_6"
							className="tab text-white transition-all"
							aria-label={position}
							checked={activeTab === position}
							onChange={() => setActiveTab(position)}
						/>

						{/* DISPLAY RESULTS FOR ACTIVE TAB */}
						<div className="tab-content mt-5">
							{activeTab === position &&
								sortedResults[activeTab]?.map((candidate, index) => (
									<div
										key={index}
										className={`border border-black rounded-lg p-5 bg-white ${
											index !== sortedResults[activeTab].length - 1 && "mb-3"
										}`}
									>
										<div className="flex items-center">
											<div className="w-10 h-10">
												<img
													src={candidate?.partyBanner ?? undefined}
													alt=""
													className="h-full w-full object-cover rounded-full"
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
											{candidate?.votes}{" "}
											{candidate?.votes === 1 ? "vote" : "votes"}
										</p>
									</div>
								))}
						</div>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default Results;
