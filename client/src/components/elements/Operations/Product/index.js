import Product from './Product';
import React from "react";
import {connect} from "react-redux";

export default React.memo(connect()(Product));