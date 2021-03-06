import React from "react";
import { Toolbar, Button } from "patternfly-react";
import { DebounceInput } from "react-debounce-input";

const CommonToolbar = ({ buttons, onFilter }) => {
    const elements = buttons && buttons.map(button => (
        <Button
            style={{ float: "right", marginRight: "5px" }}
            key={button.id}
            bsStyle="primary"
            onClick={button.cb}
            disabled={button.enabled === false}
            {...button.props}
        >
            {button.title}
        </Button>
    ));

    const handleKeyPress = event => {
        if (event.charCode === 13) {
            event.preventDefault();
        }
    };

    return (
        <div className="toolbar-container">
            <Toolbar>
                <DebounceInput
                    minLength={1}
                    debounceTimeout={300}
                    type="text"
                    placeholder="Filter by Name"
                    style={{ height: "26px" }}
                    onChange={e => onFilter(e.target.value)}
                    onKeyPress={e => handleKeyPress(e)}
                />
                {elements}
            </Toolbar>
        </div>
    );
};

export { CommonToolbar };
