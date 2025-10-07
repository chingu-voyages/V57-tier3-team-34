import {
  IoAddCircleOutline,
  IoCaretDown,
  IoCheckmark,
  IoClose,
  IoCopyOutline,
  IoEye,
  IoPencilOutline,
  IoSearchOutline,
  IoTrashOutline,
  IoWarning,
} from "react-icons/io5";
import mockData from "../../data/candidates.json";
import { useState } from "react";
import Modal from "../../components/party/dashboard/Modal";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

interface CandidateFormInput {
  name: string;
  email: string;
  post: number;
  image: File | null;
  bio: string;
}

interface CandidatesMethod {
  (arg: number): void;
}

const Candidates: React.FC = () => {
  const [data, setData] = useState(mockData);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [animate, setAnimate] = useState<string>("");
  const [copiedId, setCopiedId] = useState<number | undefined | string>(
    undefined
  );

  const [createEditModal, setCreateEditModal] = useState<boolean>(false);
  const [deleteCandidateModal, setDeleteCandidateModal] =
    useState<boolean>(false);
  const [candidateDeleteId, setCandidateDeleteId] = useState<number | null>(
    null
  );
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CandidateFormInput>({});

  const onSubmit: SubmitHandler<CandidateFormInput> = (data) => {
    setIsSubmitting(true);
    console.log(data);

    setTimeout(() => {
      setIsSubmitting(false);
      if (editingId) {
        alert("User Update simulation complete");
        setEditingId(null);
      } else {
        alert("User Creation simulation complete");
      }
      setCreateEditModal(false);
      reset();
    }, 2000);
  };

  const editCandidate: CandidatesMethod = (candidateId: number) => {
    setEditingId(candidateId);
    const candidate = data.find((item) => item.id === candidateId);
    setValue("name", candidate?.name ?? "");
    setValue("email", candidate?.email ?? "");
    setValue("phone", candidate?.phone ?? "");
    setValue("region", candidate?.region ?? "");
    setValue("post", candidate?.politicalPost ?? "");
    setCreateEditModal(true);
  };

  const confirmDeleteCandidate: CandidatesMethod = (candidateId: number) => {
    setCandidateDeleteId(candidateId);
    setDeleteCandidateModal(true);
  };

  const cancelDelete: () => void = () => {
    setCandidateDeleteId(null);
    setDeleteCandidateModal(false);
  };

  const deleteCandidate: () => void = () => {
    setIsDeleting(true);
    const candidates = data.filter((item) => item.id !== candidateDeleteId);
    setData(candidates);

    setTimeout(() => {
      alert("Candidate Deleted");
      setIsDeleting(false);
      cancelDelete();
    }, 2000);
  };

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
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setCreateEditModal(true)}
          >
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
            {data.map((candidate) => (
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
                          <button
                            className="text-primary font-semibold"
                            onClick={() => editCandidate(candidate.id)}
                          >
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
                            onClick={() => confirmDeleteCandidate(candidate.id)}
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

      {/**
       * This is for handling toasts in the candidates page
       */}
      {showToast && (
        <div className="toast toast-top z-20">
          <div className={`alert alert-success ${animate}`}>
            <IoCheckmark size={20} />
            <span>Text Copied to Clipboard</span>
          </div>
        </div>
      )}

      {/* The Edit or Create Candidate Modal */}
      <Modal
        isOpen={createEditModal}
        onClose={() => setCreateEditModal(false)}
        title={editingId ? "Edit Candidate" : "Add New Candidate"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Candidate Name</legend>
              <input
                {...register("name", {
                  required: true,
                })}
                className={`input w-full ${errors.name && "input-error"}`}
                placeholder="Candidate Name"
              />
              {errors.name && (
                <p className="label text-error">{errors.name.message}</p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`input w-full ${errors.email && "input-error"}`}
                placeholder="Email"
              />
              {errors.email && (
                <p className="label text-error">{errors.email.message}</p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Phone Number</legend>
              <input
                {...register("phone", {
                  required: true,
                })}
                className={`input w-full ${errors.phone && "input-error"}`}
                placeholder="Candidate Phone"
              />
              {errors.phone && (
                <p className="label text-error">{errors.phone.message}</p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Candidate Post</legend>
              <input
                {...register("post", {
                  required: true,
                })}
                className={`input w-full ${errors.post && "input-error"}`}
                placeholder="Candidate Name"
              />
              {errors.post && (
                <p className="label text-error">{errors.post.message}</p>
              )}
            </fieldset>
            <input type="hidden" name="partyId" value={2} />
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Candidate Region</legend>
              <input
                {...register("region", {
                  required: true,
                })}
                className={`input w-full ${errors.region && "input-error"}`}
                placeholder="Candidate Name"
              />
              {errors.region && (
                <p className="label text-error">{errors.region.message}</p>
              )}
            </fieldset>
          </div>
          <div className="flex justify-between mt-5">
            <span
              className="btn btn-error text-white"
              onClick={() => setCreateEditModal(false)}
            >
              <IoClose /> Cancel
            </span>

            <button className="btn btn-primary text-white">
              {isSubmitting ? (
                <span className="loading loading-spainner"></span>
              ) : editingId ? (
                <>
                  <IoCheckmark /> Update Candidate
                </>
              ) : (
                <>
                  <IoCheckmark />
                  Add Candidate
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteCandidateModal}
        onClose={cancelDelete}
        title="Delete Candidate"
      >
        <div className="w-full text-center">
          <h3 className="text-xl font-semibold">Delete Candidate?</h3>
          <p>Are you sure you want to delete this candidate?</p>
          <span className="flex justify-center items-center gap-2">
            <IoWarning size={20} className="text-error" /> This action is
            irreversible.
          </span>

          <div className="my-5 flex justify-center gap-5">
            <button className="btn" onClick={cancelDelete}>
              Cancel
            </button>
            <button
              className="btn btn-error text-white"
              onClick={deleteCandidate}
            >
              {" "}
              {isDeleting ? (
                <span className="loading loading-spainner"></span>
              ) : (
                <>
                  <IoWarning size={20} className="text-white" /> Delete
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Candidates;
