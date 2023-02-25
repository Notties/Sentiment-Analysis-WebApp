import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const IndexPage: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <div>
        {session && session.user ? (
          <>
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
            <img src={`${session.user.image}`} alt="" />
          </>
        ) : (
          <>
            <p>Please Login</p>
          </>
        )}
      </div>
    </>
  );
};

export default IndexPage;
