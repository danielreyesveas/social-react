import React from "react";

// material-ui
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const CustomButton = ({
	children,
	onClick,
	tip,
	btnClassName,
	tipClassName,
	placement = "top",
}) => {
	return (
		<Tooltip title={tip} className={tipClassName} placement={placement}>
			<IconButton onClick={onClick} className={btnClassName}>
				{children}
			</IconButton>
		</Tooltip>
	);
};

export default CustomButton;
