import { useEffect, useState } from "react";
import {
	IoCheckmark,
	IoWarning,
	IoLocation,
	IoMail,
	IoCall,
	IoCheckmarkCircle,
} from "react-icons/io5";
import candidatesData from "../../data/candidates.json";
import { electionService } from "../../api/services/electionService";
import type { ElectionResponse } from "../../types";

interface Candidate {
	id: number;
	name: string;
	phone: string;
	email: string;
	politicalPost: string;
	region: string;
}

interface VoteData {
	candidateId: number;
	candidateName: string;
	position: string;
}

const Election = () => {
	const [selectedCandidate, setSelectedCandidate] = useState<VoteData | null>(
		null,
	);
	const [showVoteModal, setShowVoteModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [isVoting, setIsVoting] = useState(false);
	const [selectedPosition, setSelectedPosition] = useState<string>("Governor");
	const [data, setData] = useState<ElectionResponse | null>(null);

	// Group candidates by position
	const candidatesByPosition = candidatesData.reduce(
		(acc, candidate) => {
			if (!acc[candidate.politicalPost]) {
				acc[candidate.politicalPost] = [];
			}
			acc[candidate.politicalPost].push(candidate);
			return acc;
		},
		{} as Record<string, Candidate[]>,
	);

	// const positions = Object.keys(candidatesByPosition);

	const handleVote = (candidate: Candidate) => {
		setSelectedCandidate({
			candidateId: candidate.id,
			candidateName: candidate.name,
			position: candidate.politicalPost,
		});
		setShowVoteModal(true);
	};

	const confirmVote = async () => {
		setIsVoting(true);
		setShowVoteModal(false);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setIsVoting(false);
		setShowSuccessModal(true);
		setSelectedCandidate(null);
	};

	const closeSuccessModal = () => {
		setShowSuccessModal(false);
	};

	const todayDate = new Date().getFullYear();

	useEffect(() => {
		const fetchData = async () => {
			const data = await electionService.getElections();
			console.log("Elections data: ", data);
			setData(data);
		};
		fetchData();
	}, []);

	// console.log("Elections data: ", Object.keys(data?.data ? data?.data?.voteables : {}));

	const totalCandidates = data?.data ? data?.data?.totalCandidates : 0;
	const totalPosts = data?.data ? data?.data?.totalPosts : 0;
	// const positions = data?.data ? data?.data?.posts : 0;
	// const positions = data?.data ? data?.data?.voteables[`${selectedPosition}`] : {};
	return (
		<div className="min-h-screen bg-base-200 p-4">
			<div className="max-w-7xl mx-auto">
				{/* Header Section */}
				<div className="mb-8">
					<div className="hero bg-gradient-to-r from-primary to-secondary text-primary-content rounded-2xl">
						<div className="hero-content text-center">
							<div className="max-w-md">
								<h1 className="text-5xl font-bold flex items-center justify-center gap-3">
									<IoCheckmarkCircle size={50} />
									Election @ {todayDate}
								</h1>
								<p className="py-6 text-lg">
									Cast your vote for the future of our nation. Every vote
									counts!
								</p>
								{/* <div className="flex justify-center gap-4 text-sm">
									<div className="flex items-center gap-2">
										<IoTime />
										<span>Voting ends in 2 days</span>
									</div>
									<div className="flex items-center gap-2">
										<IoLocation />
										<span>National Elections</span>
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>

				{/* Election Status Card */}
				<div className="card bg-base-100 shadow-xl mb-8">
					<div className="card-body">
						<h2 className="card-title text-2xl mb-4">Election Information</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="stat bg-primary text-primary-content rounded-lg">
								<div className="stat-title text-primary-content">
									Total Candidates
								</div>
								<div className="stat-value">{totalCandidates}</div>
								<div className="stat-desc text-primary-content">
									Across all positions
								</div>
							</div>
							<div className="stat bg-secondary text-secondary-content rounded-lg">
								<div className="stat-title text-secondary-content">
									Positions
								</div>
								<div className="stat-value">{totalPosts}</div>
								<div className="stat-desc text-secondary-content">
									Available to vote
								</div>
							</div>
							{/* <div className="stat bg-accent text-accent-content rounded-lg">
								<div className="stat-title text-accent-content">
									Your Status
								</div>
								<div className="stat-value text-lg">Eligible</div>
								<div className="stat-desc text-accent-content">
									Ready to vote
								</div>
							</div> */}
						</div>
					</div>
				</div>

				{/* Position Selector */}
				<div className="card bg-base-100 shadow-xl mb-8">
					<div className="card-body">
						<h2 className="card-title text-2xl mb-4">
							Select Position to Vote
						</h2>
						<div className="flex flex-wrap gap-2">
							{data?.data
								? data?.data?.posts.map((position) => (
										<button
											key={position.id}
											className={`btn ${selectedPosition === position.postName ? "btn-primary" : "btn-outline"}`}
											onClick={() => setSelectedPosition(position.postName)}
										>
											{position.postName}
										</button>
									))
								: null}
						</div>
					</div>
				</div>

				{/* Candidates for Selected Position */}
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title text-2xl mb-6">
							Candidates for {selectedPosition}
							<div className="badge badge-primary">
								{candidatesByPosition[selectedPosition]?.length || 0} candidates
							</div>
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{candidatesByPosition[selectedPosition]?.map((candidate) => (
								<div
									key={candidate.id}
									className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow"
								>
									<div className="card-body">
										<div className="flex items-center gap-4 mb-4">
											<div className="avatar placeholder">
												<div className="bg-primary text-primary-content rounded-full w-16">
													<span className="text-xl font-bold">
														{candidate.name
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</span>
												</div>
											</div>
											<div>
												<h3 className="card-title text-lg">{candidate.name}</h3>
												<p className="text-sm opacity-70">
													{candidate.politicalPost}
												</p>
											</div>
										</div>

										<div className="space-y-2 mb-4">
											<div className="flex items-center gap-2 text-sm">
												<IoLocation size={16} />
												<span>{candidate.region}</span>
											</div>
											<div className="flex items-center gap-2 text-sm">
												<IoMail size={16} />
												<span className="truncate">{candidate.email}</span>
											</div>
											<div className="flex items-center gap-2 text-sm">
												<IoCall size={16} />
												<span>{candidate.phone}</span>
											</div>
										</div>

										<div className="card-actions justify-end">
											<button
												className="btn btn-primary btn-sm"
												onClick={() => handleVote(candidate)}
											>
												<IoCheckmarkCircle size={16} />
												Vote for {candidate.name.split(" ")[0]}
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Vote Confirmation Modal */}
				{showVoteModal && selectedCandidate && (
					<div className="modal modal-open">
						<div className="modal-box">
							<h3 className="font-bold text-lg mb-4">Confirm Your Vote</h3>
							<div className="alert alert-warning mb-4">
								<IoWarning size={20} />
								<span>
									This action cannot be undone. Please review your selection
									carefully.
								</span>
							</div>

							<div className="card bg-base-200 p-4 mb-4">
								<div className="flex items-center gap-3">
									<div className="avatar placeholder">
										<div className="bg-primary text-primary-content rounded-full w-12">
											<span className="text-sm font-bold">
												{selectedCandidate.candidateName
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</span>
										</div>
									</div>
									<div>
										<h4 className="font-bold">
											{selectedCandidate.candidateName}
										</h4>
										<p className="text-sm opacity-70">
											for {selectedCandidate.position}
										</p>
									</div>
								</div>
							</div>

							<div className="modal-action">
								<button
									className="btn btn-outline"
									onClick={() => setShowVoteModal(false)}
								>
									Cancel
								</button>
								<button className="btn btn-primary" onClick={confirmVote}>
									<IoCheckmark size={16} />
									Confirm Vote
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Success Modal */}
				{showSuccessModal && (
					<div className="modal modal-open">
						<div className="modal-box text-center">
							<div className="flex justify-center mb-4">
								<div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
									<IoCheckmark size={32} className="text-success-content" />
								</div>
							</div>
							<h3 className="font-bold text-lg mb-2">
								Vote Submitted Successfully!
							</h3>
							<p className="mb-4">
								Thank you for participating in the democratic process. Your vote
								has been recorded.
							</p>
							<div className="modal-action justify-center">
								<button className="btn btn-primary" onClick={closeSuccessModal}>
									Continue
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Loading Overlay */}
				{isVoting && (
					<div className="modal modal-open">
						<div className="modal-box text-center">
							<span className="loading loading-spinner loading-lg mb-4"></span>
							<h3 className="font-bold text-lg">Submitting your vote...</h3>
							<p>Please wait while we process your vote.</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Election;
