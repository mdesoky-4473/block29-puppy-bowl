import { useState } from "react";
import { useAddPuppyMutation } from '../API/index';

/**
 * @component
 * Users can add puppies to the roster by submitting this form.
 */
export default function PuppyForm() {
  
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  // TODO: Use the `addPuppy` mutation to add a puppy when the form is submitted
  const [addPuppy, { isLoading, error }] = useAddPuppyMutation();

    async function postPuppy(e) {
      e.preventDefault();

      if (!name.trim() || !breed.trim()) {
        console.error("Error: Name and breed are required.");
        return;
      }
      

      // Placeholder image w/ random photos of dogs
      const imageUrl = "https://loremflickr.com/200/300/dog";

      console.log("Sending puppy data:", { name, breed, imageUrl, status: "bench" });


          // Call the mutation with the puppy data
          try {
            const response = await addPuppy({ name, breed, imageUrl, status: "bench" }).unwrap();


            console.log("Success response:", response);
            // Clear the form after successful submission
            setName("");
            setBreed("");
          } catch (err) {
            console.error("Error details:", err);
          }
      }

        return (
          <>
            <h2>Add a Puppy</h2>
            <form onSubmit={postPuppy}>
              <label>
                Name
                <input
                  name="puppyName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label>
                Breed
                <input
                  name="breed"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                />
              </label>
              <button>Add to Roster</button>
              {isLoading && <output>Uploading puppy information...</output>}
              {error && <output>{error.message}</output>}
            </form>
          </>
        );
      }
