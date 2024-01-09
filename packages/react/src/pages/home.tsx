import { useMemo } from "react";
import { getInstance } from "sdk";
import styles from "./home.module.css";
import mxLogo from "/mx.svg";
import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";

export function HomePage() {
  const assignment = useMemo(() => {
    const experiments = getInstance();
    return experiments.getAssignment("experiment-a");
  }, []);

  const attributes = useMemo(() => {
    const experiments = getInstance();
    return experiments.getAttributes();
  }, []);

  const experiments = useMemo(() => {
    const experiments = getInstance();
    const record = experiments.getExperiments();
    return Object.values(record);
  }, []);

  return (
    <div className={styles.home}>
      <div>
        {assignment?.variationKey === "treatment" ? (
          <a href="https://maintainx.com" target="_blank">
            <img src={mxLogo} className={styles.logo} alt="MX logo" />
          </a>
        ) : (
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className={styles.logo} alt="Vite logo" />
          </a>
        )}
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className={`${styles.logo} ${styles.react}`} alt="React logo" />
        </a>
      </div>
      <h1>A/B Testing on React</h1>
      <div>
        <h3>Experiments</h3>
        {experiments.map((experiment) => (
          <div key={experiment.key}>{JSON.stringify(experiment, null, 2)}</div>
        ))}
      </div>
      <div>
        <h3>Subject Attributes</h3>
        {JSON.stringify(attributes, null, 2)}
      </div>
      <div>
        <h3>Assignment</h3>
        {JSON.stringify(assignment, null, 2)}
      </div>
    </div>
  );
}
