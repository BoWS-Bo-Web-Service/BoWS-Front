import { useEffect } from "react";
import { Terminal as xterm } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';

class Terminal {
    constructor() {
        this.terminal = new xterm({
            cursorBlink: true,
            scrollSensitivity: 2,
            allowProposedApi: true,
        });
        this._fitAddon = new FitAddon();
        this._input = 0;
        this._initWebTerminal();
    }

    open(element) {
        this.terminal.open(element);
    }

    fit() {
        this._fitAddon.fit();
    }

    write(text) {
        this.terminal.write(text);
    }

    _initWebTerminal() {
        this.terminal.onKey((e) => this._onKeyHandler(e));
        this.terminal.loadAddon(this._fitAddon);
    }

    _onKeyHandler(e) {
        const printable = !e.domEvent.altKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;
        if (e.domEvent.key === 'Enter') {
            this._enter();
        } else if (e.domEvent.key === 'Backspace') {
            this._backSpace();
        } else if (e.domEvent.key === 'ArrowRight') {
            this._moveRight();
        } else if (e.domEvent.key === 'ArrowLeft') {
            this._moveLeft();
        } else if (printable) {
            this.terminal.write(e.key);
            this._input++;
        }
    }

    _enter() {
        this.terminal.write('\r\n');
        this._input = 0;
    }

    _backSpace() {
        if(this.terminal.buffer.active.cursorX > 0){
            this.terminal.write('\b \b');
            this._input--;
        }
    }

    _moveRight() {
        this.terminal.write('\x1B[C');
    }

    _moveLeft() {
        this.terminal.write('\x1B[D');
    }
}

const WebTerminal = () => {
    useEffect(() => {
        const terminal = new Terminal();
        terminal.open(document.getElementById('terminal'));
        terminal.fit();
    },[]);

    return (
        <>
            <div id="terminal"/>
        </>
    );
};

export default WebTerminal;