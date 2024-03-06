import MemoryFeed from "@/shared/components/MemoryFeed";
import MemorySubmit from "@/shared/components/MemorySubmit";
import { useAuthState } from "@/shared/state/context";
import { getMemories } from "./api";

export function Home() {
  const authState = useAuthState();
  return (
    <>
      {" "}
      {authState.id > 0 && (
        <div className="row d-flex justify-content-center">
          <MemorySubmit></MemorySubmit>
          <MemoryFeed></MemoryFeed>
        </div>
      )}
    </>
  );
}
