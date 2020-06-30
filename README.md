# blind-control-card
<p align="center">
  <img src="https://github.com/juagarh5/blind-control-card/blob/master/examples/Interface.png?raw=true">
</p>

## Requirements:
* ESP32 Microcontroller
* A-OK AM43 Blind Motor [example](https://es.aliexpress.com/i/33044164435.html)
## Features:
* Execution of simple actions: go up, go down, stop.
* Integration of daily scheduled movements (morning and night).
* Parameters modification: Velocity (20-50 rpm), Direction (Forward-Reverse) modification.
* Limits modification: Upper limit and Bottom limit.
* Factory reset option.
* Live battery-blind position status.

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
* Add the [configuration code](https://github.com/juagarh5/blind-control-card/blob/master/configuration_blind-control-card.yaml) after modifying the MQTT Broker's IP into the Home Assistant's configuration.yaml file.
* Add the [automation code](https://github.com/juagarh5/blind-control-card/blob/master/automations_blind-control-card.yaml) into the Home Assistant's automations.yaml file.
* Load the resource in the LovelaceUI's Raw Configurator Editor:
```yaml
resources:
  - type: module
    url: /hacsfiles/blind-control-card/blind-control-card.js
```
* Include the following code in "cards":
```yaml
      - type: 'custom:blind-control-card'
        entity: sensor.time
```
* Restart Home Assistant's server.
