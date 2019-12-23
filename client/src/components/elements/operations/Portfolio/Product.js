import React, {Fragment, useState} from 'react'
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";

function Product({ user, product }) {
  let [open, setOpen] = useState(false);
  let [amount, setAmount] = useState(1);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeAmountHandler = (event, val) => {
    setAmount(val);
  };

  return (
    <Fragment>
      <Typography className='portfolio-quantity'>
        {product.resource}: 35
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
            <h2 id="transition-modal-title">Choose amount</h2>
            <p id="transition-modal-description">
              <Slider
                defaultValue={1}
                aria-labelledby="transition-modal-title"
                min={1}
                max={100}
                step={1}
                valueLabelDisplay="auto"
                value={amount}
                onChange={changeAmountHandler}
              />
            </p>
            <p>{(amount * product.price).toFixed(2) + ' $'}</p>
            <Button color='primary'>Sell</Button>
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