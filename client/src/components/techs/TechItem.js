import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteTech } from '../../actions/techActions';

import M from 'materialize-css/dist/js/materialize.min.js';

const TechItem = ({ tech, deleteTech }) => {
  const onDelete = () => {
    deleteTech(tech._id);
    M.toast({ html: 'Technician Deleted' });
  };

  return (
    <li className='collection-item'>
      <span>{tech.tech}</span>
      {/*eslint-disable-next-line*/}
      <a href='#' className='secondary-content' onClick={onDelete}>
        <i className='material-icons grey-text'>delete</i>
      </a>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteTech }
)(TechItem);
