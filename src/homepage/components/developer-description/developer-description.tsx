import styles from './developer-description.module.scss';

import { type JSX } from 'react';

import { ProfileTree } from '../../../components/profile-tree/profile-tree';
import UnitTestCheck from '../../../components/unit-test-check/unit-test-check';
import { DeveloperDescriptionConfig } from '../../homepage.config';

export default function DeveloperDescription({
  config,
}: {
  config: DeveloperDescriptionConfig;
}): JSX.Element {
  return (
    <>
      <UnitTestCheck
        componentName="DeveloperDescription"
        style={{ transform: 'translateX(25vw)' }}
      />
      <h1 className={styles.developerName}>{config.textContent.name}</h1>
      <ProfileTree />
    </>
  );
}
