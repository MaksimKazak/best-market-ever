import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Slider from '@material-ui/core/Slider';
import OperationApi from '../../../../api/Operation';
import { actions } from "../../../../store/user/userSlice";

function Product({ product: { resource, price }, dispatch }) {
  let [open, setOpen] = useState(false);
  let [quantity, setQuantity] = useState(1);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeQuantityHandler = (event, val) => {
    setQuantity(val);
  };

  const buyResource = () => {
    OperationApi.create({ type: 'bought', resource, quantity })
      .then(operation => {
        console.log(operation);
        toast.success(`${quantity} item${quantity > 1 ? 's': ''} of ${resource.toLowerCase()} successfully purchased.`);
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
    <Grid item xs={12} sm={6} md={4} key={resource}>
      <Paper className='box box-small-spacing'>
        <Typography variant='h5' className='space-bottom'>{resource}</Typography>
        <Typography className='space-bottom'>Price: {price.toFixed(2)} $</Typography>
        <Button variant='outlined' color='primary' onClick={handleOpen}>Buy</Button>
      </Paper>
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
                min={1}
                max={100}
                step={1}
                valueLabelDisplay="auto"
                value={quantity}
                onChange={changeQuantityHandler}
              />
            </p>
            <p>{(quantity * price).toFixed(2) + ' $'}</p>
            <Button color='primary' onClick={buyResource}>Buy</Button>
          </div>
        </Fade>
      </Modal>
    </Grid>
  );
}

export default Product;