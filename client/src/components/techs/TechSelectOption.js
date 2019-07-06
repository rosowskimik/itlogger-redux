import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const TechSelectOption = ({ loading, techs }) => {
  return (
    !loading &&
    techs !== null &&
    techs.map(tech => (
      <option key={tech._id} value={tech.tech}>
        {tech.tech}
      </option>
    ))
  );
};

TechSelectOption.propTypes = {
  loading: PropTypes.bool,
  techs: PropTypes.array
};

const mapStateToProps = ({ tech: { loading, techs } }) => ({
  techs,
  loading
});

export default connect(mapStateToProps)(TechSelectOption);
