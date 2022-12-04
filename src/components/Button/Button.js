import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick, disabled }) => {
  return (
    <button className={css.button} disabled={disabled} onClick={onClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
