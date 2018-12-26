// @flow
import { actions } from 'react-redux-form';
import { call, put, take } from 'redux-saga/effects';
import Alert from 'react-s-alert';
import { handleError, formErrorHandler } from 'util/Saga';
import {
  modelPath,
  recoverPassword,
  recoverPasswordRequest,
} from 'bundles/Auth/modules/RecoverPasswordModule';
import AuthAPI from 'bundles/Auth/apis/AuthAPI';
import config from 'config/index';
import { history } from 'modules/LocationModule';


export function* recoverPasswordSaga(api: AuthAPI): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(recoverPassword().type);
    try {
      yield put(recoverPasswordRequest.pending());
      const response = yield call([api, api.recoverPassword], payload);
      yield put(recoverPasswordRequest.success());
      yield call(Alert.success, response.description);
      yield call(history.push, config.route.auth.signIn);
      yield put(actions.reset(modelPath));
    } catch (e) {
      yield put(recoverPasswordRequest.failed());
      yield call(handleError, e, {
        'auth.password.recover.form.invalid': formErrorHandler(modelPath),
      });
    }
  }
}

const api = new AuthAPI();
export default [recoverPasswordSaga, api];
