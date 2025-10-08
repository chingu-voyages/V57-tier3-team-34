import {
  IoAddCircleOutline,
  IoCaretDown,
  IoCheckmark,
  IoClose,
  IoCopyOutline,
  IoPencilOutline,
  IoSearchOutline,
} from "react-icons/io5";

import { useEffect, useState } from "react";
import Modal from "../../components/party/dashboard/Modal";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { usePosts } from "../../api/hooks/usePosts";
import { useCandidates } from "../../api/hooks/useCandidates";
import { useSearchParams } from "react-router";
import EmptyState from "../../components/ui/EmptyState";
import SkeletonLoading from "../../components/ui/LoadingSkeleton";
import type { CandidateFormInput } from "../../api/types";
import FormErrorAlert from "../../components/ui/FormErrorAlert";
import {
  useAddCandidate,
  useUpdateCandidate,
} from "../../api/hooks/useAddCandidate";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface CandidatesMethod {
  (arg: number): void;
}

type CandidateData = {
  id: number;
  email: string;
  name: string;
  userImage: string;
  userManifesto: string;
  politicalPostId: number;
  userPosition: {
    postName: string;
  };
};

const Candidates: React.FC = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 1;

  const { data, isLoading } = useCandidates(page, limit);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [animate, setAnimate] = useState<string>("");
  const [copiedId, setCopiedId] = useState<number | undefined | string>(
    undefined
  );

  const [createEditModal, setCreateEditModal] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [selectedCandidate, setSelectedCandidate] =
    useState<CandidateData | null>(null);
  const isEditing = !!selectedCandidate;
  const [addCandidateError, setAddCandidateError] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CandidateFormInput>({});

  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = usePosts(createEditModal);

  const { mutate, isPending } = useAddCandidate();
  const { mutate: updateCandidateMutation, isPending: updateCandidatePending } =
    useUpdateCandidate();
  const queryClient = useQueryClient();

  /**
   * Handle candidate addition
   * @param data
   */
  const onSubmit: SubmitHandler<CandidateFormInput> = (data) => {
    if (editingId) {
      console.log(editingId);
      updateCandidateMutation(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getCandidates"] });
          setCreateEditModal(false);
          reset();
          toast.success("Candidate information updated.");
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            const message =
              error.response?.data?.message || "Something went wrong";
            setAddCandidateError(message);
          } else {
            setAddCandidateError(error?.message || "Something went wrong.");
          }
        },
      });
    } else {
      mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getCandidates"] });
          setCreateEditModal(false);
          reset();
          toast.success("Candidate account created.", {
            description: "Password has been sent to Candidate's Provided Email",
          });
        },

        onError: (error) => {
          if (error instanceof AxiosError) {
            const message =
              error.response?.data?.message || "Something went wrong";
            setAddCandidateError(message);
          } else {
            setAddCandidateError(error?.message || "Something went wrong.");
          }
        },
      });
    }
  };

  const editCandidate: CandidatesMethod = (candidateId: number) => {
    setEditingId(candidateId);
    const candidate = data.candidates.data.find(
      (item: CandidateData) => item.id === candidateId
    );
    setSelectedCandidate(candidate);
    setCreateEditModal(true);
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

  if (postsError) {
    alert("An error occured, please reload page");
  }

  useEffect(() => {
    if (!isEditing || postsLoading || !selectedCandidate) return;

    setValue("name", selectedCandidate?.name ?? "");
    setValue("bio", selectedCandidate?.userManifesto ?? "");
    setValue("post", selectedCandidate?.politicalPostId);
  });

  return (
    <div className="flex flex-col">
      <div className="mb-5">
        <h2 className="text-2xl font-bold dark:text-stone-900">
          My Candidates
        </h2>
      </div>
      {isLoading ? (
        <SkeletonLoading rows={6} cols={4} />
      ) : (
        <>
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
          {data.candidates.data.length === 0 && <EmptyState />}
          {data?.candidates?.data && data?.candidates?.data?.length > 0 && (
            <>
              <div className="overflow-x-auto h-[660px]">
                <table className="table dark:text-stone-900">
                  <thead className="dark:text-stone-900">
                    <tr>
                      <td>Image</td>
                      <td>Name</td>
                      <td>Email</td>
                      <td>Post</td>
                      <td align="right">Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.candidates.data.map((candidate: CandidateData) => (
                      <tr key={candidate.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div>
                              <img
                                src={candidate.userImage}
                                className="w-16 rounded-lg"
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-2 items-center">
                            {candidate.name}
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-2 items-center">
                            {candidate.email}
                            <span
                              className="cursor-pointer"
                              onClick={() =>
                                copyToClipBoard(
                                  candidate.email,
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
                        <td>{candidate.userPosition.postName}</td>
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
            </>
          )}
        </>
      )}
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
          {addCandidateError && <FormErrorAlert message={addCandidateError} />}
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

            {!editingId && (
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
            )}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Candidate Post</legend>
              <select
                {...register("post", {
                  required: true,
                })}
                defaultValue="Choose Post"
                className={`select w-full ${errors.post && "select-error"}`}
                disabled={postsLoading}
              >
                <option disabled={true}>Select Political Post</option>
                {posts &&
                  posts.data?.posts.map(
                    (post: { postName: string; id: number }) => (
                      <option key={post.id} value={post.id}>
                        {post.postName}
                      </option>
                    )
                  )}
              </select>

              {errors.post && (
                <p className="label text-error">{errors.post.message}</p>
              )}
            </fieldset>

            {!editingId && (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Image</legend>
                <input
                  {...register("image", {
                    required: true,
                  })}
                  className={`file-input w-full ${
                    errors.image && "file-input-error"
                  }`}
                  placeholder="Image"
                  type="file"
                />
                {errors.image && (
                  <p className="label text-error">{errors.image.message}</p>
                )}
              </fieldset>
            )}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Candidate Bio</legend>
              <textarea
                {...register("bio", {
                  required: true,
                })}
                className={`textarea w-full ${errors.bio && "textarea-error"}`}
              />

              {errors.bio && (
                <p className="label text-error">{errors.bio.message}</p>
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
              {isPending || updateCandidatePending ? (
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
    </div>
  );
};

export default Candidates;
