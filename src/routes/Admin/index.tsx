import React = require('react');
import Helmet from 'react-helmet-async';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { ThemeProvider } from 'emotion-theming';

const { Fragment, Component } = React;

type AdminProps = { children?: React.ReactNode };
type AdminState = { collapsed: boolean };

class Admin extends Component<AdminProps & InjectedIntlProps, AdminState> {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  render() {
    const { intl: { locale, messages } } = this.props;
    return (
      <ThemeProvider theme={{ isCollapsed: this.state.collapsed }}>
        <Fragment>
          <Helmet titleTemplate={`%s » ${messages.siteTitle}`}>
            <html lang={locale} />
            <title>{messages.adminTitle}</title>
          </Helmet>
          <section>
            <h1>{messages.adminTitle}</h1>
          </section>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default injectIntl(Admin);
