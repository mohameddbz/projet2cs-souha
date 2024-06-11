import React, { useState } from "react";
import PropTypes from "prop-types";
import Collapsible from 'react-collapsible';
import cn from "classnames";
import styles from "./EsiFinal.module.scss"; // Update the path according to your project structure

function CollapsibleComponent({ title, content, i }) {
  const [isOpi, setIsOpi] = useState(false);

  const toggleCollapsible = () => {
    setIsOpi(!isOpi);
    console.log('isOpi:', isOpi);
  };

  return (
    <div className={styles.collapsibleHeader} onClick={toggleCollapsible}>
      <Collapsible
        open={isOpi}
        trigger={
          <div className={`${styles.collapsibleContainer} ${styles.boxShadow}`}>
            <div className={styles.collapsibleTitle}>{title}</div>
            <img
              className={cn(styles.chevronIcon, isOpi && styles.chevronIconOpen)}
              src={"/assets/chevron.svg"}
              alt="Toggle"
            />
          </div>
        }
        triggerClassName={styles.collapsibleTrigger}
        triggerOpenedClassName={styles.collapsibleTriggerOpened}
        contentOuterClassName={styles.collapsibleContentOuter}
        contentInnerClassName={styles.collapsibleContentInner}
        transitionTime={200}
        easing="ease-out"
      >
        <div className={styles.collapsibleContentContainer}>
          {content}
        </div>
      </Collapsible>
    </div>
  );
}

CollapsibleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  i: PropTypes.number.isRequired,
};

export default CollapsibleComponent;
