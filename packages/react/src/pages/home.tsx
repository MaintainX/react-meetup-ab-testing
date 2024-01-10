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

  // State to update subject id
  const [id, setId] = useState<string>("");

  const handleUpdateId = () => {
    if (!id) {
      console.warn("subject id is empty");
      return;
    }

    getInstance().setAttributes({ id });
    setRenderCount((count) => count + 1);
  };

  // State for forcing variations
  const [experimentKey, setExperimentKey] = useState<string>("experiment-a");
  const [variationKey, setVariationKey] = useState<string>("");

  const handleForceVariation = () => {
    if (!experimentKey || !variationKey) {
      console.warn("experiment key or variation key is empty");
      return;
    }

    getInstance().setForcedVariation(experimentKey, variationKey);
    setExperimentKey("");
    setVariationKey("");
    setRenderCount((count) => count + 1);
  };

  const handleClearForcedVariations = () => {
    getInstance().clearForcedVariations();
    setRenderCount((count) => count + 1);
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
          <input
            type="input"
            placeholder="experiment key"
            value={experimentKey}
            onChange={(e) => setExperimentKey(e.target.value)}
          />
          <input
            type="input"
            placeholder="variation key"
            value={variationKey}
            onChange={(e) => setVariationKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleForceVariation()}
          />
          <button onClick={handleForceVariation}>Force Variation</button>
          <button onClick={handleClearForcedVariations}>Clear</button>
        </div>
      </div>
    </div>
  );
}
