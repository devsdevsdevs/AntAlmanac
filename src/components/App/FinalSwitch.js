import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  typography: {
      margin: theme.spacing.unit * 2,
    },
container: {
  display: 'flex',
  flexWrap: 'wrap',
},
formControl: {
  margin: theme.spacing.unit,
},
});

class Switches extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checkedA: true,
      checkedB: true,
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    this.props.displayFinal(this.props.schedule);
  };

  render() {
    return (
      <div >
        <FormControlLabel
          control={
            <Switch
              checked={this.props.showFinalSchedule}
              onChange={this.handleChange('checkedA')}
              value="checkedA"
              color="primary"

            />
          }
          label="Final Schedule"
        />

      </div>
    );
  }
}

export default Switches;
