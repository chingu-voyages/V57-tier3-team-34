const LoadingState = () => {
	return (
		<div className="flex flex-col">
			<div className="flex flex-col md:grid grid-cols-3 stats shadow gap-5">
				<div className="skeleton h-40"></div>
				<div className="skeleton h-40"></div>
				<div className="skeleton h-40"></div>
			</div>
		</div>
	);
};

export default LoadingState;
