import React from 'react'
import Link from '@mui/material/Link';
import { Button } from '@mui/material'


const Documentation = () => {
  const zoomlink=()=>{
    return(
      <a href='https://zoom.us'/>
    )
  }
  return (
    <div className="privacy-policy-container">
      <h1 className='guidance-title'>Guidance Document: Adding, Removing, and Using Zoom on Your System</h1>
      <p>This document provides clear instructions for installing, uninstalling, and using Zoom on various platforms. Please follow the steps carefully to ensure a smooth process.</p>

      <h2>Adding Zoom to Your System</h2>

      <h3>Windows</h3>
      <ol>
        <li>
          <strong>Download Zoom:</strong>
          <ul>
            <li>Visit the Zoom Download Center.</li>
            <li>Click on "Download" under "Zoom Client for Meetings."</li>
          </ul>
        </li>
        <li>
          <strong>Install Zoom:</strong>
          <ul>
            <li>Open the downloaded file (ZoomInstaller.exe).</li>
            <li>Follow the on-screen prompts to complete the installation.</li>
          </ul>
        </li>
        <li>
          <strong>Launch Zoom:</strong>
          <ul>
            <li>Open Zoom from the Start Menu or Desktop shortcut.</li>
            <li>Sign in or create an account if needed.</li>
          </ul>
        </li>
      </ol>

      <h3>Mac</h3>
      <ol>
        <li>
          <strong>Download Zoom:</strong>
          <ul>
            <li>Go to the Zoom Download Center.</li>
            <li>Click "Download" under "Zoom Client for Meetings."</li>
          </ul>
        </li>
        <li>
          <strong>Install Zoom:</strong>
          <ul>
            <li>Open the downloaded .pkg file.</li>
            <li>Follow the installer instructions to complete the installation.</li>
          </ul>
        </li>
        <li>
          <strong>Launch Zoom:</strong>
          <ul>
            <li>Open Zoom from the Applications folder or Dock.</li>
            <li>Sign in or create an account.</li>
          </ul>
        </li>
      </ol>

      <h3>Mobile Devices (iOS/Android)</h3>
      <ol>
        <li>
          <strong>Download Zoom:</strong>
          <ul>
            <li>Open the App Store (iOS) or Google Play Store (Android).</li>
            <li>Search for "Zoom Cloud Meetings."</li>
            <li>Tap "Install" or "Get."</li>
          </ul>
        </li>
        <li>
          <strong>Launch Zoom:</strong>
          <ul>
            <li>Open the Zoom app.</li>
            <li>Sign in or create an account.</li>
          </ul>
        </li>
      </ol>

      <h3>Linux</h3>
      <ol>
        <li>
          <strong>Download Zoom:</strong>
          <ul>
            <li>Visit the Zoom Download Center.</li>
            <li>Select the appropriate Linux type (e.g., Ubuntu, Debian, Fedora).</li>
          </ul>
        </li>
        <li>
          <strong>Install Zoom:</strong>
          <ul>
            <li>Use the package manager or terminal commands provided on the download page.</li>
            <li>Example (Ubuntu/Debian): sudo apt install ./zoom_amd64.deb</li>
          </ul>
        </li>
        <li>
          <strong>Launch Zoom:</strong>
          <ul>
            <li>Open Zoom from your Applications menu.</li>
          </ul>
        </li>
      </ol>

      <h2>Removing Zoom from Your System</h2>

      <h3>Windows</h3>
      <ol>
        <li>
          <strong>Open Control Panel:</strong>
          <ul>
            <li>Press Windows Key + R, type control, and press Enter.</li>
          </ul>
        </li>
        <li>
          <strong>Uninstall Zoom:</strong>
          <ul>
            <li>Go to Programs &gt; Programs and Features.</li>
            <li>Select Zoom and click Uninstall.</li>
            <li>Follow the prompts to remove Zoom.</li>
          </ul>
        </li>
      </ol>

      <h3>Mac</h3>
      <ol>
        <li>
          <strong>Delete Zoom:</strong>
          <ul>
            <li>Open the Applications folder.</li>
            <li>Drag the Zoom app to the Trash.</li>
          </ul>
        </li>
        <li>
          <strong>Remove Residual Files (Optional):</strong>
          <ul>
            <li>Open Finder and select Go &gt; Go to Folder...</li>
            <li>Type ~/Library and locate the Zoom folder under Application Support.</li>
            <li>Delete the folder if desired.</li>
          </ul>
        </li>
      </ol>

      <h3>Mobile Devices (iOS/Android)</h3>
      <ol>
        <li>
          <strong>Uninstall Zoom:</strong>
          <ul>
            <li>Press and hold the Zoom app icon.</li>
            <li>Tap Remove App (iOS) or Uninstall (Android).</li>
          </ul>
        </li>
      </ol>

      <h3>Linux</h3>
      <ol>
        <li>
          <strong>Remove Zoom:</strong>
          <ul>
            <li>Open the terminal.</li>
            <li>Use the package manager to uninstall.</li>
            <li>Example (Ubuntu/Debian): sudo apt remove zoom</li>
          </ul>
        </li>
        <li>
          <strong>Delete Config Files (Optional):</strong>
          <ul>
            <li>Navigate to ~/.zoom and delete the folder.</li>
          </ul>
        </li>
      </ol>

      <h2>Using Zoom</h2>

      <h3>Joining a Meeting</h3>
      <ol>
        <li>
          <strong>Using a Link:</strong>
          <ul>
            <li>Click on the meeting link shared with you (e.g., via email or messaging app).</li>
            <li>Zoom will open automatically or prompt you to launch the application.</li>
          </ul>
        </li>
        <li>
          <strong>Using a Meeting ID:</strong>
          <ul>
            <li>Open Zoom and click Join a Meeting.</li>
            <li>Enter the Meeting ID and your name.</li>
            <li>Click Join and enter the meeting password if prompted.</li>
          </ul>
        </li>
      </ol>

      <h3>Hosting a Meeting</h3>
      <ol>
        <li>
          <strong>Start a Meeting:</strong>
          <ul>
            <li>Open Zoom and click New Meeting.</li>
            <li>Choose to start with or without video.</li>
          </ul>
        </li>
        <li>
          <strong>Invite Participants:</strong>
          <ul>
            <li>In the meeting, click Participants &gt; Invite.</li>
            <li>Share the meeting link or Meeting ID with participants.</li>
          </ul>
        </li>
      </ol>

      <h3>Basic Controls</h3>
      <ul>
        <li>
          <strong>Audio and Video:</strong>
          <ul>
            <li>Use the Mute/Unmute button to control your microphone.</li>
            <li>Use the Start/Stop Video button to control your camera.</li>
          </ul>
        </li>
        <li>
          <strong>Chat:</strong>
          <ul>
            <li>Click Chat to send messages to everyone or specific participants.</li>
          </ul>
        </li>
        <li>
          <strong>Screen Sharing:</strong>
          <ul>
            <li>Click Share Screen and select the window or screen you want to share.</li>
          </ul>
        </li>
        <li>
          <strong>End Meeting:</strong>
          <ul>
            <li>Click End and choose to leave the meeting or end it for all participants if you are the host.</li>
          </ul>
        </li>
      </ul>

      <h3>Tips for a Smooth Experience</h3>
      <ul>
        <li>Ensure a stable internet connection.</li>
        <li>Use headphones to reduce background noise.</li>
        <li>Test your audio and video before joining a meeting.</li>
        <li>Familiarize yourself with Zoom’s features by exploring the settings menu.</li>
      </ul>

      <h2>Tips and Recommendations</h2>
      <ul>
        <li>Ensure you download Zoom only from the official Zoom website or trusted app stores.</li>
        <li>Restart your device after installation or uninstallation for optimal performance.</li>
        <li>For additional help, visit Zoom’s Support Center.</li>
      </ul>

      <p>If you have any questions or encounter issues, contact your IT support team or refer to Zoom’s official documentation.</p>

      <h2>Laafi Conference Zoom Integration Guide</h2>
      <p>This guide explains how doctors can set up, use, and remove the Zoom integration for online consultations within our Healthcare App, laafi. Follow the steps below to authorize your Zoom account, conduct consultations, and remove the integration if needed.</p>

      <h3>1. How to Add the Integration</h3>
      <p>To enable Zoom for online consultations, doctors must authorize laafi to create meetings in their Zoom account.</p>
      <h4>Steps to Authorize the Zoom Integration:</h4>
      <ol>
      <li>Log in to laafi as a Doctor.</li>
        <li>Navigate to the 'Settings' page and select the 'Zoom Integration' option.</li>
        <li>Click the 'Connect with Zoom' button.</li>
        <li>You will be redirected to Zoom’s authorization page.</li>
        <li>Sign in to your Zoom account if prompted.</li>
        <li>Review the requested permissions and click 'Authorize.'</li>
        <li>Once authorized, you will be redirected back to laafi, and a confirmation message will appear.</li>
      </ol>
      <p>Now, your Zoom account is linked, and the app can automatically create meetings for your consultations.</p>

      <h3>2. How to Use the Integration</h3>
      <p>Once your Zoom account is authorized, the integration will work automatically. Here’s how it functions:</p>
      
      <h4>When a Patient Books a Consultation:</h4>
      <ul>
        <li>The patient selects an available consultation slot with you.</li>
        <li>Once the booking is confirmed, laafi automatically creates a Zoom meeting for the selected time using your authorized Zoom account.</li>
        <li>You will receive a notification with the meeting details, including the Zoom meeting link and time.</li>
        <li>The patient will also receive the Zoom meeting link in their confirmation email or within the app.</li>
      </ul>

      <h4>Joining the Consultation:</h4>
      <ul>
        <li><strong>Doctor:</strong> At the scheduled time, log in to laafi, go to the 'Upcoming Consultations' section, and click the 'Join Zoom Meeting' button. This will open the Zoom meeting in your app or browser.</li>
        <li><strong>Patient:</strong> Patients can join the meeting directly from the app or via the Zoom meeting link provided in their booking confirmation.</li>
      </ul>

      <h3>3. How to Remove the Integration</h3>
      <p>If you wish to disconnect your Zoom account from laafi, follow these steps:</p>
      <h4>Steps to Remove the Integration via Zoom:</h4>
      <ol>
        <li>
        <Button  onClick={()=>window.location.href='https://zoom.us'} >Log in to your Zoom account at </Button>
        </li>
        <li>Go to the 'App Marketplace' and click on 'Manage.'</li>
        <li>Under the 'Installed Apps' tab, find laafi.</li>
        <li>Click the app and select 'Uninstall.'</li>
        <li>Confirm the removal when prompted.</li>
      </ol>
      <p>After removing the app, laafi will no longer have access to your Zoom account, and meetings will not be created automatically.</p>

      <h4>Important Notes:</h4>
      <ul>
        <li><strong>Data Privacy:</strong> We do not store your Zoom credentials. Only meeting details (such as meeting ID, link, and time) are saved to facilitate consultations.</li>
        <li><strong>Reconnecting Zoom:</strong> If you decide to use Zoom again after removing the integration, simply follow the authorization steps mentioned above to reconnect your account.</li>
      </ul>
    </div>
  );
};

export default Documentation;
