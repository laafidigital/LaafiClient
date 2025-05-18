import React from "react";
import link1 from '../../assets/consult.jpg'
import playstore from '../../assets/google_play.png'
import appstore from '../../assets/apple_store.png'

const DownloadLinks = () => {
  return (
    <div className="download-links-container">
      <div className="image-container">
        <img
          src={link1} 
          alt="Left"
          className="side-image"
        />
      </div>

      <div className="content-container">
        <h2 className="patient-name">Download the Laafi App</h2>
        <p>
          Access video consultation with doctors on the Laafi app.
          Connect with doctors online, available 24/7, from the comfort of your
          home.
        </p>
        <h3>Get the link to download the app</h3>
        {/* <div className="phone-input-container">
          <span className="country-code">+91</span>
          <input
            type="text"
            placeholder="Enter phone number"
            className="phone-input"
          />
          <button className="send-sms-button">Send SMS</button>
        </div> */}
        <div className="app-store-links">
        <a
            href="https://play.google.com/store/apps/details?id=com.laafi"
            target="_blank"
            rel="noopener noreferrer"
          >
          <img
            src={playstore}
            alt="Get it on Google Play"
            
          />
        </a>
        <a
            href="https://apps.apple.com/us/app/laafi/id6566176337"
            target="_blank"
            rel="noopener noreferrer"
          >
          <img
            src={appstore} 
            alt="Download on the App Store"
          />
        </a>

        </div>
      </div>
    </div>
  );
};

export default DownloadLinks;
