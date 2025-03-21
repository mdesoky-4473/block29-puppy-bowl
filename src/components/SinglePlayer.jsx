import { useGetPuppyQuery, useDeletePuppyMutation } from '../API/index';

export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  // TODO: Grab data from the `getPuppy` query
  const { data: puppy, isLoading, error } = useGetPuppyQuery(selectedPuppyId, {
    skip: !selectedPuppyId
  });

  // TODO: Use the `deletePuppy` mutation to remove a puppy when the button is clicked

  const [deletePuppy] = useDeletePuppyMutation();

  function removePuppy(id) {
    deletePuppy(id);
    setSelectedPuppyId();
  }

  // There are 3 possibilities:
  let $details;
  // 1. A puppy has not yet been selected.
  if (!selectedPuppyId) {
    $details = <p>Please select a puppy to see more details.</p>;
  }
  //  2. A puppy has been selected, but results have not yet returned from the API.
  else if (isLoading) {
    $details = <p>Loading puppy information...</p>;
  }
  else if (error) {
    $details = <p>Error loading puppy: {error.message || error.toString()}</p>;
  }
   else if (!puppy) {
    $details = <p>Puppy not found.</p>;
  // 3. Information about the selected puppy has returned from the API.
   } else {
    $details = (
      <>
        <h3>
          {puppy.name} #{puppy.id}
        </h3>
        <p>{puppy.breed}</p>
        <p>Team {puppy.team?.name ?? "Unassigned"}</p>
        <button onClick={() => removePuppy(puppy.id)}>
          Remove from roster
        </button>
        <figure>
          <img src={puppy.imageUrl} alt={puppy.name} />
        </figure>
      </>
    );
  }

  return (
    <aside>
      <h2>Selected Puppy</h2>
      {$details}
    </aside>
  );
}
