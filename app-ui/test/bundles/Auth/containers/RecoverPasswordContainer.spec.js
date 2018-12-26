import { actions as formActions } from 'react-redux-form';
import { mapDispatchToProps } from 'bundles/Auth/containers/RecoverPasswordContainer';
import { recoverPassword, modelPath } from 'bundles/Auth/modules/RecoverPasswordModule';

describe('(Container) RecoverPasswordContainer', () => {
  describe('mapDispatchToProps', () => {
    let dispatch;

    beforeEach(() => {
      dispatch = sinon.spy();
    });

    it('Should map function to ActivateAccount component props', () => {
      const props = mapDispatchToProps(dispatch);

      expect(props).to.have.all.keys(['componentWillUnmount', 'onSend']);
    });

    it('Should dispatch `recoverPassword` when `onSend` is called', () => {
      const email = 'john@doe.com';
      const { onSend } = mapDispatchToProps(dispatch);
      onSend(email);

      expect(dispatch).to.have.been.calledOnceWithExactly(recoverPassword(email));
    });
  });


  describe('componentWillUnmount', () => {
    let componentWillUnmount;
    let dispatch;

    beforeEach(() => {
      dispatch = sinon.spy();
      /* eslint-disable prefer-destructuring */
      componentWillUnmount = mapDispatchToProps(dispatch).componentWillUnmount;
    });

    it('Should be a function', () => {
      expect(componentWillUnmount).to.be.a('function');
    });

    it('Should dispatch a form reset action when called', () => {
      componentWillUnmount();

      expect(dispatch).to.have.been.calledOnceWithExactly(formActions.reset(modelPath));
    });

  });
});
