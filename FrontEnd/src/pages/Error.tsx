import error from "/Error.gif";
const Error: React.FC = () => {
	return (
		<>
			<div className="flex flex-col items-center justify-center h-screen text-center">
				<img title="error" src={error} className="w-32 " />
				<h1 className="text-6xl font-bold text-red-600">404</h1>

				<p className="text-xl mt-2 text-black">Page not found ❌</p>
				<a href="/" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
					Go Home
				</a>
			</div>
		</>
	);
};

export default Error;
