import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

var week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
var options = [
  "schedule",
  "velocity",
  "direction",
  "upperlimit",
  "bottomlimit",
  "factoryreset",
];
var s;
var date = new Date();
var d;
var i;
var battery;
var position;
var limitsmessage;

class BlindControl extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  static get styles() {
    return css`
      button:focus {
        outline: none;
      }
      div#card {
        font-family: Roboto, sans-serif;
        font-weight: 100;
        position: relative;
        height: 250px;
        background-color: white;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.05);
        display: block;
        user-select: none;
      }
      div#interface {
        position: absolute;
        height: 100%;
        width: 100%;
        display: block;
      }
      div#retry {
        position: absolute;
        top: 25%;
        width: 100%;
        height: 60%;
        z-index: 100;
        background-color: white;
        border-top: 1px solid #d8d8d8;
        border-bottom: 1px solid #d8d8d8;
        backdrop-filter: blur(10px);
      }
      div#top {
        position: absolute;
        height: 10%;
        width: 100%;
      }
      div#top_blind {
        height: 100%;
        width: 35%;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #7fb6c9;
        border-right: 2px solid #7fb6c9;
      }
      div#settings {
        height: 100%;
        width: 20%;
        float: left;
        display: flex;
        justify-content: left;
        align-items: center;
        margin-left: 5%;
      }
      settings_logo {
        font-weight: 300;
        color: #666666;
        display: flex;
        text-align: left;
        justify-content: center;
        align-items: center;
        text-shadow: 0px 0px 3px #ffffff;
      }
      div#battery {
        font-size: 13px;
        height: 100%;
        width: 20%;
        float: right;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      div#pile_ext {
        height: 28%;
        width: 23%;
        border: 1px solid rgba(0, 0, 0, 0.6);
        border-radius: 15px;
        margin-left: 4px;
      }
      div#blind_ext {
        position: absolute;
        top: 10%;
        width: 35%;
        height: 90%;
        border-right: 2px solid #d8d8d8;
      }
      div#position {
        position: absolute;
        height: 100%;
        width: 60%;
        display: inline-block;
        font-size: 1rem;
      }
      div#number {
        float: left;
        width: 60%;
        font-size: 25px;
        text-align: right;
      }
      div#percentage {
        float: left;
        width: 40%;
        font-size: 15px;
        text-align: left;
        margin-top: 5px;
        margin-left: 3px;
        opacity: 0.7;
      }
      arrow {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 20px;
        text-align: center;
        vertical-align: bottom;
        opacity: 0.4;
      }
      div#buttons {
        position: absolute;
        left: 60%;
        width: 40%;
        height: 100%;
        display: inline-block;
        font-size: 1rem;
      }
      .division33 {
        height: 33.333333%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        text-align: center;
        color: #4d4d4d;
      }
      .division20 {
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25px;
        text-align: center;
        color: #4d4d4d;
      }
      .buttonact {
        font-size: 20px;
        text-align: center;
        width: 45px;
        height: 45px;
        border: 0px solid;
        border-radius: 15%;
        color: white;
        background-color: #7fb6c9;
        margin-right: 40%;
        transition: opacity 1s;
      }
      .schedule1 {
        height: 33%;
      }
      .schedule0 {
        height: 33%;
        opacity: 0.5;
      }
      div#day_selector {
        font-size: 35px;
        height: 100%;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        user-select: none;
        opacity: 0.7;
      }
      div#day {
        height: 100%;
        font-size: 35px;
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        user-select: none;
      }
      .logo {
        width: 10%;
        height: 100%;
        font-size: 20px;
        float: left;
        display: flex;
        justify-content: left;
        align-items: center;
        user-select: none;
        margin-left: 5%;
      }
      .time {
        height: 100%;
        width: 17%;
        float: left;
      }
      .selector {
        height: 35%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.7;
      }
      .schinfo {
        font-size: 20px;
        height: 30%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      div#separator {
        font-size: 20px;
        height: 100%;
        width: auto;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      div#setting_menu {
        position: absolute;
        top: 10%;
        height: 90%;
        width: 35%;
        border-right: 2px solid #d8d8d8;
      }
      div#setting_option0 {
        height: 10%;
        width: 95%;
        display: block;
        font-weight: 400;
        text-align: right;
        color: #aaaaaa;
        margin-bottom: 4.5%;
      }
      div#setting_option1 {
        height: 10%;
        width: 95%;
        display: block;
        font-weight: 700;
        text-align: right;
        color: #4d4d4d;
        margin-bottom: 4.5%;
      }
      div#setting_config {
        position: absolute;
        top: 10%;
        left: 35%;
        height: 90%;
        width: 65%;
      }
      div#setting_save {
        position: absolute;
        right: 5%;
        bottom: 10%;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        text-align: center;
        width: 70px;
        height: 30px;
        border: 0px solid;
        border-radius: 3px;
        color: white;
        background-color: #7fb6c9;
      }
      div#setting_cancel {
        position: absolute;
        left: 5%;
        bottom: 10%;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        text-align: center;
        width: 70px;
        height: 30px;
        border: 0px solid;
        border-radius: 3px;
        color: white;
        background-color: #c52020;
      }
      div#setting_set {
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        text-align: center;
        width: 70px;
        height: 30px;
        border: 0px solid;
        border-radius: 3px;
        color: white;
        background-color: #7fb6c9;
      }
      .buttonact_limit {
        font-size: 20px;
        text-align: center;
        width: 45px;
        height: 45px;
        border: 0px solid;
        border-radius: 15%;
        color: white;
        background-color: #7fb6c9;
        margin-right: 5%;
        margin-left: 5%;
        transition: opacity 1s;
      }
      div#message {
        position: absolute;
        top: 20%;
        left: 40%;
        width: 55%;
        height: auto;
        text-align: center;
        font-size: 15px;
        font-weight: 400;
        transition: opacity 1s;
        background-color: #949494;
        border-radius: 5px;
        color: white;
      }
    `;
  }

  render() {
    battery = this.hass.states["input_text.notifications"].state.slice(0, 2);
    if (battery == "99") {
      battery = "100";
    }
    position = this.hass.states["input_text.notifications"].state.slice(2, 5);

    if (
      localStorage.getItem("settings") == "0" ||
      localStorage.getItem("settings") == null
    ) {
      d = this._getISODay();
      return html`
        <head>
          <style>
            div#blind_int {
              position: absolute;
              top: 10%;
              width: 35%;
              height: 90%;
              height: ${this._setBlind()[0]};
              background: repeating-linear-gradient(
                #d3e4e9,
                #f0f8f9 ${this._setBlind()[1]}
              );
            }
            div#pile_int {
              height: 100%;
              width: ${battery + "%"};
              border-radius: 15px 0px 0px 15px;
              float: left;
              background-color: #666666;
            }
            div#schedule {
              position: absolute;
              top: 10%;
              left: 35%;
              width: 65%;
              height: 90%;
              display: inline-block;
              color: #4d4d4d;
              opacity: ${s + 0.4};
              font-size: 1rem;
            }
          </style>
        </head>
        <div id="card">
          ${this._retryConnectionGraphics()}
          <div id="interface">
            <div id="top">
              <div id="top_blind"></div>
              <div id="settings" @click="${() => this._openSettings()}">
                <settings_logo>Settings</settings_logo>
              </div>
              <div id="battery">
                ${battery}%
                <div id="pile_ext"><div id="pile_int"></div></div>
              </div>
            </div>
            <div id="blind_int"></div>
            <div id="blind_ext">
              <div id="position">
                <div class="division33">
                  <arrow>${this._setArrows()}</arrow>
                </div>
                <div class="division33">
                  <div id="number">
                    ${this._fixPosition(this._fixPosition(position))}
                  </div>
                  <div id="percentage">%</div>
                </div>
                <div class="division33">
                  <arrow>${this._setArrows()}</arrow>
                </div>
              </div>
              <div id="buttons">
                <div class="division33">
                  <button
                    class="buttonact"
                    id="goup_button"
                    @click="${() =>
                      this._sendCommand("00FF00009A0A01DD4C", "c")}"
                  >
                    ▲
                  </button>
                </div>
                <div class="division33">
                  <button
                    class="buttonact"
                    @click="${() =>
                      this._sendCommand("00FF00009A0A01CC5D", "c")}"
                  >
                    ❙❙
                  </button>
                </div>
                <div class="division33">
                  <button
                    class="buttonact"
                    id="godown_button"
                    @click="${() =>
                      this._sendCommand("00FF00009A0A01EE7F", "c")}"
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>
            <div id="schedule">
              <div class="schedule1">
                <div id="day_selector"></div>
                <div id="day">${week[d]}</div>
                <div id="day_selector"></div>
              </div>
              <div class="schedule${this._checkSchedule("m")}">
                <div class="logo">☼</div>
                <div class="time">
                  <div class="selector"></div>
                  <div class="schinfo" id="mh">
                    ${this.hass.states["input_text.schedule"].state.slice(
                      14 * d + 2,
                      14 * d + 4
                    )}
                  </div>
                  <div class="selector"></div>
                </div>
                <div id="separator">:</div>
                <div class="time">
                  <div class="selector"></div>
                  <div class="schinfo" id="mm">
                    ${this.hass.states["input_text.schedule"].state.slice(
                      14 * d + 4,
                      14 * d + 6
                    )}
                  </div>
                  <div class="selector"></div>
                </div>
                <div id="separator">hr&nbsp&nbsp&nbsp</div>
                <div class="time">
                  <div class="selector"></div>
                  <div class="schinfo" id="mm">
                    ${this._fixPercentage(
                      this.hass.states["input_text.schedule"].state.slice(
                        14 * d + 6,
                        14 * d + 8
                      )
                    )}
                  </div>
                  <div class="selector"></div>
                </div>
                <div id="separator">%</div>
              </div>
              <div class="schedule${this._checkSchedule("n")}">
                <div class="logo">☾</div>
                <div class="time">
                  <div class="selector"></div>
                  <div class="schinfo" id="nh">
                    ${this.hass.states["input_text.schedule"].state.slice(
                      14 * d + 9,
                      14 * d + 11
                    )}
                  </div>
                  <div class="selector"></div>
                </div>
                <div id="separator">:</div>
                <div class="time">
                  <div class="selector"></div>
                  <div class="schinfo" id="nm">
                    ${this.hass.states["input_text.schedule"].state.slice(
                      14 * d + 11,
                      14 * d + 13
                    )}
                  </div>
                  <div class="selector"></div>
                </div>
                <div id="separator">hr&nbsp&nbsp&nbsp</div>
                <div class="time">
                  <div class="selector"></div>
                  <div class="schinfo" id="n%">
                    ${this._fixPercentage(
                      this.hass.states["input_text.schedule"].state.slice(
                        14 * d + 13,
                        14 * d + 15
                      )
                    )}
                  </div>
                  <div class="selector"></div>
                </div>
                <div id="separator">%</div>
              </div>
            </div>
            <div id="message"></div>
          </div>
        </div>
      `;
    } else if (localStorage.getItem("settings") == "1") {
      d = parseInt(
        this.hass.states["input_text.schedule"].state.slice(0, 1),
        10
      );
      return html`
        <head>
          <style>
            div#pile_int {
              height: 100%;
              width: ${battery + "%"};
              border-radius: 15px 0px 0px 15px;
              float: left;
              background-color: #666666;
            }
            div#schedule {
              position: absolute;
              top: 10%;
              left: 35%;
              width: 65%;
              height: 90%;
              display: inline-block;
              color: #4d4d4d;
              opacity: ${s + 0.4};
              font-size: 1rem;
            }
            div#schtoggle {
              height: 11px;
              width: 11px;
              border: 1px solid white;
              border-radius: 3px;
              background-color: #dadada;
            }
          </style>
        </head>

        <div id="card">
          ${this._retryConnectionGraphics()}
          <div id="interface">
            <div id="top">
              <div id="top_blind"></div>
              <div id="settings" @click="${() => this._openSettings()}">
                <settings_logo>Controller</settings_logo>
              </div>
              <div id="battery">
                ${battery}%
                <div id="pile_ext"><div id="pile_int"></div></div>
              </div>
            </div>
            <div id="setting_menu">
              <div id="setting_option0"></div>
              <div
                id="setting_option${localStorage.getItem(options[0])}"
                @click="${() => this._manageSettingsOptions(0)}"
              >
                Schedule
              </div>
              <div
                id="setting_option${localStorage.getItem(options[1])}"
                @click="${() => this._manageSettingsOptions(1)}"
              >
                Velocity
              </div>
              <div
                id="setting_option${localStorage.getItem(options[2])}"
                @click="${() => this._manageSettingsOptions(2)}"
              >
                Direction
              </div>
              <div
                id="setting_option${localStorage.getItem(options[3])}"
                @click="${() => this._manageSettingsOptions(3)}"
              >
                Upper limit
              </div>
              <div
                id="setting_option${localStorage.getItem(options[4])}"
                @click="${() => this._manageSettingsOptions(4)}"
              >
                Bottom limit
              </div>
              <div
                id="setting_option${localStorage.getItem(options[5])}"
                @click="${() => this._manageSettingsOptions(5)}"
              >
                Factory reset
              </div>
            </div>
            ${this._manageSettingsGraphics()}
            <div id="message"></div>
          </div>
        </div>
      `;
    }
  }

  firstUpdated(changedProperties) {
    this.hass.callService("input_text", "set_value", {
      value: "1",
      entity_id: "input_text.busy",
    });

    localStorage.setItem("goup", "0");
    localStorage.setItem("godown", "0");
    localStorage.setItem("stop", "0");
    localStorage.setItem("settings", "0");
    localStorage.setItem("busy", "0");
    localStorage.setItem("busylimit", "0");
    localStorage.setItem("bottom", "0");
    localStorage.setItem("message", "0");
    localStorage.setItem("status", "-1");
    localStorage.setItem(
      "direction0",
      this.hass.states["input_text.configuration"].state.slice(2, 3)
    );
    localStorage.setItem(
      "velocity0",
      this.hass.states["input_text.configuration"].state.slice(0, 2)
    );

    this._checkConnection();
    setInterval(() => {
      this._checkConnection();
    }, 600000);

    setTimeout(() => {
      this._requestNotification("00FF00009AA2010138");
      setTimeout(() => {
        this._requestNotification("00FF00009AA701013D");
      }, 1000);
    }, 1000);
  }

  updated(changedProperties) {
    this._updateGraphics();
  }

  _updateGraphics() {
    this.shadowRoot.getElementById("pile_int").style.width =
      battery.toString() + "%";

    if (this.shadowRoot.getElementById("blind_int") != null) {
      this.shadowRoot.getElementById(
        "blind_int"
      ).style.height = this._setBlind()[0];

      this.shadowRoot.getElementById(
        "blind_int"
      ).style.background = `repeating-linear-gradient(#d3e4e9, #f0f8f9 ${
        this._setBlind()[1]
      })`;
    }

    if (
      this.shadowRoot.getElementById("goup_button") != null &&
      this.shadowRoot.getElementById("godown_button") != null
    ) {
      if (this.hass.states["input_text.busy"].state == "1") {
        this.shadowRoot.getElementById("goup_button").style.opacity = "0.4";
        this.shadowRoot.getElementById("godown_button").style.opacity = "0.4";
      } else if (this.hass.states["input_text.busy"].state == "0") {
        this.shadowRoot.getElementById("goup_button").style.opacity = "1";
        this.shadowRoot.getElementById("godown_button").style.opacity = "1";
      }
    }

    if (
      this.shadowRoot.getElementById("goup_button_s") != null &&
      this.shadowRoot.getElementById("godown_button_s") != null
    ) {
      if (this.hass.states["input_text.busy"].state == "1") {
        this.shadowRoot.getElementById("goup_button_s").style.opacity = "0.4";
        this.shadowRoot.getElementById("godown_button_s").style.opacity = "0.4";
      } else if (this.hass.states["input_text.busy"].state == "0") {
        this.shadowRoot.getElementById("goup_button_s").style.opacity = "1";
        this.shadowRoot.getElementById("godown_button_s").style.opacity = "1";
      }
    }

    if (localStorage.getItem(options[3]) == "0") {
      localStorage.setItem("upper", "-1");
    }
    if (localStorage.getItem(options[4]) == "0") {
      localStorage.setItem("bottom", "-1");
    }

    if (this.shadowRoot.getElementById("message") != null) {
      if (
        position == 255 &&
        (localStorage.getItem("goup") == "1" ||
          localStorage.getItem("godown") == "1")
      ) {
        this._message("Set the limits of the blind");
      }
    }

    if (
      localStorage.getItem("status") == "0" ||
      localStorage.getItem("status") == "-1"
    ) {
      this.shadowRoot.getElementById("interface").style.opacity = "0.5";
      this.shadowRoot.getElementById("battery").style.opacity = "0";
    } else if (
      localStorage.getItem("status") == "1" ||
      localStorage.getItem("status") == "-1"
    ) {
      this.shadowRoot.getElementById("interface").style.opacity = "1";
      this.shadowRoot.getElementById("battery").style.opacity = "1";
    }
  }

  _checkConnection() {
    if (localStorage.getItem("busy") == "0") {
      this.hass.callService("input_text", "set_value", {
        value: "00FF00009A170222B815",
        entity_id: "input_text.mqtt",
      });

      this.hass.callService("homeassistant", "toggle", {
        entity_id: "input_boolean.mqtt",
      });

      setTimeout(() => {
        if (this.hass.states["sensor.mqtt_sensor"].state == "9A17015A31") {
          console.log(
            "Connected" + " " + this.hass.states["sensor.time"].state
          );
          setTimeout(() => {
            localStorage.setItem("status", "1");
            setTimeout(() => {
              this.hass.callService("input_text", "set_value", {
                value: "0",
                entity_id: "input_text.busy",
              });
            }, 1500);
            this.requestUpdate();
          }, 3500);
          if (
            this.hass.states["input_text.configuration"].state == "unknown" &&
            this.hass.states["input_text.notifications"].state == "unknown" &&
            this.hass.states["input_text.schedule"].state == "unknown"
          ) {
            this._factoryReset();
          }
        } else {
          console.log(
            "Disconnected" + " " + this.hass.states["sensor.time"].state
          );
          localStorage.setItem("status", "0");
          this.hass.callService("input_text", "set_value", {
            value: "1",
            entity_id: "input_text.busy",
          });
          this.requestUpdate();
        }
      }, 500);
    }
  }

  _retryConnectionGraphics() {
    if (localStorage.getItem("status") == "0") {
      return html`
        <div id="retry">
          <div class="division33"><br />Device not connected</div>
          <div class="division20"></div>
          <div class="division33">
            <div id="setting_set" @click="${() => window.location.reload()}">
              Retry
            </div>
          </div>
          <div class="division33"></div>
        </div>
      `;
    } else if (localStorage.getItem("status") == "-1") {
      return html` <div id="retry">
        <div class="division33"></div>
        <div class="division33">Loading...</div>
        <div class="division33"></div>
      </div>`;
    } else if (localStorage.getItem("status") == "1") {
      return html``;
    }
  }

  _getISODay() {
    var d;
    d = date.getDay();
    d = d - 1;
    if (d == -1) {
      d = 6;
    }
    return d;
  }

  _getNotifications() {
    var value;
    var nbattery;
    var nposition;
    var sensor = this.hass.states["sensor.mqtt_sensor"].state;
    var id = sensor.slice(2, 4);

    if (id == "A2") {
      console.log("Notificación batería" + " " + sensor);
      nbattery = parseInt("0x" + sensor.slice(14, 16)).toString();
      if (nbattery == "100") {
        nbattery = "99";
      } else if(nbattery < 10) {
        nbattery = "0" + nbattery;
      }
      nposition = position;
    } else if (id == "A7") {
      console.log("Notificación posición" + " " + sensor);
      nposition = parseInt("0x" + sensor.slice(10, 12)).toString();

      if (localStorage.getItem("goup") == "1") {
        if (this._fixPosition(nposition) == 100) {
          setTimeout(() => {
            this._sendCommand("00FF00009A0A01CC5D", "c");
          }, 1000);
        } else {
          this._requestNotification("00FF00009AA701013D");
        }
      } else if (localStorage.getItem("godown") == "1") {
        if (this._fixPosition(nposition) == 0) {
          setTimeout(() => {
            this._sendCommand("00FF00009A0A01CC5D", "c");
          }, 1000);
        } else {
          this._requestNotification("00FF00009AA701013D", "c");
        }
      }
      nbattery = battery;
    } else {
      nbattery = battery;
      nposition = position;
    }

    value = nbattery + nposition;

    console.log("Escribo el valor" + " " + value);

    this.hass.callService("input_text", "set_value", {
      value: value,
      entity_id: "input_text.notifications",
    });
  }

  _sendCommand(message, type) {
    if (localStorage.getItem("status") == "1") {
      if (
        this.hass.states["input_text.busy"].state == "0" ||
        message == "00FF00009A0A01CC5D"
      ) {
        this.hass.callService("input_text", "set_value", {
          value: "1",
          entity_id: "input_text.busy",
        });

        this.hass.callService("input_text", "set_value", {
          value: message,
          entity_id: "input_text.mqtt",
        });

        this.hass.callService("homeassistant", "toggle", {
          entity_id: "input_boolean.mqtt",
        });

        if (type == "c" || message == "00FF00009A0A01CC5D") {
          if (message == "00FF00009A0A01DD4C") {
            localStorage.setItem("goup", "1");
            localStorage.setItem("godown", "0");
            localStorage.setItem("stop", "0");
            setTimeout(() => {
              this._requestNotification("00FF00009AA701013D");
            }, 600);
          } else if (message == "00FF00009A0A01EE7F") {
            localStorage.setItem("goup", "0");
            localStorage.setItem("godown", "1");
            localStorage.setItem("stop", "0");
            setTimeout(() => {
              this._requestNotification("00FF00009AA701013D");
            }, 600);
          }
        }
        if (message == "00FF00009A0A01CC5D") {
          localStorage.setItem("goup", "0");
          localStorage.setItem("godown", "0");
          localStorage.setItem("stop", "1");
          setTimeout(() => {
            this._requestNotification("00FF00009AA2010138");
          }, 400);
          setTimeout(() => {
            this.hass.callService("input_text", "set_value", {
              value: "0",
              entity_id: "input_text.busy",
            });
          }, 1000);
        }
      }
    }
  }

  _requestNotification(message) {
    if (localStorage.getItem("busy") == "0") {
      localStorage.setItem("busy", "1");
      this.hass.callService("input_text", "set_value", {
        value: message,
        entity_id: "input_text.mqtt",
      });

      this.hass.callService("homeassistant", "toggle", {
        entity_id: "input_boolean.mqtt",
      });

      const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };

      sleep(900).then(() => {
        localStorage.setItem("busy", "0");
        this._getNotifications();
      });
    }
  }

  _setArrows() {
    if (localStorage.getItem("goup") == "1") {
      return html`︿<br />︿`;
    } else if (localStorage.getItem("godown") == "1") {
      return html`﹀<br />﹀`;
    } else if (localStorage.getItem("stop") == "1") {
      return html``;
    }
  }

  _setBlind() {
    var n;
    var height;
    var line;
    var nPosition = this._fixPosition(position);

    if (nPosition > 99) {
      nPosition = 99;
    } else if (nPosition < 0) {
      nPosition = 0;
    }

    if (
      localStorage.getItem("status") == "-1" ||
      localStorage.getItem("status") == "0"
    ) {
      nPosition = 0;
    }

    n = Math.abs(Math.trunc(nPosition / 10) - 10);

    height = 9 * n;
    line = (90 / height) * 10;

    return [height.toString() + "%", line.toString() + "%"];
  }

  _fixPosition(position) {
    var nPosition = parseInt(position, 10);
    if (position == 255) {
      return 50;
    } else {
      if (nPosition > 98) {
        nPosition = 100;
      } else if (nPosition < 2) {
        nPosition = 0;
      }
      var n = Math.round(nPosition / 5);
      return n * 5;
    }
  }

  _openSettings() {
    if (localStorage.getItem("status") == "1") {
      if (localStorage.getItem("settings") == "0") {
        localStorage.setItem("settings", "1");
      } else if (localStorage.getItem("settings") == "1") {
        localStorage.setItem("settings", "0");
      }

      localStorage.setItem(options[0], "1");
      for (i = 1; i < options.length; i++) {
        localStorage.setItem(options[i], "0");
      }

      this.requestUpdate();
    }
  }

  _manageSettingsOptions(option) {
    if (localStorage.getItem("busylimit") == "0") {
      localStorage.setItem(options[0], "1");
      for (i = 0; i < options.length; i++) {
        localStorage.setItem(options[i], "0");
      }
      localStorage.setItem(options[option], "1");

      this.shadowRoot.getElementById("message").style.opacity = "0";
      this.shadowRoot.getElementById("message").innerHTML = "";
      this.shadowRoot.getElementById("message").style.padding = "0px";
      localStorage.setItem("message", "0");
    } else {
      this._message("Cancel limit operation first");
    }
    this.requestUpdate();
  }

  _manageSettingsGraphics() {
    if (localStorage.getItem(options[0]) == "1") {
      localStorage.setItem("busyoption", 0);
      return html` <div id="schedule">
        <div class="schedule1">
          <div id="day_selector" @click="${() => this._toggleDay(-1)}">
            <
          </div>
          <div id="day">${week[d]}</div>
          <div id="day_selector" @click="${() => this._toggleDay(+1)}">
            >
          </div>
        </div>
        <div class="schedule${this._checkSchedule("m")}">
          <div class="logo">☼</div>
          <div class="time">
            <div class="selector" @click="${() => this._toggleTime(+1, "mh")}">
              ︿
            </div>
            <div class="schinfo" id="mh">
              ${this.hass.states["input_text.schedule"].state.slice(
                14 * d + 2,
                14 * d + 4
              )}
            </div>
            <div class="selector" @click="${() => this._toggleTime(-1, "mh")}">
              ﹀
            </div>
          </div>
          <div id="separator">:</div>
          <div class="time">
            <div class="selector" @click="${() => this._toggleTime(+5, "mm")}">
              ︿
            </div>
            <div class="schinfo" id="mm">
              ${this.hass.states["input_text.schedule"].state.slice(
                14 * d + 4,
                14 * d + 6
              )}
            </div>
            <div class="selector" @click="${() => this._toggleTime(-5, "mm")}">
              ﹀
            </div>
          </div>
          <div id="separator">hr&nbsp&nbsp&nbsp</div>
          <div class="time">
            <div class="selector" @click="${() => this._toggleTime(+5, "m%")}">
              ︿
            </div>
            <div class="schinfo" id="mm">
              ${this._fixPercentage(
                this.hass.states["input_text.schedule"].state.slice(
                  14 * d + 6,
                  14 * d + 8
                )
              )}
            </div>
            <div class="selector" @click="${() => this._toggleTime(-5, "m%")}">
              ﹀
            </div>
          </div>
          <div id="separator">%</div>
          <div id="separator">
            &nbsp&nbsp&nbsp&nbsp
            <div
              id="schtoggle"
              @click="${() => this._toggleSchedule("m")}"
            ></div>
          </div>
        </div>
        <div class="schedule${this._checkSchedule("n")}">
          <div class="logo">☾</div>
          <div class="time">
            <div class="selector" @click="${() => this._toggleTime(+1, "nh")}">
              ︿
            </div>
            <div class="schinfo" id="nh">
              ${this.hass.states["input_text.schedule"].state.slice(
                14 * d + 9,
                14 * d + 11
              )}
            </div>
            <div class="selector" @click="${() => this._toggleTime(-1, "nh")}">
              ﹀
            </div>
          </div>
          <div id="separator">:</div>
          <div class="time">
            <div class="selector" @click="${() => this._toggleTime(+5, "nm")}">
              ︿
            </div>
            <div class="schinfo" id="nm">
              ${this.hass.states["input_text.schedule"].state.slice(
                14 * d + 11,
                14 * d + 13
              )}
            </div>
            <div class="selector" @click="${() => this._toggleTime(-5, "nm")}">
              ﹀
            </div>
          </div>
          <div id="separator">hr&nbsp&nbsp&nbsp</div>
          <div class="time">
            <div class="selector" @click="${() => this._toggleTime(+5, "n%")}">
              ︿
            </div>
            <div class="schinfo" id="n%">
              ${this._fixPercentage(
                this.hass.states["input_text.schedule"].state.slice(
                  14 * d + 13,
                  14 * d + 15
                )
              )}
            </div>
            <div class="selector" @click="${() => this._toggleTime(-5, "n%")}">
              ﹀
            </div>
          </div>
          <div id="separator">%</div>
          <div id="separator">
            &nbsp&nbsp&nbsp&nbsp
            <div
              id="schtoggle"
              @click="${() => this._toggleSchedule("n")}"
            ></div>
          </div>
        </div>
      </div>`;
    } else if (localStorage.getItem(options[1]) == "1") {
      if (localStorage.getItem("busyoption") != 1) {
        localStorage.setItem(
          "velocity1",
          this.hass.states["input_text.configuration"].state.slice(0, 2)
        );
      }
      localStorage.setItem("busyoption", 1);
      return html`<div id="setting_config">
        <div class="division20"></div>
        <div class="division20" @click="${() => this._toggleConfig(+1, "v")}">
          <div class="selector">︿</div>
        </div>
        <div class="division20" id="velocity">
          ${this._displayConfig()} rpm
        </div>
        <div class="division20" @click="${() => this._toggleConfig(-1, "v")}">
          <div class="selector">﹀</div>
        </div>
        <div class="division20">
          <div id="setting_save" @click="${() => this._setVelocity()}">
            Save
          </div>
        </div>
      </div>`;
    } else if (localStorage.getItem(options[2]) == "1") {
      if (localStorage.getItem("busyoption") != 2) {
        localStorage.setItem(
          "direction1",
          this.hass.states["input_text.configuration"].state.slice(2, 3)
        );
      }
      localStorage.setItem("busyoption", 2);
      return html`<div id="setting_config">
        <div class="division20"></div>
        <div class="division20" @click="${() => this._toggleConfig(+1, "d")}">
          <div class="selector">︿</div>
        </div>
        <div class="division20" id="direction">
          ${this._displayConfig()}
        </div>
        <div class="division20" @click="${() => this._toggleConfig(-1, "d")}">
          <div class="selector">﹀</div>
        </div>
        <div class="division20">
          <div id="setting_save" @click="${() => this._setDirection()}">
            Save
          </div>
        </div>
      </div>`;
    } else if (localStorage.getItem(options[3]) == "1") {
      this._requestUpperLimit();
      if (localStorage.getItem("upper") == "1") {
        return html`<div id="setting_config">
          <div class="division20"></div>
          <div class="division20"></div>
          <div class="division20">
            <button
              class="buttonact_limit"
              id="goup_button_s"
              @click="${() => this._sendCommand("00FF00009A0A01DD4C", "s")}"
            >
              ▲
            </button>
            <button
              class="buttonact_limit"
              @click="${() => this._sendCommand("00FF00009A0A01CC5D", "s")}"
            >
              ❙❙
            </button>
            <button
              class="buttonact_limit"
              id="godown_button_s"
              @click="${() => this._sendCommand("00FF00009A0A01EE7F", "s")}"
            >
              ▼
            </button>
          </div>
          <div class="division20"></div>
          <div class="division20">
            <div id="setting_save" @click="${() => this._setUpperLimit()}">
              Save
            </div>
            <div id="setting_cancel" @click="${() => this._cancelLimit()}">
              Cancel
            </div>
          </div>
        </div>`;
      } else if (localStorage.getItem("upper") == "0") {
        return html`<div id="setting_config">
          <div class="division20"></div>
          <div class="division20"></div>
          <div class="division20">
            <div id="setting_set" @click="${() => this._retryLimit()}">
              Retry
            </div>
          </div>
          <div class="division20"></div>
          <div class="division20"></div>
        </div>`;
      } else {
        return html`<div id="setting_config">
          <div class="division20"></div>
          <div class="division20"></div>
          <div class="division20">
            Loading...
          </div>
          <div class="division20"></div>
          <div class="division20"></div>
        </div>`;
      }
    } else if (localStorage.getItem(options[4]) == "1") {
      this._requestBottomLimit();
      if (localStorage.getItem("bottom") == "1") {
        return html`<div id="setting_config">
          <div class="division20"></div>
          <div class="division20"></div>
          <div class="division20">
            <button
              class="buttonact_limit"
              id="goup_button_s"
              @click="${() => this._sendCommand("00FF00009A0A01DD4C", "s")}"
            >
              ▲
            </button>
            <button
              class="buttonact_limit"
              @click="${() => this._sendCommand("00FF00009A0A01CC5D", "s")}"
            >
              ❙❙
            </button>
            <button
              class="buttonact_limit"
              id="godown_button_s"
              @click="${() => this._sendCommand("00FF00009A0A01EE7F", "s")}"
            >
              ▼
            </button>
          </div>
          <div class="division20"></div>
          <div class="division20">
            <div id="setting_save" @click="${() => this._setBottomLimit()}">
              Save
            </div>
            <div id="setting_cancel" @click="${() => this._cancelLimit()}">
              Cancel
            </div>
          </div>
        </div>`;
      } else if (localStorage.getItem("bottom") == "0") {
        return html`<div id="setting_config">
          <div class="division20"></div>
          <div class="division20"></div>
          <div class="division20">
            <div id="setting_set" @click="${() => this._retryLimit()}">
              Retry
            </div>
          </div>
          <div class="division20"></div>
          <div class="division20"></div>
        </div>`;
      } else {
        return html`<div id="setting_config">
          <div class="division20"></div>
          <div class="division20"></div>
          <div class="division20">
            Loading...
          </div>
          <div class="division20"></div>
          <div class="division20"></div>
        </div>`;
      }
    } else if (localStorage.getItem(options[5]) == "1") {
      return html`<div id="setting_config">
        <div class="division20"></div>
        <div class="division20"></div>
        <div class="division20">
          <div id="setting_set" @click="${() => this._factoryReset()}">
            Reset
          </div>
        </div>
        <div class="division20"></div>
        <div class="division20"></div>
      </div>`;
    }
  }

  _toggleDay(i) {
    d = d + i;
    if (d == -1) {
      d = 6;
    } else if (d == 7) {
      d = 0;
    }
    this.hass.callService("input_text", "set_value", {
      value:
        d.toString() + this.hass.states["input_text.schedule"].state.slice(1),
      entity_id: "input_text.schedule",
    });
  }

  _toggleTime(i, type) {
    var up_li, do_li, off;
    if (type == "mh") {
      off = 2;
      up_li = 23;
      do_li = 0;
    } else if (type == "mm") {
      off = 4;
      up_li = 55;
      do_li = 0;
    } else if (type == "m%") {
      off = 6;
      up_li = 99;
      do_li = -1;
    } else if (type == "nh") {
      off = 9;
      up_li = 23;
      do_li = 0;
    } else if (type == "nm") {
      off = 11;
      up_li = 55;
      do_li = 0;
    } else if (type == "n%") {
      off = 13;
      up_li = 99;
      do_li = -1;
    }

    var data = parseInt(
      this.hass.states["input_text.schedule"].state.slice(
        14 * d + off,
        14 * d + off + 2
      ),
      10
    );
    data = data + i;
    if (data == do_li - Math.abs(i)) {
      data = up_li;
    } else if (data == up_li + Math.abs(i)) {
      data = do_li;
    }
    this._modifySchedule(data, off);
  }

  _toggleSchedule(type) {
    var value;
    var off;
    var time;
    if (type == "m") {
      off = 1;
      time = "080049";
    } else if (type == "n") {
      off = 8;
      time = "200049";
    }
    var s = this.hass.states["input_text.schedule"].state.slice(
      14 * d + off,
      14 * d + off + 1
    );

    if (s == "1") {
      value = "0------";
    } else if (s == "0") {
      value = "1" + time;
    }

    this.hass.callService("input_text", "set_value", {
      value:
        this.hass.states["input_text.schedule"].state.slice(0, 14 * d + off) +
        value +
        this.hass.states["input_text.schedule"].state.slice(14 * d + off + 7),
      entity_id: "input_text.schedule",
    });
  }

  _checkSchedule(type) {
    var off;
    if (type == "m") {
      off = 1;
    } else if (type == "n") {
      off = 8;
    }
    var s = this.hass.states["input_text.schedule"].state.slice(
      14 * d + off,
      14 * d + off + 1
    );

    return s;
  }

  _modifySchedule(data, off) {
    var data2 = data.toString();
    var value;

    if (data2.length == 1) {
      data2 = "0" + data2;
    }

    value =
      this.hass.states["input_text.schedule"].state.slice(0, 14 * d + off) +
      data2 +
      this.hass.states["input_text.schedule"].state.slice(14 * d + off + 2);

    this.hass.callService("input_text", "set_value", {
      value: value,
      entity_id: "input_text.schedule",
    });
  }

  _fixPercentage(st) {
    if (st == "--") {
      return "--";
    } else {
      return parseInt(st, 10) + 1;
    }
  }

  _toggleConfig(i, type) {
    var up_li, do_li, id;
    if (type == "v") {
      up_li = 50;
      do_li = 20;
      id = "velocity1";
    } else if (type == "d") {
      up_li = 1;
      do_li = 0;
      id = "direction1";
    }

    var data = parseInt(localStorage.getItem(id), 10);

    data = data + i;
    if (data == do_li - Math.abs(i)) {
      data = up_li;
    } else if (data == up_li + Math.abs(i)) {
      data = do_li;
    }

    localStorage.setItem(id, data.toString());

    this.requestUpdate();
  }

  _displayConfig() {
    if (localStorage.getItem(options[1]) == "1") {
      return localStorage.getItem("velocity1");
    } else if (localStorage.getItem(options[2]) == "1") {
      if (localStorage.getItem("direction1") == "1") {
        return "Forward";
      } else if (localStorage.getItem("direction1") == "0") {
        return "Reverse";
      }
    }
  }

  _setVelocity() {
    var command;
    var direction;

    if (localStorage.getItem("direction0") == "1") {
      var c = 0;
      direction = "14";
      command = 87;
      for (
        i = 0;
        i <= parseInt(localStorage.getItem("velocity1"), 10) - 20;
        i++
      ) {
        if (i > 0) {
          command = command - 1;
          c++;
          if (c == 4) {
            command = command + 8;
            c = 0;
          }
        }
      }
      command = command.toString(16);
    } else if (localStorage.getItem("direction0") == "0") {
      direction = "16";
      command = 85;
      for (
        i = 0;
        i <= parseInt(localStorage.getItem("velocity1"), 10) - 20;
        i++
      ) {
        if (i > 0 && i % 2 === 0) {
          command = command + 3;
        } else if (i > 0 && i % 2 !== 0) {
          command = command - 1;
        }
      }
      command = command.toString(16);
    }

    this.hass.callService("input_text", "set_value", {
      value:
        "00FF00009A1106" +
        direction +
        parseInt(localStorage.getItem("velocity1"), 10).toString(16) +
        "0007D00D" +
        command,
      entity_id: "input_text.mqtt",
    });

    this.hass.callService("homeassistant", "toggle", {
      entity_id: "input_boolean.mqtt",
    });

    setTimeout(() => {
      if (this.hass.states["sensor.mqtt_sensor"].state == "9A11015A31") {
        this.hass.callService("input_text", "set_value", {
          value:
            localStorage.getItem("velocity1") +
            this.hass.states["input_text.configuration"].state.slice(2, 3),
          entity_id: "input_text.configuration",
        });
        localStorage.setItem("velocity0", localStorage.getItem("velocity1"));
        this._message("Velocity was set correctly");
      } else {
        localStorage.setItem("velocity1", localStorage.getItem("velocity0"));
        this._message("Velocity was not set correctly");
      }
      this.requestUpdate();
    }, 400);
  }

  _setDirection() {
    var command;
    var direction;

    if (localStorage.getItem("direction1") == "1") {
      var c = 0;
      direction = "14";
      command = 87;
      for (
        i = 0;
        i <= parseInt(localStorage.getItem("velocity0"), 10) - 20;
        i++
      ) {
        if (i > 0) {
          command = command - 1;
          c++;
          if (c == 4) {
            command = command + 8;
            c = 0;
          }
        }
      }
      command = command.toString(16);
    } else if (localStorage.getItem("direction1") == "0") {
      direction = "16";
      command = 85;

      for (
        i = 0;
        i <= parseInt(localStorage.getItem("velocity0"), 10) - 20;
        i++
      ) {
        if (i > 0 && i % 2 === 0) {
          command = command + 3;
        } else if (i > 0 && i % 2 !== 0) {
          command = command - 1;
        }
      }

      command = command.toString(16);
    }

    this.hass.callService("input_text", "set_value", {
      value:
        "00FF00009A1106" +
        direction +
        parseInt(localStorage.getItem("velocity0"), 10).toString(16) +
        "0007D00D" +
        command,
      entity_id: "input_text.mqtt",
    });

    this.hass.callService("homeassistant", "toggle", {
      entity_id: "input_boolean.mqtt",
    });

    setTimeout(() => {
      if (this.hass.states["sensor.mqtt_sensor"].state == "9A11015A31") {
        this.hass.callService("input_text", "set_value", {
          value:
            this.hass.states["input_text.configuration"].state.slice(0, 2) +
            localStorage.getItem("direction1"),
          entity_id: "input_text.configuration",
        });
        localStorage.setItem("direction0", localStorage.getItem("direction1"));
        this._message("Direction was set correctly");
      } else {
        localStorage.setItem("direction1", localStorage.getItem("direction0"));
        this._message("Direction was not set correctly");
      }
      this.requestUpdate();
    }, 400);
  }

  _requestUpperLimit() {
    if (localStorage.getItem("busyoption") != 3) {
      this.hass.callService("input_text", "set_value", {
        value: "00FF00009A2203000200B9",
        entity_id: "input_text.mqtt",
      });

      this.hass.callService("homeassistant", "toggle", {
        entity_id: "input_boolean.mqtt",
      });
      localStorage.setItem("busyoption", 3);

      setTimeout(() => {
        this.requestUpdate();
      }, 500);

      setTimeout(() => {
        if (this.hass.states["sensor.mqtt_sensor"].state == "9A22015A31") {
          localStorage.setItem("upper", "1");
          localStorage.setItem("busylimit", "1");
        } else {
          localStorage.setItem("upper", "0");
          this._message("Failed to establish the connection");
        }
      }, 400);
    }
  }

  _setUpperLimit() {
    this.hass.callService("input_text", "set_value", {
      value: "00FF00009A220320020099",
      entity_id: "input_text.mqtt",
    });

    this.hass.callService("homeassistant", "toggle", {
      entity_id: "input_boolean.mqtt",
    });

    setTimeout(() => {
      if (this.hass.states["sensor.mqtt_sensor"].state == "9A22015B31") {
        this._message("Limit was set correctly");
        localStorage.setItem("busylimit", "0");
        this.hass.callService("input_text", "set_value", {
          value:
            this.hass.states["input_text.notifications"].state.slice(0, 2) +
            100,
          entity_id: "input_text.notifications",
        });
      } else {
        this._message("Limit was not set correctly");
      }
      this.requestUpdate();
    }, 400);
  }

  _requestBottomLimit() {
    if (localStorage.getItem("busyoption") != 4) {
      this.hass.callService("input_text", "set_value", {
        value: "00FF00009A2203000100BA",
        entity_id: "input_text.mqtt",
      });

      this.hass.callService("homeassistant", "toggle", {
        entity_id: "input_boolean.mqtt",
      });
      localStorage.setItem("busyoption", 4);

      setTimeout(() => {
        this.requestUpdate();
      }, 500);

      setTimeout(() => {
        if (this.hass.states["sensor.mqtt_sensor"].state == "9A22015A31") {
          localStorage.setItem("bottom", "1");
          localStorage.setItem("busylimit", "1");
        } else {
          localStorage.setItem("bottom", "0");
          this._message("Failed to establish the connection");
        }
      }, 400);
    }
  }

  _setBottomLimit() {
    this.hass.callService("input_text", "set_value", {
      value: "00FF00009A22032001009A",
      entity_id: "input_text.mqtt",
    });

    this.hass.callService("homeassistant", "toggle", {
      entity_id: "input_boolean.mqtt",
    });

    setTimeout(() => {
      if (this.hass.states["sensor.mqtt_sensor"].state == "9A22015B31") {
        this._message("Limit was set correctly");
        localStorage.setItem("busylimit", "0");
        this.hass.callService("input_text", "set_value", {
          value:
            this.hass.states["input_text.notifications"].state.slice(0, 2) + 0,
          entity_id: "input_text.notifications",
        });
      } else {
        this._message("Limit was not set correctly");
      }
      this.requestUpdate();
    }, 400);
  }

  _cancelLimit() {
    this.hass.callService("input_text", "set_value", {
      value: "00FF00009A2203400100FA",
      entity_id: "input_text.mqtt",
    });

    this.hass.callService("homeassistant", "toggle", {
      entity_id: "input_boolean.mqtt",
    });

    setTimeout(() => {
      if (this.hass.states["sensor.mqtt_sensor"].state == "9A22015C31") {
        this._message("Limit configuration was cancelled");
        localStorage.setItem("busylimit", "0");
      } else {
        this._message("Failed to cancell");
      }
      this.requestUpdate();
    }, 400);
  }

  _retryLimit() {
    localStorage.setItem("busyoption", 0);
    this.requestUpdate();
    localStorage.setItem("upper", "-1");
  }

  _factoryReset() {
    this.hass.callService("input_text", "set_value", {
      value: "00FF00009A2203000001BA",
      entity_id: "input_text.mqtt",
    });

    this.hass.callService("homeassistant", "toggle", {
      entity_id: "input_boolean.mqtt",
    });

    if (localStorage.getItem("settings") == "1") {
      this._message("Reseting...");
    }

    setTimeout(() => {
      this.hass.callService("input_text", "set_value", {
        value: "500",
        entity_id: "input_text.configuration",
      });

      this.hass.callService("input_text", "set_value", {
        value:
          "00------0------0------0------0------0------0------0------0------0------0------0------0------0------",
        entity_id: "input_text.schedule",
      });

      this.hass.callService("input_text", "set_value", {
        value: "00000",
        entity_id: "input_text.notifications",
      });
      window.location.reload();
    }, 2000);
  }

  _message(message) {
    if (localStorage.getItem("message") == "0") {
      localStorage.setItem("message", "1");
      this.shadowRoot.getElementById("message").innerHTML = message;
      this.shadowRoot.getElementById("message").style.opacity = "1";
      this.shadowRoot.getElementById("message").style.padding = "4px";
      setTimeout(() => {
        if (this.shadowRoot.getElementById("message") != null) {
          this.shadowRoot.getElementById("message").style.opacity = "0";
        }
      }, 2000);
      setTimeout(() => {
        if (this.shadowRoot.getElementById("message") != null) {
          this.shadowRoot.getElementById("message").innerHTML = "";
          this.shadowRoot.getElementById("message").style.padding = "0px";
          localStorage.setItem("message", "0");
        }
      }, 3000);
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  getCardSize() {
    return 5;
  }
}

customElements.define("blind-control-card", BlindControl);
