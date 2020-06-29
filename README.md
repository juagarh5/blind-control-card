# blind-control-card
<p align="center">
  <img src="https://github.com/juagarh5/blind-control-card/blob/master/examples/Interface.png?raw=true">
</p>

## Features:
* Simple action execution such as go up, go down, stop.
* Creation of 
* Velocity and Direction modification.
* Upper and Bottom limit modification.
* Factory reset.
* Battery and position notifications.

## Installation:

### ESP32
* Add in the Additional Boards Manager URLs (File > Preferences) the following link:
```
https://dl.espressif.com/dl/package_esp32_index.json
```
* Install the board esp32 by Espressif System through the Board Manager (Tools > Board > Board Manager).
* Select the ESP32 Dev Module Board (Tools > Board) and the Huge App partition scheme (Tools > Partition Scheme > Huge APP (3MB No OTA/1MB SPIFFS).
* Download the [Arduino code](https://github.com/juagarh5/blind-control-card/blob/master/MQTT_BLE_Controller.ino) and introduce the network ssid, password and IP. Upload the code.

### Home Assistant
* Add the [configuration code](https://github.com/juagarh5/blind-control-card/blob/master/configuration_blind-control-card.yaml) into the Home Assistant's configuration.yaml file.
* Add the [automation code](https://github.com/juagarh5/blind-control-card/blob/master/automations_blind-control-card.yaml) into the Home Assistant's automations.yaml file.
* Create the folder www in the configuration folder and include the file [blind-control-card.js](https://github.com/juagarh5/blind-control-card/blob/master/blind-control-card.js) (Do not modify the name).
* Load the resource in the LovelaceUI's Raw Configurator Editor:
```yaml
resources:
  - type: module
    url: /local/blind-control-card.js
```
* Include the following code in "cards":
```yaml
      - type: 'custom:blind-control-card'
        entity: sensor.time
```
