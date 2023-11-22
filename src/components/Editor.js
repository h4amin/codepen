import React, { useState } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';

import { ReactComponent as Html5Icon } from '../logos/html-5.svg'; // Replace with your HTML5 SVG icon path
import { ReactComponent as CssIcon } from '../logos/css.svg'; // Replace with your HTML5 SVG icon path
import { ReactComponent as JsIcon } from '../logos/js.svg'; // Replace with your HTML5 SVG icon path

export default function Editor(props) {
    const { 
        language,
        displayName,
        value,
        onChange
    } = props;

    const [open, setOpen] = useState(true);

    function handleChange(editor, data, value){
        onChange(value);
    }

    const getLanguageIcon = (language) => {
        switch (language) {
            case 'xml':
                return <Html5Icon className="html-icon" />;
            case 'css':
                return <CssIcon className="css-icon" />; 
            case 'javascript':
                return <JsIcon className="js-icon" />; // Replace with your JavaScript PNG icon path
            default:
                return null;
        }
    };

    return (
        <div className={`editor-container ${open ? '' : 'collapsed'}`}>
            <div className="editor-title">
                <div className="language-info">
                    {getLanguageIcon(language)}
                    <span className="displayName">{displayName}</span>
                </div>
                
                <button
                    type="button"
                    className="expand-collapse-btn"
                    onClick={() => setOpen(prevOpen => !prevOpen)}
                    >
                    <FontAwesomeIcon icon = {open ? faCompressAlt : faExpandAlt } />
                </button>
                
            </div>
            <ControlledEditor 
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: 'material',
                    lineNumbers: true
                }}
            />
        </div>
    );
}
