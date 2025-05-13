import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Superior Performance",
    description: (
      <>
        Applying a series of researched techniques to improve and optimize
        application performance
      </>
    ),
  },
  {
    title: "Easy to Get Started",
    description: (
      <>
        Built with a complete framework, easy to get started in just 5 minutes
        and full documentation
      </>
    ),
  },
  {
    title: "Accelerate Development",
    description: (
      <>
        Integrate a wide range of components, automation features, and backend
        architectures to accelerate product development
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
