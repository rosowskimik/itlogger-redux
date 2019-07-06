import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getTechs } from '../../actions/techActions';

import TechItem from './TechItem';

const TechListModal = ({ loading, techs, getTechs }) => {
  useEffect(() => {
    getTechs();
    //eslint-disable-next-line
  }, []);

  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4 className='center'>Technician List</h4>
        <ul className='collection'>
          {techs !== null &&
            !loading &&
            techs.map(tech => <TechItem key={tech._id} tech={tech} />)}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ tech: { techs, loading } }) => ({
  techs,
  loading
});

TechListModal.propTypes = {
  loading: PropTypes.bool,
  techs: PropTypes.array,
  getTechs: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getTechs }
)(TechListModal);
