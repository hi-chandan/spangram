import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

const RightSide = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });

    return;
  }

  return (
    <div className="">
      <div className="">
        <h2 className="h3-bold md:h2-bold text-left w-full">User Post</h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid  lg:grid-cols-1  xl:grid-cols-2   gap-2 p-3 ">
            {creators?.documents.map((creator) => (
              <li
                key={creator?.$id}
                className="flex-1 md:min-w-[100px] lg:min-w-[200px] w-full  "
              >
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RightSide;
