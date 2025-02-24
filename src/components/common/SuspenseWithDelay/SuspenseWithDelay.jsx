import { Suspense, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const SuspenseWithDelay = ({ children, delay }) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowFallback(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <Suspense fallback={showFallback ? <LoadingScreen /> : null}>
      {children}
    </Suspense>
  );
};
SuspenseWithDelay.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

export default SuspenseWithDelay;
