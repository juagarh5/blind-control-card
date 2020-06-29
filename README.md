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
* Add the following link to the File>Preferences: Additional Boards Manager URLs:
```
https://dl.espressif.com/dl/package_esp32_index.json
```

### Home Assistant

* Install the custom component by following it's instructions.







```yaml
resources:
  - type: module
    url: /local/blind-control-card.js
    
```

```yaml
      - type: 'custom:blind-control-card'
        entity: sensor.time
    
```
