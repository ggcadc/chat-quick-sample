import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';


class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dogName: '',
      phone: '',
      boxOption: '',
      allergies: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { phone, boxOption, allergies } = steps;

    this.setState({ phone, boxOption, allergies });
  }

  render() {
    const { phone, boxOption, allergies } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Number</td>
              <td>{phone.value}</td>
            </tr>
            <tr>
              <td>Chosen Box</td>
              <td>{boxOption.value}</td>
            </tr>
            <tr>
              <td>Allergies</td>
              <td>{allergies.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

const theme = {
  background: '#ddd',
  fontFamily: 'Helvetica Neue',
  headerBgColor: 'mediumseagreen',
  headerFontColor: '#fff',
  botBubbleColor: 'mediumseagreen',
  botFontColor: '#fff',
  userBubbleColor: 'purple',
  userFontColor: '#fdfdfd',
};

const steps = [
  {
    id: '1',
    message: 'What is your phone number?',
    trigger: 'phone',
  },
  {
    id: 'phone',
    user: true,
    validator: (value) => {
      if (!value.match(/^(\(?[0-9]{3}\)?)((\s|\-){1})?[0-9]{3}((\s|\-){1})?[0-9]{4}$/)) {
        return 'Please enter a phone number';
      }
      return true;
    },
    trigger: '3',
  },
  {
    id: '3',
    message: 'Thank You! Which Box Would You Like?',
    trigger: 'boxOption',
  },
  {
    id: 'boxOption',
    options: [
      { value: 'Treat & Chew', label: 'Treat', trigger: '5' },
      { value: 'Mini', label: 'Chew', trigger: '5' },
      { value: 'Chew Only', label: 'Trainer', trigger: '5' },
      { value: 'Treat Only', label: 'Gift', trigger: '5' },
    ],
  },
  {
    id: '5',
    message: 'Does the dog have any known allergies?',
    trigger: 'allergies',
  },
  {
    id: 'allergies',
    user: true,
    trigger: '7',

  },
  {
    id: '7',
    message: 'Great! Check out your summary',
    trigger: 'review',
  },
  {
    id: 'review',
    component: <Review />,
    asMessage: true,
    trigger: 'update',
  },
  {
    id: 'update',
    message: 'Would you like to update some field?',
    trigger: 'update-question',
  },
  {
    id: 'update-question',
    options: [
      { value: 'yes', label: 'Yes', trigger: 'update-yes' },
      { value: 'no', label: 'No', trigger: 'end-message' },
    ],
  },
  {
    id: 'update-yes',
    message: 'What field would you like to update?',
    trigger: 'update-fields',
  },
  {
    id: 'update-fields',
    options: [
      { value: 'phone', label: 'Phone', trigger: 'update-phone' },
      { value: 'boxOption', label: 'Box', trigger: 'update-boxOption' },
      { value: 'allergies', label: 'Allergies', trigger: 'update-allergies' },
    ],
  },
  {
    id: 'update-phone',
    update: 'phone',
    trigger: '7',
  },
  {
    id: 'update-boxOption',
    update: 'boxOption',
    trigger: '7',
  },
  {
    id: 'update-allergies',
    update: 'allergies',
    trigger: '7',
  },
  {
    id: 'end-message',
    message: 'Thanks! Your data was submitted successfully!',
    end: true,
  },
];


class SimpleForm extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot steps={steps} />
      </ThemeProvider>
    );
  }
}

export default SimpleForm;
