import React, { Component } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@material-ui/core";
const withDialogue = (MyComponent, content) => {
	return class extends Component {
		state = {
			open: false
		};
		dialogueOpenHandler = () => {
			this.setState({ open: true });
		};
		dialogueCloseHandler = () => {
			this.setState({ open: true });
		};
		render() {
			return (
				<React.Fragment>
					<Dialog
						open={this.state.open}
						onClose={this.dialogueCloseHandler}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							{content.title ? content.title : "Are you sure?"}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								{content.text && content.text}
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button color="primary">{content.yes}</Button>
							<Button onClick={this.dialogueCloseHandler} color="primary" autoFocus>
								{content.no}
							</Button>
						</DialogActions>
					</Dialog>
					<MyComponent {...this.props} dialogueOpened={this.dialogueOpenHandler} />
				</React.Fragment>
			);
		}
	};
};

export default withDialogue;
