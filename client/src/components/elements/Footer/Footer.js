import React from 'react';

import TelegramIcon from '@material-ui/icons/Telegram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

function Footer() {
  return (
    <footer className="app-footer">
      <h3 className='app-footer-header'>Best Market Ever</h3>
      <nav>
        <TelegramIcon className='social-icon telegram-icon'/>
        <YouTubeIcon className='social-icon youtube-icon'/>
        <TwitterIcon className='social-icon twitter-icon'/>
        <InstagramIcon className='social-icon instagram-icon'/>
        <FacebookIcon className='social-icon facebook-icon'/>
      </nav>
    </footer>
  );
}

export default Footer;