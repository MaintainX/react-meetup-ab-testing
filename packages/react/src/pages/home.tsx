import { useMemo, useState } from "react";
import { getInstance } from "sdk";
import styles from "./home.module.css";
import mxLogo from "/mx.svg";
import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";

export function HomePage() {
  /**
   * Force re-rendering of the component when forced variations or attributes changes.
   * In a real world scenario, we wouldn't need to do this.
   */
  const [renderCount, setRenderCount] = useState(0);
  const [id, setId] = useState<string>("");

  const assignment = useMemo(() => {
    const experiments = getInstance();
    return experiments.getAssignment("experiment-a");
  }, [renderCount]);

  const attributes = useMemo(() => {
    const experiments = getInstance();
    return experiments.getAttributes();
  }, [renderCount]);

  const experiments = useMemo(() => {
    const experiments = getInstance();
    return experiments.getExperiments();
  }, []);

  const forcedVariations = useMemo(() => {
    const experiments = getInstance();
    return experiments.getForcedVariations();
  }, [renderCount]);

  const forceRender = () => {
    setRenderCount((count) => count + 1);
  };

  const handleUpdateId = () => {
    getInstance().setAttributes({ id });
    forceRender();
  };

  const handleForceControl = () => {
    getInstance().setForcedVariation("experiment-a", "control");
    forceRender();
  };

  const handleForceTreatment = () => {
    getInstance().setForcedVariation("experiment-a", "treatment");
    forceRender();
  };

  const handleClearForcedVariations = () => {
    getInstance().clearForcedVariations();
    forceRender();
  };

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
        {JSON.stringify(Object.values(experiments))}
      </div>
      <div>
        <h3>Subject Attributes</h3>
        {JSON.stringify(attributes, null, 2)}
        <div className={styles.row}>
          <input
            type="input"
            placeholder="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUpdateId()}
          />
          <button onClick={handleUpdateId}>Update</button>
        </div>
      </div>
      <div>
        <h3>Assignment</h3>
        {JSON.stringify(assignment, null, 2)}
      </div>
      <div>
        <h3>Forced Variations</h3>
        {JSON.stringify(forcedVariations, null, 2)}
        <div className={styles.row}>
          <button onClick={handleForceControl}>Force control</button>
          <button onClick={handleForceTreatment}>Force treatment</button>
          <button onClick={handleClearForcedVariations}>Clear</button>
        </div>
      </div>
    </div>
  );
}
