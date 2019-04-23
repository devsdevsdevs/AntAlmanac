import React from 'react';
import {
  Dialog,
  DialogTitle,
  Menu,
  MenuItem,
  MenuList,
  Button,
  IconButton
} from '@material-ui/core/';
import {MoreVert, Delete} from '@material-ui/icons/';
import CustomEventsDialog from '../CustomEvents/Popup';
import Sharing from "./Sharing";
import ClearSchedButton from "./ClearSchedButton";


class Submenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="submenu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
        >
          <MenuList>
            <MenuItem>
              <CustomEventsDialog
                  onAddCustomEvent={this.props.onAddCustomEvent}
                  setID={this.props.setID}
              />
            </MenuItem>
            <MenuItem>
                <ClearSchedButton />
                
                {/*<Button onClick={this.props.onClearSchedule} style={{width: "100%"}}>
                    <Delete/> Hello World
        </Button>*/}
            </MenuItem>
            <MenuItem>
              <Sharing onTakeScreenshot={this.props.onTakeScreenshot} />
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
  }
}

export default Submenu;
