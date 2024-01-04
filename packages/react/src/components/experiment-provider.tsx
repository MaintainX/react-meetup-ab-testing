import { useEffect, useState } from "react";
import { IAssignmentEvent, init } from "sdk";
import { useUser } from "../hooks/use-user";

interface Props {
  children: JSX.Element;
  url: string;
}

export function ExperimentProvider({ children, url }: Props): JSX.Element {
  const [isInitialized, setIsInitialized] = useState(false);

  const attributes = useUser();

  useEffect(() => {
    (async () => {
      await init({
        attributes,
        assignmentLogger: (event: IAssignmentEvent) => {
          // usually have amplitude or segment tracking here
          console.log("assignment event", event);
        },
        url,
      });

      setIsInitialized(true);
    })();
  }, [attributes, url]);

  return isInitialized ? children : <div>Loading...</div>;
}
