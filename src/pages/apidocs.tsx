import { useSession } from "next-auth/react";
import { useState } from "react";
import useStore from '../store/useStore';


const AboutPage = () => {

  const { data: session } = useSession();
  const [userID, setUserID] = useState<any>(null);

  const userEmail = useStore(state => state.email)
  const userId = useStore(state => state.userId)

  // function to save note to saved notes array
  const saveNote = async () => {

    // get email
    let email = {
      email: session?.user?.email,
    };
    // set userId
    let res = await fetch("/api/userId", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
    });

    const userId = await res.json();
    setUserID(userId.userId);
    // // the note object
    let note = {
      // id,
      title: "note2",
      body: "hello api",
      userId: userID,
    };
    try {
      // send create request with note data
      let res = await fetch("/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });

      const newNote = await res.json();
      console.log("Create successful", { newNote });
      // add to notes list
    } catch (error) {
      console.log(error);
    }
  };

  console.log("user data: ",userEmail, userId);
  

  return (
    <>
      
      <button
        className="flex sm:inline-flex justify-center items-center 
      bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring 
      ring-blue-300 text-white text-center rounded-md outline-none 
      transition duration-200 px-5 py-2 mt-5"
        
      >
        Analyzer
      </button>
    </>
  );
};

export default AboutPage;
