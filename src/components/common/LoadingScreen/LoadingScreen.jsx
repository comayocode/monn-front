import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <span className="loading-text">Cargando...</span>
      <div className="loading-bar">
        <div className="progress"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;