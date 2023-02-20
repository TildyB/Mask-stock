import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function BasicMenu({users, currentUser, setCurrentUser}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
            "color": "#fff"
          }}
      >
        {currentUser ? <div style={{display: "flex", alignItems: "center"}}>{currentUser.name} <ArrowDropDownIcon /></div> : <div style={{display: "flex", alignItems: "center"}}>Felhasználó kiválasztása <ArrowDropDownIcon /></div>}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {users.map((user) => {
            return <MenuItem key={user.name} onClick={() => {handleClose() ; setCurrentUser(user)}}>{user.name}</MenuItem>
        })}
      </Menu>
    </div>
  );
}