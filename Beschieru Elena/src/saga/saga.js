import { take, call, put, select } from "redux-saga/effects";
import * as actions from "../actions";

export function* helloSaga() {
  // while (true) {
  yield take("CLICKME");
  yield call(my_function);
  console.log("hello world");
  // }
}

function* my_function() {
  var a = 1;
  var b = 2;
  var c = 3;

  //cakscul
  var delta = b * b - 4 * a * c;
  var x1_re, x1_im, x2_re, x2_im;
  if (delta >= 0) {
    x1_re = (-b - Math.sqrt(delta)) / (2 * a);
    x1_re = (-b + Math.sqrt(delta)) / (2 * a);
    x1_im = 0;
    x2_im = 0;
  } else {
    x1_im = -Math.sqrt(-delta) / (2 * a);
    x2_im = Math.sqrt(-delta) / (2 * a);
    x1_re = -b / (2 * a);
    x2_re = -b / (2 * a);
  }

  //afisam
  console.log(
    "x1_re:",
    x1_re,
    "x1_im:",
    x1_im,
    "x2_re:",
    x2_re,
    "x2_im:",
    x2_im
  );
}
