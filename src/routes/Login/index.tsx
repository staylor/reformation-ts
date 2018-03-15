import React = require('react');
import fetch = require('isomorphic-fetch');
import Cookies = require('js-cookie');
import Helmet from 'react-helmet-async';
import { match } from 'react-router-dom';
import { injectIntl, InjectedIntl } from 'react-intl';
import Message from 'components/Message';
import { TITLE_TEMPLATE, TOKEN_KEY, COOKIE_EXPIRES, COOKIE_PATH } from 'utils/constants';
import {
  wrapperClass,
  contentClass,
  titleClass,
  formClass,
  labelClass,
  inputClass,
  buttonClass,
} from './styled';

interface LoginState {
  error: string;
}

interface LoginParams {
  action?: string;
}

interface LoginProps {
  intl: InjectedIntl;
  match: match<LoginParams>;
}

class Login extends React.Component<LoginProps, LoginState> {
  private form;

  componentWillMount() {
    const { match: { params }, intl: { messages } } = this.props;

    let error = '';
    if (params.action) {
      switch (params.action) {
        case 'unauthorized':
          error = messages.loginUnauthorized;
          break;
        default:
          break;
      }
    }

    this.setState({ error });
  }

  getOrigin() {
    return location.origin || `${location.protocol}//${location.host}`;
  }

  submitForm = e => {
    e.preventDefault();

    this.form.blur();

    const inputs = this.form.elements;
    const { intl: { locale, messages } } = this.props;

    if (!inputs.email.value || !inputs.password.value) {
      this.setState({ error: messages.loginRequiredFields });
    }

    fetch(`${this.getOrigin()}/auth`, {
      method: 'POST',
      body: JSON.stringify({
        email: inputs.email.value,
        password: inputs.password.value,
      }),
      headers: { 'Content-Type': 'application/json', 'Accept-Language': locale },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        Cookies.set(TOKEN_KEY, data.token, { expires: COOKIE_EXPIRES, path: COOKIE_PATH });
        window.location.pathname = '/admin';
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  render() {
    const { intl: { locale, messages } } = this.props;

    return (
      <div className={wrapperClass}>
        <Helmet titleTemplate={TITLE_TEMPLATE}>
          <html lang={locale} />
          <title>{messages.login}</title>
          <meta property="og:site_name" content={messages.siteTitle} />
        </Helmet>
        <div className={contentClass}>
          <h1 className={titleClass}>{messages.siteTitle}</h1>
          {this.state.error && <Message text={this.state.error} />}
          <form
            className={formClass}
            method="post"
            ref={form => {
              this.form = form;
            }}
            onSubmit={this.submitForm}
          >
            <label className={labelClass} htmlFor="email">
              {messages.loginEmail}
              <input className={inputClass} type="text" name="email" />
            </label>
            <label className={labelClass} htmlFor="password">
              {messages.loginPassword}
              <input className={inputClass} type="password" name="password" />
            </label>
            <button className={buttonClass} type="submit">
              {messages.login}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default injectIntl(Login);
