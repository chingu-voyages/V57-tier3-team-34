import { useEffect, useState } from "react";
import { IoCheckmark, IoWarning, IoCheckmarkCircle } from "react-icons/io5";
import { electionServices } from "../../api/services/electionServices";
import type { Voteable } from "../../types";
import { getInitials } from "../../utils/getInitials";
import type {
	CandidateDataPostRequest,
	CandidateDataType,
} from "../../types/CandidateDataType";
import { toast } from "sonner";
import SuccessModal from "../../components/SuccessModal";
import FailureModal from "../../components/FailureModal";
import { useElectionData } from "../../api/hooks/useElectionData";
import LoadingState from "../../components/LoadingState";

const Election = () => {
	const [selectedCandidate, setSelectedCandidate] =
		useState<CandidateDataType | null>(null);
	const [showVoteModal, setShowVoteModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showFailureModal, setShowFailureModal] = useState(false);
	const [isVoting, setIsVoting] = useState(false);
	const [isVotingAllPositions, setIsVotingAllPositions] = useState(false);
	const [selectedPosition, setSelectedPosition] = useState<string>("Governor");
	const [allSelectedCandidates, setAllSelectedCandidates] = useState<
		CandidateDataPostRequest[]
	>([]);

	const handleVote = (candidate: CandidateDataType) => {
		setSelectedCandidate({
			candidateId: candidate.candidateId,
			candidateImage: candidate.candidateImage,
			candidateName: candidate.candidateName,
			electablePost: candidate.electablePost,
			electablePostId: candidate.electablePostId,
			isWinner: candidate.isWinner,
			partyBanner: candidate.partyBanner,
			partyId: candidate.partyId,
			partyName: candidate.partyName,
			votes: candidate.votes,
		});
		setShowVoteModal(true);
	};

	const confirmVote = async (candidateId: number, postId: number) => {
		setShowVoteModal(false);

		setAllSelectedCandidates([
			...allSelectedCandidates,
			{ candidateId: candidateId, postId: postId },
		]);
		toast.success("Candidate selected successfully");
	};

	const closeSuccessModal = () => {
		setShowSuccessModal(false);
	};

	const handleVoteAllPositions = async () => {
		setIsVotingAllPositions(false);
		setIsVoting(true);
		// Simulate API call
		try {
			const response = await electionServices.initiateVote(
				allSelectedCandidates,
			);
			console.log("response", response);
			if (response) setShowSuccessModal(true);
		} catch (error) {
			setShowFailureModal(true);
			console.log("error", error);
		} finally {
			setIsVoting(false);
			setSelectedCandidate(null);
			setAllSelectedCandidates([]);
		}
	};

	const todayDate = new Date().getFullYear();

	useEffect(() => {
		const fetchRefresh = async () => {
			await new Promise((resolve) => setTimeout(resolve, 3000));
			toast.error("Do not forget to click on Apply all Votes");
		};
		fetchRefresh();
	}, []);

	const { isLoading, data, error } = useElectionData();

	const totalCandidates = data?.data ? data?.data?.totalCandidates : 0;
	const totalPosts = data?.data ? data?.data?.totalPosts : 0;

	if (isLoading) {
		return <LoadingState />;
	}

	if (error) {
		return <div>Error</div>;
	}

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
									All Positions to Vote for
								</div>
							</div>
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
											className={`btn ${
												selectedPosition === position.postName
													? "btn-primary"
													: "btn-outline"
											}`}
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
				<div className="card bg-base-100 shadow-xl mb-8">
					<div className="card-body">
						<h2 className="card-title text-2xl mb-6">
							Candidates for {selectedPosition}
							<div className="badge badge-primary">
								{data?.data?.voteables[
									selectedPosition as keyof Voteable<CandidateDataType>
								]?.length || 0}{" "}
								candidates
							</div>
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{data?.data?.voteables[
								selectedPosition as keyof Voteable<CandidateDataType>
							]?.map((candidate) => (
								<div
									key={candidate.candidateId}
									className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow"
								>
									<div className="card-body">
										<div className="flex items-center gap-4 mb-4">
											<div className="avatar">
												<div className="bg-primary text-primary-content rounded-full w-24 text-center">
													<img
														src={candidate.candidateImage}
														alt={getInitials(candidate.candidateName)}
													/>
												</div>
											</div>
											<div className="text-center">
												<h3 className="card-title text-lg">
													{candidate.candidateName}
												</h3>
												<p className="text-sm opacity-70">
													{candidate.electablePost}
												</p>
												<p className="text-sm opacity-50">
													{candidate.partyName}
												</p>
											</div>
										</div>

										<div className="card-actions justify-end">
											<button
												className="btn btn-primary btn-sm"
												onClick={() => handleVote(candidate)}
											>
												<IoCheckmarkCircle size={16} />
												Vote for {candidate.candidateName}
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Vote All Positions */}
				<div className="card bg-base-100 shadow-xl mb-8">
					<div className="card-body">
						<h2 className="card-title text-2xl justify-center mb-4">
							Vote for All Selected Positions
						</h2>
						<div className="card-actions justify-center">
							<button
								className="btn btn-primary btn-xl"
								onClick={() => setIsVotingAllPositions(true)}
							>
								<IoCheckmarkCircle size={16} />
								Vote
							</button>
						</div>
					</div>
				</div>

				{/* Vote Confirmation Modal */}
				{showVoteModal && selectedCandidate && (
					<div className="modal modal-open">
						<div className="modal-box">
							<h3 className="font-bold text-lg mb-4">Select Candidate</h3>
							<div className="alert alert-warning mb-4">
								<IoWarning size={20} />
								<span>Please review your selection carefully.</span>
							</div>

							<div className="card bg-base-200 p-4 mb-4">
								<div className="flex items-center gap-3 flex-col">
									<div className="bg-primary text-primary-content rounded-lg w-52 text-center">
										<img
											src={selectedCandidate.candidateImage}
											alt={getInitials(selectedCandidate.candidateName)}
										/>
									</div>

									<div>
										<h4 className="font-bold">
											{selectedCandidate.candidateName}
										</h4>
										<p className="text-sm opacity-70">
											for {selectedCandidate.electablePost}
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
								<button
									className="btn btn-primary"
									onClick={() =>
										confirmVote(
											selectedCandidate.candidateId,
											selectedCandidate.electablePostId,
										)
									}
								>
									<IoCheckmark size={16} />
									Select Candidate
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Success Modal */}
				{showSuccessModal && (
					<SuccessModal closeSuccessModal={closeSuccessModal} />
				)}

				{showFailureModal && (
					<FailureModal closeFailureModal={() => setShowFailureModal(false)} />
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

				{isVotingAllPositions && (
					<div className="modal modal-open">
						<div className="modal-box text-center">
							<h3 className="font-bold text-lg">
								Are you sure you want to vote for all selected positions?
							</h3>
							<p>Please wait while we process your vote.</p>
							<div className="modal-action justify-center">
								<button
									className="btn btn-primary"
									onClick={() => handleVoteAllPositions()}
								>
									Yes
								</button>
								<button
									className="btn btn-outline"
									onClick={() => setIsVotingAllPositions(false)}
								>
									No
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Election;
