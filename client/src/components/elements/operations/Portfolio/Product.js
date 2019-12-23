import React, {Fragment, useState} from 'react'
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import UserApi from "../../../../api/User";
import {actions} from "../../../../store/userSlice";
import {toast} from "react-toastify";

function Product({ user, product: { resource, price }, dispatch }) {
  let [open, setOpen] = useState(false);
  let [quantity, setQuantity] = useState(user.resources[resource] || 0);

  let currentQuantity = user.resources[resource] || 0;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeQuantityHandler = (event, val) => {
    setQuantity(val);
  };

  const sellResource = () => {
    UserApi.sell({ resource, quantity })
      .then(user => {
        dispatch(actions.setUser(user));
        toast.success(`${quantity} item${quantity > 1 ? 's': ''} of ${resource.toLowerCase()} successfully sold.`);
      })
      .catch(err => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      })
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    <Fragment>
      <Typography className='portfolio-quantity'>
        {resource}: {user.resources[resource] || 0}
        <Button color='primary' onClick={handleOpen}>sell</Button>
      </Typography>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className='modal'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className='modal-box'>
            <h2 id="transition-modal-title">Choose quantity</h2>
            <p id="transition-modal-description">
              <Slider
                defaultValue={1}
                aria-labelledby="transition-modal-title"
                min={currentQuantity ? 1 : 0}
                max={currentQuantity}
                step={1}
                valueLabelDisplay="auto"
                value={quantity}
                onChange={changeQuantityHandler}
              />
            </p>
            <p>{(quantity * price).toFixed(2) + ' $'}</p>
            <Button color='primary' onClick={sellResource}>Sell</Button>
          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  user: state
});

export default React.memo(connect(mapStateToProps)(Product));