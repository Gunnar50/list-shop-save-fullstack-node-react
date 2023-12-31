import React from "react";
import { CiCamera } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

function ScannerButton({ cameraActive, setCameraActive }) {
	return (
		<div
			type="button"
			className="camera-button"
			onClick={() => {
				setCameraActive(!cameraActive);
			}}
		>
			{cameraActive ? <IoClose /> : <CiCamera />}
		</div>
	);
}

export default ScannerButton;
