import PropTypes from 'prop-types';

const Alert = ({ alert }) => {
  if (!alert) return null;

  const alertStyles = {
    success: "bg-green-100 border-green-400 text-green-800",
    danger: "bg-red-100 border-red-400 text-red-800",
    info: "bg-blue-100 border-blue-400 text-blue-800",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-800",
  };

  const icons = {
    success: "✔️",
    danger: "❌",
    info: "ℹ️",
    warning: "⚠️",
  };

  return (
    <div className={`fixed top-20 right-0 p-4 mb-4 border-l-4 rounded-lg shadow-lg max-w-sm
      animate-fade-in ${alertStyles[alert.type]}`} style={{zIndex:1000}} role="alert">
      <div className="flex items-center justify-between">
        <span className="text-lg">
          <span className="mr-2">{icons[alert.type]}</span>
          <strong>{alert.message}</strong>
        </span>
      </div>
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'danger', 'info', 'warning']).isRequired,
  }),
};

export default Alert;
