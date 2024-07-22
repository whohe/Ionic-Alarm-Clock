import React, { useContext, useState } from "react";
import './AlarmOption.css';
import { minutesNumber, hourNumber } from "../../func";
import useSelect from "../../hook/useSelect";
import { AlarmContext } from "../context/ContextAlarm";
import { Haptics, ImpactStyle } from '@capacitor/haptics';

interface ContainerProps { }

const AlarmOption: React.FC<ContainerProps> = () => {
  const [hour, setHour] = useSelect("Hour");
  const [minutes, setMinutes] = useSelect("Minutes");
  const [amPmOption, setAmPmOption] = useSelect("Am-Pm");
  const [vibrateId, setVibrateId] = useState("");
  const { setAlarmTime, pauseAlarm, hasAlarm, setHasAlarm } =
    useContext(AlarmContext);

  const hapticsVibrate = async () => {
  		Haptics.vibrate();
	};

	const hapticsSelectionStart = async () => {
  	await Haptics.selectionStart();
	};

	const hapticsImpactMedium = async () => {
  	await Haptics.impact({ style: ImpactStyle.Medium });
	};

  const setAlarm = () => {
    if (hasAlarm) {
    	clearInterval(vibrateId)
      pauseAlarm();
      setHasAlarm(false);
      return;
    }
    if (
      !hour.includes("Hour") &&
      !minutes.includes("Minutes") &&
      !amPmOption.includes("Am-Pm")
    ) {
      setHasAlarm(true);
      setAlarmTime(`${hour}:${minutes} ${amPmOption}`);
			let id = setInterval(() => {
				hapticsVibrate();
			},2000)
			setVibrateId(id)
    }
  };
  return (
    <div className="option-Container">
      <div className={`wrapper-option ${hasAlarm && "disable"}`}>
        <select {...setHour}>
          <option disabled value="Hour">
            Hour
          </option>
          {hourNumber.map((hour, index) => (
            <option key={index} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select {...setMinutes}>
          <option disabled value="Minutes">
            Minutes
          </option>
          {minutesNumber.map((minutes, index) => (
            <option key={index} value={minutes}>
              {minutes}
            </option>
          ))}
        </select>
        <select {...setAmPmOption}>
          <option disabled value="Am-Pm">
            Am/Pm
          </option>
          <option value="AM">Am</option>
          <option value="PM">Pm</option>
        </select>
      </div>
      <button
        onClick={setAlarm}
        className={`setAlarm-btn ${hasAlarm && "play"}`}
      >
        {hasAlarm ? "Clear Alarm" : "Set Alarm"}
      </button>
    </div>
  );
};

export default AlarmOption;
