# blind-control-card
Custom card for controlling the AM43 Blinds Drive Motor

```yaml
mqtt:
  broker: 192.168.131.206

input_boolean:
  mqtt:
    name: "AM3_MQTT_SendCommand"

input_text:
  mqtt:
    name: "AM43_MQTT_Commands"
  schedule:
    name: "AM43_MQTT_Schedule"
  notifications:
    name: "AM43_MQTT_Notifications"
  configuration:
    name: "AM43_MQTT_Configuration"
  busy:
    name: "AM43_MQTT_BusyState"
    initial: "0"

sensor:
  - platform: time_date
    display_options:
      - "time"
  - platform: mqtt
    state_topic: "am43/notifications"
    expire_after: 1
```



```yaml
resources:
  - type: module
    url: /local/blind-control-card.js
    
```

```yaml
      - type: 'custom:blind-control-card'
        entity: sensor.time
    
```
