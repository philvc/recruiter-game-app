import * as React from 'react';

import Chat from '@nightborn/signum';
import '@nightborn/signum/dist/index.css';
import chatIcon from './assets/chat_icon.svg'
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE } from '../../graphql/mutations/server/addMessage';


const Contact = () => {
  const [addMessage] = useMutation(ADD_MESSAGE)
  const defaultProps = {
    option: {
      title: 'Hello !',
      subTitle: 'We want to help job seekers as much as possible so don\'t hesitate to share your feebacks (good and bad!) about the app, thank you ;-)',
      message: 'Please tell me ',
      name: 'Hello there',
    },
    config: {
      openByDefault: false,
      avatarIcon: chatIcon,
      mainColor: 'linear-gradient(rgb(255, 143, 178) 0%, rgb(167, 151, 255) 50%, rgb(0, 229, 255) 100%)',
      secondaryColor: 'linear-gradient(rgb(255, 143, 178) 0%, rgb(167, 151, 255) 50%, rgb(0, 229, 255) 100%)',
      sendButtonColor: '#0074CE',
      finalButtonColor: "linear-gradient(rgb(255, 143, 178) 0%, rgb(167, 151, 255) 50%, rgb(0, 229, 255) 100%)",
      emailPlaceholder: 'Insert your email',
      messagePlaceholder: 'Message...',
      finalTitle: 'Thank you.',
      finalSubTitle: "We'll be in touch!",
      finalButtonText: "Continue",
      handleFinalButtonClicked: () => { },
      handleSendClicked: (information: any) => {
        console.log(information)
        addMessage({ variables: { email: information.email, message: information.message } })
      },
    }
  }
  return (
    <Chat {...defaultProps} />
  )
}

export default Contact;
