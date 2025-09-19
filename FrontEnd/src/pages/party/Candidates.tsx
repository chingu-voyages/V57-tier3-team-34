import {
  IoAddCircleOutline,
  IoCaretDown,
  IoCheckmark,
  IoCopyOutline,
  IoEye,
  IoPencilOutline,
  IoSearchOutline,
  IoTrashOutline,
} from "react-icons/io5";
import mockData from "../../data/candidates.json";
import { useState } from "react";

const Candidates: React.FC = () => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [animate, setAnimate] = useState<string>("");
  const [copiedId, setCopiedId] = useState<number | undefined | string>(
    undefined
  );

  const copyToClipBoard = (text: string, key: number | string) => {
    navigator.clipboard.writeText(text);

    setAnimate("opacity-0");
    setShowToast(true);
    setCopiedId(key);

    requestAnimationFrame(() => {
      setAnimate("opacity-100 transition-opacity duration-500");
    });

    setTimeout(function () {
      setAnimate("opacity-0 transition-opacity duration-500");
    }, 2500);
    setTimeout(() => {
      setShowToast(false);
      setCopiedId(undefined);
    }, 3000);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">My Candidates</h2>
      </div>
      <div className="action-section flex items-center justify-between">
        <div>
          <label className="input validator">
            <IoSearchOutline size={15} />
            <input
              type="text"
              className="max-w-64 input-md"
              placeholder="Search..."
            />
          </label>
        </div>
        <div>
          <button className="btn btn-primary">
            <IoAddCircleOutline size={20} />
            Add Candidate
          </button>
        </div>
      </div>
      <div className="divider"></div>
      <div className="overflow-x-auto h-[660px]">
        <table className="table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Phone</td>
              <td>Email</td>
              <td>Post</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {mockData.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{candidate.name}</div>
                      <div className="text-sm opacity-50">
                        {candidate.region}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    {candidate.email}
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        copyToClipBoard(candidate.email, candidate.id)
                      }
                    >
                      {copiedId === candidate.id ? (
                        <IoCheckmark className="text-success" />
                      ) : (
                        <IoCopyOutline />
                      )}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    {candidate.phone}
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        copyToClipBoard(
                          candidate.phone,
                          candidate.id + candidate.name
                        )
                      }
                    >
                      {copiedId === candidate.id + candidate.name ? (
                        <IoCheckmark className="text-success" />
                      ) : (
                        <IoCopyOutline />
                      )}
                    </span>
                  </div>
                </td>
                <td>{candidate.politicalPost}</td>
                <th>
                  <div className="flex justify-end">
                    <div className="dropdown dropdown-end">
                      <div
                        className="btn btn-xs btn-primary"
                        tabIndex={0}
                        role="button"
                      >
                        Options
                        <IoCaretDown />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 min-w-52 p-2 shadow-sm"
                      >
                        <li>
                          <button className="text-primary font-semibold">
                            {" "}
                            <IoPencilOutline />
                            Edit Candidate
                          </button>
                        </li>
                        <li>
                          <button className="text-accent font-semibold">
                            {" "}
                            <IoEye />
                            View Candidate
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-error font-semibold"
                            onClick={() => deleteCandidate(candidate.id)}
                          >
                            {" "}
                            <IoTrashOutline />
                            Delete Candidate
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 flex justify-center">
        <div className="join">
          <button className="btn join-item">Next</button>
          <button className="btn join-item">Previous</button>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top z-20">
          <div className={`alert alert-success ${animate}`}>
            <IoCheckmark size={20} />
            <span>Text Copied to Clipboard</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
