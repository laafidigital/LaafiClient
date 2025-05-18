import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetGenerateMeetingSignature, GetZoomtokenBydoctorId } from '../Store/ApiReducers/Conference';
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import env from './env';
import { Buffer } from 'buffer';

const VedioCreateRoom = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const zoomDivRef = useRef(null);
  const [roleid, setRoleid] = useState(0);
  const [zoomClient, setZoomClient] = useState(null);
  const decryptionKeyRaw = env.REACT_APP_DECRYPTION_KEY;
  const decryptionKeyBytes = new TextEncoder().encode(decryptionKeyRaw);
  console.log("Decryption Key Length (bytes):", decryptionKeyBytes.length);
  const ispatient = location.pathname.includes('patientdashboard');

  useEffect(() => {
    if (ispatient) {
      setRoleid(0);
    } else {
      setRoleid(1);
    }
  }, [ispatient]);

  function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  async function decryptToken(encryptedBase64) {
    try {
      const encryptedData = new Uint8Array(base64ToArrayBuffer(encryptedBase64));
      const nonce = encryptedData.slice(0, 12);
      const tag = encryptedData.slice(12, 28);
      const cipherText = encryptedData.slice(28);
      const fullCiphertextWithTag = new Uint8Array([...cipherText, ...tag]);

      const keyBuffer = decryptionKeyBytes.buffer;
      console.log("Key Buffer Length (bytes):", keyBuffer.byteLength);

      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-GCM" },
        false,
        ["decrypt"]
      );

      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: nonce,
        },
        cryptoKey,
        fullCiphertextWithTag
      );

      return new TextDecoder().decode(decryptedBuffer);
    } catch (err) {
      console.error("Decryption failed:", err);
      return null;
    }
  }

  const fetchZAKToken = async (encryptedToken) => {
    try {
      const decryptedToken = await decryptToken(encryptedToken);
      console.log("Decrypted Token:", decryptedToken);

      if (!decryptedToken) throw new Error("Token decryption failed");

      const response = await axios.get('https://api.zoom.us/v2/users/me/zak', {
        headers: {
          'Authorization': `Bearer ${decryptedToken}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("ZAK Token Response:", response.data);
      return response.data.token;
    } catch (error) {
      console.error('Error fetching ZAK token:', error);
      throw error;
    }
  };


  useEffect(() => {
    const initializeZoomClient = async () => {
      try {
        let signature;
        let zakToken;

        if (roleid === 1) {
          const tokenResponse = await dispatch(GetZoomtokenBydoctorId(props.data.DoctorId));
          console.log("Token Response:", tokenResponse);
          if (tokenResponse?.access_token) {
            try {
              zakToken = await fetchZAKToken(tokenResponse.access_token);
              if (zakToken) {
                signature = await dispatch(GetGenerateMeetingSignature(props.data.MeetingId, roleid));
              } else {
                console.error('Failed to fetch ZAK token, cannot join meeting.');
                return;
              }
            } catch (error) {
              console.error('Error during ZAK token fetching:', error);
              return;
            }
          } else {
            console.error('Access token not found.');
            return;
          }
        } else {
          signature = await dispatch(GetGenerateMeetingSignature(props.data.MeetingId, roleid));
        }

        const client = ZoomMtgEmbedded.createClient();
        setZoomClient(client);

        if (zoomDivRef.current) {
          client.init({
            zoomAppRoot: zoomDivRef.current,
            language: 'en-US',
          });

          const joinParams = {
            sdkKey: 'Ex6IDDIjQuCwGfPCwSUdA',
            signature: signature,
            meetingNumber: props.data.MeetingId,
            password: props.data.EncryptedMeetingPassword || "",
            userName: ispatient ? props.data.PatientName : props.data.DoctorName,
            success: () => {
              console.log('Successfully joined meeting');
            },
            error: (error) => {
              console.error('Error joining the meeting:', error);
            },
          };

          if (roleid === 1 && zakToken) {
            joinParams.zak = zakToken;
          }
          console.log("Join Parameters:", joinParams)
          client.join(joinParams);
        }
      } catch (error) {
        console.error('Error initializing Zoom client:', error);
      }
    };

    if (props.data.MeetingId && roleid !== null) {
      initializeZoomClient();
    }

    return () => {
      if (zoomClient) {
        zoomClient.leave();
      }
    };
  }, [props.data.MeetingId, roleid, dispatch, ispatient, props.data.EncryptedMeetingPassword, props.data.PatientName, props.data.DoctorName, props.data.DoctorId]);

  return (
    <div ref={zoomDivRef} className='vediocalsdkdiv'>
    </div>
  );
};

export default VedioCreateRoom;